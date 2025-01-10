import { createClient } from '@supabase/supabase-js';
import { environment } from './environment';

export const supabase = createClient(
  environment.supabase.url || '',
  environment.supabase.anonKey || ''
);
