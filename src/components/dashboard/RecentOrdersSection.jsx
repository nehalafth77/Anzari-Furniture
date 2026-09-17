import React, { useState } from 'react';
import Badge from '../common/Badge';
import { Eye, Printer, MoreVertical, ArrowUpRight } from 'lucide-react';

export default function RecentOrdersSection({
  orders,
  onViewOrder,
  onOpenInvoice,
  onViewAllOrders
}) {
  const [activeMenuId, setActiveMenuId] = useState(null);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return <Badge variant="success">Delivered</Badge>;
      case 'Shipped':
      case 'Out for Delivery':
        return <Badge variant="gold">In Transit</Badge>;
      case 'Processing':
      case 'Packed':
        return <Badge variant="processing">Processing</Badge>;
      case 'Confirmed':
        return <Badge variant="taupe">Confirmed</Badge>;
      case 'Cancelled':
      case 'Refunded':
        return <Badge variant="danger">{status}</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const getPaymentBadge = (status) => {
    if (status === 'Paid') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] text-[#24482B] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#24482B]" />
          Paid
        </span>
      );
    }
    if (status === 'Refunded') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] text-[#852723] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#852723]" />
          Refunded
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] text-[#8C7355] font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-[#8C7355]" />
        Pending
      </span>
    );
  };

  return (
    <div className="p-6 rounded-md bg-white border border-[#E8E2D9]">
      <div className="flex items-center justify-between pb-4 border-b border-[#F2ECE4]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-serif-luxury text-xl font-semibold text-[#171715]">
              Recent Orders
            </h3>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-[#8C7355] bg-[#F7F2E7] px-2 py-0.5 rounded border border-[#E4D5B7]">
              Live Inflow
            </span>
          </div>
          <p className="text-xs text-[#6F685E] mt-0.5 font-light">
            Real-time purchases and luxury fulfillment tracking
          </p>
        </div>

        <button
          onClick={onViewAllOrders}
          className="text-xs text-[#171715] hover:text-[#8C7355] font-medium flex items-center gap-1 transition-colors"
        >
          View All Orders <ArrowUpRight size={13} />
        </button>
      </div>

      <div className="overflow-x-auto pt-2">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E8E2D9] text-[11px] uppercase tracking-wider text-[#8C7355]">
              <th className="py-3 pl-2">Order ID</th>
              <th className="py-3">Customer</th>
              <th className="py-3">Products</th>
              <th className="py-3">Date</th>
              <th className="py-3 text-right">Amount</th>
              <th className="py-3 text-center">Payment</th>
              <th className="py-3 text-center">Status</th>
              <th className="py-3 text-right pr-2">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2EFE9] text-xs">
            {orders.slice(0, 6).map((order) => (
              <tr
                key={order.id}
                className="hover:bg-[#FAF8F5] transition-colors group"
              >
                <td className="py-3 pl-2 font-mono font-medium text-[#171715]">
                  <button
                    onClick={() => onViewOrder(order)}
                    className="hover:text-[#8C7355] hover:underline"
                  >
                    {order.id}
                  </button>
                </td>

                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={order.customer.avatar}
                      alt={order.customer.name}
                      className="w-6 h-6 rounded-full object-cover border border-[#E8E2D9]"
                    />
                    <span className="font-medium text-[#171715]">
                      {order.customer.name}
                    </span>
                  </div>
                </td>

                <td className="py-3 text-[#524C44] max-w-xs truncate">
                  {order.items.map((i) => i.name).join(', ')}
                </td>

                <td className="py-3 text-[#6F685E] whitespace-nowrap">
                  {order.date}
                </td>

                <td className="py-3 text-right font-medium text-[#171715]">
                  ₹{order.total.toLocaleString('en-IN')}
                </td>

                <td className="py-3 text-center">
                  {getPaymentBadge(order.paymentStatus)}
                </td>

                <td className="py-3 text-center">
                  {getStatusBadge(order.orderStatus)}
                </td>

                <td className="py-3 text-right pr-2">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onViewOrder(order)}
                      title="Inspect Order"
                      className="p-1.5 text-[#6F685E] hover:text-[#171715] hover:bg-[#EFECE6] rounded transition-colors"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      onClick={() => onOpenInvoice(order)}
                      title="Print Tax Invoice"
                      className="p-1.5 text-[#6F685E] hover:text-[#171715] hover:bg-[#EFECE6] rounded transition-colors"
                    >
                      <Printer size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
