import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmModal({
  isOpen,
  title = 'Are you sure you want to delete this product?',
  message = 'This action cannot be undone and will permanently remove this item from your furniture store.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  isLoading = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#EAE4D9] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="text-[#8C8275] hover:text-[#191816] p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold text-[#191816] leading-snug">{title}</h3>
          <p className="text-sm text-[#4F4B45] mt-2 leading-relaxed">{message}</p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row-reverse gap-3">
          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-base shadow-sm transition-colors flex items-center justify-center gap-2 touch-target-lg active:scale-[0.98]"
          >
            {isLoading ? 'Deleting...' : confirmText}
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={onCancel}
            className="w-full sm:w-auto px-6 py-3 bg-[#F9F7F2] hover:bg-[#EAE4D9] text-[#191816] font-medium rounded-xl text-base border border-[#EAE4D9] transition-colors touch-target-lg"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
