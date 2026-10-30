import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/services/supabaseClient';

interface AdminAuthContextType {
  isAdmin: boolean;
  adminEmail: string | null;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const LOCAL_ADMIN_KEY = 'cnd_admin_session_v1';

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      if (isSupabaseConfigured && supabase) {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          // Verify role from profiles
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.session.user.id)
            .maybeSingle();

          if (profile && (profile.role === 'admin' || profile.role === 'baker')) {
            setIsAdmin(true);
            setAdminEmail(data.session.user.email || null);
          }
        }
      } else {
        // Local mode session check
        const saved = sessionStorage.getItem(LOCAL_ADMIN_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setIsAdmin(true);
          setAdminEmail(parsed.email);
        }
      }
      setIsLoading(false);
    }
    checkAuth();
  }, []);

  const login = async (email: string, pass: string) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
      if (error) return { success: false, error: error.message };

      if (data.session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.session.user.id)
          .maybeSingle();

        if (profile && (profile.role === 'admin' || profile.role === 'baker')) {
          setIsAdmin(true);
          setAdminEmail(data.session.user.email || null);
          return { success: true };
        } else {
          await supabase.auth.signOut();
          return { success: false, error: 'Access denied: You do not have administrator permissions.' };
        }
      }
      return { success: false, error: 'Sign in failed.' };
    } else {
      // Local demo mode credentials
      // Allows development verification without cloud Supabase credentials
      if (email.toLowerCase().includes('admin') || email.toLowerCase().includes('baker') || email === 'cakesanddessert1@gmail.com') {
        const session = { email, token: 'demo_token_' + Date.now() };
        sessionStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(session));
        setIsAdmin(true);
        setAdminEmail(email);
        return { success: true };
      } else {
        return {
          success: false,
          error: 'Local Demo Mode: Enter "admin@cakesanddessert.in" or "cakesanddessert1@gmail.com" with any password.',
        };
      }
    }
  };

  const logout = () => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut();
    }
    sessionStorage.removeItem(LOCAL_ADMIN_KEY);
    setIsAdmin(false);
    setAdminEmail(null);
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin, adminEmail, login, logout, isLoading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

