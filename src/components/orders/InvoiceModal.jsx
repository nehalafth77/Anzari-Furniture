import React from 'react';
import { X, Printer, Download, CheckCircle2 } from 'lucide-react';

export default function InvoiceModal({ isOpen, onClose, order }) {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171715]/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#FAF8F5] border border-[#D8D0C4] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="bg-[#171715] text-[#FAF8F5] px-6 py-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="font-serif-luxury text-lg tracking-wider uppercase text-[#EFECE6]">
              Tax Invoice — {order.id}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-[#8C7355] hover:bg-[#735D43] text-white rounded text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Printer size={14} />
              <span>Print Invoice</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-[#A89F93] hover:text-white rounded transition-colors"
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
                <span className="font-serif-luxury text-3xl font-bold tracking-widest text-[#171715] uppercase">
                  Ansari
                </span>
                <span className="text-[10px] tracking-[0.25em] font-sans-modern uppercase text-[#8C7355] border border-[#8C7355]/40 px-1.5 py-0.5 rounded-xs">
                  Atelier
                </span>
              </div>
              <p className="text-xs text-[#6F685E] mt-2 font-light leading-relaxed">
                Ansari Furniture Private Limited<br />
                The Design House, Plot 18, Worli Sea Face<br />
                Mumbai, Maharashtra 400018, India<br />
                GSTIN: 27AABCA1234F1Z8 | CIN: U36100MH1984PTC032190
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#8C7355] block">
                Original Tax Invoice
              </span>
              <div className="text-xl font-bold text-[#171715] mt-1">
                {order.id}
              </div>
              <div className="text-xs text-[#6F685E] mt-1">
                Date: {order.date}
              </div>
              <div className="text-xs text-[#6F685E]">
                Payment: <span className="font-medium text-[#24482B]">{order.paymentStatus}</span> ({order.paymentMethod})
              </div>
            </div>
          </div>

          {/* Billing & Shipping Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-6 border-b border-[#E8E2D9] text-xs">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C7355] block mb-1">
                Bill To:
              </span>
              <p className="font-semibold text-sm text-[#171715]">{order.customer.name}</p>
              <p className="text-[#6F685E] mt-0.5">{order.billingAddress.line1}</p>
              <p className="text-[#6F685E]">
                {order.billingAddress.city}, {order.billingAddress.state} - {order.billingAddress.postalCode}
              </p>
              <p className="text-[#6F685E] mt-1">Phone: {order.customer.phone}</p>
              <p className="text-[#6F685E]">Email: {order.customer.email}</p>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C7355] block mb-1">
                Ship To & Delivery Mode:
              </span>
              <p className="font-semibold text-sm text-[#171715]">{order.customer.name}</p>
              <p className="text-[#6F685E] mt-0.5">{order.shippingAddress.line1}</p>
              <p className="text-[#6F685E]">
                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}
              </p>
              <p className="text-[#8C7355] mt-1 font-medium">Mode: {order.deliveryMethod}</p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="py-6 border-b border-[#E8E2D9]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E8E2D9] text-[11px] uppercase tracking-wider text-[#8C7355]">
                  <th className="py-2.5">Item Description</th>
                  <th className="py-2.5 text-center">Qty</th>
                  <th className="py-2.5 text-right">Unit Price</th>
                  <th className="py-2.5 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2EFE9] text-xs">
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3">
                      <div className="font-semibold text-[#171715]">{item.name}</div>
                      <div className="text-[11px] text-[#6F685E] font-light">{item.variant}</div>
                    </td>
                    <td className="py-3 text-center font-medium">{item.quantity}</td>
                    <td className="py-3 text-right text-[#524C44]">₹{item.price.toLocaleString('en-IN')}</td>
                    <td className="py-3 text-right font-medium text-[#171715]">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
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
                <span className="font-medium text-[#171715]">₹{order.subtotal.toLocaleString('en-IN')}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-[#A85D36]">
                  <span>Discount ({order.couponCode || 'Promo'}):</span>
                  <span>-₹{order.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-[#6F685E]">
                <span>White Glove Shipping:</span>
                <span>{order.shipping === 0 ? 'COMPLIMENTARY' : `₹${order.shipping.toLocaleString('en-IN')}`}</span>
              </div>
              <div className="flex justify-between text-[#6F685E]">
                <span>Integrated GST (18%):</span>
                <span>₹{order.tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#171715] pt-3 border-t border-[#E8E2D9]">
                <span>Total Amount:</span>
                <span className="font-serif-luxury text-base">₹{order.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Terms & Footer */}
          <div className="pt-8 border-t border-[#E8E2D9] text-[10px] text-[#9E978E] flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div className="max-w-md">
              <span className="font-semibold uppercase tracking-wider block mb-1 text-[#6F685E]">
                Declaration & Warranty:
              </span>
              All wooden components are certified seasoned plantation hardwood backed by a 5-year structural craftsmanship guarantee. This is an authentic computer generated luxury invoice.
            </div>
            <div className="text-right">
              <div className="h-10 w-32 border-b border-dashed border-[#DDD5C7] mb-1"></div>
              <span className="text-[11px] font-serif-luxury text-[#171715] block">
                Ansari Furniture Atelier
              </span>
              <span className="text-[10px] text-[#8C7355]">Authorized Signatory</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
