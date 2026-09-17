import React, { useState } from 'react';
import Badge from '../components/common/Badge';
import { Plus, Edit2, Eye, Archive, CheckCircle, Sparkles, Layers } from 'lucide-react';

export default function CollectionsPage({ collections, onOpenStorePreview }) {
  const [collectionList, setCollectionList] = useState(collections);
  const [editingCollection, setEditingCollection] = useState(null);

  const handleToggleStatus = (id) => {
    setCollectionList((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextStatus = c.status === 'Published' ? 'Archived' : 'Published';
          return { ...c, status: nextStatus, lastUpdated: 'Just now' };
        }
        return c;
      })
    );
  };

  const handleSaveCollection = (e) => {
    e.preventDefault();
    if (!editingCollection) return;
    setCollectionList((prev) =>
      prev.map((c) => (c.id === editingCollection.id ? editingCollection : c))
    );
    setEditingCollection(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#E8E2D9]">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8C7355] block">
            Curatorial Series
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-medium text-[#171715] mt-1">
            Collections ({collectionList.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#6F685E] mt-1 font-light">
            Editorial furniture anthologies grouped by design philosophy and material language
          </p>
        </div>

        <button
          onClick={() => {
            const name = prompt('New collection name:');
            if (name) {
              const newCol = {
                id: `COL-00${collectionList.length + 1}`,
                name,
                tagline: 'New Editorial Anthology',
                description: 'Curated architectural collection.',
                productsCount: 0,
                status: 'Draft',
                featured: false,
                image: collectionList[0].image,
                lastUpdated: 'Just now'
              };
              setCollectionList([...collectionList, newCol]);
            }
          }}
          className="px-4 py-2 bg-[#171715] hover:bg-[#383532] text-[#FAF8F5] rounded-md text-xs font-medium flex items-center gap-2 transition-colors self-start sm:self-auto shadow-xs"
        >
          <Plus size={14} />
          <span>+ New Collection</span>
        </button>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collectionList.map((col) => (
          <div
            key={col.id}
            className="bg-white rounded-md border border-[#E8E2D9] overflow-hidden shadow-xs hover:border-[#D4CCC0] transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Large Cover Image */}
              <div className="aspect-[16/10] bg-[#FAF8F5] overflow-hidden relative">
                <img
                  src={col.image}
                  alt={col.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171715]/70 via-[#171715]/10 to-transparent" />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <Badge
                    variant={col.status === 'Published' ? 'success' : 'default'}
                    size="sm"
                  >
                    {col.status}
                  </Badge>
                  {col.featured && (
                    <span className="text-[10px] bg-[#171715] text-[#EDE7DE] px-2 py-0.5 rounded font-medium border border-[#3D3A37] flex items-center gap-1">
                      <Sparkles size={10} className="text-[#8C7355]" />
                      Featured
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#E4D5B7] font-medium block">
                    {col.tagline}
                  </span>
                  <h3 className="font-serif-luxury text-xl font-semibold leading-tight text-[#FAF8F5]">
                    {col.name}
                  </h3>
                </div>
              </div>

              {/* Body Details */}
              <div className="p-5">
                <p className="text-xs text-[#6F685E] leading-relaxed font-light min-h-[40px]">
                  {col.description}
                </p>

                <div className="mt-4 pt-3 border-t border-[#F2ECE4] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#171715] font-medium">
                    <Layers size={13} className="text-[#8C7355]" />
                    <span>{col.productsCount} Furnishings</span>
                  </div>
                  <span className="text-[11px] text-[#9E978E]">
                    Updated {col.lastUpdated}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="p-4 bg-[#FAF8F5] border-t border-[#E8E2D9] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingCollection(col)}
                  className="px-2.5 py-1 bg-white hover:bg-[#F2EFE9] border border-[#DDD5C7] rounded text-[11px] font-medium text-[#171715] flex items-center gap-1 transition-colors"
                >
                  <Edit2 size={12} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={onOpenStorePreview}
                  className="px-2.5 py-1 bg-white hover:bg-[#F2EFE9] border border-[#DDD5C7] rounded text-[11px] font-medium text-[#171715] flex items-center gap-1 transition-colors"
                >
                  <Eye size={12} />
                  <span>Preview</span>
                </button>
              </div>

              <button
                onClick={() => handleToggleStatus(col.id)}
                className={`text-[11px] font-medium hover:underline flex items-center gap-1 ${
                  col.status === 'Published' ? 'text-[#852723]' : 'text-[#24482B]'
                }`}
              >
                {col.status === 'Published' ? (
                  <>
                    <Archive size={12} /> Archive
                  </>
                ) : (
                  <>
                    <CheckCircle size={12} /> Publish
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Collection Modal */}
      {editingCollection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171715]/70 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-lg border border-[#DDD5C7] p-6 shadow-2xl space-y-4">
            <h3 className="font-serif-luxury text-xl font-semibold text-[#171715]">
              Edit Collection: {editingCollection.name}
            </h3>
            <div>
              <label className="block text-xs font-semibold text-[#524C44] uppercase mb-1">
                Collection Name
              </label>
              <input
                type="text"
                value={editingCollection.name}
                onChange={(e) =>
                  setEditingCollection({ ...editingCollection, name: e.target.value })
                }
                className="w-full text-xs p-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#524C44] uppercase mb-1">
                Tagline
              </label>
              <input
                type="text"
                value={editingCollection.tagline}
                onChange={(e) =>
                  setEditingCollection({ ...editingCollection, tagline: e.target.value })
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
                value={editingCollection.description}
                onChange={(e) =>
                  setEditingCollection({
                    ...editingCollection,
                    description: e.target.value
                  })
                }
                className="w-full text-xs p-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingCollection(null)}
                className="px-3 py-1.5 bg-[#FAF8F5] text-xs font-medium rounded border border-[#DDD5C7]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCollection}
                className="px-4 py-1.5 bg-[#171715] text-white text-xs font-medium rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
