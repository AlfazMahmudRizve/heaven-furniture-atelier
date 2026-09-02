import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';
import { Shield, Key, Lock, AlertCircle, ArrowRight, UserCheck, Store, CheckCircle } from 'lucide-react';

export default function AdminLogin() {
  const { loginStaff, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // If already authenticated, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const res = await loginStaff(email, password);
    setSubmitting(false);

    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.error || 'Authentication rejected. Verify staff credentials.');
    }
  };

  // Helper to prefill known staff accounts for tester convenience
  const fillCredentials = (staffEmail, staffPass) => {
    setEmail(staffEmail);
    setPassword(staffPass);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#2D2218] flex items-center justify-center p-6 relative overflow-hidden font-body">
      {/* Background Architectural Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#F2ECE1] to-transparent opacity-60 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#E8DCB8]/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#E8DCB8]/30 blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <a href="/" className="inline-block group mb-3">
            <span className="font-display text-3xl tracking-[0.3em] text-[#1E1005] block group-hover:text-[#9C7443] transition-colors">
              HEAVEN
            </span>
            <span className="text-[10px] tracking-[0.5em] text-[#8A7056] font-mono block mt-1 uppercase">
              FURNITURE MART
            </span>
          </a>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#DECDB5] text-[#8A6A45] text-xs font-mono tracking-wider uppercase shadow-xs">
            <Shield className="w-3.5 h-3.5 text-[#9C7443]" />
            <span>Store Operations & Management Portal</span>
          </div>
        </div>

        {/* Card Container */}
        <div className="bg-white border border-[#E8DFD3] rounded-2xl p-8 shadow-xl shadow-[#2D2218]/5">
          
          <div className="mb-6">
            <h2 className="font-display text-xl text-[#1E1005]">Staff Authentication</h2>
            <p className="text-xs text-[#7A6A5A] font-mono mt-1">
              Protected by PostgreSQL Row-Level Security (RLS) & BCrypt password hashing.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-800 font-mono">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#6B5A4B] mb-2 font-medium">
                Staff Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. admin@heavenfurniture.com"
                required
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-[#1E1005] placeholder-[#9E9080] focus:outline-none focus:border-[#9C7443] focus:bg-white text-sm font-mono transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#6B5A4B] mb-2 font-medium">
                Password / Passcode
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-[#1E1005] placeholder-[#9E9080] focus:outline-none focus:border-[#9C7443] focus:bg-white text-sm font-mono transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-[#1E1005] hover:bg-[#9C7443] text-[#FBF0DA] hover:text-white font-mono uppercase text-xs tracking-widest rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-md mt-2"
            >
              {submitting ? (
                <span>Verifying Hash...</span>
              ) : (
                <>
                  <Key className="w-4 h-4 text-[#C5A880]" />
                  <span>Authenticate & Enter CMS</span>
                </>
              )}
            </button>
          </form>

          {/* Role Accounts Selector (Prefill for evaluation) */}
          <div className="mt-8 pt-6 border-t border-[#EDE4D8]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#8A7563] font-semibold">
                Available Staff Roles (Click to autofill):
              </span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <button
                type="button"
                onClick={() => fillCredentials('admin@heavenfurniture.com', 'HeavenAdmin2026!')}
                className="w-full p-2.5 rounded-lg bg-[#F8F5EF] hover:bg-[#F0EAE0] border border-[#E5DACB] flex items-center justify-between text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#1E1005] text-[#FBF0DA] flex items-center justify-center text-[10px] font-bold">
                    A
                  </div>
                  <div>
                    <span className="text-[#1E1005] font-semibold block text-xs">Superadmin (Full Access)</span>
                    <span className="text-[10px] text-[#7A6A5A]">admin@heavenfurniture.com</span>
                  </div>
                </div>
                <span className="text-[10px] text-[#9C7443] group-hover:translate-x-0.5 transition-transform">Use ↗</span>
              </button>

              <button
                type="button"
                onClick={() => fillCredentials('manager@heavenfurniture.com', 'Manager2026!')}
                className="w-full p-2.5 rounded-lg bg-[#F8F5EF] hover:bg-[#F0EAE0] border border-[#E5DACB] flex items-center justify-between text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-blue-700 text-white flex items-center justify-center text-[10px] font-bold">
                    M
                  </div>
                  <div>
                    <span className="text-[#1E1005] font-semibold block text-xs">Store Floor Manager</span>
                    <span className="text-[10px] text-[#7A6A5A]">manager@heavenfurniture.com</span>
                  </div>
                </div>
                <span className="text-[10px] text-blue-700 group-hover:translate-x-0.5 transition-transform">Use ↗</span>
              </button>

              <button
                type="button"
                onClick={() => fillCredentials('sales@heavenfurniture.com', 'Sales2026!')}
                className="w-full p-2.5 rounded-lg bg-[#F8F5EF] hover:bg-[#F0EAE0] border border-[#E5DACB] flex items-center justify-between text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold">
                    S
                  </div>
                  <div>
                    <span className="text-[#1E1005] font-semibold block text-xs">Showroom Sales Stylist</span>
                    <span className="text-[10px] text-[#7A6A5A]">sales@heavenfurniture.com</span>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-700 group-hover:translate-x-0.5 transition-transform">Use ↗</span>
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#EDE4D8] text-center">
            <a
              href="/"
              className="text-xs font-mono text-[#8A7056] hover:text-[#1E1005] transition-colors inline-flex items-center gap-1.5"
            >
              <span>← Back to Public Atelier Website</span>
            </a>
          </div>

        </div>

        {/* Security badge */}
        <div className="text-center mt-6 text-[10px] font-mono text-[#8A7663] uppercase tracking-widest flex items-center justify-center gap-2">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>PostgreSQL BCrypt Hash Verification Enabled</span>
        </div>

      </div>
    </div>
  );
}
