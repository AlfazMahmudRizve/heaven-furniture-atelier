import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [staffMember, setStaffMember] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize from persisted secure session
  useEffect(() => {
    try {
      const stored = localStorage.getItem('hfm_authenticated_staff');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.id && parsed.role) {
          setStaffMember(parsed);
        }
      }
    } catch (e) {
      console.error('[AdminAuth] Failed to load session', e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Secure staff authentication via Supabase stored procedure
  const loginStaff = async (email, password) => {
    setLoading(true);
    try {
      if (!email || !password) {
        return { success: false, error: 'Please provide both email and password.' };
      }

      // Call the authenticate_staff RPC function in PostgreSQL
      const { data, error } = await supabase.rpc('authenticate_staff', {
        p_email: email.trim().toLowerCase(),
        p_password: password,
      });

      if (error) {
        console.error('[AdminAuth] RPC Error:', error);
        return { success: false, error: error.message || 'Authentication query failed.' };
      }

      if (!data || data.length === 0) {
        return { success: false, error: 'Invalid staff credentials. Access denied.' };
      }

      const user = data[0];
      if (!user.is_active) {
        return { success: false, error: 'Staff account is deactivated. Contact administrator.' };
      }

      const sessionObj = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role, // 'admin' | 'manager' | 'sales_rep'
        phone: user.phone,
        authenticated_at: new Date().toISOString(),
      };

      localStorage.setItem('hfm_authenticated_staff', JSON.stringify(sessionObj));
      setStaffMember(sessionObj);
      return { success: true, user: sessionObj };
    } catch (err) {
      console.error('[AdminAuth] Unexpected error:', err);
      return { success: false, error: err.message || 'Unexpected login error.' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('hfm_authenticated_staff');
    setStaffMember(null);
  };

  // Helper permission checkers
  const hasRole = (allowedRoles = []) => {
    if (!staffMember) return false;
    if (staffMember.role === 'admin') return true; // Superadmin has all access
    return allowedRoles.includes(staffMember.role);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        staffMember,
        staffProfile: staffMember, // Alias for backward compatibility
        loading,
        isAuthenticated: !!staffMember,
        role: staffMember?.role,
        loginStaff,
        logout,
        hasRole,
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
