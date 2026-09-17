import React from 'react';
import { Sofa, Bed, Utensils, Briefcase, Sun, Lamp } from 'lucide-react';

export default function CategorySalesBar() {
  const categories = [
    {
      name: 'Living Room',
      percentage: 38,
      revenue: '₹32.02 L',
      itemsSold: 940,
      icon: Sofa,
      color: '#171715'
    },
    {
      name: 'Bedroom',
      percentage: 26,
      revenue: '₹21.90 L',
      itemsSold: 648,
      icon: Bed,
      color: '#423B33'
    },
    {
      name: 'Dining',
      percentage: 18,
      revenue: '₹15.16 L',
      itemsSold: 450,
      icon: Utensils,
      color: '#6F685E'
    },
    {
      name: 'Home Office',
      percentage: 9,
      revenue: '₹7.58 L',
      itemsSold: 224,
      icon: Briefcase,
      color: '#8C7355'
    },
    {
      name: 'Outdoor',
      percentage: 6,
      revenue: '₹5.05 L',
      itemsSold: 152,
      icon: Sun,
      color: '#A88D6F'
    },
    {
      name: 'Accessories',
      percentage: 3,
      revenue: '₹2.54 L',
      itemsSold: 82,
      icon: Lamp,
      color: '#C7B7A4'
    }
  ];

  return (
    <div className="p-6 rounded-md bg-white border border-[#E8E2D9]">
      <div className="flex items-center justify-between pb-4 border-b border-[#F2ECE4]">
        <div>
          <h3 className="font-serif-luxury text-xl font-semibold text-[#171715]">
            Sales by Category
          </h3>
          <p className="text-xs text-[#6F685E] mt-0.5 font-light">
            Catalogue segment contribution to current revenue
          </p>
        </div>
        <span className="text-xs font-mono text-[#8C7355] bg-[#F5EFE6] px-2.5 py-1 rounded border border-[#E8DFC9]">
          100% Normalized
        </span>
      </div>

      <div className="space-y-4 pt-5">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div key={cat.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[#171715] font-medium">
                  <Icon size={14} className="text-[#8C7355]" />
                  <span>{cat.name}</span>
                  <span className="text-[11px] text-[#9E978E] font-light">
                    ({cat.itemsSold} units)
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-semibold text-[#171715]">{cat.revenue}</span>
                  <span className="text-[11px] font-mono font-medium text-[#6F685E] w-9 text-right">
                    {cat.percentage}%
                  </span>
                </div>
              </div>

              {/* Horizontal Bar */}
              <div className="w-full h-2 bg-[#F2EFE9] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${cat.percentage}%`,
                    backgroundColor: cat.color
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
