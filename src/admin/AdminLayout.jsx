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
  Lock,
} from 'lucide-react';

export default function AdminLayout() {
  const { staffMember, logout, isAuthenticated, hasRole } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // If not authenticated, redirect to login
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !staffMember) {
    return null;
  }

  const role = staffMember?.role || 'sales_rep';

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
      roles: ['admin', 'manager', 'sales_rep'],
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
      name: 'Clients CRM',
      path: '/admin/customers',
      icon: Users,
      roles: ['admin', 'manager', 'sales_rep'],
    },
    {
      name: 'Staff & Roles',
      path: '/admin/staff',
      icon: UserCog,
      roles: ['admin'], // Strictly Admin only!
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const getRoleBadge = () => {
    switch (role) {
      case 'admin':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1E1005] text-[#FBF0DA] text-[10px] font-mono uppercase tracking-wider font-semibold">
            <Shield className="w-3 h-3 text-[#C5A880]" /> Superadmin
          </span>
        );
      case 'manager':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-mono uppercase tracking-wider font-semibold">
            <Store className="w-3 h-3 text-blue-700" /> Store Manager
          </span>
        );
      case 'sales_rep':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono uppercase tracking-wider font-semibold">
            <UserCheck className="w-3 h-3 text-emerald-700" /> Sales Stylist
          </span>
        );
      default:
        return null;
    }
  };

  // Route-level permission guard
  const isStaffRoute = location.pathname.startsWith('/admin/staff');
  const isRestrictedFromStaff = isStaffRoute && role !== 'admin';

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#2D2218] flex flex-col lg:flex-row font-body">
      
      {/* ── SIDEBAR (DESKTOP) ── */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#E8DFD3] shrink-0 select-none shadow-xs">
        
        {/* Brand */}
        <div className="p-6 border-b border-[#E8DFD3]">
          <Link to="/admin" className="block group">
            <span className="font-display text-xl tracking-[0.25em] text-[#1E1005] block group-hover:text-[#9C7443] transition-colors">
              HAVEN
            </span>
            <span className="text-[9px] tracking-[0.35em] text-[#8A7056] font-mono block mt-1 uppercase">
              ATELIER WORKSHOP CMS
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isAllowed = item.roles.includes(role);
            const isActive =
              item.path === '/admin'
                ? location.pathname === '/admin'
                : location.pathname.startsWith(item.path);
            const Icon = item.icon;

            if (!isAllowed) {
              return (
                <div
                  key={item.path}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono text-[#A89887]/60 cursor-not-allowed opacity-60"
                  title="Requires Administrator Clearance"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-[#A89887]/60" />
                    <span>{item.name}</span>
                  </div>
                  <Lock className="w-3 h-3 text-[#A89887]/60" />
                </div>
              );
            }

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'bg-[#1E1005] text-[#FBF0DA] shadow-sm font-semibold'
                    : 'text-[#6B5C4E] hover:bg-[#F5EFEB] hover:text-[#1E1005]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C5A880]' : 'text-[#8A7563]'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded-full font-mono font-medium ${
                      isActive
                        ? 'bg-white/20 text-[#FBF0DA]'
                        : 'bg-[#F2ECE1] text-[#705026] border border-[#E0D4C3]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Card & Actions */}
        <div className="p-4 border-t border-[#E8DFD3] bg-[#FBF9F5]">
          <div className="flex items-center justify-between mb-3">
            <div className="overflow-hidden">
              <span className="text-xs font-display text-[#1E1005] block truncate font-medium">
                {staffMember?.name || 'Staff Member'}
              </span>
              <span className="text-[10px] font-mono text-[#7A6A5A] truncate block">
                {staffMember?.email}
              </span>
            </div>
            {getRoleBadge()}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#EDE4D8]">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="px-2 py-1.5 rounded-lg bg-white border border-[#DED4C5] text-[10px] font-mono text-[#6B5A4B] hover:text-[#1E1005] hover:border-[#B5A593] flex items-center justify-center gap-1 transition-colors shadow-2xs"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={handleLogout}
              className="px-2 py-1.5 rounded-lg bg-red-50 border border-red-200 text-[10px] font-mono text-red-700 hover:bg-red-100 flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <span>Logout</span>
              <LogOut className="w-3 h-3" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── MOBILE HEADER ── */}
      <header className="lg:hidden bg-white border-b border-[#E8DFD3] p-4 flex items-center justify-between sticky top-0 z-40">
        <Link to="/admin" className="block">
          <span className="font-display text-base tracking-[0.2em] text-[#1E1005]">HAVEN ATELIER CMS</span>
        </Link>
        <div className="flex items-center gap-2">
          {getRoleBadge()}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 rounded-lg bg-[#FAF8F5] border border-[#E8DFD3] text-[#1E1005]"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* ── MOBILE DRAWER ── */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-[#FBF9F5]/98 backdrop-blur-xl z-50 p-6 flex flex-col justify-between overflow-y-auto">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isAllowed = item.roles.includes(role);
              const isActive =
                item.path === '/admin'
                  ? location.pathname === '/admin'
                  : location.pathname.startsWith(item.path);
              const Icon = item.icon;

              if (!isAllowed) return null;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center justify-between p-3.5 rounded-xl text-sm font-mono tracking-wider ${
                    isActive
                      ? 'bg-[#1E1005] text-[#FBF0DA] font-semibold'
                      : 'text-[#6B5C4E] hover:bg-[#F2ECE1]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#C5A880]' : 'text-[#8A7563]'}`} />
                    <span>{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-[#E8DFD3] flex items-center justify-between">
            <a href="/" className="text-xs font-mono text-[#8A7056] flex items-center gap-1">
              <span>View Atelier</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={handleLogout}
              className="text-xs font-mono text-red-600 flex items-center gap-1"
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
        <div className="bg-white/80 backdrop-blur-md border-b border-[#E8DFD3] px-6 py-3.5 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8A7563]">
              Atelier Management
            </span>
            <span className="text-[#D6CBBC]">/</span>
            <span className="text-xs font-mono text-[#1E1005] capitalize font-medium">
              {location.pathname.replace('/admin', '').replace('/', '') || 'Overview'}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-mono text-[#8A7563]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Encrypted Cloud Database</span>
            </div>
            <div className="text-xs font-mono text-[#7A6A5A]">
              Role: <strong className="text-[#1E1005] capitalize">{role.replace('_', ' ')}</strong>
            </div>
          </div>
        </div>

        {/* Access Denied Shield for Unauthorized Sub-Routes */}
        {isRestrictedFromStaff ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="max-w-md w-full bg-white border border-red-200 rounded-2xl p-8 text-center shadow-lg">
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 mx-auto flex items-center justify-center mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="font-display text-xl text-[#1E1005] mb-2">Access Denied (403)</h2>
              <p className="text-xs font-mono text-[#7A6A5A] leading-relaxed mb-6">
                The Staff & Permissions directory requires <strong>Superadmin</strong> clearance. Your current role is <span className="text-red-700 font-semibold">{role.replace('_', ' ')}</span>.
              </p>
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1E1005] text-[#FBF0DA] text-xs font-mono uppercase tracking-wider rounded-xl hover:bg-[#9C7443] transition-colors"
              >
                Return to Overview
              </Link>
            </div>
          </div>
        ) : (
          /* Nested Page Content */
          <div className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </div>
        )}

      </main>

    </div>
  );
}
