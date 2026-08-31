import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAdminAuth } from './AdminAuthContext';
import {
  UserCog,
  Shield,
  Store,
  UserCheck,
  Plus,
  Trash2,
  Lock,
  Mail,
  Phone,
  Check,
  X,
  AlertCircle,
} from 'lucide-react';

export default function StaffManager() {
  const { staffProfile } = useAdminAuth();
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'sales_rep',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchStaff();
  }, []);

  async function fetchStaff() {
    setLoading(true);
    const { data, error } = await supabase
      .from('staff')
      .select('*')
      .order('created_at', { ascending: true });

    if (!error && data) {
      setStaffList(data);
    }
    setLoading(false);
  }

  const handleAddStaff = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { error } = await supabase.from('staff').insert([newStaff]);
      if (error) throw error;
      setIsAddModalOpen(false);
      fetchStaff();
    } catch (err) {
      alert(`Error creating staff member: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (member) => {
    const nextState = !member.is_active;
    setStaffList((prev) =>
      prev.map((s) => (s.id === member.id ? { ...s, is_active: nextState } : s))
    );
    await supabase.from('staff').update({ is_active: nextState }).eq('id', member.id);
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-4 h-4 text-bronze" />;
      case 'manager':
        return <Store className="w-4 h-4 text-blue-400" />;
      case 'sales_rep':
        return <UserCheck className="w-4 h-4 text-emerald-400" />;
      default:
        return <UserCog className="w-4 h-4 text-linen-muted" />;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-linen">Staff & Access Control</h1>
          <p className="text-xs font-mono text-linen-muted mt-1">
            Manage store manager permissions, showroom sales representatives, and admin credentials.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-bronze hover:bg-bronze-light text-linen hover:text-espresso font-mono text-xs uppercase tracking-wider rounded-lg font-semibold flex items-center gap-2 transition-all shadow-lg cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Staff Member</span>
        </button>
      </div>

      {/* Staff Table */}
      <div className="bg-surface border border-bronze/15 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-bronze/15 bg-surface-elevated/60 text-[10px] font-mono uppercase tracking-widest text-linen-muted">
                <th className="p-4">Staff Member</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Assigned Role</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bronze/10 text-xs font-mono">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-linen-muted">
                    Loading staff directory from Supabase...
                  </td>
                </tr>
              ) : staffList.length === 0 ? (
                // Sample staff display if no DB rows created yet
                <>
                  <tr className="hover:bg-surface-elevated/40 transition-colors">
                    <td className="p-4">
                      <span className="font-display text-sm text-linen block">Alfaz Mahmud Rizve</span>
                      <span className="text-[10px] text-bronze-light font-mono">System Administrator</span>
                    </td>
                    <td className="p-4 text-linen-muted">
                      <span>admin@heavenfurniture.com</span>
                      <span className="block text-[10px]">+880 1960-481983</span>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-bronze/20 text-bronze border border-bronze/30 text-[10px] font-mono uppercase">
                        <Shield className="w-3 h-3" /> Admin (Full Access)
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                        Active
                      </span>
                    </td>
                    <td className="p-4 text-right text-linen-muted/40">Default Superadmin</td>
                  </tr>

                  <tr className="hover:bg-surface-elevated/40 transition-colors">
                    <td className="p-4">
                      <span className="font-display text-sm text-linen block">Agrabad Store Manager</span>
                      <span className="text-[10px] text-blue-400 font-mono">Floor Manager</span>
                    </td>
                    <td className="p-4 text-linen-muted">
                      <span>manager@heavenfurniture.com</span>
                      <span className="block text-[10px]">+880 1819-000001</span>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-mono uppercase">
                        <Store className="w-3 h-3" /> Store Manager
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                        Active
                      </span>
                    </td>
                    <td className="p-4 text-right text-linen-muted">Active Floor Account</td>
                  </tr>

                  <tr className="hover:bg-surface-elevated/40 transition-colors">
                    <td className="p-4">
                      <span className="font-display text-sm text-linen block">Showroom Sales Stylist</span>
                      <span className="text-[10px] text-emerald-400 font-mono">Bespoke Concierge</span>
                    </td>
                    <td className="p-4 text-linen-muted">
                      <span>sales@heavenfurniture.com</span>
                      <span className="block text-[10px]">+880 1819-000002</span>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono uppercase">
                        <UserCheck className="w-3 h-3" /> Sales Representative
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                        Active
                      </span>
                    </td>
                    <td className="p-4 text-right text-linen-muted">Active Sales Account</td>
                  </tr>
                </>
              ) : (
                staffList.map((member) => (
                  <tr key={member.id} className="hover:bg-surface-elevated/40 transition-colors">
                    <td className="p-4">
                      <span className="font-display text-sm text-linen block">{member.name}</span>
                    </td>
                    <td className="p-4 text-linen-muted">
                      <span>{member.email}</span>
                      {member.phone && <span className="block text-[10px]">{member.phone}</span>}
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-elevated border border-bronze/20 text-linen text-[10px] font-mono uppercase">
                        {getRoleIcon(member.role)} {member.role?.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleActive(member)}
                        className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono cursor-pointer ${
                          member.is_active
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/40'
                            : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                        }`}
                      >
                        {member.is_active ? 'Active' : 'Suspended'}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <span className="text-[10px] text-linen-muted">Managed</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Permissions Matrix */}
      <div className="bg-surface border border-bronze/15 rounded-xl p-6">
        <h3 className="font-display text-lg text-linen mb-4">
          Role-Based Access Control (RBAC) Matrix
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-bronze/15 text-[10px] text-linen-muted uppercase">
                <th className="p-3">Module / Capability</th>
                <th className="p-3 text-center">Admin</th>
                <th className="p-3 text-center">Store Manager</th>
                <th className="p-3 text-center">Sales Rep</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bronze/10">
              <tr>
                <td className="p-3 text-linen">Product Catalog CRUD (Add, Edit, Price, Specs)</td>
                <td className="p-3 text-center text-emerald-400">✓ Full</td>
                <td className="p-3 text-center text-emerald-400">✓ Full</td>
                <td className="p-3 text-center text-linen-muted/40">Read-only</td>
              </tr>
              <tr>
                <td className="p-3 text-linen">Inventory & Timber Stock Adjustment (+/-)</td>
                <td className="p-3 text-center text-emerald-400">✓ Full</td>
                <td className="p-3 text-center text-emerald-400">✓ Full</td>
                <td className="p-3 text-center text-linen-muted/40">Read-only</td>
              </tr>
              <tr>
                <td className="p-3 text-linen">Order Tracking & Status Progression Stepper</td>
                <td className="p-3 text-center text-emerald-400">✓ Full</td>
                <td className="p-3 text-center text-emerald-400">✓ Full</td>
                <td className="p-3 text-center text-emerald-400">✓ Full</td>
              </tr>
              <tr>
                <td className="p-3 text-linen">Payment Reconciliation (bKash, Nagad, Bank)</td>
                <td className="p-3 text-center text-emerald-400">✓ Full</td>
                <td className="p-3 text-center text-emerald-400">✓ Full</td>
                <td className="p-3 text-center text-linen-muted/40">View Balance</td>
              </tr>
              <tr>
                <td className="p-3 text-linen">Bespoke 3D Configurator Leads & Order Conversion</td>
                <td className="p-3 text-center text-emerald-400">✓ Full</td>
                <td className="p-3 text-center text-emerald-400">✓ Full</td>
                <td className="p-3 text-center text-emerald-400">✓ Full</td>
              </tr>
              <tr>
                <td className="p-3 text-linen">Staff Account Creation & Role Assignment</td>
                <td className="p-3 text-center text-emerald-400">✓ Admin Only</td>
                <td className="p-3 text-center text-red-400">✗ No</td>
                <td className="p-3 text-center text-red-400">✗ No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-bronze/30 rounded-xl max-w-md w-full p-6 shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-bronze/15 mb-4">
              <h3 className="font-display text-lg text-linen">Add Staff Member</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-linen-muted hover:text-linen cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStaff} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-linen-muted mb-1 uppercase">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  placeholder="e.g. Tanvir Ahmed"
                  className="w-full p-2.5 bg-espresso border border-bronze/20 rounded-lg text-linen focus:outline-none focus:border-bronze"
                />
              </div>

              <div>
                <label className="block text-linen-muted mb-1 uppercase">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  placeholder="tanvir@heavenfurniture.com"
                  className="w-full p-2.5 bg-espresso border border-bronze/20 rounded-lg text-linen focus:outline-none focus:border-bronze"
                />
              </div>

              <div>
                <label className="block text-linen-muted mb-1 uppercase">Phone Number</label>
                <input
                  type="tel"
                  value={newStaff.phone}
                  onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                  placeholder="+880 1819-XXXXXX"
                  className="w-full p-2.5 bg-espresso border border-bronze/20 rounded-lg text-linen focus:outline-none focus:border-bronze"
                />
              </div>

              <div>
                <label className="block text-linen-muted mb-1 uppercase">Assigned Role</label>
                <select
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                  className="w-full p-2.5 bg-espresso border border-bronze/20 rounded-lg text-linen focus:outline-none focus:border-bronze"
                >
                  <option value="sales_rep">Sales Representative</option>
                  <option value="manager">Store Floor Manager</option>
                  <option value="admin">System Administrator</option>
                </select>
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
                  disabled={saving}
                  className="px-5 py-2 bg-bronze text-linen rounded-lg font-semibold cursor-pointer"
                >
                  {saving ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
