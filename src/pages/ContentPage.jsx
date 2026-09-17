import React, { useState } from 'react';
import Badge from '../components/common/Badge';
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  User,
  Sparkles,
  Globe,
  FileText
} from 'lucide-react';
import { FURNITURE_IMAGES } from '../data/mockData';

export default function ContentPage({ articles }) {
  const [articleList, setArticleList] = useState(articles);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingArticle, setEditingArticle] = useState(null);

  const categories = [
    'All',
    'Interior Design Guides',
    'Furniture Stories',
    'Buying Guides',
    'Room Inspiration'
  ];

  const filtered = articleList.filter((a) => {
    if (selectedCategory === 'All') return true;
    return a.category === selectedCategory;
  });

  const handleSaveArticle = (article) => {
    if (articleList.some((a) => a.id === article.id)) {
      setArticleList((prev) =>
        prev.map((a) => (a.id === article.id ? article : a))
      );
    } else {
      setArticleList([...articleList, article]);
    }
    setEditingArticle(null);
  };

  const handleDeleteArticle = (id) => {
    setArticleList((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#E8E2D9]">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8C7355] block">
            The Journal & Editorial CMS
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-medium text-[#171715] mt-1">
            Content & Inspiration ({articleList.length} Stories)
          </h1>
          <p className="text-xs sm:text-sm text-[#6F685E] mt-1 font-light">
            Publish architectural design essays, timber heritage narratives, and room styling guidance
          </p>
        </div>

        <button
          onClick={() => {
            setEditingArticle({
              id: `ART-${Date.now().toString().slice(-3)}`,
              title: '',
              category: 'Interior Design Guides',
              author: 'Zoya Ansari',
              authorRole: 'Head of Design',
              readTime: '6 min read',
              coverImage: FURNITURE_IMAGES.novaSofa,
              publishDate: '12 Sep 2026',
              status: 'Draft',
              seoTitle: '',
              metaDescription: '',
              content: ''
            });
          }}
          className="px-4 py-2 bg-[#171715] hover:bg-[#383532] text-[#FAF8F5] rounded-md text-xs font-medium flex items-center gap-2 transition-colors self-start sm:self-auto shadow-xs"
        >
          <Plus size={14} />
          <span>+ Compose Article</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E8E2D9] pb-3 text-xs overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#171715] text-[#FAF8F5] shadow-xs'
                : 'text-[#6F685E] hover:text-[#171715] hover:bg-[#EFECE6]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((art) => (
          <div
            key={art.id}
            className="bg-white rounded-md border border-[#E8E2D9] overflow-hidden shadow-xs hover:border-[#D4CCC0] transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="aspect-[16/10] bg-[#FAF8F5] overflow-hidden relative">
                <img
                  src={art.coverImage}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-3 left-3 text-[10px] bg-[#171715] text-white px-2 py-0.5 rounded-xs font-semibold tracking-wider uppercase">
                  {art.category}
                </span>
                <span className="absolute bottom-3 right-3 text-[10px] bg-[#171715]/80 text-[#DDD5C7] px-2 py-0.5 rounded-xs">
                  {art.readTime}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between text-[11px] text-[#9E978E] mb-2">
                  <span className="flex items-center gap-1">
                    <User size={12} className="text-[#8C7355]" />
                    {art.author}
                  </span>
                  <span>{art.publishDate}</span>
                </div>

                <h3 className="font-serif-luxury text-lg font-semibold text-[#171715] group-hover:text-[#8C7355] transition-colors line-clamp-2">
                  {art.title}
                </h3>

                <p className="text-xs text-[#6F685E] line-clamp-2 mt-2 font-light">
                  {art.content}
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#FAF8F5] border-t border-[#E8E2D9] flex items-center justify-between text-xs">
              <Badge
                variant={art.status === 'Published' ? 'success' : 'default'}
                size="sm"
              >
                {art.status}
              </Badge>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setEditingArticle(art)}
                  className="p-1.5 text-[#6F685E] hover:text-[#171715] hover:bg-[#EFECE6] rounded transition-colors"
                  title="Edit Story"
                >
                  <Edit2 size={13} />
                </button>
                <button
                  onClick={() => handleDeleteArticle(art.id)}
                  className="p-1.5 text-[#6F685E] hover:text-[#852723] hover:bg-[#EFECE6] rounded transition-colors"
                  title="Delete Story"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Article Editor Modal */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171715]/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-3xl rounded-lg border border-[#DDD5C7] p-6 sm:p-8 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE4]">
              <h3 className="font-serif-luxury text-2xl font-semibold text-[#171715]">
                {editingArticle.title ? `Edit Article` : 'New Journal Essay'}
              </h3>
              <Badge variant="gold" size="sm">
                Editorial Mode
              </Badge>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#524C44] uppercase mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  value={editingArticle.title}
                  placeholder="e.g. The Architecture of Slow Living..."
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, title: e.target.value })
                  }
                  className="w-full text-sm font-semibold p-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded text-[#171715]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-[#524C44] uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={editingArticle.category}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, category: e.target.value })
                    }
                    className="w-full p-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded text-[#171715]"
                  >
                    {categories.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#524C44] uppercase mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    value={editingArticle.author}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, author: e.target.value })
                    }
                    className="w-full p-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded text-[#171715]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#524C44] uppercase mb-1">
                    Status
                  </label>
                  <select
                    value={editingArticle.status}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, status: e.target.value })
                    }
                    className="w-full p-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded text-[#171715]"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#524C44] uppercase mb-1">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  value={editingArticle.coverImage}
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, coverImage: e.target.value })
                  }
                  className="w-full p-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded text-[#171715]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#524C44] uppercase mb-1">
                  Essay Content & Editorial Body
                </label>
                <textarea
                  rows={6}
                  value={editingArticle.content}
                  placeholder="Draft your essay here..."
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, content: e.target.value })
                  }
                  className="w-full p-3 bg-[#FAF8F5] border border-[#DDD5C7] rounded text-[#171715] leading-relaxed"
                />
              </div>

              <div className="p-4 bg-[#FAF8F5] rounded border border-[#E8E2D9] space-y-2">
                <span className="font-semibold text-[#8C7355] uppercase block text-[10px]">
                  SEO & Discoverability
                </span>
                <input
                  type="text"
                  placeholder="Meta SEO Title"
                  value={editingArticle.seoTitle || ''}
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, seoTitle: e.target.value })
                  }
                  className="w-full p-2 bg-white border border-[#DDD5C7] rounded"
                />
                <textarea
                  rows={2}
                  placeholder="Meta Description for search engines"
                  value={editingArticle.metaDescription || ''}
                  onChange={(e) =>
                    setEditingArticle({
                      ...editingArticle,
                      metaDescription: e.target.value
                    })
                  }
                  className="w-full p-2 bg-white border border-[#DDD5C7] rounded"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#F2ECE4]">
              <button
                onClick={() => setEditingArticle(null)}
                className="px-4 py-2 bg-[#FAF8F5] text-xs font-medium rounded border border-[#DDD5C7]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveArticle(editingArticle)}
                className="px-5 py-2 bg-[#171715] text-white text-xs font-medium rounded"
              >
                Save Story
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
