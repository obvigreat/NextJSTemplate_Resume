// pages/api/analyze-document.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Only allow POST
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    /**
     * We expect a JSON body like:
     * {
     *   "fileName": "MyDocument.csv",
     *   "fileType": "text/csv" or "application/pdf", etc.
     *   "fileBase64": "base64-encoded-file-content"
     * }
     *
     * Adjust if you're using multipart/form-data instead of raw JSON.
     */
    const { fileName, fileType, fileBase64 } = req.body || {};
    if (!fileName || !fileType || !fileBase64) {
      return res.status(400).json({
        error: 'Missing required fields: fileName, fileType, fileBase64',
      });
    }

    // Convert base64 to a Buffer
    const fileBuffer = Buffer.from(fileBase64, 'base64');

    // Define the path in your Supabase bucket
    const filePath = `initial_fin_doc/${fileName}`;
    console.log(`Uploading file to: ${filePath}`);

    // Attempt to upload the file
    const { error: uploadError } = await supabase.storage
      .from('documents') // name of your storage bucket
      .upload(filePath, fileBuffer, {
        upsert: true,
        contentType: fileType,
      });

    if (uploadError) {
      throw new Error(`Failed to upload file to Supabase: ${uploadError.message}`);
    }

    // Generate a public URL for the uploaded file
    const { data: publicData } = supabase.storage
      .from('documents')
      .getPublicUrl(filePath);

    const publicUrl = publicData?.publicUrl;
    if (!publicUrl) {
      throw new Error('Could not generate a public URL for the uploaded file.');
    }

    console.log('File successfully uploaded. Public URL:', publicUrl);

    // Respond with success
    return res.status(200).json({
      success: true,
      message: 'File uploaded to Supabase successfully.',
      fileName,
      filePath,
      publicUrl,
    });
  } catch (error: any) {
    console.error('Error in analyze-document:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}
