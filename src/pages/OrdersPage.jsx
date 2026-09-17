import React, { useState } from 'react';
import Badge from '../components/common/Badge';
import {
  Search,
  Filter,
  Download,
  Eye,
  Printer,
  ChevronDown,
  ShoppingBag,
  Clock,
  ArrowUpDown
} from 'lucide-react';

export default function OrdersPage({
  orders,
  onViewOrder,
  onOpenInvoice,
  onUpdateOrderStatus
}) {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('All');

  const tabs = [
    'All',
    'Pending',
    'Confirmed',
    'Processing',
    'Shipped',
    'Delivered',
    'Cancelled',
    'Refunded'
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesTab =
      activeTab === 'All' ||
      order.orderStatus.toLowerCase() === activeTab.toLowerCase();

    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((i) =>
        i.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesPayment =
      paymentFilter === 'All' ||
      order.paymentStatus.toLowerCase() === paymentFilter.toLowerCase();

    return matchesTab && matchesSearch && matchesPayment;
  });

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

  const exportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Order ID,Customer,Total,Date,Status,Payment']
        .concat(
          filteredOrders.map(
            (o) =>
              `${o.id},"${o.customer.name}",${o.total},"${o.date}",${o.orderStatus},${o.paymentStatus}`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ansari_orders_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#E8E2D9]">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8C7355] block">
            Fulfillment Management
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-medium text-[#171715] mt-1">
            Orders ({orders.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#6F685E] mt-1 font-light">
            Review customer orders, dispatch white glove logistics, and issue tax invoices
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="px-3.5 py-2 bg-[#FAF8F5] hover:bg-[#EDE8E0] text-[#171715] border border-[#DDD5C7] rounded-md text-xs font-medium flex items-center gap-2 transition-colors self-start sm:self-auto shadow-xs"
        >
          <Download size={14} className="text-[#6F685E]" />
          <span>Export Orders CSV</span>
        </button>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#E8E2D9]/80 text-xs">
        {tabs.map((tab) => {
          const count =
            tab === 'All'
              ? orders.length
              : orders.filter(
                  (o) => o.orderStatus.toLowerCase() === tab.toLowerCase()
                ).length;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-sm font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === tab
                  ? 'bg-[#171715] text-[#FAF8F5] shadow-xs'
                  : 'text-[#6F685E] hover:text-[#171715] hover:bg-[#EFECE6]'
              }`}
            >
              <span>{tab}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTab === tab
                    ? 'bg-[#33302D] text-[#EDE7DE]'
                    : 'bg-[#EAE5DC] text-[#6F685E]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-md bg-white border border-[#E8E2D9] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search size={15} className="absolute left-3.5 top-2.5 text-[#9E978E]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by Order ID, Patron, Product name..."
            className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-md text-xs text-[#171715] focus:outline-none focus:border-[#8C7355]"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <span className="text-xs text-[#6F685E] whitespace-nowrap">Payment:</span>
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="text-xs px-3 py-1.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-md text-[#171715] focus:outline-none focus:border-[#8C7355]"
          >
            <option value="All">All Payment States</option>
            <option value="Paid">Paid</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="p-6 rounded-md bg-white border border-[#E8E2D9] shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8E2D9] text-[11px] uppercase tracking-wider text-[#8C7355]">
                <th className="py-3 pl-2">Order ID</th>
                <th className="py-3">Customer</th>
                <th className="py-3">Furniture Items</th>
                <th className="py-3">Date</th>
                <th className="py-3 text-right">Amount</th>
                <th className="py-3 text-center">Payment</th>
                <th className="py-3 text-center">Status</th>
                <th className="py-3 text-right pr-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2EFE9] text-xs">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#9E978E]">
                    <ShoppingBag size={28} className="mx-auto mb-2 opacity-40" />
                    <p>No orders found matching criteria.</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-[#FAF8F5] transition-colors group"
                  >
                    <td className="py-3.5 pl-2 font-mono font-medium text-[#171715]">
                      <button
                        onClick={() => onViewOrder(order)}
                        className="hover:text-[#8C7355] hover:underline"
                      >
                        {order.id}
                      </button>
                    </td>

                    <td className="py-3.5">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={order.customer.avatar}
                          alt={order.customer.name}
                          className="w-7 h-7 rounded-full object-cover border border-[#E8E2D9]"
                        />
                        <div>
                          <div className="font-medium text-[#171715]">
                            {order.customer.name}
                          </div>
                          <span className="text-[11px] text-[#9E978E]">
                            {order.shippingAddress.city}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 text-[#524C44] max-w-xs truncate">
                      <span title={order.items.map((i) => i.name).join(', ')}>
                        {order.items.map((i) => i.name).join(', ')}
                      </span>
                    </td>

                    <td className="py-3.5 text-[#6F685E] whitespace-nowrap">
                      {order.date}
                    </td>

                    <td className="py-3.5 text-right font-medium text-[#171715]">
                      ₹{order.total.toLocaleString('en-IN')}
                    </td>

                    <td className="py-3.5 text-center">
                      <span
                        className={`text-[11px] font-medium px-2 py-0.5 rounded-sm border ${
                          order.paymentStatus === 'Paid'
                            ? 'bg-[#EEF5EE] text-[#24482B] border-[#D4E6D6]'
                            : 'bg-[#F9ECEB] text-[#852723] border-[#EFC4C2]'
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>

                    <td className="py-3.5 text-center">
                      {getStatusBadge(order.orderStatus)}
                    </td>

                    <td className="py-3.5 text-right pr-2">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onViewOrder(order)}
                          className="px-2.5 py-1 bg-[#FAF8F5] hover:bg-[#EFECE6] border border-[#DDD5C7] rounded text-[11px] font-medium text-[#171715] flex items-center gap-1 transition-colors"
                        >
                          <Eye size={12} />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => onOpenInvoice(order)}
                          className="p-1.5 text-[#6F685E] hover:text-[#171715] hover:bg-[#EFECE6] rounded transition-colors"
                          title="Print Invoice"
                        >
                          <Printer size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
