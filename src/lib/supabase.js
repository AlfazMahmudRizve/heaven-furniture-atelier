import { createClient } from '@supabase/supabase-js';

// Fallback to production credentials so Vercel builds & previews work out-of-the-box
const DEFAULT_SUPABASE_URL = 'https://jyyqddhjgkqlccodnxlb.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5eXFkZGhqZ2txbGNjb2RueGxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2ODMxNDIsImV4cCI6MjA4NzI1OTE0Mn0.qiqZ7qS4jRZ4U2tBf7EaEx1xbXyMhG31VFBVAfL911Y';

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
