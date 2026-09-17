import React from 'react';
import { Users, UserPlus, Repeat, TrendingUp, ArrowUpRight } from 'lucide-react';
import Badge from '../common/Badge';

export default function CustomerSnippet({ customers, onViewAllCustomers }) {
  return (
    <div className="p-6 rounded-md bg-white border border-[#E8E2D9]">
      <div className="flex items-center justify-between pb-4 border-b border-[#F2ECE4]">
        <div>
          <h3 className="font-serif-luxury text-xl font-semibold text-[#171715]">
            Patron & Client Overview
          </h3>
          <p className="text-xs text-[#6F685E] mt-0.5 font-light">
            Insights on customer retention, trade architects, and lifetime value
          </p>
        </div>

        <button
          onClick={onViewAllCustomers}
          className="text-xs text-[#171715] hover:text-[#8C7355] font-medium flex items-center gap-1 transition-colors"
        >
          View All Patrons <ArrowUpRight size={13} />
        </button>
      </div>

      {/* Customer KPI mini-grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-5 border-b border-[#F2ECE4]">
        <div className="p-3 bg-[#FAF8F5] rounded border border-[#E8E2D9]">
          <span className="text-[10px] uppercase font-semibold text-[#8C7355] block">
            Total Patrons
          </span>
          <div className="font-serif-luxury text-xl font-bold text-[#171715] mt-0.5">
            10,842
          </div>
          <span className="text-[10px] text-[#24482B] font-medium">+14.2% YoY</span>
        </div>

        <div className="p-3 bg-[#FAF8F5] rounded border border-[#E8E2D9]">
          <span className="text-[10px] uppercase font-semibold text-[#8C7355] block">
            New Patrons (30D)
          </span>
          <div className="font-serif-luxury text-xl font-bold text-[#171715] mt-0.5">
            +426
          </div>
          <span className="text-[10px] text-[#24482B] font-medium">82% Verified</span>
        </div>

        <div className="p-3 bg-[#FAF8F5] rounded border border-[#E8E2D9]">
          <span className="text-[10px] uppercase font-semibold text-[#8C7355] block">
            Returning Rate
          </span>
          <div className="font-serif-luxury text-xl font-bold text-[#171715] mt-0.5">
            68%
          </div>
          <span className="text-[10px] text-[#8C7355] font-medium">Luxury standard</span>
        </div>

        <div className="p-3 bg-[#FAF8F5] rounded border border-[#E8E2D9]">
          <span className="text-[10px] uppercase font-semibold text-[#8C7355] block">
            Avg Customer LTV
          </span>
          <div className="font-serif-luxury text-xl font-bold text-[#171715] mt-0.5">
            ₹18,420
          </div>
          <span className="text-[10px] text-[#24482B] font-medium">+8.5% Growth</span>
        </div>
      </div>

      {/* Recent Patrons mini table */}
      <div className="overflow-x-auto pt-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E8E2D9] text-[11px] uppercase tracking-wider text-[#8C7355]">
              <th className="py-2.5 pl-2">Customer</th>
              <th className="py-2.5">Email</th>
              <th className="py-2.5 text-center">Orders</th>
              <th className="py-2.5 text-right">Total Spent</th>
              <th className="py-2.5 text-center">Last Order</th>
              <th className="py-2.5 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2EFE9] text-xs">
            {customers.slice(0, 4).map((c) => (
              <tr key={c.id} className="hover:bg-[#FAF8F5] transition-colors">
                <td className="py-3 pl-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-7 h-7 rounded-full object-cover border border-[#E8E2D9]"
                    />
                    <div>
                      <div className="font-medium text-[#171715]">{c.name}</div>
                      <span className="text-[10px] text-[#9E978E]">{c.location}</span>
                    </div>
                  </div>
                </td>

                <td className="py-3 text-[#6F685E] font-light">
                  {c.email}
                </td>

                <td className="py-3 text-center font-medium text-[#171715]">
                  {c.ordersCount}
                </td>

                <td className="py-3 text-right font-medium text-[#171715]">
                  ₹{c.totalSpent.toLocaleString('en-IN')}
                </td>

                <td className="py-3 text-center text-[#6F685E]">
                  {c.lastOrder}
                </td>

                <td className="py-3 text-center">
                  <Badge
                    variant={
                      c.status.includes('VIP')
                        ? 'gold'
                        : c.status.includes('Trade')
                        ? 'taupe'
                        : 'default'
                    }
                    size="sm"
                  >
                    {c.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
