import { NextApiRequest, NextApiResponse } from 'next';
import { openai, supabase, replitDb } from '../../lib/config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Example OpenAI API call
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: "Hello!" }],
      model: "gpt-3.5-turbo",
    });

    // Example Supabase query
    const { data: supabaseData, error: supabaseError } = await supabase
      .from('your_table')
      .select('*')
      .limit(1);

    if (supabaseError) {
      throw supabaseError;
    }

    // Example Replit DB operation
    await replitDb.set('test_key', 'test_value');
    const value = await replitDb.get('test_key');

    return res.status(200).json({
      openAiResponse: completion.choices[0].message,
      supabaseData,
      replitDbValue: value,
    });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
} 