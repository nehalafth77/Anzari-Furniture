import React, { useState } from 'react';
import Badge from '../components/common/Badge';
import {
  TicketPercent,
  Plus,
  Copy,
  Check,
  Calendar,
  Sparkles,
  Percent,
  Coins
} from 'lucide-react';

export default function CouponsPage({ coupons }) {
  const [couponList, setCouponList] = useState(coupons);
  const [copiedCode, setCopiedCode] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountType: 'Percentage',
    discountValue: 15,
    minOrder: 40000,
    maxDiscount: 10000,
    usageLimit: 500,
    startDate: '12 Sep 2026',
    endDate: '31 Dec 2026',
    status: 'Active'
  });

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!newCoupon.code.trim()) return;
    const created = {
      ...newCoupon,
      id: `CPN-${Date.now().toString().slice(-4)}`,
      code: newCoupon.code.toUpperCase().trim(),
      usedCount: 0
    };
    setCouponList([...couponList, created]);
    setIsCreating(false);
    setNewCoupon({
      code: '',
      discountType: 'Percentage',
      discountValue: 15,
      minOrder: 40000,
      maxDiscount: 10000,
      usageLimit: 500,
      startDate: '12 Sep 2026',
      endDate: '31 Dec 2026',
      status: 'Active'
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#E8E2D9]">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8C7355] block">
            Promotions & Privileges
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-medium text-[#171715] mt-1">
            Offers & Coupons ({couponList.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#6F685E] mt-1 font-light">
            Generate promotional privilege vouchers, trade architect discounts, and seasonal benefits
          </p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-[#171715] hover:bg-[#383532] text-[#FAF8F5] rounded-md text-xs font-medium flex items-center gap-2 transition-colors self-start sm:self-auto shadow-xs"
        >
          <Plus size={14} />
          <span>+ Create Coupon</span>
        </button>
      </div>

      {/* Featured Coupons Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {couponList.map((cpn) => (
          <div
            key={cpn.id}
            className="p-5 bg-white rounded-md border border-[#E8E2D9] shadow-xs relative overflow-hidden flex flex-col justify-between"
          >
            {/* Corner Notch styling */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#8C7355]">
                  {cpn.discountType}
                </span>
                <div className="font-serif-luxury text-2xl font-bold text-[#171715] mt-0.5">
                  {cpn.discountType === 'Percentage' ? `${cpn.discountValue}% OFF` : `₹${cpn.discountValue} OFF`}
                </div>
              </div>
              <Badge variant="success" size="sm">
                {cpn.status}
              </Badge>
            </div>

            <div className="my-4 pt-3 border-t border-dashed border-[#DDD5C7] space-y-1.5 text-xs text-[#6F685E]">
              <div className="flex justify-between">
                <span>Min Order:</span>
                <span className="font-medium text-[#171715]">
                  ₹{cpn.minOrder.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Max Cap:</span>
                <span className="font-medium text-[#171715]">
                  ₹{cpn.maxDiscount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Redemptions:</span>
                <span className="font-medium text-[#8C7355]">
                  {cpn.usedCount} / {cpn.usageLimit}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#F2ECE4] flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#171715] bg-[#FAF8F5] px-2 py-1 rounded border border-[#E8E2D9]">
                {cpn.code}
              </span>
              <button
                onClick={() => handleCopy(cpn.code)}
                className="text-xs text-[#6F685E] hover:text-[#171715] flex items-center gap-1"
              >
                {copiedCode === cpn.code ? (
                  <>
                    <Check size={12} className="text-[#24482B]" />
                    <span className="text-[#24482B]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Coupons Table */}
      <div className="p-6 rounded-md bg-white border border-[#E8E2D9] shadow-xs">
        <h3 className="font-serif-luxury text-xl font-semibold text-[#171715] mb-4 pb-2 border-b border-[#F2ECE4]">
          Active Coupon Registry
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8E2D9] text-[11px] uppercase tracking-wider text-[#8C7355]">
                <th className="py-3 pl-2">Coupon Code</th>
                <th className="py-3">Type</th>
                <th className="py-3 text-right">Benefit</th>
                <th className="py-3 text-right">Min Order</th>
                <th className="py-3 text-right">Max Discount</th>
                <th className="py-3 text-center">Usage</th>
                <th className="py-3">Validity</th>
                <th className="py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2EFE9] text-xs">
              {couponList.map((c) => (
                <tr key={c.id} className="hover:bg-[#FAF8F5] transition-colors">
                  <td className="py-3.5 pl-2 font-mono font-bold text-[#171715]">
                    {c.code}
                  </td>
                  <td className="py-3.5 text-[#524C44]">{c.discountType}</td>
                  <td className="py-3.5 text-right font-semibold text-[#171715]">
                    {c.discountType === 'Percentage' ? `${c.discountValue}%` : `₹${c.discountValue}`}
                  </td>
                  <td className="py-3.5 text-right text-[#6F685E]">
                    ₹{c.minOrder.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 text-right text-[#6F685E]">
                    ₹{c.maxDiscount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 text-center font-medium text-[#171715]">
                    {c.usedCount} / {c.usageLimit}
                  </td>
                  <td className="py-3.5 text-[#6F685E] whitespace-nowrap">
                    {c.startDate} – {c.endDate}
                  </td>
                  <td className="py-3.5 text-center">
                    <Badge variant="success" size="sm">
                      {c.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create Coupon */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171715]/70 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-lg border border-[#DDD5C7] p-6 shadow-2xl space-y-4">
            <h3 className="font-serif-luxury text-xl font-semibold text-[#171715]">
              Create Luxury Promotional Code
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-[#524C44] mb-1">
                  Coupon Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. MONSOON20"
                  value={newCoupon.code}
                  onChange={(e) =>
                    setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })
                  }
                  className="w-full font-mono p-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#524C44] mb-1">
                  Discount Type
                </label>
                <select
                  value={newCoupon.discountType}
                  onChange={(e) =>
                    setNewCoupon({ ...newCoupon, discountType: e.target.value })
                  }
                  className="w-full p-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded"
                >
                  <option value="Percentage">Percentage (%)</option>
                  <option value="Fixed Amount">Fixed Amount (₹)</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-[#524C44] mb-1">
                  Discount Value
                </label>
                <input
                  type="number"
                  value={newCoupon.discountValue}
                  onChange={(e) =>
                    setNewCoupon({
                      ...newCoupon,
                      discountValue: Number(e.target.value)
                    })
                  }
                  className="w-full p-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#524C44] mb-1">
                  Minimum Order (₹)
                </label>
                <input
                  type="number"
                  value={newCoupon.minOrder}
                  onChange={(e) =>
                    setNewCoupon({
                      ...newCoupon,
                      minOrder: Number(e.target.value)
                    })
                  }
                  className="w-full p-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#524C44] mb-1">
                  Max Cap (₹)
                </label>
                <input
                  type="number"
                  value={newCoupon.maxDiscount}
                  onChange={(e) =>
                    setNewCoupon({
                      ...newCoupon,
                      maxDiscount: Number(e.target.value)
                    })
                  }
                  className="w-full p-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#524C44] mb-1">
                  Usage Limit
                </label>
                <input
                  type="number"
                  value={newCoupon.usageLimit}
                  onChange={(e) =>
                    setNewCoupon({
                      ...newCoupon,
                      usageLimit: Number(e.target.value)
                    })
                  }
                  className="w-full p-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#F2ECE4]">
              <button
                onClick={() => setIsCreating(false)}
                className="px-3 py-1.5 bg-[#FAF8F5] text-xs font-medium rounded border border-[#DDD5C7]"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCoupon}
                className="px-4 py-1.5 bg-[#171715] text-white text-xs font-medium rounded"
              >
                Save Coupon
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
