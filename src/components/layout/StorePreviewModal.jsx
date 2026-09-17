import React, { useState } from 'react';
import {
  X,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  ChevronRight,
  ShoppingBag,
  Heart,
  Search,
  ArrowRight,
  Check
} from 'lucide-react';
import { FURNITURE_IMAGES } from '../../data/mockData';

export default function StorePreviewModal({ isOpen, onClose, homepageSections, products, collections }) {
  const [device, setDevice] = useState('desktop');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  if (!isOpen) return null;

  const heroSection = homepageSections.find((s) => s.type === 'hero_slider');
  const activeSlides = heroSection?.slides.filter((s) => s.active) || [];
  const currentSlide = activeSlides[currentSlideIndex] || activeSlides[0];

  const getContainerWidth = () => {
    switch (device) {
      case 'mobile':
        return 'max-w-[400px]';
      case 'tablet':
        return 'max-w-[768px]';
      default:
        return 'max-w-[1240px]';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-[#171715]/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full h-[95vh] bg-[#F6F3EE] rounded-xl border border-[#D8D0C4] shadow-2xl flex flex-col overflow-hidden">
        {/* Top Control Bar */}
        <div className="bg-[#171715] text-[#FAF8F5] px-6 py-3 flex items-center justify-between border-b border-[#2A2826] shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-serif-luxury text-base tracking-wider uppercase text-[#EDE7DE]">
              Anzari Storefront
            </span>
            <span className="text-[11px] font-sans-modern bg-[#2A2826] text-[#A89F93] px-2 py-0.5 rounded border border-[#3D3A37]">
              Live Customer Preview
            </span>
          </div>

          {/* Device Switcher */}
          <div className="flex items-center bg-[#252321] rounded-md p-0.5 border border-[#3A3734]">
            <button
              onClick={() => setDevice('desktop')}
              className={`p-1.5 rounded text-xs transition-colors flex items-center gap-1.5 ${device === 'desktop' ? 'bg-[#3A3734] text-white' : 'text-[#8C8275] hover:text-white'
                }`}
              title="Desktop View"
            >
              <Monitor size={15} />
              <span className="text-[11px] hidden sm:inline">Desktop</span>
            </button>
            <button
              onClick={() => setDevice('tablet')}
              className={`p-1.5 rounded text-xs transition-colors flex items-center gap-1.5 ${device === 'tablet' ? 'bg-[#3A3734] text-white' : 'text-[#8C8275] hover:text-white'
                }`}
              title="Tablet View"
            >
              <Tablet size={15} />
              <span className="text-[11px] hidden sm:inline">Tablet</span>
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`p-1.5 rounded text-xs transition-colors flex items-center gap-1.5 ${device === 'mobile' ? 'bg-[#3A3734] text-white' : 'text-[#8C8275] hover:text-white'
                }`}
              title="Mobile View"
            >
              <Smartphone size={15} />
              <span className="text-[11px] hidden sm:inline">Mobile</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert('Opening standalone customer preview in a new window');
              }}
              className="text-xs text-[#C4B7A6] hover:text-white flex items-center gap-1"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">Open in Tab</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded text-[#A89F93] hover:text-white hover:bg-[#2A2826] transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Storefront Viewport Container */}
        <div className="flex-1 overflow-y-auto bg-[#EFECE6] p-4 sm:p-8 flex justify-center items-start">
          <div
            className={`w-full bg-[#FAF8F5] text-[#171715] shadow-xl border border-[#DDD5C7] rounded-md transition-all duration-300 overflow-hidden ${getContainerWidth()}`}
          >
            {/* Storefront Announcement Bar */}
            <div className="bg-[#171715] text-[#EFECE6] text-[11px] tracking-widest text-center py-2 uppercase border-b border-[#2A2826]">
              Complimentary White Glove Delivery & Architectural Consultation Across India
            </div>

            {/* Storefront Header */}
            <header className="px-6 py-4 border-b border-[#E8E2D9] flex items-center justify-between bg-[#FAF8F5]/95 sticky top-0 z-20">
              <div className="flex items-center gap-6">
                <span className="font-serif-luxury text-2xl font-bold tracking-widest text-[#171715] uppercase">
                  Anzari
                </span>
                <nav className="hidden md:flex items-center gap-5 text-xs font-medium tracking-wider uppercase text-[#6F685E]">
                  <span className="hover:text-[#171715] cursor-pointer">Living</span>
                  <span className="hover:text-[#171715] cursor-pointer">Dining</span>
                  <span className="hover:text-[#171715] cursor-pointer">Bedroom</span>
                  <span className="hover:text-[#171715] cursor-pointer">Collections</span>
                  <span className="hover:text-[#171715] cursor-pointer">Journal</span>
                </nav>
              </div>

              <div className="flex items-center gap-4 text-[#524C44]">
                <Search size={16} className="cursor-pointer hover:text-[#171715]" />
                <Heart size={16} className="cursor-pointer hover:text-[#171715]" />
                <div className="flex items-center gap-1 cursor-pointer hover:text-[#171715]">
                  <ShoppingBag size={16} />
                  <span className="text-[11px] font-semibold bg-[#8C7355] text-white w-4 h-4 rounded-full inline-flex items-center justify-center">
                    2
                  </span>
                </div>
              </div>
            </header>

            {/* Storefront Hero Banner */}
            {currentSlide && (
              <div className="relative h-[480px] sm:h-[560px] bg-[#171715] text-white overflow-hidden group">
                <img
                  src={currentSlide.image}
                  alt={currentSlide.heading}
                  className="w-full h-full object-cover opacity-85 transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171715]/85 via-[#171715]/30 to-transparent" />

                <div className="absolute bottom-12 left-8 sm:left-16 max-w-xl text-left">
                  <div className="text-[11px] uppercase tracking-[0.3em] text-[#C4B7A6] font-medium mb-3">
                    {currentSlide.subheading}
                  </div>
                  <h2 className="font-serif-luxury text-3xl sm:text-5xl font-medium leading-tight mb-4 text-[#FAF8F5]">
                    {currentSlide.heading}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#DDD5C7] leading-relaxed mb-6 max-w-md font-light">
                    {currentSlide.description}
                  </p>
                  <button className="px-6 py-3 bg-[#FAF8F5] text-[#171715] hover:bg-[#8C7355] hover:text-white rounded-none text-xs font-semibold uppercase tracking-widest transition-all">
                    {currentSlide.ctaText}
                  </button>
                </div>

                {/* Hero Slider Dots */}
                {activeSlides.length > 1 && (
                  <div className="absolute bottom-6 right-8 flex items-center gap-2">
                    {activeSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlideIndex(idx)}
                        className={`h-1.5 transition-all ${idx === currentSlideIndex
                          ? 'w-8 bg-white'
                          : 'w-2 bg-white/40 hover:bg-white/70'
                          }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Curated Collections Row */}
            <section className="p-8 sm:p-12 border-b border-[#E8E2D9]">
              <div className="text-center max-w-xl mx-auto mb-10">
                <span className="text-[10px] tracking-[0.25em] text-[#8C7355] uppercase font-semibold">
                  Curated Editions
                </span>
                <h3 className="font-serif-luxury text-3xl font-semibold mt-2 text-[#171715]">
                  Designed for Modern Sanctuaries
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {collections.slice(0, 3).map((col) => (
                  <div key={col.id} className="group cursor-pointer">
                    <div className="aspect-[4/3] bg-[#EAE5DC] overflow-hidden rounded-sm relative">
                      <img
                        src={col.image}
                        alt={col.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[#171715]/15 group-hover:bg-[#171715]/5 transition-colors" />
                    </div>
                    <div className="mt-3">
                      <div className="text-[10px] uppercase tracking-wider text-[#8C7355]">
                        {col.productsCount} Masterpieces
                      </div>
                      <h4 className="font-serif-luxury text-lg font-medium text-[#171715] mt-0.5">
                        {col.name}
                      </h4>
                      <p className="text-xs text-[#6F685E] line-clamp-2 mt-1 font-light">
                        {col.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Bestseller Grid */}
            <section className="p-8 sm:p-12 bg-[#F6F3EE]">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <span className="text-[10px] tracking-[0.25em] text-[#8C7355] uppercase font-semibold">
                    Catalogue Highlights
                  </span>
                  <h3 className="font-serif-luxury text-3xl font-semibold mt-1 text-[#171715]">
                    Iconic Furnishings
                  </h3>
                </div>
                <button className="text-xs text-[#171715] hover:text-[#8C7355] font-medium uppercase tracking-wider flex items-center gap-1">
                  View Full Catalogue <ArrowRight size={13} />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                {products.slice(0, 4).map((prod) => (
                  <div key={prod.id} className="group bg-white p-3 border border-[#E8E2D9] rounded-sm">
                    <div className="aspect-square bg-[#F4F0EA] overflow-hidden mb-3 relative">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 text-[10px] bg-[#171715] text-white px-2 py-0.5 font-medium tracking-wider uppercase">
                        {prod.category}
                      </span>
                    </div>
                    <h5 className="font-serif-luxury text-sm font-semibold text-[#171715] group-hover:text-[#8C7355] transition-colors line-clamp-1">
                      {prod.name}
                    </h5>
                    <p className="text-[11px] text-[#6F685E] line-clamp-1 mt-0.5 font-light">
                      {prod.shortDescription}
                    </p>
                    <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-[#F0ECE4]">
                      <span className="text-xs font-semibold text-[#171715]">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-[#8C7355] font-medium underline cursor-pointer">
                        Add to Bag
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Storefront Footer Preview */}
            <footer className="bg-[#171715] text-[#FAF8F5] p-8 sm:p-12 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 pb-8 border-b border-[#2A2826]">
                <div className="sm:col-span-2">
                  <span className="font-serif-luxury text-2xl font-bold tracking-widest text-[#FAF8F5] uppercase">
                    Anzari Furniture
                  </span>
                  <p className="text-xs text-[#A89F93] mt-3 max-w-sm leading-relaxed font-light">
                    Handcrafting quiet luxury heirlooms for discerning residential and hospitality spaces since 1984. Atelier in Mumbai, delivery across India.
                  </p>
                </div>
                <div>
                  <h6 className="text-[11px] uppercase tracking-widest font-semibold text-[#DDD5C7] mb-3">
                    Bespoke Service
                  </h6>
                  <ul className="text-xs text-[#8C8275] space-y-2">
                    <li>Architectural Trade Program</li>
                    <li>Custom Timber Finishes</li>
                    <li>White Glove Assembly</li>
                    <li>Private Studio Consultation</li>
                  </ul>
                </div>
                <div>
                  <h6 className="text-[11px] uppercase tracking-widest font-semibold text-[#DDD5C7] mb-3">
                    Head Atelier
                  </h6>
                  <p className="text-xs text-[#8C8275] leading-relaxed">
                    Anzari Design Studio<br />
                    Worli Sea Face, Mumbai 400018<br />
                    concierge@ansarifurniture.com
                  </p>
                </div>
              </div>
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#6F685E]">
                <span>© 2026 Anzari Furniture Private Limited. All rights reserved.</span>
                <span className="text-[#8C7355] mt-2 sm:mt-0">Quiet Luxury Design Language</span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
