
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://srjubuowjwtksrvzrtht.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyanVidW93and0a3NydnpydGh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMDU1MTUsImV4cCI6MjA2MDU4MTUxNX0.oMyzUp9dck9cch7wmZMgwPsrUWpbSihpulejcWgHZs0";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
