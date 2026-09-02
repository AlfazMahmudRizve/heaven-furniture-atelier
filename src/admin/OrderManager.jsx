import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAdminAuth } from './AdminAuthContext';
import {
  ShoppingBag,
  Plus,
  Search,
  Filter,
  CreditCard,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  DollarSign,
  ChevronRight,
  Eye,
  X,
  FileText,
  User,
  Phone,
  MapPin,
} from 'lucide-react';

const STATUS_STEPS = [
  { key: 'pending', label: 'Pending' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'in_production', label: 'In Production' },
  { key: 'quality_check', label: 'QC' },
  { key: 'ready', label: 'Ready' },
  { key: 'out_for_delivery', label: 'Dispatch' },
  { key: 'delivered', label: 'Delivered' },
];

export default function OrderManager() {
  const { role } = useAdminAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');

  // Selected Order Modal
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [payments, setPayments] = useState([]);

  // Create Order Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newOrderCustomer, setNewOrderCustomer] = useState({ name: '', phone: '', address: '', city: 'Chattogram' });
  const [newOrderData, setNewOrderData] = useState({
    product_name: 'Sovereign Corner Sectional',
    timber_choice: 'Burma Teak',
    fabric_choice: 'Belgian Velvet',
    quantity: 1,
    unit_price: 285000,
    payment_method: 'bkash',
    payment_status: 'partial',
    paid_amount: 100000,
    delivery_address: 'Agrabad, Chattogram',
    notes: 'Advance paid via bKash. Delivery requested within 2 weeks.',
  });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*, customers(name, phone, address, city)')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setOrders(data);
    }
    setLoading(false);
  }

  const handleSelectOrder = async (order) => {
    setSelectedOrder(order);

    // Fetch order items & payment records
    const [itemsRes, paymentsRes] = await Promise.all([
      supabase.from('order_items').select('*').eq('order_id', order.id),
      supabase.from('payment_records').select('*').eq('order_id', order.id).order('created_at', { ascending: false }),
    ]);

    setOrderItems(itemsRes.data || []);
    setPayments(paymentsRes.data || []);
  };

  const handleUpdateStatus = async (orderId, nextStatus) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: nextStatus, ...(nextStatus === 'delivered' ? { delivered_at: new Date().toISOString() } : {}) })
      .eq('id', orderId);

    if (!error) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
      );
      if (selectedOrder?.id === orderId) {
        setSelectedOrder((prev) => ({ ...prev, status: nextStatus }));
      }
    }
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setCreating(true);

    try {
      // 1. Create or fetch customer
      let customerId = null;
      if (newOrderCustomer.name && newOrderCustomer.phone) {
        const { data: cust } = await supabase
          .from('customers')
          .insert([
            {
              name: newOrderCustomer.name,
              phone: newOrderCustomer.phone,
              address: newOrderCustomer.address,
              city: newOrderCustomer.city,
              source: 'walk_in',
            },
          ])
          .select()
          .single();
        if (cust) customerId = cust.id;
      }

      // 2. Create order
      const totalAmount = Number(newOrderData.unit_price) * Number(newOrderData.quantity);
      const { data: order, error: orderErr } = await supabase
        .from('orders')
        .insert([
          {
            customer_id: customerId,
            status: 'confirmed',
            subtotal_bdt: totalAmount,
            total_bdt: totalAmount,
            payment_method: newOrderData.payment_method,
            payment_status: newOrderData.payment_status,
            paid_amount_bdt: Number(newOrderData.paid_amount) || 0,
            delivery_address: newOrderData.delivery_address || newOrderCustomer.address,
            delivery_city: newOrderCustomer.city,
            notes: newOrderData.notes,
          },
        ])
        .select()
        .single();

      if (orderErr) throw orderErr;

      // 3. Create order item
      await supabase.from('order_items').insert([
        {
          order_id: order.id,
          product_name: newOrderData.product_name,
          timber_choice: newOrderData.timber_choice,
          fabric_choice: newOrderData.fabric_choice,
          quantity: Number(newOrderData.quantity),
          unit_price_bdt: Number(newOrderData.unit_price),
          total_bdt: totalAmount,
        },
      ]);

      // 4. Create payment record if advance was paid
      if (Number(newOrderData.paid_amount) > 0) {
        await supabase.from('payment_records').insert([
          {
            order_id: order.id,
            amount_bdt: Number(newOrderData.paid_amount),
            method: newOrderData.payment_method,
            notes: 'Advance deposit on order placement',
          },
        ]);
      }

      setIsCreateModalOpen(false);
      fetchOrders();
    } catch (err) {
      alert(`Error creating order: ${err.message}`);
    } finally {
      setCreating(false);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.order_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customers?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customers?.phone?.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || o.payment_status === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-[#1E1005]">Order Tracking & Financials</h1>
          <p className="text-xs font-mono text-[#7A6A5A] mt-1">
            Production workflow stepper, bKash/Nagad/Bank payment reconciliation, and white-glove delivery scheduling.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2.5 bg-[#1E1005] hover:bg-[#9C7443] text-[#FBF0DA] hover:text-white font-mono text-xs uppercase tracking-wider rounded-xl font-semibold flex items-center gap-2 transition-all shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Showroom Order</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#E8DFD3] rounded-2xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#8A7563] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order #, client name, phone..."
            className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-xs font-mono text-[#1E1005] placeholder-[#9E9080] focus:outline-none focus:border-[#9C7443] focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-xs font-mono text-[#1E1005] focus:outline-none focus:border-[#9C7443]"
          >
            <option value="all">All Statuses</option>
            {STATUS_STEPS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="px-3 py-2 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-xs font-mono text-[#1E1005] focus:outline-none focus:border-[#9C7443]"
          >
            <option value="all">All Payments</option>
            <option value="paid">Paid in Full</option>
            <option value="partial">Partial / Advance</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>
      </div>

      {/* Order List Table */}
      <div className="bg-white border border-[#E8DFD3] rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8DFD3] bg-[#FBF9F5] text-[10px] font-mono uppercase tracking-widest text-[#7A6A5A]">
                <th className="p-4">Order # & Date</th>
                <th className="p-4">Client</th>
                <th className="p-4">Amount & Payment</th>
                <th className="p-4">Workflow Status</th>
                <th className="p-4">Step Control</th>
                <th className="p-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DFD3] text-xs font-mono">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-[#7A6A5A]">
                    Loading orders telemetry from Supabase...
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-[#7A6A5A]">
                    No orders found. Click "+ New Showroom Order" to create one.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="p-4">
                      <span className="font-mono text-xs text-[#9C7443] block font-bold">
                        {order.order_number}
                      </span>
                      <span className="text-[10px] text-[#8A7563]">
                        {new Date(order.created_at).toLocaleDateString('en-GB')}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="font-display text-sm text-[#1E1005] block font-medium">
                        {order.customers?.name || 'Walk-in Client'}
                      </span>
                      <span className="text-[10px] text-[#7A6A5A]">
                        {order.customers?.phone || order.delivery_city}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="font-semibold text-[#1E1005] block">
                        ৳{Number(order.total_bdt || 0).toLocaleString('en-IN')}
                      </span>
                      <span
                        className={`inline-block text-[9px] uppercase px-1.5 py-0.5 rounded-md font-mono mt-0.5 font-medium border ${
                          order.payment_status === 'paid'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : order.payment_status === 'partial'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-red-50 text-red-800 border-red-200'
                        }`}
                      >
                        {order.payment_status} ({order.payment_method})
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#DED4C5] text-[#705026] text-[10px] font-mono uppercase tracking-wider font-medium">
                        {order.status?.replace('_', ' ')}
                      </span>
                    </td>

                    {/* Step Advance Button */}
                    <td className="p-4">
                      {order.status !== 'delivered' && order.status !== 'cancelled' && (
                        <button
                          onClick={() => {
                            const curIdx = STATUS_STEPS.findIndex((s) => s.key === order.status);
                            if (curIdx < STATUS_STEPS.length - 1) {
                              handleUpdateStatus(order.id, STATUS_STEPS[curIdx + 1].key);
                            }
                          }}
                          className="px-2.5 py-1 bg-[#FAF8F5] hover:bg-[#1E1005] text-[#1E1005] hover:text-[#FBF0DA] rounded-lg border border-[#DED4C5] text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                        >
                          <span>Advance</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleSelectOrder(order)}
                        className="p-1.5 rounded-lg hover:bg-[#F2ECE1] text-[#9C7443] hover:text-[#1E1005] transition-colors cursor-pointer"
                        title="View Full Spec & Invoice"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E8DFD3] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD3] mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#9C7443] tracking-widest block font-medium">
                  Order Telemetry & Production Status
                </span>
                <h2 className="font-display text-2xl text-[#1E1005] mt-0.5">{selectedOrder.order_number}</h2>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 text-[#7A6A5A] hover:text-[#1E1005] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Workflow Stepper */}
            <div className="mb-8 p-4 bg-[#FAF8F5] rounded-xl border border-[#EDE4D8]">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-[#8A7056] mb-3 font-medium">
                Production & Delivery Stepper
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                {STATUS_STEPS.map((step, idx) => {
                  const isCurrent = selectedOrder.status === step.key;
                  const stepIndex = STATUS_STEPS.findIndex((s) => s.key === selectedOrder.status);
                  const isDone = stepIndex >= idx;

                  return (
                    <button
                      key={step.key}
                      onClick={() => handleUpdateStatus(selectedOrder.id, step.key)}
                      className={`p-2 rounded-lg text-center font-mono text-[10px] transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-[#1E1005] text-[#FBF0DA] font-bold shadow-sm'
                          : isDone
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium'
                          : 'bg-white text-[#8A7563] border border-[#E0D4C3] hover:text-[#1E1005]'
                      }`}
                    >
                      <span>{step.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Order Items & Customer Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              
              {/* Customer Box */}
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EDE4D8] text-xs font-mono space-y-2">
                <span className="text-[10px] uppercase text-[#8A7056] block font-bold mb-2">
                  Client & Dispatch Address
                </span>
                <div className="flex items-center gap-2 text-[#1E1005]">
                  <User className="w-3.5 h-3.5 text-[#9C7443]" />
                  <span className="font-medium">{selectedOrder.customers?.name || 'Walk-in Client'}</span>
                </div>
                <div className="flex items-center gap-2 text-[#6B5C4E]">
                  <Phone className="w-3.5 h-3.5 text-[#9C7443]" />
                  <span>{selectedOrder.customers?.phone || 'No phone recorded'}</span>
                </div>
                <div className="flex items-center gap-2 text-[#6B5C4E]">
                  <MapPin className="w-3.5 h-3.5 text-[#9C7443]" />
                  <span>{selectedOrder.delivery_address || selectedOrder.delivery_city}</span>
                </div>
              </div>

              {/* Financials Box */}
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EDE4D8] text-xs font-mono space-y-2">
                <span className="text-[10px] uppercase text-[#8A7056] block font-bold mb-2">
                  Payment Reconciliation
                </span>
                <div className="flex justify-between text-[#1E1005]">
                  <span>Total Payable:</span>
                  <span className="font-bold">৳{Number(selectedOrder.total_bdt).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Advance Paid:</span>
                  <span>৳{Number(selectedOrder.paid_amount_bdt || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-amber-700 font-bold pt-1 border-t border-[#E0D4C3]">
                  <span>Balance Due:</span>
                  <span>
                    ৳{Math.max(0, Number(selectedOrder.total_bdt) - Number(selectedOrder.paid_amount_bdt || 0)).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

            </div>

            {/* Ordered Line Items */}
            <div className="mb-6">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-[#8A7056] mb-3 font-medium">
                Commissioned Items
              </span>
              <div className="bg-white rounded-xl border border-[#E8DFD3] overflow-hidden">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#FAF8F5] text-[10px] text-[#7A6A5A] uppercase border-b border-[#E8DFD3]">
                    <tr>
                      <th className="p-3">Item Specification</th>
                      <th className="p-3">Timber / Fabric</th>
                      <th className="p-3 text-center">Qty</th>
                      <th className="p-3 text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DFD3]">
                    {orderItems.map((item) => (
                      <tr key={item.id}>
                        <td className="p-3 text-[#1E1005] font-medium">{item.product_name}</td>
                        <td className="p-3 text-[#6B5C4E]">
                          {item.timber_choice} · {item.fabric_choice}
                        </td>
                        <td className="p-3 text-center text-[#1E1005]">{item.quantity}</td>
                        <td className="p-3 text-right text-[#1E1005] font-bold">
                          ৳{Number(item.total_bdt).toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {selectedOrder.notes && (
              <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EDE4D8] text-xs font-mono text-[#6B5C4E] mb-6">
                <span className="text-[10px] text-[#8A7056] uppercase block mb-1 font-semibold">Production Notes:</span>
                <p>{selectedOrder.notes}</p>
              </div>
            )}

            <div className="flex justify-end pt-4 border-t border-[#E8DFD3]">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2.5 bg-[#1E1005] text-[#FBF0DA] font-mono text-xs uppercase tracking-wider rounded-xl font-semibold hover:bg-[#9C7443] hover:text-white transition-colors cursor-pointer"
              >
                Close Spec
              </button>
            </div>

          </div>
        </div>
      )}

      {/* New Order Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E8DFD3] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD3] mb-6">
              <h2 className="font-display text-xl text-[#1E1005]">Record Showroom Order</h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 text-[#7A6A5A] hover:text-[#1E1005] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-4 text-xs font-mono">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#6B5A4B] mb-1 uppercase font-medium">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={newOrderCustomer.name}
                    onChange={(e) => setNewOrderCustomer({ ...newOrderCustomer, name: e.target.value })}
                    placeholder="e.g. Dr. Salman Chowdhury"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-[#1E1005] focus:outline-none focus:border-[#9C7443] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[#6B5A4B] mb-1 uppercase font-medium">Client Phone *</label>
                  <input
                    type="tel"
                    required
                    value={newOrderCustomer.phone}
                    onChange={(e) => setNewOrderCustomer({ ...newOrderCustomer, phone: e.target.value })}
                    placeholder="+880 1819-XXXXXX"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-[#1E1005] focus:outline-none focus:border-[#9C7443] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#6B5A4B] mb-1 uppercase font-medium">Piece Commissioned</label>
                  <input
                    type="text"
                    value={newOrderData.product_name}
                    onChange={(e) => setNewOrderData({ ...newOrderData, product_name: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-[#1E1005] focus:outline-none focus:border-[#9C7443] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[#6B5A4B] mb-1 uppercase font-medium">Timber Species</label>
                  <input
                    type="text"
                    value={newOrderData.timber_choice}
                    onChange={(e) => setNewOrderData({ ...newOrderData, timber_choice: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-[#1E1005] focus:outline-none focus:border-[#9C7443] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[#6B5A4B] mb-1 uppercase font-medium">Total Price (BDT) *</label>
                  <input
                    type="number"
                    required
                    value={newOrderData.unit_price}
                    onChange={(e) => setNewOrderData({ ...newOrderData, unit_price: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-[#1E1005] focus:outline-none focus:border-[#9C7443] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#6B5A4B] mb-1 uppercase font-medium">Payment Channel</label>
                  <select
                    value={newOrderData.payment_method}
                    onChange={(e) => setNewOrderData({ ...newOrderData, payment_method: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-[#1E1005] focus:outline-none focus:border-[#9C7443] focus:bg-white"
                  >
                    <option value="bkash">bKash Merchant</option>
                    <option value="nagad">Nagad</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="cash">Cash Showroom</option>
                    <option value="card">POS Card</option>
                    <option value="emi">0% EMI</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#6B5A4B] mb-1 uppercase font-medium">Payment Status</label>
                  <select
                    value={newOrderData.payment_status}
                    onChange={(e) => setNewOrderData({ ...newOrderData, payment_status: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-[#1E1005] focus:outline-none focus:border-[#9C7443] focus:bg-white"
                  >
                    <option value="partial">Partial Advance</option>
                    <option value="paid">Paid in Full</option>
                    <option value="unpaid">Unpaid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#6B5A4B] mb-1 uppercase font-medium">Advance Paid (BDT)</label>
                  <input
                    type="number"
                    value={newOrderData.paid_amount}
                    onChange={(e) => setNewOrderData({ ...newOrderData, paid_amount: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-[#1E1005] focus:outline-none focus:border-[#9C7443] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#6B5A4B] mb-1 uppercase font-medium">Delivery Address in Chattogram</label>
                <input
                  type="text"
                  value={newOrderData.delivery_address}
                  onChange={(e) => setNewOrderData({ ...newOrderData, delivery_address: e.target.value })}
                  placeholder="e.g. House 14, Road 3, Nasirabad Housing Society"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-[#1E1005] focus:outline-none focus:border-[#9C7443] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[#6B5A4B] mb-1 uppercase font-medium">Production & Joinery Notes</label>
                <textarea
                  rows="2"
                  value={newOrderData.notes}
                  onChange={(e) => setNewOrderData({ ...newOrderData, notes: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-[#1E1005] focus:outline-none focus:border-[#9C7443] focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8DFD3]">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#DED4C5] text-[#7A6A5A] hover:text-[#1E1005] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-6 py-2.5 bg-[#1E1005] hover:bg-[#9C7443] text-[#FBF0DA] hover:text-white rounded-xl font-semibold transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
                >
                  {creating ? 'Recording...' : 'Create Order & Invoice'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
