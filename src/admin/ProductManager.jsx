import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAdminAuth } from './AdminAuthContext';
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
  Lock,
} from 'lucide-react';

export default function ProductManager() {
  const { role } = useAdminAuth();
  const isReadOnly = role === 'sales_rep';

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
    if (isReadOnly) return;
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
    if (isReadOnly) return;
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
    if (isReadOnly) return;
    const newStock = Math.max(0, currentStock + delta);
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock_quantity: newStock } : p))
    );

    await supabase.from('products').update({ stock_quantity: newStock }).eq('id', productId);
  };

  const handleToggleStatus = async (product) => {
    if (isReadOnly) return;
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
          <h1 className="font-display text-2xl md:text-3xl text-[#1E1005]">Product Catalog & Inventory</h1>
          <p className="text-xs font-mono text-[#7A6A5A] mt-1">
            Manage timber stock levels, heirloom specifications, pricing, and live status.
          </p>
        </div>

        {!isReadOnly ? (
          <button
            onClick={() => handleOpenModal()}
            className="px-4 py-2.5 bg-[#1E1005] hover:bg-[#9C7443] text-[#FBF0DA] hover:text-white font-mono text-xs uppercase tracking-wider rounded-xl font-semibold flex items-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Heirloom Piece</span>
          </button>
        ) : (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-mono">
            <Lock className="w-3.5 h-3.5 text-amber-700" />
            <span>Read-Only (Sales Rep Mode)</span>
          </div>
        )}
      </div>

      {msg && (
        <div
          className={`p-3.5 rounded-xl flex items-center gap-2 text-xs font-mono ${
            msg.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {msg.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{msg.text}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white border border-[#E8DFD3] rounded-2xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center shadow-xs">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#8A7563] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by piece name or timber..."
            className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-xs font-mono text-[#1E1005] placeholder-[#9E9080] focus:outline-none focus:border-[#9C7443] focus:bg-white"
          />
        </div>

        {/* Category & Status Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-xs font-mono text-[#1E1005] focus:outline-none focus:border-[#9C7443]"
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
            className="px-3 py-2 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-xs font-mono text-[#1E1005] focus:outline-none focus:border-[#9C7443]"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          <button
            onClick={fetchProducts}
            title="Refresh Catalog"
            className="p-2 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-[#1E1005] hover:text-[#9C7443] transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Product Table */}
      <div className="bg-white border border-[#E8DFD3] rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8DFD3] bg-[#FBF9F5] text-[10px] font-mono uppercase tracking-widest text-[#7A6A5A]">
                <th className="p-4">Piece & Category</th>
                <th className="p-4">Timber & Upholstery</th>
                <th className="p-4">Price (BDT)</th>
                <th className="p-4 text-center">Stock Control</th>
                <th className="p-4">Lead Time</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DFD3] text-xs font-mono">
              {loading ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-[#7A6A5A]">
                    Loading inventory catalog...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-[#7A6A5A]">
                    No products matched your search or filters.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={`/images/products/${p.slug}.jpg`}
                          alt={p.name}
                          onError={(e) => { e.target.style.display = 'none'; }}
                          className="w-10 h-10 object-cover rounded-lg border border-[#DED4C5] shrink-0 bg-[#FAF8F5]"
                        />
                        <div>
                          <span className="font-display text-sm text-[#1E1005] block font-medium">{p.name}</span>
                          <span className="text-[10px] text-[#8A7056] block mt-0.5">
                            {p.categories?.name || 'Unassigned Category'}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 text-[#6B5C4E]">
                      <span className="block text-[#1E1005] font-medium">{p.timber_type || 'Solid Timber'}</span>
                      <span className="text-[10px] text-[#8A7663]">{p.upholstery || 'Solid Finish'}</span>
                    </td>

                    <td className="p-4 text-[#1E1005] font-semibold">
                      ৳{Number(p.price_bdt || 0).toLocaleString('en-IN')}
                    </td>

                    {/* Stock Quick Control */}
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        {!isReadOnly && (
                          <button
                            onClick={() => handleQuickStockUpdate(p.id, p.stock_quantity, -1)}
                            className="w-6 h-6 rounded-md bg-[#FAF8F5] border border-[#DED4C5] text-[#1E1005] hover:border-[#9C7443] flex items-center justify-center font-bold text-xs cursor-pointer shadow-2xs"
                          >
                            -
                          </button>
                        )}
                        <span
                          className={`w-8 text-center font-bold ${
                            p.stock_quantity <= 2 ? 'text-amber-700' : 'text-emerald-700'
                          }`}
                        >
                          {p.stock_quantity}
                        </span>
                        {!isReadOnly && (
                          <button
                            onClick={() => handleQuickStockUpdate(p.id, p.stock_quantity, 1)}
                            className="w-6 h-6 rounded-md bg-[#FAF8F5] border border-[#DED4C5] text-[#1E1005] hover:border-[#9C7443] flex items-center justify-center font-bold text-xs cursor-pointer shadow-2xs"
                          >
                            +
                          </button>
                        )}
                      </div>
                    </td>

                    <td className="p-4 text-[#7A6A5A]">{p.lead_time || '14 Days'}</td>

                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStatus(p)}
                        disabled={isReadOnly}
                        className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-mono tracking-wider transition-colors ${
                          isReadOnly ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'
                        } ${
                          p.status === 'active'
                            ? 'bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium'
                            : 'bg-zinc-100 border border-zinc-300 text-zinc-600'
                        }`}
                      >
                        {p.status}
                      </button>
                    </td>

                    <td className="p-4 text-right">
                      {!isReadOnly ? (
                        <button
                          onClick={() => handleOpenModal(p)}
                          className="p-1.5 rounded-lg hover:bg-[#F2ECE1] text-[#9C7443] hover:text-[#1E1005] transition-colors cursor-pointer"
                          title="Edit Specifications"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      ) : (
                        <span className="text-[10px] text-[#A89887]">Locked</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && !isReadOnly && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E8DFD3] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD3] mb-6">
              <h2 className="font-display text-xl text-[#1E1005]">
                {editingProduct ? `Edit Piece: ${editingProduct.name}` : 'Add New Heirloom Piece'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-[#7A6A5A] hover:text-[#1E1005] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#6B5A4B] mb-1.5 uppercase font-medium">Piece Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Royal Chesterfield Suite"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-[#1E1005] focus:outline-none focus:border-[#9C7443] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[#6B5A4B] mb-1.5 uppercase font-medium">Category</label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-[#1E1005] focus:outline-none focus:border-[#9C7443] focus:bg-white"
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
                  <label className="block text-[#6B5A4B] mb-1.5 uppercase font-medium">Timber Species</label>
                  <input
                    type="text"
                    value={formData.timber_type}
                    onChange={(e) => setFormData({ ...formData, timber_type: e.target.value })}
                    placeholder="Burma Teak / Mahogany"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-[#1E1005] focus:outline-none focus:border-[#9C7443] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[#6B5A4B] mb-1.5 uppercase font-medium">Price (BDT) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price_bdt}
                    onChange={(e) => setFormData({ ...formData, price_bdt: e.target.value })}
                    placeholder="285000"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-[#1E1005] focus:outline-none focus:border-[#9C7443] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[#6B5A4B] mb-1.5 uppercase font-medium">Initial Stock</label>
                  <input
                    type="number"
                    value={formData.stock_quantity}
                    onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-[#1E1005] focus:outline-none focus:border-[#9C7443] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#6B5A4B] mb-1.5 uppercase font-medium">Upholstery / Finish</label>
                  <input
                    type="text"
                    value={formData.upholstery}
                    onChange={(e) => setFormData({ ...formData, upholstery: e.target.value })}
                    placeholder="Italian Leather / Bouclé / Velvet"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-[#1E1005] focus:outline-none focus:border-[#9C7443] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[#6B5A4B] mb-1.5 uppercase font-medium">Lead Time</label>
                  <input
                    type="text"
                    value={formData.lead_time}
                    onChange={(e) => setFormData({ ...formData, lead_time: e.target.value })}
                    placeholder="14-21 Days"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-[#1E1005] focus:outline-none focus:border-[#9C7443] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#6B5A4B] mb-1.5 uppercase font-medium">Description & Provenance</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Details on kiln seasoning, structural mortise-and-tenon joinery, and comfort specs..."
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-[#1E1005] focus:outline-none focus:border-[#9C7443] focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8DFD3]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#DED4C5] text-[#7A6A5A] hover:text-[#1E1005] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-[#1E1005] hover:bg-[#9C7443] text-[#FBF0DA] hover:text-white rounded-xl font-semibold transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
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
