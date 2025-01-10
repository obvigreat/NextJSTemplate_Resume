// pages/api/analyze-document.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';
import formidable from 'formidable';
import * as fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Parse the multipart form data
    const form = formidable({});
    const [_, files] = await form.parse(req);
    
    const file = files.file?.[0];
    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // Check if file already exists in database by name
    const { data: existingDoc } = await supabase
      .from('documents')
      .select('id, name')
      .eq('name', file.originalFilename)
      .maybeSingle();

    if (existingDoc) {
      // If file exists, return existing document info
      return res.status(200).json({
        success: true,
        exists: true,
        document: {
          id: existingDoc.id,
          name: existingDoc.name
        }
      });
    }

    // If file doesn't exist, proceed with upload
    const filePath = `initial_fin_doc/${file.originalFilename}`;
    const fileContent = await fs.readFile(file.filepath);

    // Upload to Supabase Storage
    await supabase.storage
      .from('documents')
      .upload(filePath, fileContent, {
        upsert: false, // Don't overwrite if exists
        contentType: file.mimetype || undefined,
      });

    // Get public URL
    const { data: publicData } = supabase.storage
      .from('documents')
      .getPublicUrl(filePath);

    // Create new database entry
    const { data: documentData } = await supabase
      .from('documents')
      .insert({
        name: file.originalFilename,
        url: publicData?.publicUrl || '',
        file_type: file.mimetype || 'unknown',
        file_extension: file.originalFilename?.split('.').pop()?.toLowerCase() || '',
        confidence_score: 1.0,
        created_at: new Date().toISOString(),
      })
      .select('id, name')
      .single();

    return res.status(200).json({
      success: true,
      exists: false,
      document: {
        id: documentData?.id,
        name: documentData?.name,
      }
    });

  } catch (error: any) {
    console.error('Error in analyze-document:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}
