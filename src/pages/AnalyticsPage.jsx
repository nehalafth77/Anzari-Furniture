import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Percent,
  Compass,
  MapPin,
  Eye,
  ArrowUpRight
} from 'lucide-react';
import { CITY_SALES, REVENUE_TIMELINE } from '../data/mockData';

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState('30 Days');

  const trafficSources = [
    { name: 'Organic Architectural Search', value: 42, color: '#171715' },
    { name: 'Direct & Private Concierge', value: 28, color: '#4A453E' },
    { name: 'Instagram Visual Editorial', value: 18, color: '#8C7355' },
    { name: 'AD & Elle Decor Referrals', value: 8, color: '#B08968' },
    { name: 'Trade Architect Portal', value: 4, color: '#D4CCC0' }
  ];

  const conversionFunnel = [
    { stage: 'Product Views', count: '94,120', drop: '100%' },
    { stage: 'Added to Sanctuary Bag', count: '14,800', drop: '15.7%' },
    { stage: 'Checkout Initiated', count: '4,120', drop: '4.3%' },
    { stage: 'White Glove Purchased', count: '3,218', drop: '3.42%' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#E8E2D9]">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8C7355] block">
            Executive Intelligence & BI
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-medium text-[#171715] mt-1">
            Analytics & Growth Insights
          </h1>
          <p className="text-xs sm:text-sm text-[#6F685E] mt-1 font-light">
            Holistic metrics tracking revenue density, geographic distribution, and conversion efficiency
          </p>
        </div>

        <div className="inline-flex bg-[#EDE7DE] p-1 rounded-md border border-[#DDD5C7] self-start sm:self-auto">
          {['7 Days', '30 Days', 'Quarterly', 'YTD'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1.5 rounded-sm text-xs font-medium transition-all ${
                timeframe === t
                  ? 'bg-[#171715] text-[#FAF8F5] shadow-xs'
                  : 'text-[#5A534B] hover:text-[#171715]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* 7 Key Performance Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {[
          { label: 'Gross Revenue', value: '₹8,42,500', sub: '+18.4% YoY' },
          { label: 'Total Orders', value: '1,284', sub: '+12.8%' },
          { label: 'Patron Base', value: '10,842', sub: '+14.2%' },
          { label: 'Conversion Rate', value: '3.42%', sub: 'High Luxury' },
          { label: 'Average Order (AOV)', value: '₹65,820', sub: '+4.1%' },
          { label: 'Cart Abandonment', value: '22.4%', sub: '-3.1% Lower' },
          { label: 'Product Views', value: '94,120', sub: '+28.5%' }
        ].map((metric, i) => (
          <div key={i} className="p-3.5 bg-white rounded-md border border-[#E8E2D9] shadow-xs">
            <span className="text-[10px] text-[#8C7355] uppercase font-semibold block truncate">
              {metric.label}
            </span>
            <div className="font-serif-luxury text-lg font-bold text-[#171715] mt-1 truncate">
              {metric.value}
            </div>
            <span className="text-[10px] text-[#24482B] font-medium block mt-0.5">
              {metric.sub}
            </span>
          </div>
        ))}
      </div>

      {/* Revenue & Volume Trends Area Chart */}
      <div className="p-6 rounded-md bg-white border border-[#E8E2D9] shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-[#F2ECE4]">
          <div>
            <h3 className="font-serif-luxury text-xl font-semibold text-[#171715]">
              Revenue Momentum (September 2026)
            </h3>
            <p className="text-xs text-[#6F685E] mt-0.5 font-light">
              Daily revenue in Indian Rupees with transaction density
            </p>
          </div>
          <span className="text-xs font-mono text-[#8C7355] bg-[#FAF8F5] px-2.5 py-1 rounded border border-[#E8E2D9]">
            ₹8.42 Lakhs Peak
          </span>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REVENUE_TIMELINE}>
              <defs>
                <linearGradient id="analyticsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8C7355" stopOpacity={0.28} />
                  <stop offset="95%" stopColor="#8C7355" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F2EFE9" vertical={false} />
              <XAxis dataKey="date" stroke="#E8E2D9" tick={{ fill: '#8C8275', fontSize: 11 }} />
              <YAxis
                stroke="#E8E2D9"
                tick={{ fill: '#8C8275', fontSize: 11 }}
                tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`}
                width={55}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#171715] text-[#FAF8F5] p-3 rounded shadow-xl border border-[#3A3734] text-xs">
                        <div className="text-[#A89F93] text-[10px] uppercase mb-1">{label}</div>
                        <div className="font-serif-luxury text-base font-bold text-[#FAF8F5]">
                          ₹{payload[0].value.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-[#A89F93] mt-1">
                          {payload[0].payload.orders} Orders Completed
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#8C7355"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#analyticsGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid: Sales by Location + Traffic Channels + Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Geographic Distribution in India */}
        <div className="p-6 rounded-md bg-white border border-[#E8E2D9] shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE4]">
            <h4 className="font-serif-luxury text-lg font-semibold text-[#171715]">
              Sales by Location (India)
            </h4>
            <MapPin size={15} className="text-[#8C7355]" />
          </div>

          <div className="space-y-3.5 pt-4">
            {CITY_SALES.map((city) => (
              <div key={city.city} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-[#171715]">{city.city}</span>
                  <span className="text-[#6F685E]">
                    ₹{(city.value / 100000).toFixed(1)} Lakhs ({city.percentage}%)
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#F2EFE9] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#171715] rounded-full"
                    style={{ width: `${city.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Channels Breakdown */}
        <div className="p-6 rounded-md bg-white border border-[#E8E2D9] shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE4]">
            <h4 className="font-serif-luxury text-lg font-semibold text-[#171715]">
              Traffic Acquisition Channels
            </h4>
            <Compass size={15} className="text-[#8C7355]" />
          </div>

          <div className="space-y-3 pt-4">
            {trafficSources.map((source) => (
              <div
                key={source.name}
                className="flex items-center justify-between text-xs pb-2 border-b border-[#FAF8F5]"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: source.color }}
                  />
                  <span className="text-[#524C44]">{source.name}</span>
                </div>
                <span className="font-semibold text-[#171715]">{source.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="p-6 rounded-md bg-white border border-[#E8E2D9] shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE4]">
            <h4 className="font-serif-luxury text-lg font-semibold text-[#171715]">
              Patron Conversion Funnel
            </h4>
            <Percent size={15} className="text-[#8C7355]" />
          </div>

          <div className="space-y-4 pt-4">
            {conversionFunnel.map((step, idx) => (
              <div key={step.stage} className="p-2.5 bg-[#FAF8F5] rounded border border-[#E8E2D9] text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[#171715]">{step.stage}</span>
                  <span className="text-[#8C7355] font-semibold">{step.drop}</span>
                </div>
                <div className="text-[11px] text-[#9E978E] mt-0.5">
                  {step.count} sessions
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
