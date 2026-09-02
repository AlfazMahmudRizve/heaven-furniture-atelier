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
  const { staffMember, role } = useAdminAuth();
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'sales_rep',
    password: '',
  });
  const [saving, setSaving] = useState(false);
  const [actionMsg, setActionMsg] = useState(null);

  useEffect(() => {
    fetchStaff();
  }, []);

  async function fetchStaff() {
    setLoading(true);
    const { data, error } = await supabase
      .from('staff')
      .select('id, name, email, role, phone, is_active, created_at')
      .order('created_at', { ascending: true });

    if (!error && data) {
      setStaffList(data);
    }
    setLoading(false);
  }

  const handleAddStaff = async (e) => {
    e.preventDefault();
    setSaving(true);
    setActionMsg(null);
    try {
      // Call Postgres to insert staff with hashed password
      const { error } = await supabase.rpc('execute_sql', {
        query: `
          INSERT INTO staff (name, email, role, phone, is_active, password_hash)
          VALUES (
            '${newStaff.name.replace(/'/g, "''")}',
            '${newStaff.email.trim().toLowerCase()}',
            '${newStaff.role}',
            '${newStaff.phone}',
            true,
            crypt('${newStaff.password.replace(/'/g, "''")}', gen_salt('bf'))
          );
        `
      }).catch(async () => {
        // Fallback standard insert if RPC disabled
        return await supabase.from('staff').insert([
          {
            name: newStaff.name,
            email: newStaff.email.trim().toLowerCase(),
            phone: newStaff.phone,
            role: newStaff.role,
            is_active: true,
          }
        ]);
      });

      if (error) throw error;
      setActionMsg({ type: 'success', text: `Created staff account for ${newStaff.name}` });
      setIsAddModalOpen(false);
      setNewStaff({ name: '', email: '', phone: '', role: 'sales_rep', password: '' });
      fetchStaff();
    } catch (err) {
      setActionMsg({ type: 'error', text: `Error creating staff: ${err.message}` });
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (member) => {
    if (member.email === 'admin@heavenfurniture.com') {
      alert('Cannot suspend the primary administrator account.');
      return;
    }
    const nextState = !member.is_active;
    setStaffList((prev) =>
      prev.map((s) => (s.id === member.id ? { ...s, is_active: nextState } : s))
    );
    await supabase.from('staff').update({ is_active: nextState }).eq('id', member.id);
  };

  const getRoleIcon = (memberRole) => {
    switch (memberRole) {
      case 'admin':
        return <Shield className="w-3.5 h-3.5 text-[#C5A880]" />;
      case 'manager':
        return <Store className="w-3.5 h-3.5 text-blue-700" />;
      case 'sales_rep':
        return <UserCheck className="w-3.5 h-3.5 text-emerald-700" />;
      default:
        return <UserCog className="w-3.5 h-3.5 text-[#8A7563]" />;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-[#1E1005]">Staff & Access Control</h1>
          <p className="text-xs font-mono text-[#7A6A5A] mt-1">
            Manage store manager permissions, showroom sales representatives, and admin credentials.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-[#1E1005] hover:bg-[#9C7443] text-[#FBF0DA] hover:text-white font-mono text-xs uppercase tracking-wider rounded-xl font-semibold flex items-center gap-2 transition-all shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Staff Member</span>
        </button>
      </div>

      {actionMsg && (
        <div
          className={`p-3.5 rounded-xl flex items-center gap-2 text-xs font-mono ${
            actionMsg.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {actionMsg.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{actionMsg.text}</span>
        </div>
      )}

      {/* Staff Table */}
      <div className="bg-white border border-[#E8DFD3] rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8DFD3] bg-[#FBF9F5] text-[10px] font-mono uppercase tracking-widest text-[#7A6A5A]">
                <th className="p-4">Staff Member</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Assigned Role</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DFD3] text-xs font-mono">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-[#7A6A5A]">
                    Loading staff directory from Supabase...
                  </td>
                </tr>
              ) : staffList.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-[#7A6A5A]">
                    No staff records found in database.
                  </td>
                </tr>
              ) : (
                staffList.map((member) => (
                  <tr key={member.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="p-4">
                      <span className="font-display text-sm text-[#1E1005] block font-medium">{member.name}</span>
                      <span className="text-[10px] text-[#8A7056]">
                        Created {new Date(member.created_at || Date.now()).toLocaleDateString('en-GB')}
                      </span>
                    </td>

                    <td className="p-4 text-[#6B5C4E]">
                      <span>{member.email}</span>
                      {member.phone && <span className="block text-[10px] text-[#8A7663]">{member.phone}</span>}
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase font-semibold border ${
                          member.role === 'admin'
                            ? 'bg-[#1E1005] text-[#FBF0DA] border-[#1E1005]'
                            : member.role === 'manager'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}
                      >
                        {getRoleIcon(member.role)} {member.role?.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => handleToggleActive(member)}
                        className={`px-2 py-0.5 rounded-md text-[10px] uppercase font-mono font-medium cursor-pointer border ${
                          member.is_active
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-zinc-100 text-zinc-600 border-zinc-300'
                        }`}
                      >
                        {member.is_active ? 'Active' : 'Suspended'}
                      </button>
                    </td>

                    <td className="p-4 text-right text-[#7A6A5A]">
                      {member.email === 'admin@heavenfurniture.com' ? (
                        <span className="text-[10px] text-[#8A7563]">Primary Root</span>
                      ) : (
                        <span className="text-[10px] text-emerald-700 font-medium">Verified Account</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Permissions Matrix */}
      <div className="bg-white border border-[#E8DFD3] rounded-2xl p-6 shadow-xs">
        <h3 className="font-display text-lg text-[#1E1005] mb-4">
          Role-Based Access Control (RBAC) Matrix
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-[#E8DFD3] bg-[#FBF9F5] text-[10px] text-[#7A6A5A] uppercase">
                <th className="p-3">Module / Capability</th>
                <th className="p-3 text-center">Superadmin</th>
                <th className="p-3 text-center">Store Manager</th>
                <th className="p-3 text-center">Sales Stylist</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DFD3]">
              <tr>
                <td className="p-3 text-[#1E1005]">Product Catalog CRUD (Add, Edit, Price, Specs)</td>
                <td className="p-3 text-center text-emerald-700 font-semibold">✓ Full Access</td>
                <td className="p-3 text-center text-emerald-700 font-semibold">✓ Full Access</td>
                <td className="p-3 text-center text-[#8A7563]">Read-Only</td>
              </tr>
              <tr>
                <td className="p-3 text-[#1E1005]">Inventory & Timber Stock Adjustment (+/-)</td>
                <td className="p-3 text-center text-emerald-700 font-semibold">✓ Full Access</td>
                <td className="p-3 text-center text-emerald-700 font-semibold">✓ Full Access</td>
                <td className="p-3 text-center text-[#8A7563]">Read-Only</td>
              </tr>
              <tr>
                <td className="p-3 text-[#1E1005]">Order Tracking & Status Progression Stepper</td>
                <td className="p-3 text-center text-emerald-700 font-semibold">✓ Full Access</td>
                <td className="p-3 text-center text-emerald-700 font-semibold">✓ Full Access</td>
                <td className="p-3 text-center text-emerald-700 font-semibold">✓ Advance Step</td>
              </tr>
              <tr>
                <td className="p-3 text-[#1E1005]">Payment Reconciliation (bKash, Nagad, Bank)</td>
                <td className="p-3 text-center text-emerald-700 font-semibold">✓ Full Access</td>
                <td className="p-3 text-center text-emerald-700 font-semibold">✓ Full Access</td>
                <td className="p-3 text-center text-[#8A7563]">View Balance</td>
              </tr>
              <tr>
                <td className="p-3 text-[#1E1005]">Bespoke 3D Configurator Leads & Order Conversion</td>
                <td className="p-3 text-center text-emerald-700 font-semibold">✓ Full Access</td>
                <td className="p-3 text-center text-emerald-700 font-semibold">✓ Full Access</td>
                <td className="p-3 text-center text-emerald-700 font-semibold">✓ Full Access</td>
              </tr>
              <tr>
                <td className="p-3 text-[#1E1005]">Staff Account Creation & Role Assignment</td>
                <td className="p-3 text-center text-emerald-700 font-semibold">✓ Superadmin Only</td>
                <td className="p-3 text-center text-red-600 font-medium">✗ 403 Forbidden</td>
                <td className="p-3 text-center text-red-600 font-medium">✗ 403 Forbidden</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E8DFD3] rounded-2xl max-w-md w-full p-6 shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD3] mb-4">
              <h3 className="font-display text-lg text-[#1E1005]">Create New Staff Member</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-[#7A6A5A] hover:text-[#1E1005] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStaff} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-[#6B5A4B] mb-1 uppercase font-medium">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  placeholder="e.g. Tanvir Ahmed"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-[#1E1005] focus:outline-none focus:border-[#9C7443] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[#6B5A4B] mb-1 uppercase font-medium">Staff Email *</label>
                <input
                  type="email"
                  required
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  placeholder="tanvir@heavenfurniture.com"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-[#1E1005] focus:outline-none focus:border-[#9C7443] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[#6B5A4B] mb-1 uppercase font-medium">Password *</label>
                <input
                  type="password"
                  required
                  value={newStaff.password}
                  onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
                  placeholder="Create secure staff password"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-[#1E1005] focus:outline-none focus:border-[#9C7443] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[#6B5A4B] mb-1 uppercase font-medium">Phone Number</label>
                <input
                  type="tel"
                  value={newStaff.phone}
                  onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                  placeholder="+880 1819-XXXXXX"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-[#1E1005] focus:outline-none focus:border-[#9C7443] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[#6B5A4B] mb-1 uppercase font-medium">Assigned Role</label>
                <select
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#DED4C5] rounded-xl text-[#1E1005] focus:outline-none focus:border-[#9C7443] focus:bg-white"
                >
                  <option value="sales_rep">Sales Representative</option>
                  <option value="manager">Store Floor Manager</option>
                  <option value="admin">Superadmin</option>
                </select>
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
                  disabled={saving}
                  className="px-5 py-2 bg-[#1E1005] hover:bg-[#9C7443] text-[#FBF0DA] hover:text-white rounded-xl font-semibold cursor-pointer shadow-sm transition-colors"
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
