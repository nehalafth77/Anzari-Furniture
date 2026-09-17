import React from 'react';
import Badge from '../common/Badge';
import { ArrowUpRight } from 'lucide-react';

export default function BestSellersTable({ products, onSelectProduct, onViewAllProducts }) {
  // Top 5 bestsellers
  const bestSellers = [...products]
    .sort((a, b) => b.unitsSold - a.unitsSold)
    .slice(0, 5);

  const formatRevenue = (rev) => {
    if (rev >= 10000000) return `₹${(rev / 10000000).toFixed(2)} Cr`;
    if (rev >= 100000) return `₹${(rev / 100000).toFixed(2)} L`;
    return `₹${rev.toLocaleString('en-IN')}`;
  };

  return (
    <div className="p-6 rounded-md bg-white border border-[#E8E2D9]">
      <div className="flex items-center justify-between pb-4 border-b border-[#F2ECE4]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-serif-luxury text-xl font-semibold text-[#171715]">
              Best Selling Furnishings
            </h3>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-[#8C7355] bg-[#F7F2E7] px-2 py-0.5 rounded border border-[#E4D5B7]">
              Ranked by Volume
            </span>
          </div>
          <p className="text-xs text-[#6F685E] mt-0.5 font-light">
            Top customer favorites driving brand volume and revenue
          </p>
        </div>

        <button
          onClick={onViewAllProducts}
          className="text-xs text-[#171715] hover:text-[#8C7355] font-medium flex items-center gap-1 transition-colors"
        >
          View Full Catalogue <ArrowUpRight size={13} />
        </button>
      </div>

      <div className="overflow-x-auto pt-2">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E8E2D9] text-[11px] uppercase tracking-wider text-[#8C7355]">
              <th className="py-3 pl-2">Rank & Piece</th>
              <th className="py-3">Category</th>
              <th className="py-3 text-right">Price</th>
              <th className="py-3 text-center">Units Sold</th>
              <th className="py-3 text-right">Revenue Generated</th>
              <th className="py-3 text-center">Stock State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2EFE9] text-xs">
            {bestSellers.map((item, idx) => (
              <tr
                key={item.id}
                onClick={() => onSelectProduct(item)}
                className="hover:bg-[#FAF8F5] cursor-pointer transition-colors group"
              >
                <td className="py-3 pl-2">
                  <div className="flex items-center gap-3">
                    <span className="font-serif-luxury text-sm font-bold text-[#8C7355] w-4 text-center">
                      0{idx + 1}
                    </span>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded object-cover border border-[#E8E2D9] group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <h4 className="font-medium text-[#171715] group-hover:text-[#8C7355] transition-colors">
                        {item.name}
                      </h4>
                      <span className="text-[11px] text-[#9E978E] font-mono">
                        {item.sku}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="py-3 text-[#6F685E]">
                  {item.category}
                </td>

                <td className="py-3 text-right font-medium text-[#171715]">
                  ₹{item.price.toLocaleString('en-IN')}
                </td>

                <td className="py-3 text-center">
                  <span className="font-semibold text-[#171715]">
                    {item.unitsSold}
                  </span>{' '}
                  <span className="text-[11px] text-[#9E978E]">sold</span>
                </td>

                <td className="py-3 text-right font-serif-luxury text-sm font-semibold text-[#171715]">
                  {formatRevenue(item.revenue)}
                </td>

                <td className="py-3 text-center">
                  {item.stock <= item.lowStockThreshold ? (
                    <Badge variant="warning">
                      Only {item.stock} left
                    </Badge>
                  ) : (
                    <Badge variant="success">In Stock</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
