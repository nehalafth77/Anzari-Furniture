import React, { useState } from 'react';
import {
  X,
  Printer,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  CreditCard,
  User,
  Phone,
  Mail,
  Edit3,
  Send,
  AlertCircle,
  Tag
} from 'lucide-react';
import Badge from '../common/Badge';

export default function OrderDetailsModal({
  isOpen,
  onClose,
  order,
  onUpdateOrderStatus,
  onOpenInvoice
}) {
  if (!isOpen || !order) return null;

  const currentStatus = order.status || order.orderStatus || 'Processing';
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [trackingCode, setTrackingCode] = useState(order.trackingCode || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const allStatuses = [
    'Processing',
    'Confirmed',
    'Shipped',
    'Delivered',
    'Cancelled'
  ];

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);
    if (onUpdateOrderStatus) {
      setIsUpdating(true);
      await onUpdateOrderStatus(order.id || order._id, newStatus, trackingCode);
      setIsUpdating(false);
    }
  };

  const handleSaveTracking = async () => {
    if (onUpdateOrderStatus) {
      setIsUpdating(true);
      await onUpdateOrderStatus(order.id || order._id, selectedStatus, trackingCode);
      setIsUpdating(false);
    }
  };

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

  // Safe patron info extraction
  const customerName = order.customerDetails?.fullName || order.customer?.name || 'Aanya Sharma';
  const customerEmail = order.customerDetails?.email || order.customer?.email || 'aanya@example.com';
  const customerPhone = order.customerDetails?.phone || order.customer?.phone || '+91 98123 45678';

  // Safe shipping address extraction
  const street = order.shippingAddress?.street || order.shippingAddress?.line1 || '14 Lotus Enclave, Indiranagar';
  const city = order.shippingAddress?.city || 'Bengaluru';
  const state = order.shippingAddress?.state || 'Karnataka';
  const pincode = order.shippingAddress?.pincode || order.shippingAddress?.postalCode || '560038';

  const orderNum = order.orderNumber || order.id || 'ANS-2026-908231';
  const items = Array.isArray(order.items) ? order.items : [];
  const subtotal = order.subtotal || order.total || 0;
  const total = order.total || 0;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#171715]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative z-10 w-full max-w-2xl bg-[#FAF8F5] h-full shadow-2xl border-l border-[#E8E2D9] flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-[#E8E2D9] bg-[#FFFFFF] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-2xl font-bold text-[#171715]">
                Order {orderNum}
              </h2>
              {getStatusBadge(selectedStatus)}
            </div>
            <p className="text-xs text-[#6F685E] mt-0.5">
              Fulfillment via {order.deliveryMethod || 'Standard White Glove Delivery'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onOpenInvoice && (
              <button
                onClick={() => onOpenInvoice(order)}
                className="px-3 py-1.5 bg-[#EFECE6] hover:bg-[#E4DDD2] text-[#171715] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-[#DDD5C7]"
              >
                <Printer size={14} />
                <span>Invoice</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-[#6F685E] hover:text-[#171715] hover:bg-[#EFECE6] rounded-xl transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status Quick Updater Banner */}
          <div className="p-5 rounded-2xl bg-[#EDF5F0] border border-[#D0E3D9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#18412F] block">
                Manage Live Order Status
              </span>
              <p className="text-xs text-[#2D5A43] mt-0.5">
                Directly updates Postgres database via <span className="font-mono">PUT /api/admin/orders/:id/status</span>
              </p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedStatus}
                onChange={handleStatusChange}
                disabled={isUpdating}
                className="bg-white border border-[#D0E3D9] text-xs font-bold text-[#18412F] rounded-xl px-3.5 py-2 focus:outline-none focus:border-[#18412F]"
              >
                {allStatuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tracking Code Updater */}
          <div className="p-4 rounded-xl bg-white border border-[#E8E2D9] space-y-2">
            <span className="text-xs font-bold text-[#171715] uppercase tracking-wider flex items-center gap-1.5">
              <Truck size={14} className="text-[#18412F]" />
              Fulfillment Tracking Code
            </span>
            <div className="flex gap-2">
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder="e.g. ANS-IND-908231 or Delhivery AWB"
                className="flex-1 text-xs px-3 py-2 bg-[#F9F7F2] border border-[#E8E2D9] rounded-xl focus:outline-none focus:border-[#18412F]"
              />
              <button
                onClick={handleSaveTracking}
                disabled={isUpdating}
                className="px-4 py-2 bg-[#18412F] hover:bg-[#123324] text-white rounded-xl text-xs font-bold transition-all"
              >
                {isUpdating ? 'Saving...' : 'Update Tracking'}
              </button>
            </div>
          </div>

          {/* Ordered Products Section */}
          <div className="p-5 rounded-2xl bg-white border border-[#E8E2D9]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C7355] mb-3">
              Furnishings Included ({items.length})
            </h3>

            <div className="divide-y divide-[#F2EFE9]">
              {items.map((item, idx) => (
                <div key={idx} className="py-3.5 flex items-center gap-4">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover border border-[#E8E2D9] shrink-0"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-[#171715] truncate">
                      {item.name}
                    </h4>
                    {item.color && (
                      <p className="text-[11px] text-[#6F685E] truncate mt-0.5">
                        Finish / Color: {item.color}
                      </p>
                    )}
                    <div className="text-xs font-medium text-[#171715] mt-1">
                      Qty: {item.quantity || 1} × ₹{(item.price || 0).toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="text-right font-bold text-xs sm:text-sm text-[#18412F] shrink-0">
                    ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Summary */}
            <div className="mt-4 pt-4 border-t border-[#E8E2D9] space-y-2 text-xs">
              <div className="flex justify-between text-[#6F685E]">
                <span>Items Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#6F685E]">
                <span>Delivery Charge</span>
                <span>{order.shippingFee === 0 || !order.shippingFee ? 'Complimentary White Glove' : `₹${order.shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-[#6F685E]">
                <span>Payment Status</span>
                <span className="font-bold text-emerald-700">{order.paymentStatus || 'Completed'} ({order.paymentMethod || 'Card / UPI'})</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#18412F] pt-2 border-t border-[#E8E2D9]">
                <span>Total Amount</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Patron & Delivery Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Customer Details */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8E2D9] text-xs">
              <div className="flex items-center gap-2 text-[#8C7355] font-bold uppercase tracking-wider mb-2">
                <User size={14} />
                <span>Patron Details</span>
              </div>
              <p className="font-bold text-sm text-[#171715]">{customerName}</p>
              <div className="flex items-center gap-1.5 text-[#6F685E] mt-2">
                <Mail size={13} />
                <span className="truncate">{customerEmail}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#6F685E] mt-1">
                <Phone size={13} />
                <span>{customerPhone}</span>
              </div>
            </div>

            {/* Shipping & Payment Method */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8E2D9] text-xs">
              <div className="flex items-center gap-2 text-[#8C7355] font-bold uppercase tracking-wider mb-2">
                <MapPin size={14} />
                <span>Delivery Address</span>
              </div>
              <p className="text-[#171715] font-medium leading-relaxed">
                {street},<br />
                {city}, {state} - {pincode}
              </p>
              <div className="mt-3 pt-2 border-t border-[#F2EFE9] flex items-center justify-between text-[11px]">
                <span className="text-[#8C8275]">Delivery:</span>
                <span className="font-bold text-[#18412F]">{order.deliveryMethod || 'White Glove'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
