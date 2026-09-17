import React, { useState } from 'react';
import Badge from '../components/common/Badge';
import {
  ShieldCheck,
  UserPlus,
  Lock,
  Check,
  X,
  Mail,
  MoreVertical,
  Key,
  Clock
} from 'lucide-react';
import { STAFF_MEMBERS } from '../data/mockData';

export default function StaffPage() {
  const [staffList, setStaffList] = useState(STAFF_MEMBERS);
  const [isInviting, setIsInviting] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    role: 'Product Manager'
  });

  const roles = [
    'Super Admin',
    'Manager',
    'Product Manager',
    'Order Manager',
    'Content Manager',
    'Support Staff'
  ];

  const permissionsMatrix = [
    { role: 'Super Admin', view: true, create: true, edit: true, delete: true, publish: true },
    { role: 'Manager', view: true, create: true, edit: true, delete: false, publish: true },
    { role: 'Product Manager', view: true, create: true, edit: true, delete: false, publish: true },
    { role: 'Order Manager', view: true, create: false, edit: true, delete: false, publish: false },
    { role: 'Content Manager', view: true, create: true, edit: true, delete: false, publish: true },
    { role: 'Support Staff', view: true, create: false, edit: false, delete: false, publish: false }
  ];

  const handleInvite = (e) => {
    e.preventDefault();
    if (!newStaff.name.trim() || !newStaff.email.trim()) return;

    const invited = {
      id: `STF-0${staffList.length + 1}`,
      name: newStaff.name,
      email: newStaff.email,
      role: newStaff.role,
      status: 'Invited',
      lastActive: 'Invitation Pending',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    };

    setStaffList([...staffList, invited]);
    setIsInviting(false);
    setNewStaff({ name: '', email: '', role: 'Product Manager' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#E8E2D9]">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8C7355] block">
            Security & Governance
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-medium text-[#171715] mt-1">
            Staff & Role Permissions ({staffList.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#6F685E] mt-1 font-light">
            Assign team privileges, atelier managers, customer concierge, and RBAC security controls
          </p>
        </div>

        <button
          onClick={() => setIsInviting(true)}
          className="px-4 py-2 bg-[#171715] hover:bg-[#383532] text-[#FAF8F5] rounded-md text-xs font-medium flex items-center gap-2 transition-colors self-start sm:self-auto shadow-xs"
        >
          <UserPlus size={14} />
          <span>+ Invite Staff Member</span>
        </button>
      </div>

      {/* Staff Directory Table */}
      <div className="p-6 rounded-md bg-white border border-[#E8E2D9] shadow-xs">
        <h3 className="font-serif-luxury text-xl font-semibold text-[#171715] mb-4 pb-2 border-b border-[#F2ECE4]">
          Atelier Staff & Administrators
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8E2D9] text-[11px] uppercase tracking-wider text-[#8C7355]">
                <th className="py-3 pl-2">Team Member</th>
                <th className="py-3">Email Address</th>
                <th className="py-3">Assigned Role</th>
                <th className="py-3 text-center">Security Status</th>
                <th className="py-3 text-right">Last Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2EFE9] text-xs">
              {staffList.map((member) => (
                <tr key={member.id} className="hover:bg-[#FAF8F5] transition-colors">
                  <td className="py-3.5 pl-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-9 h-9 rounded-full object-cover border border-[#E8E2D9]"
                      />
                      <div>
                        <div className="font-semibold text-[#171715]">{member.name}</div>
                        <span className="text-[10px] text-[#8C7355] font-mono">
                          {member.id}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 text-[#524C44] font-light">
                    {member.email}
                  </td>

                  <td className="py-3.5">
                    <Badge variant="taupe" size="sm">
                      {member.role}
                    </Badge>
                  </td>

                  <td className="py-3.5 text-center">
                    <Badge
                      variant={
                        member.status === 'Active'
                          ? 'success'
                          : member.status === 'Offline'
                          ? 'default'
                          : 'gold'
                      }
                      size="sm"
                    >
                      {member.status}
                    </Badge>
                  </td>

                  <td className="py-3.5 text-right text-[#6F685E] whitespace-nowrap">
                    {member.lastActive}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permissions Matrix */}
      <div className="p-6 rounded-md bg-white border border-[#E8E2D9] shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-[#F2ECE4]">
          <div>
            <h3 className="font-serif-luxury text-xl font-semibold text-[#171715]">
              Role Access & Permission Matrix
            </h3>
            <p className="text-xs text-[#6F685E] font-light mt-0.5">
              Granular permission limits applied automatically across the Ansari Admin Console
            </p>
          </div>
          <Lock size={16} className="text-[#8C7355]" />
        </div>

        <div className="overflow-x-auto pt-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8E2D9] text-[11px] uppercase tracking-wider text-[#8C7355]">
                <th className="py-3 pl-2">System Role</th>
                <th className="py-3 text-center">View</th>
                <th className="py-3 text-center">Create</th>
                <th className="py-3 text-center">Edit</th>
                <th className="py-3 text-center">Delete</th>
                <th className="py-3 text-center">Publish</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2EFE9] text-xs">
              {permissionsMatrix.map((row) => (
                <tr key={row.role} className="hover:bg-[#FAF8F5] transition-colors">
                  <td className="py-3.5 pl-2 font-semibold text-[#171715]">
                    {row.role}
                  </td>
                  <td className="py-3.5 text-center">
                    {row.view ? (
                      <Check size={14} className="mx-auto text-[#24482B]" />
                    ) : (
                      <X size={14} className="mx-auto text-[#9E978E]" />
                    )}
                  </td>
                  <td className="py-3.5 text-center">
                    {row.create ? (
                      <Check size={14} className="mx-auto text-[#24482B]" />
                    ) : (
                      <X size={14} className="mx-auto text-[#9E978E]" />
                    )}
                  </td>
                  <td className="py-3.5 text-center">
                    {row.edit ? (
                      <Check size={14} className="mx-auto text-[#24482B]" />
                    ) : (
                      <X size={14} className="mx-auto text-[#9E978E]" />
                    )}
                  </td>
                  <td className="py-3.5 text-center">
                    {row.delete ? (
                      <Check size={14} className="mx-auto text-[#24482B]" />
                    ) : (
                      <X size={14} className="mx-auto text-[#9E978E]" />
                    )}
                  </td>
                  <td className="py-3.5 text-center">
                    {row.publish ? (
                      <Check size={14} className="mx-auto text-[#24482B]" />
                    ) : (
                      <X size={14} className="mx-auto text-[#9E978E]" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Invite Staff */}
      {isInviting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171715]/70 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-lg border border-[#DDD5C7] p-6 shadow-2xl space-y-4">
            <h3 className="font-serif-luxury text-xl font-semibold text-[#171715]">
              Invite Team Member
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#524C44] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rohini Roy"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  className="w-full p-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded text-[#171715]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#524C44] mb-1">
                  Corporate Email
                </label>
                <input
                  type="email"
                  placeholder="rohini@ansarifurniture.com"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  className="w-full p-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded text-[#171715]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#524C44] mb-1">
                  Role & Permissions
                </label>
                <select
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                  className="w-full p-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded text-[#171715]"
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#F2ECE4]">
              <button
                onClick={() => setIsInviting(false)}
                className="px-3 py-1.5 bg-[#FAF8F5] text-xs font-medium rounded border border-[#DDD5C7]"
              >
                Cancel
              </button>
              <button
                onClick={handleInvite}
                className="px-4 py-1.5 bg-[#171715] text-white text-xs font-medium rounded"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
