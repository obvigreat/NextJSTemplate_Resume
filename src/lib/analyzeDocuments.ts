import { supabase } from './supabaseClient';
import { detectDocumentType } from './detectDocumentType';
import { v4 as uuidv4 } from 'uuid';
import * as ExcelJS from 'exceljs';
import * as pdfjsLib from 'pdfjs-dist';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * Convert Excel file to text content using ExcelJS
 */
async function xlsxToText(buffer: ArrayBuffer): Promise<string> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);
  
  // Get the first worksheet
  const worksheet = workbook.worksheets[0];
  if (!worksheet) {
    throw new Error('No worksheet found in Excel file');
  }

  // Convert to CSV format
  const rows: string[] = [];
  
  // Process headers first
  const headerRow: string[] = [];
  worksheet.getRow(1).eachCell((cell) => {
    headerRow.push(cell.text.toString());
  });
  rows.push(headerRow.join(','));

  // Process data rows
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // Skip header row
    const rowData: string[] = [];
    row.eachCell((cell) => {
      let value = cell.text.toString();
      // Handle values that might contain commas
      if (value.includes(',')) {
        value = `"${value}"`;
      }
      rowData.push(value);
    });
    rows.push(rowData.join(','));
  });

  return rows.join('\n');
}

/**
 * Convert PDF file to text content using pdf.js
 */
async function pdfToText(buffer: ArrayBuffer): Promise<string> {
  try {
    const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
    const maxPages = pdf.numPages;
    const pageTexts: string[] = [];

    // Extract text from each page
    for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      const text = content.items
        // @ts-ignore - We know these items have a 'str' property
        .map(item => item.str || '')
        .join(' ');
      pageTexts.push(text);
    }

    return pageTexts.join('\n');
  } catch (error) {
    console.error('Error extracting PDF text:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

export async function analyzeDocument(documentId: string): Promise<{ jsonId: string, jsonUrl: string }> {
  try {
    // Get document details from database
    const { data: document, error: fetchError } = await supabase
      .from('documents')
      .select('*')
      .eq('id', documentId)
      .single();

    if (fetchError || !document) {
      console.error('Error fetching document:', fetchError);
      throw new Error('Document not found');
    }

    // Check if document already has a JSON file
    if (document.json_id && document.json_url) {
      console.log('Document already has JSON analysis:', document.json_id);
      return {
        jsonId: document.json_id,
        jsonUrl: document.json_url
      };
    }

    // Download file content from storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('documents')
      .download(`initial_fin_doc/${document.name}`);

    if (downloadError) {
      console.error('Error downloading file:', downloadError);
      throw new Error('Failed to download file');
    }

    // Convert file to text based on file type
    let text: string;
    const fileExtension = document.name.toLowerCase().split('.').pop();
    const arrayBuffer = await fileData.arrayBuffer();

    console.log('Processing file type:', fileExtension);

    switch (fileExtension) {
      case 'xlsx':
      case 'xls':
        text = await xlsxToText(arrayBuffer);
        break;
      case 'pdf':
        text = await pdfToText(arrayBuffer);
        break;
      case 'csv':
        text = await fileData.text();
        break;
      default:
        text = await fileData.text();
    }

    // Detect document type using both content and filename
    const documentType = await detectDocumentType(text, document.name, fileExtension);
    console.log('Detected document type:', documentType, 'for file:', document.name);

    // Call API endpoint to analyze the document
    const response = await fetch('/api/analyze-document-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: text,
        documentType,
        filename: document.name,
        fileType: fileExtension
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to analyze document');
    }

    const { analysis } = await response.json();

    // Create JSON file with document ID in name
    const jsonId = uuidv4();
    const jsonPath = `initial_fin_doc/json/${documentId}_${jsonId}.json`;

    // Add document type to the analysis
    const enrichedAnalysis = {
      ...analysis,
      document_type: documentType
    };

    // Upload JSON to storage
    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(jsonPath, JSON.stringify(enrichedAnalysis, null, 2), {
        contentType: 'application/json',
        upsert: true
      });

    if (uploadError) {
      console.error('Error uploading JSON:', uploadError);
      throw new Error('Failed to upload JSON file');
    }

    // Get JSON URL
    const { data: jsonData } = await supabase.storage
      .from('documents')
      .getPublicUrl(jsonPath);

    if (!jsonData?.publicUrl) {
      throw new Error('Failed to get JSON URL');
    }

    // Update document record with minimal required fields
    const { error: updateError } = await supabase
      .from('documents')
      .update({
        json_id: jsonId,
        json_url: jsonData.publicUrl,
        document_type: documentType
      })
      .match({ id: documentId });

    if (updateError) {
      console.error('Error updating document record:', updateError);
      // Log the actual error details for debugging
      console.error('Update error details:', {
        error: updateError,
        documentId,
        jsonId,
        jsonUrl: jsonData.publicUrl,
        documentType
      });
      throw new Error(`Failed to update document record: ${updateError.message}`);
    }

    return {
      jsonId,
      jsonUrl: jsonData.publicUrl
    };
  } catch (error) {
    console.error('Error analyzing document:', error);
    throw error;
  }
} 