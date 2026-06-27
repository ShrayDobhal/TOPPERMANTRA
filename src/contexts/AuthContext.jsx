import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMockMode, setIsMockMode] = useState(false);

  useEffect(() => {
    // Check if we are running in mock mode because keys are missing
    if (!import.meta.env.VITE_SUPABASE_URL) {
      setIsMockMode(true);
      // Simulate a logged-in user so the UI works on localhost without keys
      setUser({ id: "mock_user", email: "test@example.com" });
      setSession({ access_token: "mock_token" });
      setLoading(false);
      return;
    }

    // Normal Supabase Auth Flow
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Helper function mimicking Clerk's getToken
  const getToken = async () => {
    if (isMockMode) return "mock_token";
    return session?.access_token || null;
  };

  const value = {
    user,
    session,
    loading,
    isMockMode,
    getToken,
    signOut: () => supabase.auth.signOut(),
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Hook to mimic Clerk's useUser and useAuth
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useUser() {
  const { user, isMockMode } = useAuth();
  return { user, isLoaded: true, isSignedIn: !!user, isMockMode };
}
