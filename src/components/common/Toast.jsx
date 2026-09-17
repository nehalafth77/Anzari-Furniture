import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Toast() {
  const { toast, hideToast } = useApp();

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        hideToast();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.show, hideToast]);

  if (!toast.show) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div
        className={`flex items-center gap-3 p-4 rounded-xl shadow-xl border ${
          isSuccess
            ? 'bg-[#123324] text-white border-[#18412F]'
            : isError
            ? 'bg-[#8E2828] text-white border-[#A13535]'
            : 'bg-[#191816] text-white border-neutral-700'
        }`}
      >
        <div className="shrink-0">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-300" />}
          {isError && <AlertCircle className="w-5 h-5 text-red-200" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-amber-300" />}
        </div>
        <p className="text-sm font-medium flex-1">{toast.message}</p>
        <button
          onClick={hideToast}
          className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
