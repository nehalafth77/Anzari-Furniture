import React, { useState, useEffect } from 'react';
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
import { apiService } from '../api/apiService';
import { useApp } from '../context/AppContext';

export default function InventoryPage({ products: propProducts, onUpdateStock, onReorderStock }) {
  const { showToast, refreshStats } = useApp();
  const [internalProducts, setInternalProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [warehouseFilter, setWarehouseFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [reorderedMap, setReorderedMap] = useState({});

  useEffect(() => {
    if (propProducts && propProducts.length > 0) {
      setInternalProducts(propProducts);
    } else {
      setLoading(true);
      apiService.getProducts()
        .then((res) => {
          const list = res.data || (Array.isArray(res) ? res : []);
          setInternalProducts(list);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [propProducts]);

  const products = internalProducts.map((p, idx) => ({
    id: p._id || p.id || `prod_${idx}`,
    name: p.name,
    sku: p.sku || `ANS-${(p.category || 'FUR').slice(0, 3).toUpperCase()}-${(p._id || p.id || idx).toString().slice(-4).toUpperCase()}`,
    warehouse: p.room || (idx % 2 === 0 ? 'Mumbai Central Showroom' : 'Bengaluru Logistics Hub'),
    stock: p.stock !== undefined ? p.stock : 12,
    lowStockThreshold: 5,
    costPrice: p.price ? Math.round(p.price * 0.55) : 25000,
    price: p.price || 45000,
    image: (Array.isArray(p.images) && p.images[0]) || p.image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80',
    category: p.category || 'Furniture',
  }));

  const warehouses = [
    'All',
    'Living Room',
    'Dining Room',
    'Bedroom',
    'Mumbai Central Showroom',
    'Bengaluru Logistics Hub',
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

  const handleStockAdjust = async (id, newStock) => {
    if (onUpdateStock) {
      onUpdateStock(id, newStock);
    }
    // Update local state
    setInternalProducts((prev) =>
      prev.map((item) => ((item._id || item.id) === id ? { ...item, stock: newStock } : item))
    );
    try {
      await apiService.updateProduct(id, { stock: newStock });
      showToast('Inventory count updated', 'success');
      refreshStats();
    } catch (err) {
      showToast('Stock updated locally', 'info');
    }
  };

  const handleReorder = async (id) => {
    setReorderedMap((prev) => ({ ...prev, [id]: true }));
    const product = products.find((p) => p.id === id);
    if (product) {
      const newStock = product.stock + 10;
      await handleStockAdjust(id, newStock);
    }
    setTimeout(() => {
      setReorderedMap((prev) => ({ ...prev, [id]: false }));
    }, 2500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#E8E2D9]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8C7355] block">
            Warehouse Logistics & Stocks
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#171715] mt-1">
            Inventory & Stock ({totalStockUnits} Units)
          </h1>
          <p className="text-xs sm:text-sm text-[#6F685E] mt-1">
            Real-time catalog inventory tracking, stock adjustments, and replenishment triggers
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-[#E8E2D9] shadow-xs">
          <span className="text-xs text-[#6F685E] font-medium block">Total In-Stock Pieces</span>
          <div className="font-serif text-3xl font-bold text-[#171715] mt-1">
            {totalStockUnits} Units
          </div>
          <span className="text-[11px] text-[#24482B] font-semibold mt-1 block">
            Across active showroom departments
          </span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-[#E8E2D9] shadow-xs">
          <span className="text-xs text-[#6F685E] font-medium block">Replenishment Alerts</span>
          <div className="font-serif text-3xl font-bold text-[#8C4A19] mt-1">
            {lowStockCount} Items Low
          </div>
          <span className="text-[11px] text-[#8C4A19] font-semibold mt-1 block">
            Immediate artisan timber order suggested
          </span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-[#E8E2D9] shadow-xs">
          <span className="text-xs text-[#6F685E] font-medium block">Current Inventory Valuation</span>
          <div className="font-serif text-3xl font-bold text-[#171715] mt-1">
            ₹{(totalValuation / 100000).toFixed(2)} Lakhs
          </div>
          <span className="text-[11px] text-[#6F685E] mt-1 block">
            Valued at artisan hardwood production cost
          </span>
        </div>
      </div>

      {/* Table & Filtering */}
      <div className="p-6 rounded-2xl bg-white border border-[#E8E2D9] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#F2ECE4]">
          <div className="relative w-full sm:max-w-md">
            <Search size={15} className="absolute left-3.5 top-3 text-[#9E978E]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search piece by name or SKU..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs sm:text-sm text-[#171715] focus:outline-none focus:border-[#18412F]"
            />
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto overflow-x-auto">
            <span className="text-xs text-[#6F685E]">Filter:</span>
            {warehouses.map((wh) => (
              <button
                key={wh}
                onClick={() => setWarehouseFilter(wh)}
                className={`text-xs px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors ${
                  warehouseFilter === wh
                    ? 'bg-[#18412F] text-white font-bold'
                    : 'bg-[#FAF8F5] text-[#6F685E] hover:text-[#171715] border border-[#E8E2D9]'
                }`}
              >
                {wh}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8E2D9] bg-[#FAF8F5] text-[11px] font-bold uppercase tracking-wider text-[#8C7355]">
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Room / Depot</th>
                <th className="py-3 px-4 text-center">Safety Alert</th>
                <th className="py-3 px-4 text-center">Stock Level</th>
                <th className="py-3 px-4 text-center">Health</th>
                <th className="py-3 px-4 text-right">Replenish</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2EFE9] text-xs">
              {filteredProducts.map((p) => {
                const isLow = p.stock <= p.lowStockThreshold;
                const isReordered = reorderedMap[p.id];

                return (
                  <tr key={p.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded-xl object-cover border border-[#E8E2D9]"
                        />
                        <span className="font-bold text-[#171715]">{p.name}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[#6F685E] text-[11px]">
                      {p.sku}
                    </td>

                    <td className="py-3.5 px-4 text-[#524C44]">
                      <div className="flex items-center gap-1.5">
                        <Warehouse size={13} className="text-[#9E978E]" />
                        <span>{p.warehouse}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center text-[#6F685E]">
                      &le; {p.lowStockThreshold} units
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex items-center gap-2 bg-[#FAF8F5] p-1 rounded-xl border border-[#E8E2D9]">
                        <button
                          onClick={() => handleStockAdjust(p.id, Math.max(0, p.stock - 1))}
                          className="w-6 h-6 rounded-lg bg-white hover:bg-[#E8E2D9] flex items-center justify-center text-[#171715] shadow-xs"
                          title="Decrease"
                        >
                          <Minus size={11} />
                        </button>
                        <span
                          className={`font-bold min-w-[24px] text-center ${
                            isLow ? 'text-amber-700' : 'text-[#18412F]'
                          }`}
                        >
                          {p.stock}
                        </span>
                        <button
                          onClick={() => handleStockAdjust(p.id, p.stock + 1)}
                          className="w-6 h-6 rounded-lg bg-white hover:bg-[#E8E2D9] flex items-center justify-center text-[#171715] shadow-xs"
                          title="Increase"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center">
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

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleReorder(p.id)}
                        disabled={isReordered}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1 shadow-xs ${
                          isReordered
                            ? 'bg-[#EEF5EE] text-[#24482B] border border-[#D4E6D6]'
                            : 'bg-[#18412F] text-white hover:bg-[#123324]'
                        }`}
                      >
                        {isReordered ? (
                          <>
                            <CheckCircle2 size={12} />
                            <span>Added +10</span>
                          </>
                        ) : (
                          <>
                            <RefreshCw size={11} />
                            <span>Reorder +10</span>
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
