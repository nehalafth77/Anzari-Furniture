import React, { useState } from 'react';
import Badge from '../components/common/Badge';
import {
  PackageCheck,
  AlertTriangle,
  RefreshCw,
  Search,
  Warehouse,
  Plus,
  Minus,
  CheckCircle2,
  Boxes
} from 'lucide-react';

export default function InventoryPage({ products, onUpdateStock, onReorderStock }) {
  const [warehouseFilter, setWarehouseFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [reorderedMap, setReorderedMap] = useState({});

  const warehouses = [
    'All',
    'Mumbai Central Warehouse',
    'Bengaluru Fulfillment Hub',
    'Delhi North Depot'
  ];

  const filteredProducts = products.filter((p) => {
    const matchesWarehouse =
      warehouseFilter === 'All' || p.warehouse === warehouseFilter;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesWarehouse && matchesSearch;
  });

  const totalStockUnits = products.reduce((acc, p) => acc + p.stock, 0);
  const totalValuation = products.reduce((acc, p) => acc + p.stock * p.costPrice, 0);
  const lowStockCount = products.filter((p) => p.stock <= p.lowStockThreshold).length;

  const handleReorder = (id) => {
    setReorderedMap((prev) => ({ ...prev, [id]: true }));
    onReorderStock(id);
    setTimeout(() => {
      setReorderedMap((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#E8E2D9]">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8C7355] block">
            Warehouse Logistics
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-medium text-[#171715] mt-1">
            Inventory & Stock ({totalStockUnits} Units)
          </h1>
          <p className="text-xs sm:text-sm text-[#6F685E] mt-1 font-light">
            Real-time multi-depot stock monitoring, replenishment triggers, and material allocations
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-md border border-[#E8E2D9] shadow-xs">
          <span className="text-xs text-[#6F685E] block">Total In-Stock Pieces</span>
          <div className="font-serif-luxury text-3xl font-bold text-[#171715] mt-1">
            {totalStockUnits} Units
          </div>
          <span className="text-[11px] text-[#24482B] mt-1 block">
            Across 3 national fulfillment hubs
          </span>
        </div>

        <div className="p-5 bg-white rounded-md border border-[#E8E2D9] shadow-xs">
          <span className="text-xs text-[#6F685E] block">Replenishment Alerts</span>
          <div className="font-serif-luxury text-3xl font-bold text-[#8C4A19] mt-1">
            {lowStockCount} Items Low
          </div>
          <span className="text-[11px] text-[#8C4A19] mt-1 block">
            Immediate foundry & artisan order required
          </span>
        </div>

        <div className="p-5 bg-white rounded-md border border-[#E8E2D9] shadow-xs">
          <span className="text-xs text-[#6F685E] block">Current Inventory Valuation</span>
          <div className="font-serif-luxury text-3xl font-bold text-[#171715] mt-1">
            ₹{(totalValuation / 100000).toFixed(2)} Lakhs
          </div>
          <span className="text-[11px] text-[#6F685E] mt-1 block">
            Valued at artisan production cost
          </span>
        </div>
      </div>

      {/* Table & Warehouse Filtering */}
      <div className="p-6 rounded-md bg-white border border-[#E8E2D9] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#F2ECE4]">
          <div className="relative w-full sm:max-w-md">
            <Search size={15} className="absolute left-3.5 top-2.5 text-[#9E978E]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by piece or SKU..."
              className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-md text-xs text-[#171715] focus:outline-none focus:border-[#8C7355]"
            />
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto overflow-x-auto">
            <span className="text-xs text-[#6F685E]">Depot:</span>
            {warehouses.map((wh) => (
              <button
                key={wh}
                onClick={() => setWarehouseFilter(wh)}
                className={`text-xs px-3 py-1 rounded-sm whitespace-nowrap transition-colors ${
                  warehouseFilter === wh
                    ? 'bg-[#171715] text-[#FAF8F5] font-medium'
                    : 'bg-[#FAF8F5] text-[#6F685E] hover:text-[#171715] border border-[#E8E2D9]'
                }`}
              >
                {wh.replace(' Warehouse', '').replace(' Fulfillment Hub', '').replace(' Depot', '')}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8E2D9] text-[11px] uppercase tracking-wider text-[#8C7355]">
                <th className="py-3 pl-2">Product</th>
                <th className="py-3">SKU</th>
                <th className="py-3">Fulfillment Warehouse</th>
                <th className="py-3 text-center">Safety Threshold</th>
                <th className="py-3 text-center">Current Quantity</th>
                <th className="py-3 text-center">Health Status</th>
                <th className="py-3 text-right pr-2">Reorder</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2EFE9] text-xs">
              {filteredProducts.map((p) => {
                const isLow = p.stock <= p.lowStockThreshold;
                const isReordered = reorderedMap[p.id];

                return (
                  <tr key={p.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="py-3.5 pl-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded object-cover border border-[#E8E2D9]"
                        />
                        <span className="font-semibold text-[#171715]">{p.name}</span>
                      </div>
                    </td>

                    <td className="py-3.5 font-mono text-[#6F685E] text-[11px]">
                      {p.sku}
                    </td>

                    <td className="py-3.5 text-[#524C44]">
                      <div className="flex items-center gap-1.5">
                        <Warehouse size={13} className="text-[#9E978E]" />
                        <span>{p.warehouse}</span>
                      </div>
                    </td>

                    <td className="py-3.5 text-center text-[#6F685E]">
                      {p.lowStockThreshold} units
                    </td>

                    <td className="py-3.5 text-center">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => onUpdateStock(p.id, Math.max(0, p.stock - 1))}
                          className="w-6 h-6 rounded bg-[#EFECE6] hover:bg-[#E4DCCE] flex items-center justify-center text-[#171715]"
                          title="Decrease"
                        >
                          <Minus size={11} />
                        </button>
                        <span
                          className={`font-semibold min-w-[20px] text-center ${
                            isLow ? 'text-[#8C4A19]' : 'text-[#171715]'
                          }`}
                        >
                          {p.stock}
                        </span>
                        <button
                          onClick={() => onUpdateStock(p.id, p.stock + 1)}
                          className="w-6 h-6 rounded bg-[#EFECE6] hover:bg-[#E4DCCE] flex items-center justify-center text-[#171715]"
                          title="Increase"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    </td>

                    <td className="py-3.5 text-center">
                      {isLow ? (
                        <Badge variant="warning" size="sm">
                          Only {p.stock} left
                        </Badge>
                      ) : (
                        <Badge variant="success" size="sm">
                          Sufficient
                        </Badge>
                      )}
                    </td>

                    <td className="py-3.5 text-right pr-2">
                      <button
                        onClick={() => handleReorder(p.id)}
                        disabled={isReordered}
                        className={`px-3 py-1 rounded text-[11px] font-medium transition-all inline-flex items-center gap-1 ${
                          isReordered
                            ? 'bg-[#EEF5EE] text-[#24482B] border border-[#D4E6D6]'
                            : 'bg-[#171715] text-[#FAF8F5] hover:bg-[#383532]'
                        }`}
                      >
                        {isReordered ? (
                          <>
                            <CheckCircle2 size={12} />
                            <span>Ordered +10</span>
                          </>
                        ) : (
                          <>
                            <RefreshCw size={11} />
                            <span>Reorder</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
