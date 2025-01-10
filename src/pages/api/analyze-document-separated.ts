import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

// 1) Replace '@/lib/...' with relative paths to your 'lib' folder.
//    Assuming your folder structure is:
//
//    └── src
//        ├── lib
//        │   ├── supabaseClient.ts
//        │   ├── openAIClient.ts
//        │   ├── types.ts
//        │   ├── detectDocumentType.ts
//        │   ├── buildPrompt.ts
//        │   ├── extractJsonFromOpenAI.ts
//        └── pages
//            └── api
//                └── analyze-document.ts
//
//    Then the imports below point to the correct relative paths:
import { supabase } from '../../lib/supabaseClient';
import { openai } from '../../lib/openAIClient';
import { FinancialData } from '../../lib/types';
import { detectDocumentType } from '../../lib/detectDocumentType';
import { getPromptForDocumentType } from '../../lib/buildPrompt';
import { extractJsonFromOpenAI } from '../../lib/extractJsonFromOpenAI';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    /**
     * EXPECTED BODY:
     * {
     *   "fileName": "MyDocument.csv",
     *   "fileType": "csv",
     *   "fileBase64": "base64-encoded-file-content"
     * }
     *
     * If you are using multipart/form-data, parse accordingly.
     */
    const { fileName, fileType, fileBase64 } = req.body || {};
    if (!fileName || !fileType || !fileBase64) {
      return res.status(400).json({
        error: 'Missing required parameters: fileName, fileType, fileBase64',
      });
    }

    // -----------------------------------------------------
    // STEP 1: Upload the file to Supabase storage (public)
    // -----------------------------------------------------
    // We'll store it in the "documents" bucket under "initial_fin_doc/<fileName>"
    const filePath = `initial_fin_doc/${fileName}`;
    console.log(`Uploading file to: ${filePath}`);

    const fileBuffer = Buffer.from(fileBase64, 'base64');

    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, fileBuffer, {
        upsert: true,
        contentType: fileType,
      });

    if (uploadError) {
      throw new Error(`Failed to upload file to Supabase: ${uploadError.message}`);
    }

    // Build the public URL
    const { data: publicData } = supabase.storage
      .from('documents')
      .getPublicUrl(filePath);

    const publicUrl = publicData?.publicUrl;
    if (!publicUrl) {
      throw new Error('Could not generate a public URL for the uploaded file.');
    }
    console.log('File publicly available at:', publicUrl);

    // -----------------------------------------------------
    // STEP 2: Extract content from the file in memory
    // -----------------------------------------------------
    let fileContent = '';
    const lowerType = fileType.toLowerCase();

    if (lowerType === 'csv') {
      fileContent = fileBuffer.toString('utf8');
    } else if (lowerType === 'pdf' || lowerType === 'xlsx') {
      // For demonstration, we might just convert the file to base64 text for the OpenAI prompt
      // (or parse further if you have a library to handle XLSX/PDF)
      fileContent = fileBuffer.toString('base64');
    } else {
      // Fallback: treat as raw text or base64
      fileContent = fileBuffer.toString('base64');
    }

    // -----------------------------------------------------
    // STEP 3: Use OpenAI to analyze file content
    // -----------------------------------------------------
    const docType = detectDocumentType(fileContent);
    const prompt = getPromptForDocumentType(docType, fileContent);

    // Attempt call to OpenAI with a 60s timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000);

    let completion;
    try {
      completion = await openai.chat.completions.create(
        {
          model: 'o1-mini', // or 'gpt-3.5-turbo', etc.
          messages: [{ role: 'user', content: prompt }],
        },
        { signal: controller.signal }
      );
    } finally {
      clearTimeout(timeout);
    }

    if (!completion?.choices?.[0]?.message?.content) {
      throw new Error('No content returned from OpenAI');
    }

    // -----------------------------------------------------
    // STEP 4: Extract JSON from OpenAI's response
    // -----------------------------------------------------
    let structuredData: Partial<FinancialData> = {};
    try {
      const rawJson = extractJsonFromOpenAI(completion.choices[0].message.content);
      structuredData = JSON.parse(rawJson);
    } catch (jsonErr: any) {
      throw new Error(`Could not parse JSON from OpenAI: ${jsonErr.message}`);
    }

    // -----------------------------------------------------
    // STEP 5: Store the raw JSON file in Supabase (optional)
    // -----------------------------------------------------
    const jsonFileName = `${uuidv4()}.json`;
    const jsonPath = `initial_fin_doc/json/${jsonFileName}`;
    console.log('Storing JSON at:', jsonPath);

    const { error: jsonUploadError } = await supabase.storage
      .from('documents')
      .upload(jsonPath, Buffer.from(JSON.stringify(structuredData, null, 2)), {
        upsert: true,
        contentType: 'application/json',
      });

    if (jsonUploadError) {
      throw new Error(`Failed to store JSON file in Supabase: ${jsonUploadError.message}`);
    }

    const { data: jsonPublicData } = supabase.storage
      .from('documents')
      .getPublicUrl(jsonPath);

    const jsonPublicUrl = jsonPublicData?.publicUrl || null;
    console.log('JSON publicly available at:', jsonPublicUrl);

    // -----------------------------------------------------
    // STEP 6: Merge with default sections & minimal fixes
    // -----------------------------------------------------
    const defaultSections: FinancialData = {
      companies: [],
      periods: [],
      income_statements: [],
      balance_sheets: [],
      cash_flow_statements: [],
      financial_ratios: [],
      mna_analysis: [],
      user_profiles: [],
      organizations: [],
      deals: [],
    };

    // Ensures every array is present
    const mergedData = { ...defaultSections, ...structuredData };

    // Guarantee at least one company + period
    const company_id = uuidv4();
    if (!mergedData.companies.length) {
      mergedData.companies.push({
        company_id,
        company_name: fileName.replace(/\.[^/.]+$/, '').replace(/_/g, ' '),
      });
    } else {
      mergedData.companies[0].company_id = company_id;
    }

    const period_id = uuidv4();
    if (!mergedData.periods.length) {
      mergedData.periods.push({
        period_id,
        period_start_date: `${new Date().getFullYear()}-01-01`,
        period_end_date: `${new Date().getFullYear()}-12-31`,
        fiscal_year: new Date().getFullYear(),
        fiscal_quarter: 1,
        period_type: 'annual',
      });
    } else {
      mergedData.periods[0].period_id = period_id;
    }

    // Fix references in statements
    if (mergedData.income_statements.length) {
      mergedData.income_statements = mergedData.income_statements.map((s: any) => ({
        ...s,
        id: uuidv4(),
        company_id,
        reporting_period: period_id,
      }));
    }
    if (mergedData.balance_sheets.length) {
      mergedData.balance_sheets = mergedData.balance_sheets.map((s: any) => ({
        ...s,
        id: uuidv4(),
        company_id,
        reporting_period: period_id,
      }));
    }
    if (mergedData.cash_flow_statements.length) {
      mergedData.cash_flow_statements = mergedData.cash_flow_statements.map((s: any) => ({
        ...s,
        id: uuidv4(),
        company_id,
        reporting_period: period_id,
      }));
    }
    if (mergedData.financial_ratios.length) {
      mergedData.financial_ratios = mergedData.financial_ratios.map((s: any) => ({
        ...s,
        id: uuidv4(),
        company_id,
        reporting_period: period_id,
      }));
    }

    // -----------------------------------------------------
    // STEP 7: Insert a 'document' record in Supabase
    // -----------------------------------------------------
    // Make sure your 'documents' table doesn't conflict with the 'documents' storage bucket name
    // If so, rename the table or the bucket.
    const { data: docRecord, error: docError } = await supabase
      .from('documents')
      .insert({
        name: fileName,
        url: publicUrl,
        file_type: fileType,
        file_extension: fileName.split('.').pop() || null,
        analyzed_at: new Date().toISOString(),
        confidence_score: 0,
        json_file_url: jsonPublicUrl, // optional if you have such a column
      })
      .select()
      .single();

    if (docError) {
      throw new Error(`Error inserting into 'documents' table: ${docError.message}`);
    }
    if (!docRecord?.id) {
      throw new Error('No valid document ID returned after insert.');
    }

    const documentId = docRecord.id;

    // -----------------------------------------------------
    // STEP 8: Parse & store data in the appropriate tables
    // -----------------------------------------------------
    const insertRecords = async (table: string, records: any[]) => {
      if (!records?.length) return;
      const { error } = await supabase
        .from(table)
        .insert(records.map((r) => ({ ...r, document_id: documentId })));
      if (error) {
        throw new Error(`Failed to insert into ${table}: ${error.message}`);
      }
    };

    await insertRecords('companies', mergedData.companies);
    await insertRecords('periods', mergedData.periods);
    await insertRecords('income_statements', mergedData.income_statements);
    await insertRecords('balance_sheets', mergedData.balance_sheets);
    await insertRecords('cash_flow_statements', mergedData.cash_flow_statements);
    await insertRecords('financial_ratios', mergedData.financial_ratios);

    // If desired, also handle 'mna_analysis', 'user_profiles', 'organizations', 'deals', etc.

    // -----------------------------------------------------
    // DONE: Return success
    // -----------------------------------------------------
    return res.status(200).json({
      success: true,
      documentId,
      publicUrl,
      jsonPublicUrl,
      data: mergedData,
    });
  } catch (error: any) {
    console.error('Error in analyze-document route:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Unknown server error',
    });
  }
}
