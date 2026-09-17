import React, { useState, useEffect } from 'react';
import { X, FolderTree, AlertCircle } from 'lucide-react';

export default function CategoryModal({
  isOpen,
  onClose,
  onSave,
  category = null, // null for Add, object for Edit
  isLoading = false,
}) {
  const isEdit = Boolean(category);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (category) {
      setName(category.name || '');
      setDescription(category.description || '');
    } else {
      setName('');
      setDescription('');
    }
    setError('');
  }, [category, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Category name is required.');
      return;
    }
    onSave({ name: name.trim(), description: description.trim() }, isEdit ? category._id : null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#EAE4D9] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#EAE4D9]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#EDF5F0] text-[#18412F] flex items-center justify-center">
              <FolderTree className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#191816]">
                {isEdit ? 'Rename Category' : 'Add New Category'}
              </h3>
              <p className="text-xs text-[#8C8275]">
                {isEdit ? 'Update category name across catalog' : 'Create a new furniture collection'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-1.5 rounded-lg text-[#8C8275] hover:text-[#191816] hover:bg-[#F9F7F2]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-sm font-bold text-[#191816] mb-1">
              Category Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              placeholder="e.g. Living Room, Sofas, Lighting"
              className="w-full px-4 py-3 bg-[#F9F7F2] border border-[#EAE4D9] rounded-xl text-sm text-[#191816] focus:bg-white focus:border-[#18412F] transition-all touch-target-lg"
            />
            {error && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {error}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-[#191816] mb-1">
              Description (Optional)
            </label>
            <textarea
              rows="2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of items in this category..."
              className="w-full p-3 bg-[#F9F7F2] border border-[#EAE4D9] rounded-xl text-xs sm:text-sm text-[#191816] focus:bg-white focus:border-[#18412F] transition-all"
            />
          </div>

          <div className="mt-6 flex flex-col sm:flex-row-reverse gap-3 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-3 bg-[#18412F] hover:bg-[#123324] text-white font-bold rounded-xl text-sm shadow transition-all touch-target-lg active:scale-95 flex items-center justify-center"
            >
              {isLoading ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Category'}
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 bg-[#F9F7F2] hover:bg-[#EAE4D9] text-[#191816] font-medium rounded-xl text-sm border border-[#EAE4D9] transition-colors touch-target-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
