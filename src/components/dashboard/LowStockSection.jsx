import React, { useState } from 'react';
import { AlertCircle, RefreshCw, Check, Warehouse, ArrowRight } from 'lucide-react';
import Badge from '../common/Badge';

export default function LowStockSection({ products, onReorderStock, onViewInventory }) {
  const lowStockItems = products.filter(
    (p) => p.stock <= p.lowStockThreshold
  );

  const [reorderedMap, setReorderedMap] = useState({});

  const handleReorder = (productId, e) => {
    e.stopPropagation();
    setReorderedMap((prev) => ({ ...prev, [productId]: true }));
    onReorderStock(productId);
    setTimeout(() => {
      setReorderedMap((prev) => ({ ...prev, [productId]: false }));
    }, 2500);
  };

  return (
    <div className="p-6 rounded-md bg-white border border-[#E8E2D9]">
      <div className="flex items-center justify-between pb-4 border-b border-[#F2ECE4]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#FAF0E6] border border-[#ECCFBA] flex items-center justify-center text-[#8C4A19]">
            <AlertCircle size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif-luxury text-xl font-semibold text-[#171715]">
                Inventory Alerts
              </h3>
              <Badge variant="warning" size="sm">
                {lowStockItems.length} Low Stock
              </Badge>
            </div>
            <p className="text-xs text-[#6F685E] mt-0.5 font-light">
              Pieces below safety replenishment thresholds
            </p>
          </div>
        </div>

        <button
          onClick={onViewInventory}
          className="text-xs text-[#171715] hover:text-[#8C7355] font-medium flex items-center gap-1 transition-colors"
        >
          Manage Stock <ArrowRight size={13} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-5">
        {lowStockItems.map((item) => {
          const isReordered = reorderedMap[item.id];

          return (
            <div
              key={item.id}
              className="p-4 rounded-md bg-[#FAF8F5] border border-[#E8E2D9] hover:border-[#D4CCC0] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded object-cover border border-[#E8E2D9] shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-semibold text-[#171715] truncate">
                      {item.name}
                    </h4>
                    <span className="text-[11px] text-[#8C4A19] font-medium block mt-0.5">
                      Only {item.stock} left
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#EDE7DE] text-[11px] text-[#6F685E] flex items-center gap-1.5">
                  <Warehouse size={12} className="text-[#9E978E] shrink-0" />
                  <span className="truncate">{item.warehouse.replace(' Warehouse', '')}</span>
                </div>
              </div>

              <div className="mt-4 pt-2">
                <button
                  onClick={(e) => handleReorder(item.id, e)}
                  disabled={isReordered}
                  className={`w-full py-1.5 px-3 rounded text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                    isReordered
                      ? 'bg-[#EEF5EE] text-[#24482B] border border-[#D4E6D6]'
                      : 'bg-[#171715] text-[#FAF8F5] hover:bg-[#383532]'
                  }`}
                >
                  {isReordered ? (
                    <>
                      <Check size={13} />
                      <span>Reorder Placed (+10)</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw size={12} />
                      <span>Reorder Stock</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
