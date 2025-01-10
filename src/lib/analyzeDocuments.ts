import { supabase } from './supabaseClient';
import { detectDocumentType } from './detectDocumentType';
import { v4 as uuidv4 } from 'uuid';

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

    // Download file content from storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('documents')
      .download(`initial_fin_doc/${document.name}`);

    if (downloadError) {
      console.error('Error downloading file:', downloadError);
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
    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(jsonPath, JSON.stringify(analysis, null, 2), {
        contentType: 'application/json',
        upsert: false
      });

    if (uploadError) {
      console.error('Error uploading JSON:', uploadError);
      throw new Error('Failed to upload JSON file');
    }

    // Get JSON URL
    const { data: jsonData } = await supabase.storage
      .from('documents')
      .getPublicUrl(jsonPath);

    const jsonUrl = jsonData?.publicUrl || '';

    // First try to update without status
    const { error: updateError } = await supabase
      .from('documents')
      .update({
        json_id: jsonId,
        json_url: jsonUrl,
        document_type: documentType
      })
      .eq('id', documentId);

    if (updateError) {
      console.error('Error updating document record:', updateError);
      // If the first update fails, try without document_type
      const { error: retryError } = await supabase
        .from('documents')
        .update({
          json_id: jsonId,
          json_url: jsonUrl
        })
        .eq('id', documentId);

      if (retryError) {
        console.error('Error on retry update:', retryError);
        throw new Error('Failed to update document record');
      }
    }

    // Verify the update
    const { data: verifyData, error: verifyError } = await supabase
      .from('documents')
      .select('json_id, json_url')
      .eq('id', documentId)
      .single();

    if (verifyError) {
      console.error('Error verifying update:', verifyError);
      throw new Error('Failed to verify document update');
    }

    if (!verifyData?.json_id || !verifyData?.json_url) {
      console.error('Update verification failed: missing fields');
      throw new Error('Failed to verify document update - missing fields');
    }

    return { jsonId, jsonUrl };
  } catch (error) {
    console.error('Error analyzing document:', error);
    throw error;
  }
} 