import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn("⚠️ Supabase environment variables are missing! Using mock auth mode.");
  
  // Mock client to prevent crashes when developing UI without API keys
  supabase = {
    auth: {
      signInWithPassword: async () => ({ data: { user: { id: "mock_user", email: "test@example.com" }, session: { access_token: "mock_token" } }, error: null }),
      signUp: async () => ({ data: { user: { id: "mock_user", email: "test@example.com" } }, error: null }),
      signOut: async () => ({ error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: () => ({
      select: async () => ({ data: [], error: null }),
      insert: async () => ({ data: [], error: null }),
      update: async () => ({ data: [], error: null }),
      delete: async () => ({ data: [], error: null }),
    })
  };
}

export { supabase };
