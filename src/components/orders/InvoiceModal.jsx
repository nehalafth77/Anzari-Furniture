import React from 'react';
import { X, Printer, Download, CheckCircle2 } from 'lucide-react';

export default function InvoiceModal({ isOpen, onClose, order }) {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const orderNum = order.orderNumber || order.id || 'ANS-2026-908231';
  const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN') : (order.date || 'Today');

  const customerName = order.customerDetails?.fullName || order.customer?.name || 'Aanya Sharma';
  const customerEmail = order.customerDetails?.email || order.customer?.email || 'aanya@example.com';
  const customerPhone = order.customerDetails?.phone || order.customer?.phone || '+91 98123 45678';

  const street = order.shippingAddress?.street || order.shippingAddress?.line1 || '14 Lotus Enclave, Indiranagar';
  const city = order.shippingAddress?.city || 'Bengaluru';
  const state = order.shippingAddress?.state || 'Karnataka';
  const pincode = order.shippingAddress?.pincode || order.shippingAddress?.postalCode || '560038';

  const items = Array.isArray(order.items) ? order.items : [];
  const subtotal = order.subtotal || order.total || 0;
  const total = order.total || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171715]/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#FAF8F5] border border-[#D8D0C4] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="bg-[#123324] text-[#FAF8F5] px-6 py-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg tracking-wider uppercase text-[#EFECE6]">
              Tax Invoice — {orderNum}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-white text-[#123324] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm hover:bg-[#FAF7F2]"
            >
              <Printer size={14} />
              <span>Print Invoice</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-white/70 hover:text-white rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Invoice Sheet */}
        <div id="printable-invoice" className="p-8 sm:p-12 overflow-y-auto bg-white text-[#171715]">
          {/* Brand & Invoice Details */}
          <div className="flex flex-col sm:flex-row justify-between items-start pb-8 border-b border-[#E8E2D9] gap-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-3xl font-bold tracking-widest text-[#171715] uppercase">
                  ANZARI
                </span>
                <span className="text-[10px] tracking-[0.25em] font-sans uppercase text-[#8C7355] border border-[#8C7355]/40 px-1.5 py-0.5 rounded">
                  Atelier
                </span>
              </div>
              <p className="text-xs text-[#6F685E] mt-2 leading-relaxed">
                Ansari Furniture Private Limited<br />
                The Design House, 42 Heritage Timber Lane, Bandra West<br />
                Mumbai, Maharashtra 400050, India<br />
                GSTIN: 27AABCA1234F1Z8 • Official Tax Receipt
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs font-bold tracking-widest uppercase text-[#8C7355] block">
                Original Tax Invoice
              </span>
              <div className="text-xl font-bold font-mono text-[#18412F] mt-1">
                {orderNum}
              </div>
              <div className="text-xs text-[#6F685E] mt-1">
                Date: {orderDate}
              </div>
              <div className="text-xs text-[#6F685E]">
                Payment: <span className="font-bold text-emerald-700">{order.paymentStatus || 'Completed'}</span> ({order.paymentMethod || 'Card / UPI'})
              </div>
            </div>
          </div>

          {/* Billing & Shipping Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-6 border-b border-[#E8E2D9] text-xs">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#8C7355] block mb-1">
                Billed To:
              </span>
              <p className="font-bold text-sm text-[#171715]">{customerName}</p>
              <p className="text-[#6F685E] mt-0.5">{street}</p>
              <p className="text-[#6F685E]">
                {city}, {state} - {pincode}
              </p>
              <p className="text-[#6F685E] mt-1">Phone: {customerPhone}</p>
              <p className="text-[#6F685E]">Email: {customerEmail}</p>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#8C7355] block mb-1">
                Ship To & Delivery Mode:
              </span>
              <p className="font-bold text-sm text-[#171715]">{customerName}</p>
              <p className="text-[#6F685E] mt-0.5">{street}</p>
              <p className="text-[#6F685E]">
                {city}, {state} - {pincode}
              </p>
              <p className="text-[#18412F] mt-1 font-semibold">Fulfillment: {order.deliveryMethod || 'Standard White Glove Delivery'}</p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="py-6 border-b border-[#E8E2D9]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E8E2D9] text-[11px] uppercase tracking-wider text-[#8C7355] font-bold">
                  <th className="py-2.5">Item Description</th>
                  <th className="py-2.5 text-center">Qty</th>
                  <th className="py-2.5 text-right">Unit Price</th>
                  <th className="py-2.5 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2EFE9] text-xs">
                {items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3">
                      <div className="font-bold text-[#171715]">{item.name}</div>
                      {item.color && (
                        <div className="text-[11px] text-[#6F685E]">Finish: {item.color}</div>
                      )}
                    </td>
                    <td className="py-3 text-center font-medium">{item.quantity || 1}</td>
                    <td className="py-3 text-right text-[#524C44]">₹{(item.price || 0).toLocaleString('en-IN')}</td>
                    <td className="py-3 text-right font-bold text-[#171715]">
                      ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Calculation */}
          <div className="py-6 flex justify-end">
            <div className="w-full sm:w-72 space-y-2 text-xs">
              <div className="flex justify-between text-[#6F685E]">
                <span>Item Subtotal:</span>
                <span className="font-medium text-[#171715]">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#6F685E]">
                <span>White Glove Delivery:</span>
                <span>{order.shippingFee === 0 || !order.shippingFee ? 'Complimentary' : `₹${order.shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#18412F] pt-2 border-t border-[#E8E2D9]">
                <span>Total Amount:</span>
                <span className="font-serif text-lg">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-6 border-t border-[#E8E2D9] text-[11px] text-[#8C8275] text-center">
            Thank you for choosing Ansari Furniture. For warranty and care inquiries, please contact concierge@ansarifurniture.com
          </div>
        </div>
      </div>
    </div>
  );
}
