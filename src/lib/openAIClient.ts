// src/lib/openAIClient.ts
import OpenAI from 'openai';

/**
 * 2. OPENAI API KEY
 * Make sure to set:
 *    OPENAI_API_KEY
 */
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

if (!OPENAI_API_KEY) {
  throw new Error('Missing required environment variable: OPENAI_API_KEY');
}

/**
 * Initialize OpenAI client
 */
export const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
