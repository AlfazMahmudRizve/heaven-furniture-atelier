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
          <h1 className="font-display text-2xl md:text-3xl text-[#1E1005]">
            Bespoke Customizer Leads Funnel
          </h1>
          <p className="text-xs font-mono text-[#7A6A5A] mt-1">
            Real-time submissions from the 3D Customizer with one-click WhatsApp customer chat & order conversion.
          </p>
        </div>

        <button
          onClick={fetchInquiries}
          className="px-3 py-2 bg-white border border-[#DED4C5] rounded-xl text-xs font-mono text-[#1E1005] flex items-center gap-2 hover:border-[#9C7443] transition-colors cursor-pointer shadow-2xs"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#9C7443]" />
          <span>Refresh Leads</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white border border-[#E8DFD3] rounded-2xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#8A7563] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by client name, room, timber..."
            className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-xs font-mono text-[#1E1005] placeholder-[#9E9080] focus:outline-none focus:border-[#9C7443] focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-xs font-mono text-[#1E1005] focus:outline-none focus:border-[#9C7443]"
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
      <div className="bg-white border border-[#E8DFD3] rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8DFD3] bg-[#FBF9F5] text-[10px] font-mono uppercase tracking-widest text-[#7A6A5A]">
                <th className="p-4">Submission Date</th>
                <th className="p-4">Client</th>
                <th className="p-4">Bespoke Spec (Room & Timber)</th>
                <th className="p-4">Dimensions & Fabric</th>
                <th className="p-4">Lead Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DFD3] text-xs font-mono">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-[#7A6A5A]">
                    Loading bespoke inquiries...
                  </td>
                </tr>
              ) : filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-[#7A6A5A]">
                    No inquiries recorded yet. Submissions from the public website Bespoke Studio will appear here live.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="p-4 text-[#6B5C4E]">
                      <span className="block text-[#1E1005] font-medium">
                        {new Date(inq.created_at).toLocaleDateString('en-GB')}
                      </span>
                      <span className="text-[10px] text-[#8A7663]">
                        {new Date(inq.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="font-display text-sm text-[#1E1005] block font-medium">
                        {inq.customer_name || 'Website Visitor'}
                      </span>
                      <span className="text-[10px] text-[#8A7056]">
                        {inq.customer_phone || inq.customer_email || 'Web Session'}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="text-[#1E1005] block font-medium capitalize">{inq.room_type} Room</span>
                      <span className="text-[10px] text-[#7A6A5A]">{inq.timber_choice}</span>
                    </td>

                    <td className="p-4 text-[#6B5C4E]">
                      <span className="block text-[#1E1005]">{inq.dimensions || 'Standard Blueprint'}</span>
                      <span className="text-[10px] text-[#8A7663]">{inq.fabric_choice || 'Natural Finish'}</span>
                    </td>

                    <td className="p-4">
                      <select
                        value={inq.status}
                        onChange={(e) => handleUpdateStatus(inq.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-mono tracking-wider focus:outline-none border font-medium ${
                          inq.status === 'new'
                            ? 'bg-purple-50 text-purple-800 border-purple-200'
                            : inq.status === 'contacted'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : inq.status === 'quoted'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : inq.status === 'converted'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-zinc-100 text-zinc-600 border-zinc-300'
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
                            className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 transition-colors"
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
                          className="px-2.5 py-1 bg-[#FAF8F5] hover:bg-[#1E1005] text-[#1E1005] hover:text-[#FBF0DA] rounded-lg border border-[#DED4C5] text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer shadow-2xs"
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
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E8DFD3] rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD3] mb-4">
              <h3 className="font-display text-lg text-[#1E1005]">Convert Bespoke Inquiry to Order</h3>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1 text-[#7A6A5A] hover:text-[#1E1005] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EDE4D8] space-y-1">
                <span className="text-[10px] text-[#8A7056] uppercase block font-bold">Inquiry Specification:</span>
                <p className="text-[#1E1005] font-medium">
                  {selectedInquiry.room_type} · {selectedInquiry.timber_choice} · {selectedInquiry.fabric_choice}
                </p>
                <p className="text-[#7A6A5A] text-[11px]">
                  Dimensions: {selectedInquiry.dimensions || 'Bespoke room floorplan'}
                </p>
              </div>

              <div>
                <label className="block text-[#6B5A4B] mb-1 uppercase font-medium">Quoted / Final Price (BDT) *</label>
                <input
                  type="number"
                  required
                  value={quotePrice}
                  onChange={(e) => setQuotePrice(e.target.value)}
                  placeholder="250000"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-[#1E1005] focus:outline-none focus:border-[#9C7443] focus:bg-white"
                />
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EDE4D8] text-[11px] text-[#7A6A5A]">
                This will automatically create a new customer record, generate an official order invoice (`HFM-2026-XXXX`), log line items, and mark this lead as converted.
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E8DFD3]">
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 rounded-xl border border-[#DED4C5] text-[#7A6A5A] hover:text-[#1E1005] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={converting}
                  onClick={() => handleConvertToOrder(selectedInquiry)}
                  className="px-5 py-2 bg-[#1E1005] hover:bg-[#9C7443] text-[#FBF0DA] hover:text-white rounded-xl font-semibold transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
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
