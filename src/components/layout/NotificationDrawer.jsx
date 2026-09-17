import React, { useState } from 'react';
import {
  X,
  Bell,
  ShoppingBag,
  AlertTriangle,
  CreditCard,
  Star,
  Users,
  CheckCircle2,
  Trash2
} from 'lucide-react';

export default function NotificationDrawer({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onClearAll,
  onSelectOrder
}) {
  const [filter, setFilter] = useState('all');

  if (!isOpen) return null;

  const filtered = notifications.filter((n) => {
    if (filter === 'unread') return n.unread;
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'order':
        return <ShoppingBag size={16} className="text-[#8C7355]" />;
      case 'inventory':
        return <AlertTriangle size={16} className="text-[#A85D36]" />;
      case 'payment':
        return <CreditCard size={16} className="text-[#3F6647]" />;
      case 'review':
        return <Star size={16} className="text-[#A37B3D]" />;
      case 'customer':
        return <Users size={16} className="text-[#595248]" />;
      default:
        return <Bell size={16} className="text-[#6F685E]" />;
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
      <div className="relative z-10 w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl border-l border-[#E8E2D9] flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#EFECE6] border border-[#DDD5C7] flex items-center justify-center text-[#171715]">
              <Bell size={16} />
            </div>
            <div>
              <h2 className="font-serif-luxury text-xl font-semibold text-[#171715]">
                Notifications
              </h2>
              <p className="text-xs text-[#6F685E]">
                Store alerts and real-time activities
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#6F685E] hover:text-[#171715] hover:bg-[#EFECE6] rounded-md transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filter Tabs & Bulk Actions */}
        <div className="px-6 py-3 border-b border-[#E8E2D9]/70 bg-[#F4F0EA]/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`text-xs px-2.5 py-1 rounded-sm transition-colors ${
                filter === 'all'
                  ? 'bg-[#171715] text-[#FAF8F5] font-medium'
                  : 'text-[#6F685E] hover:text-[#171715]'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`text-xs px-2.5 py-1 rounded-sm transition-colors ${
                filter === 'unread'
                  ? 'bg-[#171715] text-[#FAF8F5] font-medium'
                  : 'text-[#6F685E] hover:text-[#171715]'
              }`}
            >
              Unread ({notifications.filter((n) => n.unread).length})
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={onMarkAsRead}
              className="text-[11px] text-[#8C7355] hover:underline flex items-center gap-1"
            >
              <CheckCircle2 size={12} />
              Mark all read
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-[#9E978E]">
              <Bell size={28} className="mx-auto mb-2 opacity-40" />
              <p className="text-xs">No notifications to display</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-md border transition-all ${
                  item.unread
                    ? 'bg-[#FFFFFF] border-[#DDD5C7] shadow-xs'
                    : 'bg-[#F4F0EA]/50 border-[#E8E2D9] opacity-80'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-[#FAF8F5] border border-[#E8E2D9] shrink-0 mt-0.5">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-semibold text-[#171715]">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-[#9E978E] shrink-0">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-xs text-[#524C44] mt-1 leading-relaxed">
                      {item.description}
                    </p>
                    {item.type === 'order' && (
                      <button
                        onClick={() => {
                          onClose();
                          onSelectOrder('#AN-10482');
                        }}
                        className="mt-2 text-[11px] font-medium text-[#8C7355] hover:underline inline-flex items-center gap-1"
                      >
                        Inspect Order #AN-10482 →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E8E2D9] bg-[#FAF8F5] flex justify-between items-center text-xs text-[#6F685E]">
          <span>Notifications synced live</span>
          <button
            onClick={onClearAll}
            className="flex items-center gap-1 text-[11px] text-[#852723] hover:underline"
          >
            <Trash2 size={12} />
            Clear list
          </button>
        </div>
      </div>
    </div>
  );
}
