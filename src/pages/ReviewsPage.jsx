import React, { useState } from 'react';
import Badge from '../components/common/Badge';
import {
  Star,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Sparkles,
  ShieldAlert,
  Send,
  CornerDownRight,
  Filter
} from 'lucide-react';

export default function ReviewsPage({ reviews }) {
  const [reviewList, setReviewList] = useState(reviews);
  const [filter, setFilter] = useState('All');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const filteredReviews = reviewList.filter((r) => {
    if (filter === 'All') return true;
    return r.status.toLowerCase() === filter.toLowerCase();
  });

  const handleUpdateStatus = (id, newStatus) => {
    setReviewList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const handleFeatureReview = (id) => {
    setReviewList((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, featured: !r.featured } : r
      )
    );
  };

  const handleSendReply = (id) => {
    if (!replyText.trim()) return;
    setReviewList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, reply: replyText.trim() } : r))
    );
    setReplyingTo(null);
    setReplyText('');
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5 text-[#A37B3D]">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            size={13}
            fill={s <= rating ? '#A37B3D' : 'none'}
            stroke="#A37B3D"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#E8E2D9]">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8C7355] block">
            Patron Voices & Feedback
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-medium text-[#171715] mt-1">
            Testimonials & Reviews ({reviewList.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#6F685E] mt-1 font-light">
            Moderate architectural patron ratings, publish verified testimonials, and reply to client inquiries
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E8E2D9] pb-3 text-xs">
        {['All', 'Pending', 'Published', 'Reported'].map((tab) => {
          const count =
            tab === 'All'
              ? reviewList.length
              : reviewList.filter(
                  (r) => r.status.toLowerCase() === tab.toLowerCase()
                ).length;

          return (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3.5 py-1.5 rounded-sm font-medium transition-all flex items-center gap-1.5 ${
                filter === tab
                  ? 'bg-[#171715] text-[#FAF8F5] shadow-xs'
                  : 'text-[#6F685E] hover:text-[#171715] hover:bg-[#EFECE6]'
              }`}
            >
              <span>{tab}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  filter === tab
                    ? 'bg-[#383532] text-[#EDE7DE]'
                    : 'bg-[#EAE5DC] text-[#6F685E]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Reviews Cards List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-md border border-[#E8E2D9] text-[#9E978E]">
            <Star size={32} className="mx-auto mb-2 opacity-30" />
            <p className="text-xs">No reviews match current status filter.</p>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-md bg-white border border-[#E8E2D9] shadow-xs hover:border-[#D4CCC0] transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F2ECE4]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FAF8F5] border border-[#DDD5C7] flex items-center justify-center font-serif-luxury text-sm font-bold text-[#171715]">
                    {review.customer[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm text-[#171715]">
                        {review.customer}
                      </h4>
                      {review.verified && (
                        <span className="text-[10px] bg-[#EEF5EE] text-[#24482B] border border-[#D4E6D6] px-1.5 py-0.2 rounded-xs font-medium">
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#8C7355] font-medium">
                      Reviewed: {review.product}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {renderStars(review.rating)}
                  <span className="text-[11px] text-[#9E978E]">{review.date}</span>
                  <Badge
                    variant={review.status === 'Published' ? 'success' : 'processing'}
                    size="sm"
                  >
                    {review.status}
                  </Badge>
                  {review.featured && (
                    <Badge variant="gold" size="sm">
                      Featured on Storefront
                    </Badge>
                  )}
                </div>
              </div>

              {/* Review Text */}
              <p className="text-xs text-[#524C44] leading-relaxed italic font-serif-luxury text-base">
                "{review.content}"
              </p>

              {/* Atelier Response if existing */}
              {review.reply && (
                <div className="p-3 bg-[#FAF8F5] rounded-md border border-[#E8E2D9] text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-[#8C7355] font-semibold text-[11px] uppercase tracking-wider">
                    <CornerDownRight size={13} />
                    <span>Ansari Atelier Response</span>
                  </div>
                  <p className="text-[#6F685E] pl-4">{review.reply}</p>
                </div>
              )}

              {/* Actions Row */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  {review.status !== 'Published' ? (
                    <button
                      onClick={() => handleUpdateStatus(review.id, 'Published')}
                      className="px-3 py-1 bg-[#24482B] hover:bg-[#1C3822] text-white rounded text-xs font-medium flex items-center gap-1 transition-colors"
                    >
                      <CheckCircle2 size={12} />
                      <span>Approve</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpdateStatus(review.id, 'Pending')}
                      className="px-3 py-1 bg-[#FAF8F5] hover:bg-[#EDE8E0] text-[#6F685E] border border-[#DDD5C7] rounded text-xs font-medium flex items-center gap-1 transition-colors"
                    >
                      <XCircle size={12} />
                      <span>Unpublish</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleFeatureReview(review.id)}
                    className={`px-3 py-1 rounded text-xs font-medium border transition-colors flex items-center gap-1 ${
                      review.featured
                        ? 'bg-[#F7F2E7] text-[#7A5B2E] border-[#E4D5B7]'
                        : 'bg-[#FAF8F5] text-[#6F685E] border-[#DDD5C7] hover:bg-[#EDE8E0]'
                    }`}
                  >
                    <Sparkles size={12} />
                    <span>{review.featured ? 'Featured' : 'Feature'}</span>
                  </button>

                  <button
                    onClick={() => setReplyingTo(replyingTo === review.id ? null : review.id)}
                    className="px-3 py-1 bg-[#FAF8F5] hover:bg-[#EDE8E0] text-[#171715] border border-[#DDD5C7] rounded text-xs font-medium flex items-center gap-1 transition-colors"
                  >
                    <MessageSquare size={12} />
                    <span>{review.reply ? 'Edit Reply' : 'Reply'}</span>
                  </button>
                </div>

                <button
                  onClick={() => handleUpdateStatus(review.id, 'Reported')}
                  className="text-[11px] text-[#852723] hover:underline flex items-center gap-1"
                >
                  <ShieldAlert size={12} />
                  <span>Report</span>
                </button>
              </div>

              {/* Inline Reply Box */}
              {replyingTo === review.id && (
                <div className="pt-3 border-t border-[#F2ECE4] flex gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write official concierge reply to client..."
                    className="flex-1 text-xs px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded focus:outline-none focus:border-[#8C7355]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendReply(review.id);
                    }}
                  />
                  <button
                    onClick={() => handleSendReply(review.id)}
                    className="px-4 py-2 bg-[#171715] hover:bg-[#383532] text-white rounded text-xs font-medium flex items-center gap-1"
                  >
                    <Send size={12} />
                    <span>Send Reply</span>
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
