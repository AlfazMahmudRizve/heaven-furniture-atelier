import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
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
          <h1 className="font-display text-2xl md:text-3xl text-linen">
            Store Performance & Operations
          </h1>
          <p className="text-xs font-mono text-linen-muted mt-1">
            Real-time telemetry for Agrabad Atelier showroom & online orders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="px-4 py-2.5 bg-surface border border-bronze/30 hover:border-bronze rounded-lg text-xs font-mono text-linen flex items-center gap-2 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-bronze" />
            <span>Add Product</span>
          </Link>
          <Link
            to="/admin/orders"
            className="px-4 py-2.5 bg-bronze hover:bg-bronze-light text-linen hover:text-espresso rounded-lg text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-2 transition-colors shadow-lg"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Manage Orders</span>
          </Link>
        </div>
      </div>

      {/* ── STAT METRICS GRID ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Total Catalog Items */}
        <div className="bg-surface border border-bronze/15 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-linen-muted">
              Live Catalog
            </span>
            <div className="w-8 h-8 rounded-lg bg-bronze/15 text-bronze flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-display text-3xl text-linen">{stats.totalProducts}</span>
            <span className="text-[11px] font-mono text-emerald-400 ml-2">16 Active</span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[10px] font-mono text-linen-muted/70">
            <span>5 Heirloom Categories</span>
          </div>
        </div>

        {/* Metric 2: Active Orders */}
        <div className="bg-surface border border-bronze/15 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-linen-muted">
              Active Orders
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-display text-3xl text-linen">{stats.activeOrders}</span>
            <span className="text-[11px] font-mono text-blue-400 ml-2">Pipeline</span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[10px] font-mono text-linen-muted/70">
            <span>In production & dispatch</span>
          </div>
        </div>

        {/* Metric 3: Bespoke Inquiries */}
        <div className="bg-surface border border-bronze/15 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-linen-muted">
              Bespoke Leads
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center">
              <MessageSquareCode className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-display text-3xl text-linen">{stats.newInquiries}</span>
            <span className="text-[11px] font-mono text-purple-400 ml-2">New Web Submissions</span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[10px] font-mono text-linen-muted/70">
            <span>From 3D Configurator</span>
          </div>
        </div>

        {/* Metric 4: Low Stock Alert */}
        <div className="bg-surface border border-bronze/15 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-linen-muted">
              Stock Warnings
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-display text-3xl text-linen">{stats.lowStockCount}</span>
            <span className="text-[11px] font-mono text-amber-400 ml-2">&le; 2 Units</span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[10px] font-mono text-linen-muted/70">
            <span>Burma Teak & Mahogany stock</span>
          </div>
        </div>

      </div>

      {/* ── TWO-COLUMN OPERATIONAL SUMMARY ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col: Recent Bespoke Inquiries Funnel */}
        <div className="lg:col-span-7 bg-surface border border-bronze/15 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-bronze" />
                <h3 className="font-display text-lg text-linen">
                  Live Bespoke Configurator Inquiries
                </h3>
              </div>
              <Link
                to="/admin/inquiries"
                className="text-xs font-mono text-bronze hover:text-linen transition-colors flex items-center gap-1"
              >
                <span>View All Inquiries</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {recentInquiries.length === 0 ? (
              <div className="py-12 text-center text-linen-muted/60 border border-dashed border-bronze/15 rounded-lg">
                <MessageSquareCode className="w-8 h-8 mx-auto mb-2 text-bronze/30" />
                <p className="text-xs font-mono">No new web customizer submissions yet.</p>
                <p className="text-[10px] text-linen-muted/40 mt-1">
                  Submissions from the public Bespoke Studio will appear here live.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-3.5 rounded-lg bg-surface-elevated border border-bronze/10 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-display text-sm text-linen block">
                        {inq.customer_name || 'Anonymous Client'}
                      </span>
                      <span className="text-[11px] font-mono text-bronze-light">
                        {inq.room_type} · {inq.timber_choice} · {inq.dimensions}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-bronze/20 text-bronze">
                        {inq.status}
                      </span>
                      <Link
                        to="/admin/inquiries"
                        className="text-xs font-mono text-linen-muted hover:text-linen"
                      >
                        Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-bronze/10 flex items-center justify-between text-xs font-mono text-linen-muted">
            <span>Direct WhatsApp Lead Synchronization</span>
            <span className="text-emerald-400">● Active</span>
          </div>
        </div>

        {/* Right Col: Low Stock & Timber Inventory Status */}
        <div className="lg:col-span-5 bg-surface border border-bronze/15 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h3 className="font-display text-lg text-linen">Inventory Alerts</h3>
            </div>
            <Link
              to="/admin/products"
              className="text-xs font-mono text-bronze hover:text-linen transition-colors"
            >
              Catalog →
            </Link>
          </div>

          <div className="space-y-3">
            {lowStockProducts.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="p-3 rounded-lg bg-surface-elevated border border-amber-900/30 flex items-center justify-between"
              >
                <div>
                  <span className="font-display text-xs text-linen block">{product.name}</span>
                  <span className="text-[10px] font-mono text-linen-muted">
                    {product.timber_type} · ৳{Number(product.price_bdt).toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/40">
                  {product.stock_quantity} left
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-bronze/10">
            <span className="block text-[11px] font-mono uppercase tracking-wider text-bronze-light mb-2">
              Timber Heartwood Seasoning Stocks
            </span>
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
              <div className="p-2 rounded bg-surface-elevated text-linen-muted">
                Burma Teak: <span className="text-emerald-400">Seasoned (10-12%)</span>
              </div>
              <div className="p-2 rounded bg-surface-elevated text-linen-muted">
                Red Mahogany: <span className="text-emerald-400">Kiln Ready</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
