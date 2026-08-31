import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  MessageSquareCode,
  Users,
  UserCog,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Shield,
  Store,
  UserCheck,
  CheckCircle2,
} from 'lucide-react';

export default function AdminLayout() {
  const { user, staffProfile, logout, isAuthenticated } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // If not authenticated, redirect to login
  if (!isAuthenticated && !user) {
    navigate('/admin/login');
    return null;
  }

  const role = staffProfile?.role || 'admin';

  const navItems = [
    {
      name: 'Overview',
      path: '/admin',
      icon: LayoutDashboard,
      roles: ['admin', 'manager', 'sales_rep'],
    },
    {
      name: 'Product Inventory',
      path: '/admin/products',
      icon: Package,
      roles: ['admin', 'manager'],
      badge: '16 Items',
    },
    {
      name: 'Orders & Payments',
      path: '/admin/orders',
      icon: ShoppingBag,
      roles: ['admin', 'manager', 'sales_rep'],
    },
    {
      name: 'Bespoke Inquiries',
      path: '/admin/inquiries',
      icon: MessageSquareCode,
      roles: ['admin', 'manager', 'sales_rep'],
      badge: 'Live',
    },
    {
      name: 'Customers (CRM)',
      path: '/admin/customers',
      icon: Users,
      roles: ['admin', 'manager', 'sales_rep'],
    },
    {
      name: 'Staff & Roles',
      path: '/admin/staff',
      icon: UserCog,
      roles: ['admin'],
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const getRoleBadge = () => {
    switch (role) {
      case 'admin':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-bronze/20 text-bronze border border-bronze/30 text-[10px] font-mono uppercase tracking-wider">
            <Shield className="w-3 h-3" /> Admin (Full)
          </span>
        );
      case 'manager':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-mono uppercase tracking-wider">
            <Store className="w-3 h-3" /> Store Manager
          </span>
        );
      case 'sales_rep':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono uppercase tracking-wider">
            <UserCheck className="w-3 h-3" /> Sales Rep
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-espresso text-linen flex flex-col lg:flex-row">
      
      {/* ── SIDEBAR (DESKTOP) ── */}
      <aside className="hidden lg:flex flex-col w-64 bg-surface border-r border-bronze/15 shrink-0 select-none">
        
        {/* Brand */}
        <div className="p-6 border-b border-bronze/10">
          <Link to="/admin" className="block group">
            <span className="font-display text-xl tracking-[0.25em] text-linen block group-hover:text-bronze transition-colors">
              HEAVEN
            </span>
            <span className="text-[9px] tracking-[0.4em] text-bronze-light font-mono block mt-1 uppercase">
              STORE MANAGER CMS
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems
            .filter((item) => item.roles.includes(role))
            .map((item) => {
              const isActive =
                item.path === '/admin'
                  ? location.pathname === '/admin'
                  : location.pathname.startsWith(item.path);
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-bronze text-linen shadow-md font-semibold'
                      : 'text-linen-muted hover:bg-surface-elevated hover:text-linen'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-linen' : 'text-bronze'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full font-mono ${
                        isActive
                          ? 'bg-espresso/40 text-linen'
                          : 'bg-surface-elevated text-bronze-light border border-bronze/20'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
        </nav>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-bronze/10 bg-surface-elevated/40">
          <div className="flex items-center justify-between mb-3">
            <div className="overflow-hidden">
              <span className="text-xs font-display text-linen block truncate">
                {staffProfile?.name || 'Staff User'}
              </span>
              <span className="text-[10px] font-mono text-linen-muted truncate block">
                {staffProfile?.email}
              </span>
            </div>
            {getRoleBadge()}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-bronze/10">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="px-2 py-1.5 rounded bg-surface border border-bronze/20 text-[10px] font-mono text-linen-muted hover:text-linen flex items-center justify-center gap-1 transition-colors"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={handleLogout}
              className="px-2 py-1.5 rounded bg-red-950/40 border border-red-900/30 text-[10px] font-mono text-red-300 hover:bg-red-900/60 flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <span>Logout</span>
              <LogOut className="w-3 h-3" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── MOBILE HEADER ── */}
      <header className="lg:hidden bg-surface border-b border-bronze/15 p-4 flex items-center justify-between sticky top-0 z-40">
        <Link to="/admin" className="block">
          <span className="font-display text-base tracking-[0.2em] text-linen">HEAVEN CMS</span>
        </Link>
        <div className="flex items-center gap-2">
          {getRoleBadge()}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 rounded bg-surface-elevated text-linen"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* ── MOBILE DRAWER ── */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-espresso/95 backdrop-blur-xl z-50 p-6 flex flex-col justify-between overflow-y-auto">
          <nav className="space-y-2">
            {navItems
              .filter((item) => item.roles.includes(role))
              .map((item) => {
                const isActive =
                  item.path === '/admin'
                    ? location.pathname === '/admin'
                    : location.pathname.startsWith(item.path);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center justify-between p-3.5 rounded-lg text-sm font-mono tracking-wider ${
                      isActive
                        ? 'bg-bronze text-linen font-semibold'
                        : 'text-linen-muted hover:bg-surface-elevated'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-bronze" />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                );
              })}
          </nav>

          <div className="pt-6 border-t border-bronze/15 flex items-center justify-between">
            <a href="/" className="text-xs font-mono text-bronze flex items-center gap-1">
              <span>View Public Atelier</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={handleLogout}
              className="text-xs font-mono text-red-400 flex items-center gap-1"
            >
              <span>Logout</span>
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top bar with quick status */}
        <div className="bg-surface/60 border-b border-bronze/10 px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-linen-muted">
              Atelier Management Console
            </span>
            <span className="text-bronze/40">/</span>
            <span className="text-xs font-mono text-bronze capitalize">
              {location.pathname.replace('/admin', '').replace('/', '') || 'Overview'}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/30 px-2.5 py-1 rounded-full">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Supabase DB (Tokyo) Connected</span>
            </div>
          </div>
        </div>

        {/* Nested Page Content */}
        <div className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </div>

      </main>

    </div>
  );
}
