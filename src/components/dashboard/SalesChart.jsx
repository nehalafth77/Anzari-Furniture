import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function SalesChart() {
  const [metric, setMetric] = useState('revenue');
  const [timeRange, setTimeRange] = useState('7 Days');

  const dataSets = {
    '7 Days': [
      { label: '06 Sep', revenue: 520000, orders: 78, aov: 66660 },
      { label: '07 Sep', revenue: 640000, orders: 95, aov: 67368 },
      { label: '08 Sep', revenue: 580000, orders: 86, aov: 67441 },
      { label: '09 Sep', revenue: 720000, orders: 106, aov: 67924 },
      { label: '10 Sep', revenue: 690000, orders: 99, aov: 69696 },
      { label: '11 Sep', revenue: 790000, orders: 116, aov: 68103 },
      { label: '12 Sep', revenue: 842500, orders: 128, aov: 65820 }
    ],
    '30 Days': [
      { label: 'W1', revenue: 3200000, orders: 480, aov: 66666 },
      { label: 'W2', revenue: 3650000, orders: 540, aov: 67592 },
      { label: 'W3', revenue: 4100000, orders: 610, aov: 67213 },
      { label: 'W4', revenue: 4850000, orders: 720, aov: 67361 }
    ],
    '6 Months': [
      { label: 'Apr', revenue: 11200000, orders: 1650, aov: 67878 },
      { label: 'May', revenue: 12800000, orders: 1890, aov: 67724 },
      { label: 'Jun', revenue: 14200000, orders: 2100, aov: 67619 },
      { label: 'Jul', revenue: 15900000, orders: 2340, aov: 67948 },
      { label: 'Aug', revenue: 17400000, orders: 2580, aov: 67441 },
      { label: 'Sep', revenue: 19800000, orders: 2950, aov: 67118 }
    ],
    '1 Year': [
      { label: 'Q4 25', revenue: 34000000, orders: 5100, aov: 66666 },
      { label: 'Q1 26', revenue: 39500000, orders: 5850, aov: 67521 },
      { label: 'Q2 26', revenue: 46200000, orders: 6800, aov: 67941 },
      { label: 'Q3 26', revenue: 54800000, orders: 8100, aov: 67654 }
    ]
  };

  const currentData = dataSets[timeRange] || dataSets['7 Days'];

  const getMetricConfig = () => {
    switch (metric) {
      case 'orders':
        return {
          title: 'Total Orders',
          unit: '',
          formatter: (v) => `${v.toLocaleString('en-IN')}`,
          color: '#3A3835'
        };
      case 'aov':
        return {
          title: 'Average Order Value (AOV)',
          unit: '₹',
          formatter: (v) => `₹${v.toLocaleString('en-IN')}`,
          color: '#8C7355'
        };
      default:
        return {
          title: 'Gross Revenue',
          unit: '₹',
          formatter: (v) =>
            v >= 10000000
              ? `₹${(v / 10000000).toFixed(2)} Cr`
              : v >= 100000
              ? `₹${(v / 100000).toFixed(1)} L`
              : `₹${v.toLocaleString('en-IN')}`,
          color: '#171715'
        };
    }
  };

  const config = getMetricConfig();

  return (
    <div className="p-6 rounded-md bg-white border border-[#E8E2D9]">
      {/* Chart Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#F2ECE4]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif-luxury text-2xl font-semibold text-[#171715]">
              Revenue Overview
            </h2>
            <span className="text-[11px] font-sans-modern uppercase bg-[#F5EFE6] text-[#8C7355] px-2 py-0.5 rounded font-medium border border-[#E8DFC9]">
              Live Metrics
            </span>
          </div>
          <p className="text-xs text-[#6F685E] mt-0.5 font-light">
            Real-time financial performance and ordering momentum
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Metric Selector */}
          <div className="inline-flex bg-[#F4F0EA] p-1 rounded-md border border-[#E2DAD0]">
            {[
              { id: 'revenue', label: 'Revenue' },
              { id: 'orders', label: 'Orders' },
              { id: 'aov', label: 'Average Order Value' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMetric(m.id)}
                className={`px-3 py-1 text-xs font-medium rounded-sm transition-all ${
                  metric === m.id
                    ? 'bg-[#171715] text-[#FAF8F5] shadow-xs'
                    : 'text-[#6F685E] hover:text-[#171715]'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Time Selector */}
          <div className="inline-flex bg-[#FAF8F5] p-1 rounded-md border border-[#E8E2D9]">
            {['7 Days', '30 Days', '6 Months', '1 Year'].map((t) => (
              <button
                key={t}
                onClick={() => setTimeRange(t)}
                className={`px-2.5 py-1 text-xs font-medium rounded-sm transition-all ${
                  timeRange === t
                    ? 'bg-[#8C7355] text-white shadow-xs'
                    : 'text-[#6F685E] hover:text-[#171715]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-80 w-full pt-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="luxuryGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8C7355" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#8C7355" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#F0EAE1" vertical={false} />

            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={{ stroke: '#E8E2D9' }}
              tick={{ fill: '#8C8275', fontSize: 11 }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={config.formatter}
              tick={{ fill: '#8C8275', fontSize: 11 }}
              width={65}
            />

            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const val = payload[0].value;
                  return (
                    <div className="bg-[#171715] text-[#FAF8F5] p-3 rounded shadow-xl border border-[#3A3734] text-xs">
                      <div className="text-[#A89F93] text-[10px] uppercase tracking-wider mb-1">
                        {label}
                      </div>
                      <div className="font-serif-luxury text-base font-semibold text-[#EDE7DE]">
                        {config.formatter(val)}
                      </div>
                      <div className="text-[10px] text-[#9E978E] mt-1">
                        {config.title}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Area
              type="monotone"
              dataKey={metric}
              stroke="#8C7355"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#luxuryGradient)"
              dot={{ r: 3, fill: '#171715', stroke: '#8C7355', strokeWidth: 1.5 }}
              activeDot={{ r: 5, fill: '#171715', stroke: '#FAF8F5', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
