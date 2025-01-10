import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { getPromptForDocumentType } from '../../lib/buildPrompt';
import { extractJsonFromOpenAI } from '../../lib/extractJsonFromOpenAI';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { documentType, content } = req.body;

    if (!documentType || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const prompt = getPromptForDocumentType(documentType, content);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a financial document analyzer. Extract structured data from financial documents into JSON format following the provided rules exactly."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.1,
      max_tokens: 10000
    });

    const jsonResponse = extractJsonFromOpenAI(completion.choices[0].message.content || '');
    const analysis = JSON.parse(jsonResponse);

    res.status(200).json({ success: true, analysis });
  } catch (error: any) {
    console.error('Error analyzing document content:', error);
    res.status(500).json({ error: error.message });
  }
} 