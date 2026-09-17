import React, { useState } from 'react';
import Badge from '../components/common/Badge';
import {
  LayoutTemplate,
  Sliders,
  Eye,
  ArrowUp,
  ArrowDown,
  Edit2,
  Check,
  Plus,
  Trash2,
  ExternalLink,
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';
import { FURNITURE_IMAGES } from '../data/mockData';

export default function HomepageCMSPage({
  homepageSections,
  setHomepageSections,
  onOpenStorePreview
}) {
  const [editingSection, setEditingSection] = useState(null);
  const [editingHeroSlide, setEditingHeroSlide] = useState(null);

  const handleToggleSection = (id) => {
    setHomepageSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleMoveSection = (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= homepageSections.length) return;

    const updated = [...homepageSections];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setHomepageSections(updated);
  };

  const heroSection = homepageSections.find((s) => s.type === 'hero_slider');

  const handleSaveHeroSlide = (slide) => {
    if (!heroSection) return;
    const updatedSlides = heroSection.slides.map((s) =>
      s.id === slide.id ? slide : s
    );
    setHomepageSections((prev) =>
      prev.map((sec) =>
        sec.id === heroSection.id ? { ...sec, slides: updatedSlides } : sec
      )
    );
    setEditingHeroSlide(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#E8E2D9]">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8C7355] block">
            Visual Merchandising & Storefront
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-medium text-[#171715] mt-1">
            Homepage CMS ({homepageSections.length} Sections)
          </h1>
          <p className="text-xs sm:text-sm text-[#6F685E] mt-1 font-light">
            Curate the customer homepage layout, editorial banners, featured collections, and narrative blocks
          </p>
        </div>

        <button
          onClick={onOpenStorePreview}
          className="px-4 py-2 bg-[#171715] hover:bg-[#383532] text-[#FAF8F5] rounded-md text-xs font-medium flex items-center gap-2 transition-colors self-start sm:self-auto shadow-xs"
        >
          <Eye size={14} />
          <span>Launch Live Store Preview</span>
        </button>
      </div>

      {/* Hero Slider Dedicated Editor Card */}
      {heroSection && (
        <div className="p-6 rounded-md bg-white border border-[#E8E2D9] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#F2ECE4]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#F5EFE6] border border-[#E8DFC9] flex items-center justify-center text-[#8C7355]">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="font-serif-luxury text-xl font-semibold text-[#171715]">
                  Hero Carousel Management ({heroSection.slides.length} Slides)
                </h3>
                <p className="text-xs text-[#6F685E] font-light">
                  Primary showcase banners greeting visitors on Ansari Furniture
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const newSlide = {
                  id: `slide-${Date.now()}`,
                  heading: 'Monolithic Architectural Joinery',
                  subheading: 'Studio Series',
                  description: 'Crafted with seasoned woods and tactile linens.',
                  ctaText: 'View Series',
                  ctaLink: '/collections',
                  image: FURNITURE_IMAGES.astraBed,
                  active: true
                };
                setHomepageSections((prev) =>
                  prev.map((sec) =>
                    sec.id === heroSection.id
                      ? { ...sec, slides: [...sec.slides, newSlide] }
                      : sec
                  )
                );
              }}
              className="px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#EFECE6] border border-[#DDD5C7] rounded text-xs font-medium text-[#171715] flex items-center gap-1.5 transition-colors"
            >
              <Plus size={13} />
              <span>Add Slide</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {heroSection.slides.map((slide, idx) => (
              <div
                key={slide.id}
                className="rounded-md border border-[#E8E2D9] bg-[#FAF8F5] overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/9] bg-[#EAE5DC] relative overflow-hidden">
                    <img
                      src={slide.image}
                      alt={slide.heading}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 flex items-center gap-1.5">
                      <span className="text-[10px] bg-[#171715] text-white px-2 py-0.5 rounded-xs font-semibold">
                        Slide 0{idx + 1}
                      </span>
                      {slide.active ? (
                        <span className="text-[10px] bg-[#EEF5EE] text-[#24482B] border border-[#D4E6D6] px-1.5 py-0.5 rounded-xs">
                          Active
                        </span>
                      ) : (
                        <span className="text-[10px] bg-[#F9ECEB] text-[#852723] px-1.5 py-0.5 rounded-xs">
                          Hidden
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <span className="text-[10px] uppercase font-semibold text-[#8C7355] block">
                      {slide.subheading}
                    </span>
                    <h4 className="font-serif-luxury text-base font-semibold text-[#171715] mt-0.5 line-clamp-1">
                      {slide.heading}
                    </h4>
                    <p className="text-xs text-[#6F685E] mt-1 line-clamp-2 font-light">
                      {slide.description}
                    </p>
                    <div className="mt-3 text-[11px] text-[#8C7355] font-medium flex items-center gap-1">
                      CTA: {slide.ctaText} → {slide.ctaLink}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white border-t border-[#E8E2D9] flex items-center justify-between">
                  <button
                    onClick={() => setEditingHeroSlide(slide)}
                    className="px-2.5 py-1 bg-[#FAF8F5] hover:bg-[#EFECE6] border border-[#DDD5C7] rounded text-[11px] font-medium text-[#171715] flex items-center gap-1"
                  >
                    <Edit2 size={11} />
                    <span>Edit Slide</span>
                  </button>

                  <button
                    onClick={() => {
                      const updatedSlides = heroSection.slides.map((s) =>
                        s.id === slide.id ? { ...s, active: !s.active } : s
                      );
                      setHomepageSections((prev) =>
                        prev.map((sec) =>
                          sec.id === heroSection.id
                            ? { ...sec, slides: updatedSlides }
                            : sec
                        )
                      );
                    }}
                    className="text-[11px] text-[#6F685E] hover:text-[#171715] underline"
                  >
                    {slide.active ? 'Disable' : 'Enable'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sections Master Sequence Table */}
      <div className="p-6 rounded-md bg-white border border-[#E8E2D9] shadow-xs">
        <h3 className="font-serif-luxury text-xl font-semibold text-[#171715] mb-4 pb-2 border-b border-[#F2ECE4]">
          Storefront Page Architecture & Reordering
        </h3>

        <div className="space-y-3">
          {homepageSections.map((sec, idx) => (
            <div
              key={sec.id}
              className={`p-4 rounded-md border flex items-center justify-between gap-4 transition-all ${
                sec.enabled
                  ? 'bg-white border-[#E8E2D9]'
                  : 'bg-[#FAF8F5]/60 border-[#E8E2D9] opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-serif-luxury text-sm font-bold text-[#8C7355] w-5">
                  0{idx + 1}
                </span>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-xs text-[#171715]">
                      {sec.name}
                    </h4>
                    <span className="text-[10px] font-mono text-[#9E978E]">
                      ({sec.type})
                    </span>
                  </div>
                  <span className="text-[11px] text-[#6F685E] font-light block">
                    {sec.enabled ? 'Live on storefront' : 'Disabled from view'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Reorder Buttons */}
                <button
                  disabled={idx === 0}
                  onClick={() => handleMoveSection(idx, 'up')}
                  className="p-1.5 rounded bg-[#FAF8F5] border border-[#DDD5C7] text-[#6F685E] hover:text-[#171715] disabled:opacity-30"
                  title="Move Up"
                >
                  <ArrowUp size={13} />
                </button>
                <button
                  disabled={idx === homepageSections.length - 1}
                  onClick={() => handleMoveSection(idx, 'down')}
                  className="p-1.5 rounded bg-[#FAF8F5] border border-[#DDD5C7] text-[#6F685E] hover:text-[#171715] disabled:opacity-30"
                  title="Move Down"
                >
                  <ArrowDown size={13} />
                </button>

                {/* Enable / Disable Switch */}
                <button
                  onClick={() => handleToggleSection(sec.id)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    sec.enabled
                      ? 'bg-[#EEF5EE] text-[#24482B] border border-[#D4E6D6]'
                      : 'bg-[#FAF8F5] text-[#6F685E] border border-[#DDD5C7]'
                  }`}
                >
                  {sec.enabled ? 'Enabled' : 'Disabled'}
                </button>

                {/* Preview Trigger */}
                <button
                  onClick={onOpenStorePreview}
                  className="p-1.5 text-[#6F685E] hover:text-[#171715] hover:bg-[#FAF8F5] rounded"
                  title="Preview"
                >
                  <Eye size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Editor Modal */}
      {editingHeroSlide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171715]/70 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-lg border border-[#DDD5C7] p-6 shadow-2xl space-y-4">
            <h3 className="font-serif-luxury text-xl font-semibold text-[#171715]">
              Edit Hero Slide
            </h3>

            <div>
              <label className="block text-xs font-semibold text-[#524C44] uppercase mb-1">
                Subheading
              </label>
              <input
                type="text"
                value={editingHeroSlide.subheading}
                onChange={(e) =>
                  setEditingHeroSlide({
                    ...editingHeroSlide,
                    subheading: e.target.value
                  })
                }
                className="w-full text-xs p-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#524C44] uppercase mb-1">
                Main Headline
              </label>
              <input
                type="text"
                value={editingHeroSlide.heading}
                onChange={(e) =>
                  setEditingHeroSlide({
                    ...editingHeroSlide,
                    heading: e.target.value
                  })
                }
                className="w-full text-xs p-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#524C44] uppercase mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={editingHeroSlide.description}
                onChange={(e) =>
                  setEditingHeroSlide({
                    ...editingHeroSlide,
                    description: e.target.value
                  })
                }
                className="w-full text-xs p-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-[#524C44] mb-1">
                  CTA Button Label
                </label>
                <input
                  type="text"
                  value={editingHeroSlide.ctaText}
                  onChange={(e) =>
                    setEditingHeroSlide({
                      ...editingHeroSlide,
                      ctaText: e.target.value
                    })
                  }
                  className="w-full p-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#524C44] mb-1">
                  CTA Link Destination
                </label>
                <input
                  type="text"
                  value={editingHeroSlide.ctaLink}
                  onChange={(e) =>
                    setEditingHeroSlide({
                      ...editingHeroSlide,
                      ctaLink: e.target.value
                    })
                  }
                  className="w-full p-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#F2ECE4]">
              <button
                onClick={() => setEditingHeroSlide(null)}
                className="px-3 py-1.5 bg-[#FAF8F5] text-xs font-medium rounded border border-[#DDD5C7]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveHeroSlide(editingHeroSlide)}
                className="px-4 py-1.5 bg-[#171715] text-white text-xs font-medium rounded"
              >
                Save Slide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
