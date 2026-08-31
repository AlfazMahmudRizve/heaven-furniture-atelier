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
          <h1 className="font-display text-2xl md:text-3xl text-linen">
            Client Directory & CRM
          </h1>
          <p className="text-xs font-mono text-linen-muted mt-1">
            Homeowner database across Chattogram & Dhaka, order histories, and lifetime value.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-bronze hover:bg-bronze-light text-linen hover:text-espresso font-mono text-xs uppercase tracking-wider rounded-lg font-semibold flex items-center gap-2 transition-all shadow-lg cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Client</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-surface border border-bronze/15 rounded-xl p-4">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-linen-muted/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client name, phone, city..."
            className="w-full pl-10 pr-4 py-2 bg-surface-elevated border border-bronze/15 rounded-lg text-xs font-mono text-linen placeholder-linen-muted/40 focus:outline-none focus:border-bronze"
          />
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-surface border border-bronze/15 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-bronze/15 bg-surface-elevated/60 text-[10px] font-mono uppercase tracking-widest text-linen-muted">
                <th className="p-4">Client Name & Source</th>
                <th className="p-4">Contact Details</th>
                <th className="p-4">Location / City</th>
                <th className="p-4">Total Orders</th>
                <th className="p-4">Lifetime Spend</th>
                <th className="p-4 text-right">Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bronze/10 text-xs font-mono">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-linen-muted">
                    Loading client profiles from Supabase...
                  </td>
                </tr>
              ) : filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-linen-muted">
                    No clients found. Client profiles are created automatically when orders or inquiries are logged.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => {
                  const totalSpent = (cust.orders || []).reduce((sum, o) => sum + (Number(o.total_bdt) || 0), 0);
                  const orderCount = (cust.orders || []).length;

                  return (
                    <tr key={cust.id} className="hover:bg-surface-elevated/40 transition-colors">
                      <td className="p-4">
                        <span className="font-display text-sm text-linen block">{cust.name}</span>
                        <span className="text-[10px] text-bronze-light uppercase font-mono">
                          Source: {cust.source || 'Website'}
                        </span>
                      </td>

                      <td className="p-4 text-linen-muted">
                        <div className="flex items-center gap-1.5 text-linen">
                          <Phone className="w-3 h-3 text-bronze" />
                          <span>{cust.phone || 'No phone'}</span>
                        </div>
                        {cust.email && (
                          <div className="flex items-center gap-1.5 text-[10px] text-linen-muted/60 mt-0.5">
                            <Mail className="w-3 h-3" />
                            <span>{cust.email}</span>
                          </div>
                        )}
                      </td>

                      <td className="p-4 text-linen-muted">
                        <span>{cust.city || 'Chattogram'}</span>
                        {cust.address && (
                          <span className="text-[10px] text-linen-muted/60 block truncate max-w-xs">
                            {cust.address}
                          </span>
                        )}
                      </td>

                      <td className="p-4 text-linen">
                        <span className="font-bold">{orderCount}</span> Orders
                      </td>

                      <td className="p-4 text-linen font-bold">
                        ৳{totalSpent.toLocaleString('en-IN')}
                      </td>

                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleSelectCustomer(cust)}
                          className="px-2.5 py-1 bg-surface-elevated hover:bg-bronze text-linen-muted hover:text-linen rounded border border-bronze/20 text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-bronze/30 rounded-xl max-w-2xl w-full p-6 shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-bronze/15 mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-bronze tracking-widest block">Client Profile</span>
                <h3 className="font-display text-xl text-linen">{selectedCustomer.name}</h3>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-1 text-linen-muted hover:text-linen cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-4 p-3 bg-surface-elevated rounded-lg border border-bronze/15">
                <div>
                  <span className="text-[10px] text-bronze uppercase block">Phone</span>
                  <span className="text-linen">{selectedCustomer.phone || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-bronze uppercase block">Location</span>
                  <span className="text-linen">{selectedCustomer.address || selectedCustomer.city}</span>
                </div>
              </div>

              <div>
                <span className="block text-[10px] font-mono uppercase tracking-widest text-bronze-light mb-2">
                  Order & Commission History ({customerOrders.length})
                </span>
                {customerOrders.length === 0 ? (
                  <p className="p-4 bg-espresso rounded-lg border border-bronze/10 text-linen-muted text-center">
                    No confirmed orders yet for this client.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {customerOrders.map((o) => (
                      <div
                        key={o.id}
                        className="p-3 bg-surface-elevated rounded-lg border border-bronze/10 flex items-center justify-between"
                      >
                        <div>
                          <span className="font-bold text-linen block">{o.order_number}</span>
                          <span className="text-[10px] text-linen-muted">
                            {new Date(o.created_at).toLocaleDateString('en-GB')} · Status: {o.status}
                          </span>
                        </div>
                        <span className="font-bold text-linen">
                          ৳{Number(o.total_bdt).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-4 border-t border-bronze/15">
                <button
                  type="button"
                  onClick={() => setSelectedCustomer(null)}
                  className="px-4 py-2 bg-bronze text-linen rounded-lg font-mono text-xs uppercase tracking-wider font-semibold cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-bronze/30 rounded-xl max-w-md w-full p-6 shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-bronze/15 mb-4">
              <h3 className="font-display text-lg text-linen">Add New Client Profile</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-linen-muted hover:text-linen cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-linen-muted mb-1 uppercase">Client Name *</label>
                <input
                  type="text"
                  required
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  placeholder="e.g. Architect Fahim Alom"
                  className="w-full p-2.5 bg-espresso border border-bronze/20 rounded-lg text-linen focus:outline-none focus:border-bronze"
                />
              </div>

              <div>
                <label className="block text-linen-muted mb-1 uppercase">Phone Number</label>
                <input
                  type="tel"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  placeholder="+880 1711-XXXXXX"
                  className="w-full p-2.5 bg-espresso border border-bronze/20 rounded-lg text-linen focus:outline-none focus:border-bronze"
                />
              </div>

              <div>
                <label className="block text-linen-muted mb-1 uppercase">Delivery Address</label>
                <input
                  type="text"
                  value={newCustomer.address}
                  onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                  placeholder="Khulshi Hills, Chattogram"
                  className="w-full p-2.5 bg-espresso border border-bronze/20 rounded-lg text-linen focus:outline-none focus:border-bronze"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-bronze/15">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-bronze/20 text-linen-muted hover:text-linen cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-bronze text-linen rounded-lg font-semibold cursor-pointer"
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
