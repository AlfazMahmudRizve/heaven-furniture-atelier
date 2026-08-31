import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import {
  MessageSquareCode,
  MessageCircle,
  Phone,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Filter,
  Search,
  RefreshCw,
  X,
  AlertCircle,
  User,
  Sliders,
} from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/whatsapp';

export default function InquiryManager() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [quotePrice, setQuotePrice] = useState('');
  const [converting, setConverting] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, []);

  async function fetchInquiries() {
    setLoading(true);
    const { data, error } = await supabase
      .from('bespoke_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setInquiries(data);
    }
    setLoading(false);
  }

  const handleUpdateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from('bespoke_inquiries')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      setInquiries((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
      );
    }
  };

  const handleConvertToOrder = async (inquiry) => {
    setConverting(true);
    try {
      // 1. Create or link customer
      let customerId = null;
      if (inquiry.customer_name || inquiry.customer_phone) {
        const { data: cust } = await supabase
          .from('customers')
          .insert([
            {
              name: inquiry.customer_name || 'Bespoke Customizer Client',
              phone: inquiry.customer_phone,
              email: inquiry.customer_email,
              source: 'website',
            },
          ])
          .select()
          .single();
        if (cust) customerId = cust.id;
      }

      // 2. Create order
      const estimatedTotal = Number(quotePrice) || 250000;
      const { data: order, error: orderErr } = await supabase
        .from('orders')
        .insert([
          {
            customer_id: customerId,
            status: 'confirmed',
            subtotal_bdt: estimatedTotal,
            total_bdt: estimatedTotal,
            payment_method: 'bkash',
            payment_status: 'partial',
            paid_amount_bdt: Math.round(estimatedTotal * 0.4), // 40% advance deposit
            notes: `Converted from bespoke inquiry: ${inquiry.room_type} (${inquiry.timber_choice}, ${inquiry.fabric_choice}, ${inquiry.dimensions})`,
          },
        ])
        .select()
        .single();

      if (orderErr) throw orderErr;

      // 3. Create order item
      await supabase.from('order_items').insert([
        {
          order_id: order.id,
          product_name: `Bespoke ${inquiry.room_type || 'Custom Piece'}`,
          timber_choice: inquiry.timber_choice,
          fabric_choice: inquiry.fabric_choice,
          customization_notes: `Dimensions: ${inquiry.dimensions || 'Bespoke blueprint'}`,
          quantity: 1,
          unit_price_bdt: estimatedTotal,
          total_bdt: estimatedTotal,
        },
      ]);

      // 4. Update inquiry status to converted
      await supabase
        .from('bespoke_inquiries')
        .update({ status: 'converted', converted_order_id: order.id, quoted_price_bdt: estimatedTotal })
        .eq('id', inquiry.id);

      setSelectedInquiry(null);
      fetchInquiries();
      alert(`Successfully converted inquiry into Order ${order.order_number}!`);
    } catch (err) {
      alert(`Conversion error: ${err.message}`);
    } finally {
      setConverting(false);
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.customer_phone?.includes(searchQuery) ||
      inq.room_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.timber_choice?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-linen">
            Bespoke Customizer Leads Funnel
          </h1>
          <p className="text-xs font-mono text-linen-muted mt-1">
            Real-time submissions from the 3D Atelier Configurator with one-click WhatsApp concierge & order conversion.
          </p>
        </div>

        <button
          onClick={fetchInquiries}
          className="px-3 py-2 bg-surface border border-bronze/20 rounded-lg text-xs font-mono text-linen flex items-center gap-2 hover:border-bronze transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 text-bronze" />
          <span>Refresh Leads</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="bg-surface border border-bronze/15 rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-linen-muted/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by client name, room, timber..."
            className="w-full pl-10 pr-4 py-2 bg-surface-elevated border border-bronze/15 rounded-lg text-xs font-mono text-linen placeholder-linen-muted/40 focus:outline-none focus:border-bronze"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-surface-elevated border border-bronze/15 rounded-lg text-xs font-mono text-linen focus:outline-none focus:border-bronze"
          >
            <option value="all">All Inquiry Statuses</option>
            <option value="new">New Submissions</option>
            <option value="contacted">Contacted</option>
            <option value="quoted">Quoted</option>
            <option value="converted">Converted to Order</option>
            <option value="lost">Archived / Lost</option>
          </select>
        </div>
      </div>

      {/* Inquiries Grid / Table */}
      <div className="bg-surface border border-bronze/15 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-bronze/15 bg-surface-elevated/60 text-[10px] font-mono uppercase tracking-widest text-linen-muted">
                <th className="p-4">Submission Date</th>
                <th className="p-4">Client</th>
                <th className="p-4">Bespoke Spec (Room & Timber)</th>
                <th className="p-4">Dimensions & Fabric</th>
                <th className="p-4">Lead Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bronze/10 text-xs font-mono">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-linen-muted">
                    Loading bespoke inquiries from Supabase...
                  </td>
                </tr>
              ) : filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-linen-muted">
                    No inquiries recorded yet. Submissions from the public website Bespoke Studio will appear here live.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-surface-elevated/40 transition-colors">
                    <td className="p-4 text-linen-muted">
                      <span className="block text-linen">
                        {new Date(inq.created_at).toLocaleDateString('en-GB')}
                      </span>
                      <span className="text-[10px] text-linen-muted/60">
                        {new Date(inq.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="font-display text-sm text-linen block">
                        {inq.customer_name || 'Website Visitor'}
                      </span>
                      <span className="text-[10px] text-bronze-light">
                        {inq.customer_phone || inq.customer_email || 'Web Session'}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="text-linen block font-medium capitalize">{inq.room_type} Room</span>
                      <span className="text-[10px] text-linen-muted">{inq.timber_choice}</span>
                    </td>

                    <td className="p-4 text-linen-muted">
                      <span className="block text-linen">{inq.dimensions || 'Standard Blueprint'}</span>
                      <span className="text-[10px] text-linen-muted/60">{inq.fabric_choice || 'Natural Finish'}</span>
                    </td>

                    <td className="p-4">
                      <select
                        value={inq.status}
                        onChange={(e) => handleUpdateStatus(inq.id, e.target.value)}
                        className={`px-2.5 py-1 rounded text-[10px] uppercase font-mono tracking-wider focus:outline-none border ${
                          inq.status === 'new'
                            ? 'bg-purple-950 text-purple-300 border-purple-800/40'
                            : inq.status === 'contacted'
                            ? 'bg-blue-950 text-blue-300 border-blue-800/40'
                            : inq.status === 'quoted'
                            ? 'bg-amber-950 text-amber-300 border-amber-800/40'
                            : inq.status === 'converted'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800/40'
                            : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="quoted">Quoted</option>
                        <option value="converted">Converted</option>
                        <option value="lost">Lost / Archived</option>
                      </select>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {inq.customer_phone && (
                          <a
                            href={buildWhatsAppUrl(
                              `Hi ${inq.customer_name || 'Client'}! Thank you for customizing a bespoke ${inq.room_type} piece at Heaven Furniture Mart. We have reviewed your specification (${inquirySummaryText(inq)}) and would love to share your 3D render & quote.`
                            )}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 hover:bg-emerald-900/60 transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                        )}

                        <button
                          onClick={() => {
                            setSelectedInquiry(inq);
                            setQuotePrice('250000');
                          }}
                          className="px-2.5 py-1 bg-surface-elevated hover:bg-bronze text-linen-muted hover:text-linen rounded border border-bronze/20 text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Convert →
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Convert Inquiry Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-bronze/30 rounded-xl max-w-lg w-full p-6 shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-bronze/15 mb-4">
              <h3 className="font-display text-lg text-linen">Convert Bespoke Inquiry to Order</h3>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1 text-linen-muted hover:text-linen cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-3 bg-surface-elevated rounded-lg border border-bronze/15 space-y-1">
                <span className="text-[10px] text-bronze uppercase block font-bold">Inquiry Specification:</span>
                <p className="text-linen">
                  {selectedInquiry.room_type} · {selectedInquiry.timber_choice} · {selectedInquiry.fabric_choice}
                </p>
                <p className="text-linen-muted text-[11px]">
                  Dimensions: {selectedInquiry.dimensions || 'Bespoke room floorplan'}
                </p>
              </div>

              <div>
                <label className="block text-linen-muted mb-1 uppercase">Quoted / Final Price (BDT) *</label>
                <input
                  type="number"
                  required
                  value={quotePrice}
                  onChange={(e) => setQuotePrice(e.target.value)}
                  placeholder="250000"
                  className="w-full p-2.5 bg-espresso border border-bronze/20 rounded-lg text-linen focus:outline-none focus:border-bronze"
                />
              </div>

              <div className="p-3 bg-espresso rounded-lg border border-bronze/10 text-[11px] text-linen-muted">
                This will automatically create a new customer record, generate an official order invoice (`HFM-2026-XXXX`), log line items, and mark this lead as converted.
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-bronze/15">
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 rounded-lg border border-bronze/20 text-linen-muted hover:text-linen cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={converting}
                  onClick={() => handleConvertToOrder(selectedInquiry)}
                  className="px-5 py-2 bg-bronze hover:bg-bronze-light text-linen hover:text-espresso rounded-lg font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {converting ? 'Converting...' : 'Generate Confirmed Order'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

function inquirySummaryText(inq) {
  return `${inq.room_type || 'custom'} room in ${inq.timber_choice || 'Burma Teak'} (${inq.dimensions || 'custom size'})`;
}
