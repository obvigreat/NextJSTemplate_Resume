import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { DOCUMENT_PROMPTS } from '../../lib/prompts';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const DETECTION_PROMPT = `You are a financial document classifier. Analyze the given document content and determine its type.
Return ONLY ONE of these exact types: INCOME_STATEMENT, BALANCE_SHEET, CASH_FLOW, FDD, STATEMENT_OF_SHAREHOLDERS_EQUITY

Rules:
1. Return ONLY the type, no explanation
2. Be case sensitive
3. If unsure, default to INCOME_STATEMENT
4. NO additional text or formatting

Document content to analyze:`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Missing content' });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: DETECTION_PROMPT
        },
        {
          role: "user",
          content
        }
      ],
      temperature: 0.1,
      max_tokens: 50
    });

    const documentType = completion.choices[0].message.content?.trim() as keyof typeof DOCUMENT_PROMPTS;
    
    // Validate the response is one of our expected types
    if (!DOCUMENT_PROMPTS[documentType]) {
      console.warn('OpenAI returned invalid document type:', documentType);
      return res.status(200).json({ documentType: 'INCOME_STATEMENT' });
    }

    res.status(200).json({ documentType });
  } catch (error: any) {
    console.error('Error detecting document type:', error);
    res.status(500).json({ error: error.message });
  }
} 