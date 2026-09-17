import React from 'react';
import { Calendar, Sparkles } from 'lucide-react';

export default function GreetingSection() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formattedDate = new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className="bg-white rounded-2xl border border-[#EAE4D9] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#18412F] mb-1">
          <Sparkles className="w-4 h-4 text-[#B88349]" />
          <span>Anzari Studio Admin Overview</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#191816]">
          {getGreeting()}, Admin
        </h2>
        <p className="text-sm sm:text-base text-[#4F4B45] mt-1 font-normal">
          Here's what's happening with your store today.
        </p>
      </div>

      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F9F7F2] border border-[#EAE4D9] text-xs sm:text-sm font-medium text-[#4F4B45] self-stretch sm:self-auto justify-center">
        <Calendar className="w-4 h-4 text-[#18412F]" />
        <span>{formattedDate}</span>
      </div>
    </div>
  );
}
