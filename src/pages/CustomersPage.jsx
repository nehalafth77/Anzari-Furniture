import React, { useState } from 'react';
import Badge from '../components/common/Badge';
import {
  Users,
  UserPlus,
  Repeat,
  TrendingUp,
  Search,
  Mail,
  Phone,
  MapPin,
  Eye,
  Calendar,
  Sparkles
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function CustomersPage({ customers }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('All');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const growthData = [
    { month: 'Apr', patrons: 8400, newPatrons: 310 },
    { month: 'May', patrons: 8900, newPatrons: 340 },
    { month: 'Jun', patrons: 9350, newPatrons: 380 },
    { month: 'Jul', patrons: 9800, newPatrons: 410 },
    { month: 'Aug', patrons: 10416, newPatrons: 416 },
    { month: 'Sep', patrons: 10842, newPatrons: 426 }
  ];

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTier =
      tierFilter === 'All' || c.status.includes(tierFilter);

    return matchesSearch && matchesTier;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#E8E2D9]">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8C7355] block">
            Patronage & Concierge
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-medium text-[#171715] mt-1">
            Patrons & Clients ({customers.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#6F685E] mt-1 font-light">
            Luxury client profiles, interior designer trade accounts, and relationship histories
          </p>
        </div>
      </div>

      {/* Customer Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-md border border-[#E8E2D9] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#6F685E]">
            <span>Total Registered Patrons</span>
            <Users size={16} className="text-[#8C7355]" />
          </div>
          <div className="font-serif-luxury text-3xl font-bold text-[#171715] mt-2">
            10,842
          </div>
          <div className="text-[11px] text-[#24482B] mt-1 font-medium">
            +14.2% YoY Acquisition
          </div>
        </div>

        <div className="p-5 bg-white rounded-md border border-[#E8E2D9] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#6F685E]">
            <span>New Patrons (30 Days)</span>
            <UserPlus size={16} className="text-[#8C7355]" />
          </div>
          <div className="font-serif-luxury text-3xl font-bold text-[#171715] mt-2">
            +426
          </div>
          <div className="text-[11px] text-[#6F685E] mt-1">
            82% Completed First Order
          </div>
        </div>

        <div className="p-5 bg-white rounded-md border border-[#E8E2D9] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#6F685E]">
            <span>Returning Patron Rate</span>
            <Repeat size={16} className="text-[#8C7355]" />
          </div>
          <div className="font-serif-luxury text-3xl font-bold text-[#171715] mt-2">
            68%
          </div>
          <div className="text-[11px] text-[#8C7355] mt-1 font-medium">
            Heirloom Repeat Purchases
          </div>
        </div>

        <div className="p-5 bg-white rounded-md border border-[#E8E2D9] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#6F685E]">
            <span>Average Customer Value</span>
            <TrendingUp size={16} className="text-[#8C7355]" />
          </div>
          <div className="font-serif-luxury text-3xl font-bold text-[#171715] mt-2">
            ₹18,420
          </div>
          <div className="text-[11px] text-[#24482B] mt-1 font-medium">
            +8.5% Cart Expansion
          </div>
        </div>
      </div>

      {/* Customer Growth Chart */}
      <div className="p-6 rounded-md bg-white border border-[#E8E2D9]">
        <div className="flex items-center justify-between pb-4 border-b border-[#F2ECE4]">
          <div>
            <h3 className="font-serif-luxury text-xl font-semibold text-[#171715]">
              Patron Growth & Trade Acquisition
            </h3>
            <p className="text-xs text-[#6F685E] mt-0.5 font-light">
              6-month expansion of direct private clientele and verified trade architects
            </p>
          </div>
          <span className="text-xs font-mono text-[#8C7355] bg-[#FAF8F5] px-2.5 py-1 rounded border border-[#E8E2D9]">
            Cumulative Patrons
          </span>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={growthData}>
              <defs>
                <linearGradient id="patronGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8C7355" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#8C7355" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F2EFE9" vertical={false} />
              <XAxis dataKey="month" tickLine={false} stroke="#E8E2D9" tick={{ fill: '#8C8275', fontSize: 11 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: '#8C8275', fontSize: 11 }} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#171715] text-[#FAF8F5] p-3 rounded shadow-xl border border-[#3A3734] text-xs">
                        <div className="text-[#A89F93] text-[10px] uppercase mb-1">{label} 2026</div>
                        <div className="font-serif-luxury text-base font-semibold text-[#FAF8F5]">
                          {payload[0].value.toLocaleString('en-IN')} Patrons
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="patrons"
                stroke="#8C7355"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#patronGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Customer Directory Table */}
      <div className="p-6 rounded-md bg-white border border-[#E8E2D9] shadow-xs">
        {/* Table Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-5 border-b border-[#F2ECE4]">
          <div className="relative w-full sm:max-w-md">
            <Search size={15} className="absolute left-3.5 top-2.5 text-[#9E978E]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patron by name, email, city..."
              className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-md text-xs text-[#171715] focus:outline-none focus:border-[#8C7355]"
            />
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs text-[#6F685E]">Tier:</span>
            {['All', 'VIP', 'Trade', 'Active'].map((t) => (
              <button
                key={t}
                onClick={() => setTierFilter(t)}
                className={`text-xs px-3 py-1 rounded-sm transition-colors ${
                  tierFilter === t
                    ? 'bg-[#171715] text-[#FAF8F5] font-medium'
                    : 'bg-[#FAF8F5] text-[#6F685E] hover:text-[#171715] border border-[#E8E2D9]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto pt-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8E2D9] text-[11px] uppercase tracking-wider text-[#8C7355]">
                <th className="py-3 pl-2">Customer Profile</th>
                <th className="py-3">Contact Details</th>
                <th className="py-3 text-center">Orders</th>
                <th className="py-3 text-right">Total Spent</th>
                <th className="py-3 text-center">Last Order</th>
                <th className="py-3 text-center">Tier Status</th>
                <th className="py-3 text-right pr-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2EFE9] text-xs">
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-[#FAF8F5] transition-colors group"
                >
                  <td className="py-3.5 pl-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={customer.avatar}
                        alt={customer.name}
                        className="w-9 h-9 rounded-full object-cover border border-[#E8E2D9]"
                      />
                      <div>
                        <div className="font-semibold text-[#171715]">
                          {customer.name}
                        </div>
                        <div className="text-[11px] text-[#8C7355] flex items-center gap-1 font-light">
                          <MapPin size={11} /> {customer.location}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5">
                    <div className="text-[#524C44] flex items-center gap-1.5">
                      <Mail size={12} className="text-[#9E978E]" />
                      <span>{customer.email}</span>
                    </div>
                    <div className="text-[11px] text-[#6F685E] flex items-center gap-1.5 mt-0.5">
                      <Phone size={11} className="text-[#9E978E]" />
                      <span>{customer.phone}</span>
                    </div>
                  </td>

                  <td className="py-3.5 text-center font-medium text-[#171715]">
                    {customer.ordersCount}
                  </td>

                  <td className="py-3.5 text-right font-serif-luxury text-sm font-semibold text-[#171715]">
                    ₹{customer.totalSpent.toLocaleString('en-IN')}
                  </td>

                  <td className="py-3.5 text-center text-[#6F685E]">
                    {customer.lastOrder}
                  </td>

                  <td className="py-3.5 text-center">
                    <Badge
                      variant={
                        customer.status.includes('VIP')
                          ? 'gold'
                          : customer.status.includes('Trade')
                          ? 'taupe'
                          : 'default'
                      }
                      size="sm"
                    >
                      {customer.status}
                    </Badge>
                  </td>

                  <td className="py-3.5 text-right pr-2">
                    <button
                      onClick={() => setSelectedCustomer(customer)}
                      className="px-2.5 py-1 bg-[#FAF8F5] hover:bg-[#EFECE6] border border-[#DDD5C7] rounded text-[11px] font-medium text-[#171715] flex items-center gap-1 transition-colors ml-auto"
                    >
                      <Eye size={12} />
                      <span>Profile</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Profile Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171715]/70 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-lg border border-[#DDD5C7] p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#F2ECE4]">
              <img
                src={selectedCustomer.avatar}
                alt={selectedCustomer.name}
                className="w-12 h-12 rounded-full object-cover border border-[#DDD5C7]"
              />
              <div>
                <h3 className="font-serif-luxury text-xl font-semibold text-[#171715]">
                  {selectedCustomer.name}
                </h3>
                <span className="text-xs text-[#8C7355]">{selectedCustomer.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#FAF8F5] rounded border border-[#E8E2D9]">
                <span className="text-[#9E978E] text-[10px] block">Lifetime Value</span>
                <span className="text-sm font-bold text-[#171715]">
                  ₹{selectedCustomer.totalSpent.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="p-3 bg-[#FAF8F5] rounded border border-[#E8E2D9]">
                <span className="text-[#9E978E] text-[10px] block">Total Orders Placed</span>
                <span className="text-sm font-bold text-[#171715]">
                  {selectedCustomer.ordersCount} Orders
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#524C44]">
              <p><strong>Location:</strong> {selectedCustomer.location}</p>
              <p><strong>Email:</strong> {selectedCustomer.email}</p>
              <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
              <p><strong>Last Purchase:</strong> {selectedCustomer.lastOrder}</p>
            </div>

            <div className="flex justify-end pt-3 border-t border-[#F2ECE4]">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-1.5 bg-[#171715] text-white text-xs font-medium rounded"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
