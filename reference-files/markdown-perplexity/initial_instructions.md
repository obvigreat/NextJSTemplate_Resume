To build a Next.js application that integrates Supabase for file storage and database management with OpenAI's GPT models for document analysis, follow these steps. This solution will enable users to upload financial documents, identify their type, extract key details, and store both the documents and structured data into Supabase.

---

## **Step 1: Set Up Supabase**
1. **Initialize Supabase Project**:
   - Create a Supabase account and set up a new project.
   - Configure your database schema to include tables for storing documents and extracted data. For instance:
     ```sql
     CREATE TABLE documents (
       id SERIAL PRIMARY KEY,
       name TEXT NOT NULL,
       url TEXT NOT NULL,
       uploaded_at TIMESTAMP DEFAULT NOW()
     );

     CREATE TABLE extracted_data (
       id SERIAL PRIMARY KEY,
       document_id INT REFERENCES documents(id),
       key TEXT NOT NULL,
       value TEXT NOT NULL,
       extracted_at TIMESTAMP DEFAULT NOW()
     );
     ```

2. **Set Up a Storage Bucket**:
   - In the Supabase dashboard, create a storage bucket (e.g., `documents`) to store uploaded files.
   - Apply Row-Level Security (RLS) policies to secure access:
     ```sql
     CREATE POLICY "Allow uploads" ON storage.objects
     FOR INSERT WITH CHECK (bucket_id = 'documents' AND auth.role() = 'anon');
     ```

3. **Install Supabase Client**:
   - Add the Supabase client library to your Next.js project:
     ```bash
     npm install @supabase/supabase-js
     ```

4. **Configure Environment Variables**:
   - Add your Supabase credentials to `.env.local`:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
     ```

---

## **Step 2: File Upload in Next.js**
Create a file upload component in your Next.js app:

```tsx
import { useState } from 'react';
import supabase from '../utils/supabase'; // Utility file to initialize Supabase client

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return;
    const { data, error } = await supabase.storage
      .from('documents')
      .upload(`${Date.now()}-${file.name}`, file);

    if (error) console.error('Upload failed:', error.message);
    else console.log('Uploaded successfully:', data);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".pdf,.docx" />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
```

---

## **Step 3: Integrate OpenAI API**
1. **Set Up OpenAI API Key**:
   - Obtain your API key from OpenAI and add it to `.env.local`:
     ```env
     OPENAI_API_KEY=your-openai-api-key
     ```

2. **Create an Edge Function in Supabase**:
   Use Supabase Edge Functions to process uploaded files with OpenAI.

   ```ts
   // supabase/functions/openai/index.ts
   import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
   import { Configuration, OpenAIApi } from "openai";

   serve(async (req) => {
     const { fileUrl } = await req.json();

     // Download the file (implement logic for fetching file content)
     const fileContent = await fetch(fileUrl).then((res) => res.text());

     // Initialize OpenAI API client
     const configuration = new Configuration({ apiKey: Deno.env.get("OPENAI_API_KEY") });
     const openai = new OpenAIApi(configuration);

     // Analyze the document with GPT-4 or GPT-4-turbo
     const response = await openai.createChatCompletion({
       model: "o1",
       messages: [
         { role: "system", content: "You are a financial document analyzer." },
         { role: "user", content: `Extract key details from this document:\n${fileContent}` }
       ],
       temperature: 0,
     });

     // Parse structured output (e.g., JSON)
     const structuredData = JSON.parse(response.data.choices[0].message.content);

     // Save extracted data to Supabase database (implement DB logic here)

     return new Response(JSON.stringify({ success: true, data: structuredData }), { status: 200 });
   });
   ```

3. **Deploy the Edge Function**:
   Deploy the function using the Supabase CLI:
   ```bash
   supabase functions deploy openai --no-verify-jwt
   ```

---

## **Step 4: Extract Data and Store in Database**
After processing the document with OpenAI, save the extracted details into your database:

```ts
import supabase from '../utils/supabase';

