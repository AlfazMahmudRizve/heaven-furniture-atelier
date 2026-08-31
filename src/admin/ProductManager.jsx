import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Check,
  X,
  AlertCircle,
  Sparkles,
  TrendingUp,
  RefreshCw,
} from 'lucide-react';

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category_id: '',
    timber_type: 'Burma Teak',
    upholstery: '',
    dimensions: '',
    price_bdt: '',
    stock_quantity: '1',
    lead_time: '14-21 Days',
    status: 'active',
    description: '',
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const { data } = await supabase.from('categories').select('*').order('sort_order');
    if (data) setCategories(data);
  }

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name, slug)')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  }

  const handleOpenModal = (prod = null) => {
    if (prod) {
      setEditingProduct(prod);
      setFormData({
        name: prod.name || '',
        slug: prod.slug || '',
        category_id: prod.category_id || '',
        timber_type: prod.timber_type || '',
        upholstery: prod.upholstery || '',
        dimensions: prod.dimensions || '',
        price_bdt: prod.price_bdt ? String(prod.price_bdt) : '',
        stock_quantity: prod.stock_quantity !== undefined ? String(prod.stock_quantity) : '1',
        lead_time: prod.lead_time || '14-21 Days',
        status: prod.status || 'active',
        description: prod.description || '',
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        slug: '',
        category_id: categories[0]?.id || '',
        timber_type: 'Burma Teak',
        upholstery: '',
        dimensions: '',
        price_bdt: '',
        stock_quantity: '1',
        lead_time: '14-21 Days',
        status: 'active',
        description: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);

    try {
      const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const payload = {
        name: formData.name,
        slug,
        category_id: formData.category_id || null,
        timber_type: formData.timber_type,
        upholstery: formData.upholstery,
        dimensions: formData.dimensions,
        price_bdt: Number(formData.price_bdt) || 0,
        stock_quantity: parseInt(formData.stock_quantity, 10) || 0,
        lead_time: formData.lead_time,
        status: formData.status,
        description: formData.description,
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(payload)
          .eq('id', editingProduct.id);
        if (error) throw error;
        setMsg({ type: 'success', text: `Updated ${formData.name} successfully.` });
      } else {
        const { error } = await supabase.from('products').insert([payload]);
        if (error) throw error;
        setMsg({ type: 'success', text: `Added new piece ${formData.name} to catalog.` });
      }

      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      setMsg({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleQuickStockUpdate = async (productId, currentStock, delta) => {
    const newStock = Math.max(0, currentStock + delta);
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock_quantity: newStock } : p))
    );

    await supabase.from('products').update({ stock_quantity: newStock }).eq('id', productId);
  };

  const handleToggleStatus = async (product) => {
    const nextStatus = product.status === 'active' ? 'draft' : 'active';
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, status: nextStatus } : p))
    );

    await supabase.from('products').update({ status: nextStatus }).eq('id', product.id);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.timber_type?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      selectedCategory === 'all' || p.category_id === selectedCategory || p.categories?.slug === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus;
    return matchesSearch && matchesCat && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-linen">Product Catalog & Inventory</h1>
          <p className="text-xs font-mono text-linen-muted mt-1">
            Manage timber stock levels, heirloom specifications, pricing, and live status.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2.5 bg-bronze hover:bg-bronze-light text-linen hover:text-espresso font-mono text-xs uppercase tracking-wider rounded-lg font-semibold flex items-center gap-2 transition-all shadow-lg cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Heirloom Piece</span>
        </button>
      </div>

      {msg && (
        <div
          className={`p-3.5 rounded-lg flex items-center gap-2 text-xs font-mono ${
            msg.type === 'success'
              ? 'bg-emerald-950/60 border border-emerald-800/40 text-emerald-300'
              : 'bg-red-950/60 border border-red-800/40 text-red-300'
          }`}
        >
          {msg.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{msg.text}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-surface border border-bronze/15 rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-linen-muted/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by piece name or timber..."
            className="w-full pl-10 pr-4 py-2 bg-surface-elevated border border-bronze/15 rounded-lg text-xs font-mono text-linen placeholder-linen-muted/40 focus:outline-none focus:border-bronze"
          />
        </div>

        {/* Category & Status Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-surface-elevated border border-bronze/15 rounded-lg text-xs font-mono text-linen focus:outline-none focus:border-bronze"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-surface-elevated border border-bronze/15 rounded-lg text-xs font-mono text-linen focus:outline-none focus:border-bronze"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          <button
            onClick={fetchProducts}
            title="Refresh Catalog"
            className="p-2 bg-surface-elevated border border-bronze/15 rounded-lg text-linen hover:text-bronze transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Product Table */}
      <div className="bg-surface border border-bronze/15 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-bronze/15 bg-surface-elevated/60 text-[10px] font-mono uppercase tracking-widest text-linen-muted">
                <th className="p-4">Piece & Category</th>
                <th className="p-4">Timber & Upholstery</th>
                <th className="p-4">Price (BDT)</th>
                <th className="p-4 text-center">Stock Control</th>
                <th className="p-4">Lead Time</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bronze/10 text-xs font-mono">
              {loading ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-linen-muted">
                    Loading inventory telemetry from Supabase...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-linen-muted">
                    No products matched your search or filters.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-surface-elevated/40 transition-colors">
                    <td className="p-4">
                      <span className="font-display text-sm text-linen block">{p.name}</span>
                      <span className="text-[10px] text-bronze-light block mt-0.5">
                        {p.categories?.name || 'Unassigned Category'}
                      </span>
                    </td>

                    <td className="p-4 text-linen-muted">
                      <span className="block text-linen">{p.timber_type || 'Solid Timber'}</span>
                      <span className="text-[10px] text-linen-muted/60">{p.upholstery || 'Solid Finish'}</span>
                    </td>

                    <td className="p-4 text-linen font-semibold">
                      ৳{Number(p.price_bdt || 0).toLocaleString('en-IN')}
                    </td>

                    {/* Stock Quick Control */}
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleQuickStockUpdate(p.id, p.stock_quantity, -1)}
                          className="w-6 h-6 rounded bg-surface-elevated border border-bronze/20 text-linen hover:border-bronze flex items-center justify-center font-bold text-xs cursor-pointer"
                        >
                          -
                        </button>
                        <span
                          className={`w-8 text-center font-bold ${
                            p.stock_quantity <= 2 ? 'text-amber-400' : 'text-emerald-400'
                          }`}
                        >
                          {p.stock_quantity}
                        </span>
                        <button
                          onClick={() => handleQuickStockUpdate(p.id, p.stock_quantity, 1)}
                          className="w-6 h-6 rounded bg-surface-elevated border border-bronze/20 text-linen hover:border-bronze flex items-center justify-center font-bold text-xs cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="p-4 text-linen-muted">{p.lead_time || '14 Days'}</td>

                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStatus(p)}
                        className={`px-2.5 py-1 rounded text-[10px] uppercase font-mono tracking-wider transition-colors cursor-pointer ${
                          p.status === 'active'
                            ? 'bg-emerald-950/60 border border-emerald-800/40 text-emerald-300'
                            : 'bg-zinc-800 border border-zinc-700 text-zinc-400'
                        }`}
                      >
                        {p.status}
                      </button>
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleOpenModal(p)}
                        className="p-1.5 rounded hover:bg-surface-elevated text-bronze hover:text-linen transition-colors cursor-pointer"
                        title="Edit Specifications"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-bronze/30 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-bronze/15 mb-6">
              <h2 className="font-display text-xl text-linen">
                {editingProduct ? `Edit Piece: ${editingProduct.name}` : 'Add New Heirloom Piece'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-linen-muted hover:text-linen cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-linen-muted mb-1.5 uppercase">Piece Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Royal Chesterfield Suite"
                    className="w-full p-2.5 bg-espresso border border-bronze/20 rounded-lg text-linen focus:outline-none focus:border-bronze"
                  />
                </div>

                <div>
                  <label className="block text-linen-muted mb-1.5 uppercase">Category</label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    className="w-full p-2.5 bg-espresso border border-bronze/20 rounded-lg text-linen focus:outline-none focus:border-bronze"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-linen-muted mb-1.5 uppercase">Timber Species</label>
                  <input
                    type="text"
                    value={formData.timber_type}
                    onChange={(e) => setFormData({ ...formData, timber_type: e.target.value })}
                    placeholder="Burma Teak / Mahogany"
                    className="w-full p-2.5 bg-espresso border border-bronze/20 rounded-lg text-linen focus:outline-none focus:border-bronze"
                  />
                </div>

                <div>
                  <label className="block text-linen-muted mb-1.5 uppercase">Price (BDT) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price_bdt}
                    onChange={(e) => setFormData({ ...formData, price_bdt: e.target.value })}
                    placeholder="285000"
                    className="w-full p-2.5 bg-espresso border border-bronze/20 rounded-lg text-linen focus:outline-none focus:border-bronze"
                  />
                </div>

                <div>
                  <label className="block text-linen-muted mb-1.5 uppercase">Initial Stock</label>
                  <input
                    type="number"
                    value={formData.stock_quantity}
                    onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                    className="w-full p-2.5 bg-espresso border border-bronze/20 rounded-lg text-linen focus:outline-none focus:border-bronze"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-linen-muted mb-1.5 uppercase">Upholstery / Finish</label>
                  <input
                    type="text"
                    value={formData.upholstery}
                    onChange={(e) => setFormData({ ...formData, upholstery: e.target.value })}
                    placeholder="Italian Leather / Bouclé / Velvet"
                    className="w-full p-2.5 bg-espresso border border-bronze/20 rounded-lg text-linen focus:outline-none focus:border-bronze"
                  />
                </div>

                <div>
                  <label className="block text-linen-muted mb-1.5 uppercase">Lead Time</label>
                  <input
                    type="text"
                    value={formData.lead_time}
                    onChange={(e) => setFormData({ ...formData, lead_time: e.target.value })}
                    placeholder="14-21 Days"
                    className="w-full p-2.5 bg-espresso border border-bronze/20 rounded-lg text-linen focus:outline-none focus:border-bronze"
                  />
                </div>
              </div>

              <div>
                <label className="block text-linen-muted mb-1.5 uppercase">Description & Provenance</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Details on kiln seasoning, structural mortise-and-tenon joinery, and comfort specs..."
                  className="w-full p-2.5 bg-espresso border border-bronze/20 rounded-lg text-linen focus:outline-none focus:border-bronze"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-bronze/15">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg border border-bronze/20 text-linen-muted hover:text-linen cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-bronze hover:bg-bronze-light text-linen hover:text-espresso rounded-lg font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {saving ? 'Saving...' : editingProduct ? 'Update Piece' : 'Publish Piece'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
