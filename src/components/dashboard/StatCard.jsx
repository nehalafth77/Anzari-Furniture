import React from 'react';

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg = 'bg-[#EDF5F0]',
  iconColor = 'text-[#18412F]',
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-[#EAE4D9] p-5 sm:p-6 shadow-sm transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-[#18412F]/40 hover:shadow-md active:scale-[0.99]' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1 flex-1">
          <span className="text-xs sm:text-sm font-semibold text-[#8C8275] uppercase tracking-wider block">
            {title}
          </span>
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#191816] tracking-tight">
            {value !== undefined && value !== null ? value : '--'}
          </div>
          {subtitle && (
            <p className="text-xs text-[#4F4B45] font-medium pt-1">
              {subtitle}
            </p>
          )}
        </div>

        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0 shadow-inner`}>
          <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.75]" />
        </div>
      </div>
    </div>
  );
}
