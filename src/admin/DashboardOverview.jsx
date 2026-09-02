import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAdminAuth } from './AdminAuthContext';
import {
  TrendingUp,
  ShoppingBag,
  Package,
  MessageSquareCode,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  Plus,
  ArrowRight,
  Sparkles,
  DollarSign,
  CheckCircle2,
} from 'lucide-react';

export default function DashboardOverview() {
  const { role } = useAdminAuth();
  const [stats, setStats] = useState({
    totalProducts: 16,
    activeOrders: 0,
    totalRevenue: 0,
    newInquiries: 0,
    lowStockCount: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);

        // Fetch products
        const { data: products } = await supabase
          .from('products')
          .select('id, name, price_bdt, stock_quantity, status, timber_type');

        // Fetch orders
        const { data: orders } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        // Fetch inquiries
        const { data: inquiries } = await supabase
          .from('bespoke_inquiries')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        if (products) {
          const lowStock = products.filter((p) => p.stock_quantity <= 2 && p.status === 'active');
          setLowStockProducts(lowStock);
          setStats((prev) => ({
            ...prev,
            totalProducts: products.length,
            lowStockCount: lowStock.length,
          }));
        }

        if (orders) {
          setRecentOrders(orders);
          const revenue = orders.reduce((sum, o) => sum + (Number(o.total_bdt) || 0), 0);
          setStats((prev) => ({
            ...prev,
            activeOrders: orders.filter((o) => !['delivered', 'cancelled'].includes(o.status)).length,
            totalRevenue: revenue,
          }));
        }

        if (inquiries) {
          setRecentInquiries(inquiries);
          setStats((prev) => ({
            ...prev,
            newInquiries: inquiries.filter((i) => i.status === 'new').length,
          }));
        }
      } catch (err) {
        console.warn('[DashboardOverview] Error loading data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-[#1E1005]">
            Store Performance & Overview
          </h1>
          <p className="text-xs font-mono text-[#7A6A5A] mt-1">
            Real-time analytics for Agrabad Atelier showroom, timber inventory, and online commissions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {role !== 'sales_rep' && (
            <Link
              to="/admin/products"
              className="px-4 py-2.5 bg-white border border-[#DED4C5] hover:border-[#9C7443] rounded-xl text-xs font-mono text-[#2D2218] flex items-center gap-2 transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5 text-[#9C7443]" />
              <span>Add Piece</span>
            </Link>
          )}
          <Link
            to="/admin/orders"
            className="px-4 py-2.5 bg-[#1E1005] hover:bg-[#9C7443] text-[#FBF0DA] hover:text-white rounded-xl text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-2 transition-colors shadow-md"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Manage Orders</span>
          </Link>
        </div>
      </div>

      {/* ── STAT METRICS GRID ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Total Catalog Items */}
        <div className="bg-white border border-[#E8DFD3] rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A6A5A]">
              Live Catalog
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#F5EFEB] text-[#705026] flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-display text-3xl text-[#1E1005]">{stats.totalProducts}</span>
            <span className="text-[11px] font-mono text-emerald-700 font-medium ml-2">16 Active</span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[10px] font-mono text-[#8A7563]">
            <span>5 Handcrafted Suites</span>
          </div>
        </div>

        {/* Metric 2: Active Orders */}
        <div className="bg-white border border-[#E8DFD3] rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A6A5A]">
              Active Orders
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-display text-3xl text-[#1E1005]">{stats.activeOrders}</span>
            <span className="text-[11px] font-mono text-blue-700 font-medium ml-2">Pipeline</span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[10px] font-mono text-[#8A7563]">
            <span>In production & dispatch</span>
          </div>
        </div>

        {/* Metric 3: Bespoke Inquiries */}
        <div className="bg-white border border-[#E8DFD3] rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A6A5A]">
              Bespoke Leads
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <MessageSquareCode className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-display text-3xl text-[#1E1005]">{stats.newInquiries}</span>
            <span className="text-[11px] font-mono text-purple-700 font-medium ml-2">New Web Leads</span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[10px] font-mono text-[#8A7563]">
            <span>From 3D Configurator</span>
          </div>
        </div>

        {/* Metric 4: Low Stock Alert */}
        <div className="bg-white border border-[#E8DFD3] rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A6A5A]">
              Stock Warnings
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-display text-3xl text-[#1E1005]">{stats.lowStockCount}</span>
            <span className="text-[11px] font-mono text-amber-700 font-medium ml-2">&le; 2 Units</span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[10px] font-mono text-[#8A7563]">
            <span>Burma Teak & Mahogany stock</span>
          </div>
        </div>

      </div>

      {/* ── TWO-COLUMN OPERATIONAL SUMMARY ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col: Recent Bespoke Inquiries Funnel */}
        <div className="lg:col-span-7 bg-white border border-[#E8DFD3] rounded-2xl p-6 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#9C7443]" />
                <h3 className="font-display text-lg text-[#1E1005]">
                  Bespoke Configurator Inquiries
                </h3>
              </div>
              <Link
                to="/admin/inquiries"
                className="text-xs font-mono text-[#9C7443] hover:text-[#1E1005] transition-colors flex items-center gap-1 font-medium"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {recentInquiries.length === 0 ? (
              <div className="py-12 text-center text-[#8A7563] border border-dashed border-[#E8DFD3] rounded-xl bg-[#FBF9F5]">
                <MessageSquareCode className="w-8 h-8 mx-auto mb-2 text-[#C5A880]" />
                <p className="text-xs font-mono">No new web customizer submissions yet.</p>
                <p className="text-[10px] text-[#A89887] mt-1">
                  Submissions from the public Bespoke Studio will appear here live.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-3.5 rounded-xl bg-[#FBF9F5] border border-[#EDE4D8] flex items-center justify-between"
                  >
                    <div>
                      <span className="font-display text-sm text-[#1E1005] block font-medium">
                        {inq.customer_name || 'Website Client'}
                      </span>
                      <span className="text-[11px] font-mono text-[#8A7056]">
                        {inq.room_type} · {inq.timber_choice} · {inq.dimensions}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-[#F2ECE1] text-[#705026] font-medium border border-[#E0D4C3]">
                        {inq.status}
                      </span>
                      <Link
                        to="/admin/inquiries"
                        className="text-xs font-mono text-[#6B5C4E] hover:text-[#1E1005]"
                      >
                        Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-[#EDE4D8] flex items-center justify-between text-xs font-mono text-[#7A6A5A]">
            <span>Direct WhatsApp Lead Synchronization</span>
            <span className="text-emerald-700 font-medium">● Connected</span>
          </div>
        </div>

        {/* Right Col: Low Stock & Timber Inventory Status */}
        <div className="lg:col-span-5 bg-white border border-[#E8DFD3] rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h3 className="font-display text-lg text-[#1E1005]">Inventory Alerts</h3>
            </div>
            <Link
              to="/admin/products"
              className="text-xs font-mono text-[#9C7443] hover:text-[#1E1005] transition-colors font-medium"
            >
              Catalog →
            </Link>
          </div>

          <div className="space-y-3">
            {lowStockProducts.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/80 flex items-center justify-between"
              >
                <div>
                  <span className="font-display text-xs text-[#1E1005] block font-medium">{product.name}</span>
                  <span className="text-[10px] font-mono text-[#7A6A5A]">
                    {product.timber_type} · ৳{Number(product.price_bdt).toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                  {product.stock_quantity} left
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[#EDE4D8]">
            <span className="block text-[11px] font-mono uppercase tracking-wider text-[#8A7056] mb-2 font-medium">
              Timber Heartwood Seasoning Stocks
            </span>
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
              <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#EAE2D5] text-[#6B5A4B]">
                Burma Teak: <span className="text-emerald-700 font-semibold">10-12% Kiln Ready</span>
              </div>
              <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#EAE2D5] text-[#6B5A4B]">
                Red Mahogany: <span className="text-emerald-700 font-semibold">Moisture Certified</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