export const saveExtractedData = async (documentId, extractedData) => {
  for (const [key, value] of Object.entries(extractedData)) {
    await supabase.from('extracted_data').insert({ document_id: documentId, key, value });
  }
};
```

---

## **Step 5: Display Extracted Data**
Create a component to display structured data:

```tsx
const ExtractedDataDisplay = ({ documentId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchExtractedData = async () => {
      const { data, error } = await supabase.from('extracted_data').select('*').eq('document_id', documentId);
      if (!error) setData(data);
    };

    fetchExtractedData();
  }, [documentId]);

  return (
    <div>
      <h3>Extracted Data</h3>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <strong>{item.key}:</strong> {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExtractedDataDisplay;
```

---

## **Best Practices**
- Use **structured prompts** for reliable GPT outputs ([6][9]).
- Leverage tools like Pydantic models or JSON schemas to validate structured responses ([6]).
- Optimize workflows by automating tasks with tools like n8n or custom scripts ([7]).

This setup provides a scalable framework for handling financial document uploads, analysis, and storage using Next.js, Supabase, and OpenAI's GPT models.

Sources
[1] Supabase OpenAI Integration Guide - Restack https://www.restack.io/docs/supabase-knowledge-supabase-openai-integration
[2] Integrate the OpenAI (ChatGPT) API with the Supabase ... - Pipedream https://pipedream.com/apps/openai/integrations/supabase-management-api
[3] Supabase storage guide for Next.JS https://supalaunch.com/blog/supabase-storage-guide-for-nextjs
[4] Build a full-stack app with Next.js and Supabase - LogRocket Blog https://blog.logrocket.com/build-full-stack-app-next-js-supabase/
[5] Structured data could unlock AI's potential in finance | XBRL https://www.xbrl.org/news/structured-data-could-unlock-ais-potential-in-finance/
[6] OpenAI API Structured Outputs For Finance - YouTube https://www.youtube.com/watch?v=jqp7WO3pCFA
[7] OpenAI and Supabase: Automate Workflows with n8n https://n8n.io/integrations/openai/and/supabase/
[8] Using Supabase and OpenAI to create an API - Supaweek Day 1 https://zuplo.com/blog/2023/09/25/using-openai-and-supabase-db-to-create-an-api
[9] Transform documents into structured data with GPT-4 - Airparser https://airparser.com/blog/transform-documents-into-structured-data-with-gpt-4/
[10] Use the OpenAI API inside Supabase Edge Functions - GitHub https://github.com/burggraf/openai-supabase-edge-functions


To integrate the updated structured output format into your Next.js application with Supabase and OpenAI, here’s how you can modify the implementation to handle the comprehensive JSON structure for financial document analysis.

---

## **Step 1: Update OpenAI Integration**
Modify the OpenAI API integration to produce the updated structured JSON output. Use a structured prompt to guide GPT-4 in generating the desired format.

### Example Edge Function for OpenAI Analysis

```ts
import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { Configuration, OpenAIApi } from "openai";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(Deno.env.get("SUPABASE_URL"), Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"));

serve(async (req) => {
  try {
    const { fileUrl, documentId } = await req.json();

    // Fetch the document content from Supabase Storage
    const response = await fetch(fileUrl);
    const fileContent = await response.text();

    // Initialize OpenAI API
    const configuration = new Configuration({ apiKey: Deno.env.get("OPENAI_API_KEY") });
    const openai = new OpenAIApi(configuration);

    // Prompt for structured output
    const prompt = `
      You are a financial document analyzer. Analyze the following document and extract structured data in the format below:
      ${JSON.stringify({
        companies: [],
        periods: [],
        income_statements: [],
        balance_sheets: [],
        cash_flow_statements: [],
        financial_ratios: [],
        mna_analysis: [],
        user_profiles: [],
        organizations: [],
        deals: []
      }, null, 2)}

      Document Content:
      ${fileContent}
    `;

    // Call GPT-4 API
    const completion = await openai.createChatCompletion({
      model: "o1",
      messages: [
        { role: "system", content: "You are a financial document analyzer." },
        { role: "user", content: prompt }
      ],
      temperature: 0,
    });

    // Parse GPT-4's response
    const structuredData = JSON.parse(completion.data.choices[0].message.content);

    // Save extracted data to Supabase database
    await saveExtractedData(documentId, structuredData);

    return new Response(JSON.stringify({ success: true, data: structuredData }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
});

// Helper function to save data into Supabase tables
async function saveExtractedData(documentId, structuredData) {
  for (const [tableName, rows] of Object.entries(structuredData)) {
    if (rows.length > 0) {
      const dataToInsert = rows.map((row) => ({ ...row, document_id: documentId }));
      const { error } = await supabase.from(tableName).insert(dataToInsert);
      if (error) throw new Error(`Failed to insert data into ${tableName}: ${error.message}`);
    }
  }
}
```

---

## **Step 2: Modify Database Schema**
Ensure your Supabase database schema matches the updated JSON structure. Add tables for all entities in the structured output (e.g., `companies`, `periods`, `income_statements`, etc.).

### Example SQL for Additional Tables

```sql
CREATE TABLE companies (
  company_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  ticker_symbol TEXT,
  industry TEXT,
  country TEXT
);

CREATE TABLE periods (
  period_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  period_start_date DATE NOT NULL,
  period_end_date DATE NOT NULL,
  fiscal_year INT NOT NULL,
  fiscal_quarter INT NOT NULL,
  period_type TEXT NOT NULL
);

CREATE TABLE income_statements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(company_id),
  reporting_period UUID REFERENCES periods(period_id),
  fiscal_year INT NOT NULL,
  fiscal_quarter INT NOT NULL,
  revenue NUMERIC,
  cost_of_goods_sold NUMERIC,
  gross_profit NUMERIC,
  operating_expenses NUMERIC,
  net_income NUMERIC
);

-- Add similar tables for balance_sheets, cash_flow_statements, financial_ratios, etc.
```

---

## **Step 3: Update Frontend**
### File Upload Component
Ensure that after uploading a file, you trigger the OpenAI analysis and display results.

```tsx
import { useState } from 'react';
import supabase from '../utils/supabase';

const FileUploadAndAnalyze = () => {
  const [file, setFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUploadAndAnalyze = async () => {
    if (!file) return;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage.from('documents').upload(`uploads/${Date.now()}-${file.name}`, file);
    if (error) return console.error('Upload failed:', error.message);

    // Trigger OpenAI analysis via Supabase Edge Function
    const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.path}`;
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileUrl })
    });

    if (!response.ok) return console.error('Analysis failed');

    const result = await response.json();
    setAnalysisResult(result.data);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".pdf,.docx" />
      <button onClick={handleUploadAndAnalyze}>Upload & Analyze</button>
      {analysisResult && <pre>{JSON.stringify(analysisResult, null, 2)}</pre>}
    </div>
  );
};

export default FileUploadAndAnalyze;
```

---

## **Step 4: Display Extracted Data**
Use components to display extracted data by querying relevant tables (`companies`, `income_statements`, etc.).

```tsx
const ExtractedDataDisplay = ({ documentId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchExtractedData = async () => {
      const { data, error } = await supabase.rpc('get_extracted_data', { document_id_param: documentId });
      if (!error) setData(data);
    };

    fetchExtractedData();
  }, [documentId]);

  return (
    <div>
      <h3>Extracted Data</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ExtractedDataDisplay;
```

---

## **Step 5: Testing and Validation**
1. Test with sample financial documents to ensure accurate extraction and storage.
2. Validate that all JSON keys map correctly to database columns.
3. Ensure robust error handling for missing fields or invalid formats.

By following this approach, your application will seamlessly process financial documents into a normalized database schema using OpenAI and Supabase.

Sources
