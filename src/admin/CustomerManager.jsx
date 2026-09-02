import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  MapPin,
  ShoppingBag,
  Clock,
  DollarSign,
  User,
  X,
  FileText,
} from 'lucide-react';

export default function CustomerManager() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Chattogram',
    source: 'walk_in',
    notes: '',
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    setLoading(true);
    const { data, error } = await supabase
      .from('customers')
      .select('*, orders(id, total_bdt, status, created_at)')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setCustomers(data);
    }
    setLoading(false);
  }

  const handleSelectCustomer = async (cust) => {
    setSelectedCustomer(cust);
    const { data: orders } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_id', cust.id)
      .order('created_at', { ascending: false });

    setCustomerOrders(orders || []);
  };

  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('customers').insert([newCustomer]);
      if (error) throw error;
      setIsAddModalOpen(false);
      fetchCustomers();
    } catch (err) {
      alert(`Error creating client: ${err.message}`);
    }
  };

  const filteredCustomers = customers.filter((c) => {
    return (
      c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone?.includes(searchQuery) ||
      c.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-[#1E1005]">
            Client Directory & CRM
          </h1>
          <p className="text-xs font-mono text-[#7A6A5A] mt-1">
            Homeowner database across Chattogram & Dhaka, bespoke order histories, and lifetime value.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-[#1E1005] hover:bg-[#9C7443] text-[#FBF0DA] hover:text-white font-mono text-xs uppercase tracking-wider rounded-xl font-semibold flex items-center gap-2 transition-all shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Client</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white border border-[#E8DFD3] rounded-2xl p-4 shadow-xs">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-[#8A7563] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client name, phone, city..."
            className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-xs font-mono text-[#1E1005] placeholder-[#9E9080] focus:outline-none focus:border-[#9C7443] focus:bg-white"
          />
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white border border-[#E8DFD3] rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8DFD3] bg-[#FBF9F5] text-[10px] font-mono uppercase tracking-widest text-[#7A6A5A]">
                <th className="p-4">Client Name & Source</th>
                <th className="p-4">Contact Details</th>
                <th className="p-4">Location / City</th>
                <th className="p-4">Total Orders</th>
                <th className="p-4">Lifetime Spend</th>
                <th className="p-4 text-right">Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DFD3] text-xs font-mono">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-[#7A6A5A]">
                    Loading client profiles from Supabase...
                  </td>
                </tr>
              ) : filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-[#7A6A5A]">
                    No clients found. Client profiles are created automatically when orders or inquiries are logged.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => {
                  const totalSpent = (cust.orders || []).reduce((sum, o) => sum + (Number(o.total_bdt) || 0), 0);
                  const orderCount = (cust.orders || []).length;

                  return (
                    <tr key={cust.id} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="p-4">
                        <span className="font-display text-sm text-[#1E1005] block font-medium">{cust.name}</span>
                        <span className="text-[10px] text-[#8A7056] uppercase font-mono">
                          Source: {cust.source || 'Website'}
                        </span>
                      </td>

                      <td className="p-4 text-[#6B5C4E]">
                        <div className="flex items-center gap-1.5 text-[#1E1005]">
                          <Phone className="w-3 h-3 text-[#9C7443]" />
                          <span>{cust.phone || 'No phone'}</span>
                        </div>
                        {cust.email && (
                          <div className="flex items-center gap-1.5 text-[10px] text-[#8A7663] mt-0.5">
                            <Mail className="w-3 h-3" />
                            <span>{cust.email}</span>
                          </div>
                        )}
                      </td>

                      <td className="p-4 text-[#6B5C4E]">
                        <span>{cust.city || 'Chattogram'}</span>
                        {cust.address && (
                          <span className="text-[10px] text-[#8A7663] block truncate max-w-xs">
                            {cust.address}
                          </span>
                        )}
                      </td>

                      <td className="p-4 text-[#1E1005]">
                        <span className="font-bold">{orderCount}</span> Orders
                      </td>

                      <td className="p-4 text-[#1E1005] font-bold">
                        ৳{totalSpent.toLocaleString('en-IN')}
                      </td>

                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleSelectCustomer(cust)}
                          className="px-2.5 py-1 bg-[#FAF8F5] hover:bg-[#1E1005] text-[#1E1005] hover:text-[#FBF0DA] rounded-lg border border-[#DED4C5] text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer shadow-2xs"
                        >
                          History →
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer History Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E8DFD3] rounded-2xl max-w-2xl w-full p-6 shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD3] mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#9C7443] tracking-widest block font-medium">Client Profile</span>
                <h3 className="font-display text-xl text-[#1E1005]">{selectedCustomer.name}</h3>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-1 text-[#7A6A5A] hover:text-[#1E1005] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-4 p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EDE4D8]">
                <div>
                  <span className="text-[10px] text-[#8A7056] uppercase block font-medium">Phone</span>
                  <span className="text-[#1E1005] font-medium">{selectedCustomer.phone || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8A7056] uppercase block font-medium">Location</span>
                  <span className="text-[#1E1005]">{selectedCustomer.address || selectedCustomer.city}</span>
                </div>
              </div>

              <div>
                <span className="block text-[10px] font-mono uppercase tracking-widest text-[#8A7056] mb-2 font-medium">
                  Order & Commission History ({customerOrders.length})
                </span>
                {customerOrders.length === 0 ? (
                  <p className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EDE4D8] text-[#7A6A5A] text-center">
                    No confirmed orders yet for this client.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {customerOrders.map((o) => (
                      <div
                        key={o.id}
                        className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EDE4D8] flex items-center justify-between"
                      >
                        <div>
                          <span className="font-bold text-[#1E1005] block">{o.order_number}</span>
                          <span className="text-[10px] text-[#7A6A5A]">
                            {new Date(o.created_at).toLocaleDateString('en-GB')} · Status: {o.status}
                          </span>
                        </div>
                        <span className="font-bold text-[#1E1005]">
                          ৳{Number(o.total_bdt).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-4 border-t border-[#E8DFD3]">
                <button
                  type="button"
                  onClick={() => setSelectedCustomer(null)}
                  className="px-4 py-2 bg-[#1E1005] text-[#FBF0DA] rounded-xl font-mono text-xs uppercase tracking-wider font-semibold cursor-pointer hover:bg-[#9C7443] transition-colors"
                >
                  Close Profile
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Add Client Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E8DFD3] rounded-2xl max-w-md w-full p-6 shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD3] mb-4">
              <h3 className="font-display text-lg text-[#1E1005]">Add New Client Profile</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-[#7A6A5A] hover:text-[#1E1005] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-[#6B5A4B] mb-1 uppercase font-medium">Client Name *</label>
                <input
                  type="text"
                  required
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  placeholder="e.g. Architect Fahim Alom"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-[#1E1005] focus:outline-none focus:border-[#9C7443] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[#6B5A4B] mb-1 uppercase font-medium">Phone Number</label>
                <input
                  type="tel"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  placeholder="+880 1711-XXXXXX"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-[#1E1005] focus:outline-none focus:border-[#9C7443] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[#6B5A4B] mb-1 uppercase font-medium">Delivery Address</label>
                <input
                  type="text"
                  value={newCustomer.address}
                  onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                  placeholder="Khulshi Hills, Chattogram"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-[#1E1005] focus:outline-none focus:border-[#9C7443] focus:bg-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E8DFD3]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#DED4C5] text-[#7A6A5A] hover:text-[#1E1005] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1E1005] hover:bg-[#9C7443] text-[#FBF0DA] hover:text-white rounded-xl font-semibold cursor-pointer shadow-sm transition-colors"
                >
                  Save Client
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
