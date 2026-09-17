import React from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

export default function KPISection({ dateFilter, setDateFilter }) {
  const kpis = [
    {
      id: 'revenue',
      title: 'Total Revenue',
      value: '₹8,42,500',
      change: '+18.4%',
      isPositive: true,
      comparison: 'vs previous period',
      sparkline: [40, 52, 48, 65, 70, 85, 92]
    },
    {
      id: 'orders',
      title: 'Total Orders',
      value: '1,284',
      change: '+12.8%',
      isPositive: true,
      comparison: 'vs previous period',
      sparkline: [30, 42, 40, 55, 52, 60, 68]
    },
    {
      id: 'products',
      title: 'Products Sold',
      value: '2,496',
      change: '+9.4%',
      isPositive: true,
      comparison: 'vs previous period',
      sparkline: [60, 58, 65, 72, 70, 78, 84]
    },
    {
      id: 'customers',
      title: 'Patrons & Clients',
      value: '10,842',
      change: '+14.2%',
      isPositive: true,
      comparison: 'vs previous period',
      sparkline: [50, 55, 60, 62, 70, 75, 82]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#E8E2D9]">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8C7355] block">
            Anzari Atelier Performance
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-medium text-[#171715] mt-1">
            Good evening, Admin
          </h1>
          <p className="text-xs sm:text-sm text-[#6F685E] mt-1 font-light">
            Here’s what’s happening with your luxury store today.
          </p>
        </div>

        {/* Date Selector Filter */}
        <div className="inline-flex items-center bg-[#EDE7DE] p-1 rounded-md border border-[#DDD5C7] self-start sm:self-auto">
          {['Today', '7 Days', '30 Days', 'Custom'].map((period) => (
            <button
              key={period}
              onClick={() => setDateFilter(period)}
              className={`px-3 py-1.5 rounded-sm text-xs font-medium transition-all ${dateFilter === period
                  ? 'bg-[#171715] text-[#FAF8F5] shadow-xs'
                  : 'text-[#5A534B] hover:text-[#171715]'
                }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {kpis.map((kpi) => {
          const maxVal = Math.max(...kpi.sparkline);
          const minVal = Math.min(...kpi.sparkline);
          const points = kpi.sparkline
            .map((val, idx) => {
              const x = (idx / (kpi.sparkline.length - 1)) * 100;
              const y = 30 - ((val - minVal) / (maxVal - minVal || 1)) * 24;
              return `${x},${y}`;
            })
            .join(' ');

          return (
            <div
              key={kpi.id}
              className="p-5 rounded-md bg-white border border-[#E8E2D9] shadow-xs hover:border-[#D4CCC0] transition-all group"
            >
              <div className="flex items-center justify-between text-xs text-[#6F685E] mb-2 font-medium">
                <span>{kpi.title}</span>
                <span className="text-[11px] font-mono text-[#8C7355] opacity-80">
                  INR
                </span>
              </div>

              <div className="flex items-baseline justify-between mt-1">
                <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#171715] tracking-tight">
                  {kpi.value}
                </div>

                <div
                  className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-sm border ${kpi.isPositive
                      ? 'bg-[#EEF5EE] text-[#24482B] border-[#D4E6D6]'
                      : 'bg-[#F9ECEB] text-[#852723] border-[#EFC4C2]'
                    }`}
                >
                  {kpi.isPositive ? (
                    <ArrowUpRight size={13} />
                  ) : (
                    <ArrowDownRight size={13} />
                  )}
                  <span>{kpi.change}</span>
                </div>
              </div>

              {/* Sparkline & Comparison Row */}
              <div className="mt-4 pt-3 border-t border-[#F4EFE6] flex items-center justify-between">
                <span className="text-[11px] text-[#9E978E] font-light">
                  {kpi.comparison}
                </span>

                {/* SVG Sparkline */}
                <div className="w-20 h-7 shrink-0">
                  <svg viewBox="0 0 100 32" className="w-full h-full overflow-visible">
                    <polyline
                      fill="none"
                      stroke="#8C7355"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={points}
                    />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
