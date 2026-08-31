import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [staffProfile, setStaffProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check active Supabase session or localStorage demo session
  useEffect(() => {
    async function loadSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          // Fetch staff profile from DB
          const { data: staffData } = await supabase
            .from('staff')
            .select('*')
            .eq('auth_user_id', session.user.id)
            .single();

          if (staffData) {
            setStaffProfile(staffData);
          } else {
            // Default staff profile for authenticated user
            setStaffProfile({
              name: session.user.email?.split('@')[0] || 'Staff Manager',
              email: session.user.email,
              role: 'admin',
              is_active: true,
            });
          }
        } else {
          // Check for demo session in localStorage
          const savedDemo = localStorage.getItem('hfm_admin_demo_session');
          if (savedDemo) {
            const parsed = JSON.parse(savedDemo);
            setUser({ id: 'demo-admin-id', email: parsed.email });
            setStaffProfile(parsed);
          }
        }
      } catch (err) {
        console.warn('[AdminAuth] Error checking session:', err);
      } finally {
        setLoading(false);
      }
    }

    loadSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        const { data: staffData } = await supabase
          .from('staff')
          .select('*')
          .eq('auth_user_id', session.user.id)
          .single();

        setStaffProfile(staffData || {
          name: session.user.email?.split('@')[0] || 'Staff Manager',
          email: session.user.email,
          role: 'admin',
          is_active: true,
        });
      } else {
        const savedDemo = localStorage.getItem('hfm_admin_demo_session');
        if (!savedDemo) {
          setUser(null);
          setStaffProfile(null);
        }
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const loginWithSupabase = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      localStorage.removeItem('hfm_admin_demo_session');
      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const loginWithDemoRole = (role = 'admin', name = 'Alfaz Mahmud Rizve') => {
    const demoProfile = {
      id: 'demo-staff-id',
      name,
      email: role === 'admin' ? 'admin@heavenfurniture.com' : `${role}@heavenfurniture.com`,
      role,
      phone: '+880 1960-481983',
      is_active: true,
    };
    localStorage.setItem('hfm_admin_demo_session', JSON.stringify(demoProfile));
    setUser({ id: 'demo-admin-id', email: demoProfile.email });
    setStaffProfile(demoProfile);
    return { success: true };
  };

  const logout = async () => {
    localStorage.removeItem('hfm_admin_demo_session');
    setUser(null);
    setStaffProfile(null);
    try {
      await supabase.auth.signOut();
    } catch {
      // Ignore if not logged into Supabase
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        staffProfile,
        loading,
        loginWithSupabase,
        loginWithDemoRole,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
