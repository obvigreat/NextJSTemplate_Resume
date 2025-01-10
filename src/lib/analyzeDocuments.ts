import { supabase } from './supabaseClient';
import { detectDocumentType } from './detectDocumentType';
import { v4 as uuidv4 } from 'uuid';

export async function analyzeDocument(documentId: string): Promise<{ jsonId: string, jsonUrl: string }> {
  try {
    // Get document details from database
    const { data: document } = await supabase
      .from('documents')
      .select('*')
      .eq('id', documentId)
      .single();

    if (!document) {
      throw new Error('Document not found');
    }

    // Download file content from storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('documents')
      .download(`initial_fin_doc/${document.name}`);

    if (downloadError) {
      throw new Error('Failed to download file');
    }

    // Convert file content to text
    const text = await fileData.text();

    // Detect document type
    const documentType = await detectDocumentType(text);

    // Call API endpoint to analyze the document
    const response = await fetch('/api/analyze-document-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        documentType,
        content: text
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to analyze document');
    }

    const { analysis } = await response.json();

    // Create JSON file
    const jsonId = uuidv4();
    const jsonPath = `initial_fin_doc/json/${jsonId}.json`;
    
    // Upload JSON to storage
    await supabase.storage
      .from('documents')
      .upload(jsonPath, JSON.stringify(analysis, null, 2), {
        contentType: 'application/json',
        upsert: false
      });

    // Get JSON URL
    const { data: jsonData } = supabase.storage
      .from('documents')
      .getPublicUrl(jsonPath);

    const jsonUrl = jsonData?.publicUrl || '';

    // Update document record with JSON info
    await supabase
      .from('documents')
      .update({
        json_id: jsonId,
        json_url: jsonUrl,
        document_type: documentType
      })
      .eq('id', documentId);

    return { jsonId, jsonUrl };
  } catch (error) {
    console.error('Error analyzing document:', error);
    throw error;
  }
} 