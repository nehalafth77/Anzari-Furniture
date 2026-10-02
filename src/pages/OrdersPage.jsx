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
  ArrowUpDown,
  Truck,
  RotateCw,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { apiService } from '../api/apiService';

export default function OrdersPage({
  onViewOrder,
  onOpenInvoice,
  onUpdateOrderStatus,
}) {
  const {
    orders: contextOrders,
    refreshOrders,
    loadingOrders,
    setViewingOrder,
    setInvoiceOrder,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('All');

  const orders = contextOrders || [];

  const tabs = [
    'All',
    'Processing',
    'Confirmed',
    'Shipped',
    'Delivered',
    'Cancelled',
  ];

  const filteredOrders = orders.filter((order) => {
    const status = (order.status || order.orderStatus || 'Processing').toLowerCase();
    const matchesTab = activeTab === 'All' || status === activeTab.toLowerCase();

    const orderId = (order.orderNumber || order.id || '').toLowerCase();
    const customerName = (
      order.customerDetails?.fullName ||
      order.customer?.name ||
      ''
    ).toLowerCase();
    const customerEmail = (
      order.customerDetails?.email ||
      order.customer?.email ||
      ''
    ).toLowerCase();

    const matchesSearch =
      orderId.includes(searchQuery.toLowerCase()) ||
      customerName.includes(searchQuery.toLowerCase()) ||
      customerEmail.includes(searchQuery.toLowerCase());

    const paymentStatus = (order.paymentStatus || 'Completed').toLowerCase();
    const matchesPayment =
      paymentFilter === 'All' || paymentStatus === paymentFilter.toLowerCase();

    return matchesTab && matchesSearch && matchesPayment;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return <Badge variant="success">Delivered</Badge>;
      case 'Shipped':
        return <Badge variant="gold">Shipped</Badge>;
      case 'Processing':
        return <Badge variant="processing">Processing</Badge>;
      case 'Confirmed':
        return <Badge variant="taupe">Confirmed</Badge>;
      case 'Cancelled':
        return <Badge variant="danger">Cancelled</Badge>;
      default:
        return <Badge variant="default">{status || 'Processing'}</Badge>;
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await apiService.updateOrderStatus(orderId, newStatus);
      showToast(`Order status updated to ${newStatus}`, 'success');
      refreshOrders();
    } catch (err) {
      showToast(err.message || 'Failed to update order status', 'error');
    }
  };

  const exportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Order ID,Customer,Total,Date,Status,Payment']
        .concat(
          filteredOrders.map((o) => {
            const id = o.orderNumber || o.id;
            const cust = o.customerDetails?.fullName || o.customer?.name || 'Customer';
            const total = o.total || 0;
            const date = o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-IN') : 'N/A';
            const status = o.status || o.orderStatus || 'Processing';
            const payment = o.paymentStatus || 'Completed';
            return `${id},"${cust}",${total},"${date}",${status},${payment}`;
          })
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
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#E8E2D9]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8C7355] block">
            Fulfillment & Commerce
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#171715] mt-1">
            Orders ({filteredOrders.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#6F685E] mt-1">
            Manage showroom deliveries, white glove fulfillment, and status transitions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={refreshOrders}
            disabled={loadingOrders}
            className="p-2.5 bg-white border border-[#E8E2D9] text-[#171715] rounded-xl hover:bg-[#FAF8F5] transition-colors"
            title="Refresh Orders"
          >
            <RotateCw size={16} className={loadingOrders ? 'animate-spin' : ''} />
          </button>

          <button
            onClick={exportCSV}
            className="px-4 py-2.5 bg-white border border-[#E8E2D9] text-[#171715] rounded-xl text-xs font-semibold hover:bg-[#FAF8F5] flex items-center gap-2 transition-colors shadow-xs"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white rounded-2xl border border-[#E8E2D9] p-4 sm:p-5 shadow-xs space-y-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-[#E8E2D9]">
          {tabs.map((tab) => {
            const count =
              tab === 'All'
                ? orders.length
                : orders.filter(
                    (o) =>
                      (o.status || o.orderStatus || 'Processing').toLowerCase() ===
                      tab.toLowerCase()
                  ).length;
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#18412F] text-white shadow-xs'
                    : 'text-[#6F685E] hover:text-[#171715] hover:bg-[#FAF8F5]'
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#E8E2D9] text-[#6F685E]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search bar & Payment Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8275]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order #, Patron Name, or Email..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl text-xs sm:text-sm text-[#171715] focus:bg-white focus:border-[#18412F]"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="px-3 py-2.5 bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl text-xs font-medium text-[#171715] focus:bg-white focus:border-[#18412F]"
            >
              <option value="All">All Payments</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-[#E8E2D9] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8E2D9] bg-[#FAF8F5] text-[11px] font-bold uppercase tracking-wider text-[#8C8275]">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Patron</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Fulfillment</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E2D9]/60 text-xs">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((ord) => {
                  const id = ord.orderNumber || ord.id || 'ANS-2026';
                  const customerName =
                    ord.customerDetails?.fullName ||
                    ord.customer?.name ||
                    'Aanya Sharma';
                  const customerPhone =
                    ord.customerDetails?.phone ||
                    ord.customer?.phone ||
                    '';
                  const itemsCount = ord.items ? ord.items.length : 1;
                  const totalFormatted = `₹${(ord.total || 0).toLocaleString('en-IN')}`;
                  const currentStatus = ord.status || ord.orderStatus || 'Processing';

                  return (
                    <tr key={ord._id || ord.id} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#18412F]">
                        {id}
                        {ord.trackingCode && (
                          <span className="block text-[10px] text-[#8C8275] font-mono mt-0.5">
                            AWB: {ord.trackingCode}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-[#191816] block">{customerName}</span>
                        {customerPhone && (
                          <span className="text-[11px] text-[#8C8275] block mt-0.5">
                            {customerPhone}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-[#4F4B45]">
                        <span className="font-medium">{itemsCount} piece{itemsCount > 1 ? 's' : ''}</span>
                        {ord.items?.[0]?.name && (
                          <span className="block text-[11px] text-[#8C8275] truncate max-w-[160px]">
                            {ord.items[0].name}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-[#4F4B45]">
                        <span className="flex items-center gap-1 font-medium">
                          <Truck size={13} className="text-[#18412F]" />
                          {ord.deliveryMethod || 'White Glove'}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                          {ord.paymentStatus || 'Completed'} ({ord.paymentMethod || 'UPI/Card'})
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#191816] text-sm">
                        {totalFormatted}
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={currentStatus}
                          onChange={(e) => handleStatusChange(ord._id || ord.id, e.target.value)}
                          className="bg-[#FAF8F5] border border-[#E8E2D9] text-xs font-semibold rounded-lg px-2 py-1 text-[#18412F] focus:outline-none"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              if (setViewingOrder) setViewingOrder(ord);
                              if (onViewOrder) onViewOrder(ord);
                            }}
                            className="p-1.5 text-[#18412F] hover:bg-[#EDF5F0] rounded-lg transition-colors"
                            title="View Full Order"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => {
                              if (setInvoiceOrder) setInvoiceOrder(ord);
                              if (onOpenInvoice) onOpenInvoice(ord);
                            }}
                            className="p-1.5 text-[#8C8275] hover:bg-[#FAF8F5] rounded-lg transition-colors"
                            title="Print Invoice"
                          >
                            <Printer size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-[#8C8275]">
                    No orders found matching the filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
