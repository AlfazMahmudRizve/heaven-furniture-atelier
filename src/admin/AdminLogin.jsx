import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';
import { Shield, Key, Sparkles, UserCheck, ArrowRight, Store, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const { loginWithSupabase, loginWithDemoRole } = useAdminAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState('quick'); // 'quick' or 'supabase'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSupabaseSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const res = await loginWithSupabase(email, password);
    setSubmitting(false);

    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.error || 'Authentication failed. Please check credentials or use Quick Access.');
    }
  };

  const handleQuickLogin = (role, name) => {
    loginWithDemoRole(role, name);
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-espresso text-linen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-bronze/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-bronze/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <a href="/" className="inline-block group mb-4">
            <span className="font-display text-3xl tracking-[0.3em] text-linen block group-hover:text-bronze transition-colors">
              HEAVEN
            </span>
            <span className="text-[10px] tracking-[0.5em] text-bronze-light font-mono block mt-1 uppercase">
              FURNITURE MART
            </span>
          </a>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-bronze/20 text-bronze text-xs font-mono tracking-widest uppercase">
            <Shield className="w-3.5 h-3.5" />
            <span>Store Manager CMS Portal</span>
          </div>
        </div>

        {/* Card Container */}
        <div className="bg-surface/90 backdrop-blur-xl border border-bronze/20 rounded-xl p-8 shadow-2xl">
          
          {/* Mode Switcher */}
          <div className="grid grid-cols-2 gap-2 bg-espresso p-1 rounded-lg mb-6 border border-bronze/10">
            <button
              onClick={() => setMode('quick')}
              className={`py-2 text-xs font-mono uppercase tracking-wider rounded-md transition-all ${
                mode === 'quick'
                  ? 'bg-bronze text-linen shadow-md'
                  : 'text-linen-muted hover:text-linen'
              }`}
            >
              1-Click Roles
            </button>
            <button
              onClick={() => setMode('supabase')}
              className={`py-2 text-xs font-mono uppercase tracking-wider rounded-md transition-all ${
                mode === 'supabase'
                  ? 'bg-bronze text-linen shadow-md'
                  : 'text-linen-muted hover:text-linen'
              }`}
            >
              Supabase Auth
            </button>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-950/50 border border-red-800/40 rounded-lg flex items-center gap-2 text-xs text-red-200">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {mode === 'quick' ? (
            <div className="space-y-3">
              <p className="text-xs text-linen-muted mb-4 font-body leading-relaxed text-center">
                Select a staff role to instantly open the management console with that role's permissions:
              </p>

              <button
                onClick={() => handleQuickLogin('admin', 'Alfaz Mahmud Rizve')}
                className="w-full p-4 rounded-lg bg-surface-elevated border border-bronze/30 hover:border-bronze hover:bg-surface-elevated/80 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="w-9 h-9 rounded-full bg-bronze/20 text-bronze flex items-center justify-center font-bold">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-display text-sm text-linen block group-hover:text-bronze transition-colors">
                      Store Owner / Admin
                    </span>
                    <span className="text-[10px] font-mono text-linen-muted uppercase tracking-wider block">
                      Full Access · Inventory, Orders, Financials & Staff
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-bronze group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleQuickLogin('manager', 'Agrabad Store Manager')}
                className="w-full p-4 rounded-lg bg-surface-elevated border border-bronze/20 hover:border-bronze hover:bg-surface-elevated/80 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="w-9 h-9 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                    <Store className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-display text-sm text-linen block group-hover:text-bronze transition-colors">
                      Floor Store Manager
                    </span>
                    <span className="text-[10px] font-mono text-linen-muted uppercase tracking-wider block">
                      Catalog, Stock Updates & Delivery Dispatch
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-bronze group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleQuickLogin('sales_rep', 'Showroom Sales Rep')}
                className="w-full p-4 rounded-lg bg-surface-elevated border border-bronze/20 hover:border-bronze hover:bg-surface-elevated/80 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-display text-sm text-linen block group-hover:text-bronze transition-colors">
                      Sales & Customizer Concierge
                    </span>
                    <span className="text-[10px] font-mono text-linen-muted uppercase tracking-wider block">
                      Bespoke Leads, WhatsApp Inquiries & New Orders
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-bronze group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSupabaseSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-linen-muted mb-2">
                  Staff Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="manager@heavenfurniture.com"
                  required
                  className="w-full px-4 py-3 bg-espresso border border-bronze/20 rounded-lg text-linen placeholder-linen-muted/40 focus:outline-none focus:border-bronze text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-linen-muted mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full px-4 py-3 bg-espresso border border-bronze/20 rounded-lg text-linen placeholder-linen-muted/40 focus:outline-none focus:border-bronze text-sm font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-bronze text-linen font-mono uppercase text-xs tracking-widest rounded-lg font-semibold hover:bg-bronze-light hover:text-espresso transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                {submitting ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <Key className="w-4 h-4" />
                    <span>Sign In to Dashboard</span>
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-bronze/10 text-center">
            <a
              href="/"
              className="text-xs font-mono text-bronze hover:text-linen transition-colors inline-flex items-center gap-1.5"
            >
              <span>← Return to Public Atelier Website</span>
            </a>
          </div>

        </div>

        {/* Footer info */}
        <div className="text-center mt-6 text-[10px] font-mono text-linen-muted/50 uppercase tracking-widest">
          <span>Connected to Supabase PostgreSQL (Tokyo Node) · RLS Secured</span>
        </div>

      </div>
    </div>
  );
}
