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
  AlertCircle
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

  const [selectedStatus, setSelectedStatus] = useState(order.orderStatus);
  const [internalNote, setInternalNote] = useState('');
  const [notesList, setNotesList] = useState([
    { text: order.notes || 'No initial notes.', time: '12 Sep 2026, 18:45', author: 'System' }
  ]);

  const allStatuses = [
    'Pending',
    'Confirmed',
    'Processing',
    'Packed',
    'Shipped',
    'Out for Delivery',
    'Delivered',
    'Cancelled',
    'Refunded'
  ];

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);
    onUpdateOrderStatus(order.id, newStatus);
  };

  const handleAddNote = () => {
    if (!internalNote.trim()) return;
    setNotesList([
      ...notesList,
      { text: internalNote, time: 'Just now', author: 'Zoya Ansari' }
    ]);
    setInternalNote('');
  };

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

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#171715]/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative z-10 w-full max-w-2xl bg-[#FAF8F5] h-full shadow-2xl border-l border-[#E8E2D9] flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-[#E8E2D9] bg-[#FFFFFF] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif-luxury text-2xl font-semibold text-[#171715]">
                  Order {order.id}
                </h2>
                {getStatusBadge(selectedStatus)}
              </div>
              <p className="text-xs text-[#6F685E] mt-0.5">
                Placed on {order.date} • Luxury White Glove
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenInvoice(order)}
              className="px-3 py-1.5 bg-[#EFECE6] hover:bg-[#E4DDD2] text-[#171715] rounded text-xs font-medium flex items-center gap-1.5 transition-colors border border-[#DDD5C7]"
            >
              <Printer size={14} />
              <span>Print Invoice</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#6F685E] hover:text-[#171715] hover:bg-[#EFECE6] rounded-md transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status Quick Updater Banner */}
          <div className="p-4 rounded-md bg-[#F4EFE6] border border-[#E5DAC0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C7355] block">
                Manage Order State
              </span>
              <p className="text-xs text-[#524C44]">
                Current status notification sent automatically to patron.
              </p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedStatus}
                onChange={handleStatusChange}
                className="bg-white border border-[#D5C9B3] text-xs font-medium text-[#171715] rounded px-3 py-1.5 focus:outline-none focus:border-[#8C7355]"
              >
                {allStatuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Order Timeline Visual Tracker */}
          <div className="p-5 rounded-md bg-white border border-[#E8E2D9]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8C7355] mb-4">
              Fulfillment Journey
            </h3>

            <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E8E2D9]">
              {order.timeline &&
                order.timeline.map((item, idx) => {
                  const isCurrent =
                    item.status.toLowerCase() === selectedStatus.toLowerCase();
                  return (
                    <div key={idx} className="relative group">
                      <span
                        className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                          item.completed
                            ? 'bg-[#171715] border-[#171715] text-white'
                            : isCurrent
                            ? 'bg-[#8C7355] border-[#8C7355] text-white animate-pulse'
                            : 'bg-white border-[#D4CCC0]'
                        }`}
                      >
                        {item.completed && <CheckCircle2 size={10} />}
                      </span>

                      <div className="flex items-baseline justify-between">
                        <span
                          className={`text-xs font-medium ${
                            item.completed || isCurrent
                              ? 'text-[#171715]'
                              : 'text-[#9E978E]'
                          }`}
                        >
                          {item.status}
                        </span>
                        <span className="text-[11px] text-[#9E978E]">
                          {item.date}
                        </span>
                      </div>
                      {item.note && (
                        <p className="text-[11px] text-[#6F685E] mt-0.5 font-light">
                          {item.note}
                        </p>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Ordered Products Section */}
          <div className="p-5 rounded-md bg-white border border-[#E8E2D9]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8C7355] mb-3">
              Furnishings Included ({order.items.length})
            </h3>

            <div className="divide-y divide-[#F2EFE9]">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3.5 flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded object-cover border border-[#E8E2D9] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-[#171715] truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-[#6F685E] truncate mt-0.5">
                      {item.variant}
                    </p>
                    <div className="text-xs font-medium text-[#171715] mt-1">
                      Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="text-right font-medium text-xs text-[#171715] shrink-0">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Summary */}
            <div className="mt-4 pt-4 border-t border-[#E8E2D9] space-y-2 text-xs">
              <div className="flex justify-between text-[#6F685E]">
                <span>Items Subtotal</span>
                <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-[#A85D36]">
                  <span>Discount ({order.couponCode})</span>
                  <span>-₹{order.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-[#6F685E]">
                <span>White Glove Delivery</span>
                <span>{order.shipping === 0 ? 'Complimentary' : `₹${order.shipping}`}</span>
              </div>
              <div className="flex justify-between text-[#6F685E]">
                <span>Integrated GST (18%)</span>
                <span>₹{order.tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#171715] pt-2 border-t border-[#E8E2D9]">
                <span>Total Settled</span>
                <span className="font-serif-luxury text-base">
                  ₹{order.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Patron & Delivery Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Customer Details */}
            <div className="p-4 rounded-md bg-white border border-[#E8E2D9] text-xs">
              <div className="flex items-center gap-2 text-[#8C7355] font-semibold uppercase tracking-wider mb-2">
                <User size={14} />
                <span>Patron Details</span>
              </div>
              <p className="font-semibold text-sm text-[#171715]">{order.customer.name}</p>
              <div className="flex items-center gap-1.5 text-[#6F685E] mt-2">
                <Mail size={13} />
                <span>{order.customer.email}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#6F685E] mt-1">
                <Phone size={13} />
                <span>{order.customer.phone}</span>
              </div>
              <div className="mt-2 text-[11px] text-[#8C7355]">
                {order.customer.totalOrders} previous orders • Lifetime: ₹{order.customer.lifetimeValue.toLocaleString('en-IN')}
              </div>
            </div>

            {/* Shipping & Payment Method */}
            <div className="p-4 rounded-md bg-white border border-[#E8E2D9] text-xs">
              <div className="flex items-center gap-2 text-[#8C7355] font-semibold uppercase tracking-wider mb-2">
                <Truck size={14} />
                <span>Delivery & Payment</span>
              </div>
              <p className="font-medium text-[#171715]">{order.deliveryMethod}</p>
              <p className="text-[#6F685E] mt-1">
                {order.shippingAddress.line1}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}
              </p>
              <div className="mt-3 pt-2 border-t border-[#F2EFE9] flex items-center justify-between">
                <span className="text-[#6F685E]">Payment:</span>
                <span className="font-medium text-[#24482B]">{order.paymentMethod}</span>
              </div>
            </div>
          </div>

          {/* Internal Notes & Atelier Comments */}
          <div className="p-5 rounded-md bg-white border border-[#E8E2D9]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8C7355] mb-3">
              Internal Dispatch & Concierge Notes
            </h3>

            <div className="space-y-2 mb-3">
              {notesList.map((n, i) => (
                <div key={i} className="p-3 bg-[#FAF8F5] rounded border border-[#E8E2D9] text-xs">
                  <div className="flex justify-between text-[10px] text-[#9E978E] mb-1">
                    <span className="font-medium text-[#171715]">{n.author}</span>
                    <span>{n.time}</span>
                  </div>
                  <p className="text-[#524C44]">{n.text}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                placeholder="Add private note for logistics team..."
                className="flex-1 text-xs px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded focus:outline-none focus:border-[#8C7355]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddNote();
                }}
              />
              <button
                onClick={handleAddNote}
                className="px-3 py-2 bg-[#171715] hover:bg-[#33302D] text-white rounded text-xs flex items-center gap-1"
              >
                <Send size={12} />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
