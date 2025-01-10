import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import Client from '@replit/database';

// Helper function to get environment variables
const getEnvVar = (key: string): string => {
  if (typeof process.env[key] === 'undefined') {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return process.env[key] as string;
};

// OpenAI configuration
export const openai = new OpenAI({
  apiKey: getEnvVar('OPENAI_API_KEY'),
});

// Supabase configuration
export const supabase = createClient(
  getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
  getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY')
);

// Replit Database configuration
export const replitDb = new Client(); 