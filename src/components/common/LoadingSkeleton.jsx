import React from 'react';

export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-[#EAE4D9] p-4 animate-pulse">
      <div className="w-full h-48 bg-[#EAE4D9]/60 rounded-xl mb-4" />
      <div className="h-4 bg-[#EAE4D9]/80 rounded w-1/3 mb-2" />
      <div className="h-5 bg-[#EAE4D9] rounded w-3/4 mb-3" />
      <div className="h-6 bg-[#EAE4D9]/80 rounded w-1/2 mb-4" />
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#EAE4D9]/60">
        <div className="h-9 bg-[#EAE4D9]/60 rounded-lg" />
        <div className="h-9 bg-[#EAE4D9]/60 rounded-lg" />
        <div className="h-9 bg-[#EAE4D9]/60 rounded-lg" />
      </div>
    </div>
  );
}

export function StatSkeleton() {
  return (
    <div className="bg-white p-5 rounded-2xl border border-[#EAE4D9] shadow-sm animate-pulse flex items-center justify-between">
      <div className="space-y-2 flex-1">
        <div className="h-4 bg-[#EAE4D9]/70 rounded w-1/3" />
        <div className="h-7 bg-[#EAE4D9] rounded w-1/2" />
      </div>
      <div className="w-12 h-12 rounded-xl bg-[#EAE4D9]/60 shrink-0" />
    </div>
  );
}
