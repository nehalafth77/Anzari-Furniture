import React, { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon, Sparkles, AlertCircle } from 'lucide-react';

export default function ProductModal({
  isOpen,
  onClose,
  onSave,
  product = null, // null for Add, object for Edit
  categories = [],
  isLoading = false,
}) {
  const isEdit = Boolean(product);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Sofas',
    price: '',
    description: '',
    image: '',
    stockStatus: 'In Stock',
    featured: false,
    brand: 'Artisan Woodcraft',
    material: '',
    dimensions: '',
    color: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});
  const [showOptional, setShowOptional] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || (categories[0]?.name || 'Sofas'),
        price: product.price || '',
        description: product.description || '',
        image: product.image || '',
        stockStatus: product.stockStatus || 'In Stock',
        featured: Boolean(product.featured),
        brand: product.brand || 'Artisan Woodcraft',
        material: product.material || '',
        dimensions: product.dimensions || '',
        color: product.color || '',
      });
      setImagePreview(product.image || '');
      setSelectedFile(null);
      setShowOptional(Boolean(product.material || product.dimensions || product.color));
    } else {
      setFormData({
        name: '',
        category: categories[0]?.name || 'Sofas',
        price: '',
        description: '',
        image: '',
        stockStatus: 'In Stock',
        featured: false,
        brand: 'Ansari Living',
        material: '',
        dimensions: '',
        color: '',
      });
      setImagePreview('');
      setSelectedFile(null);
      setShowOptional(false);
    }
    setErrors({});
  }, [product, categories, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData((prev) => ({ ...prev, image: url }));
    if (!selectedFile) {
      setImagePreview(url);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter product name';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid price in ₹ (greater than 0)';
    }
    if (!selectedFile && !formData.image.trim() && !imagePreview) {
      newErrors.image = 'Please upload a product photo or provide an image link';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (selectedFile) {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('category', formData.category);
      data.append('price', formData.price);
      data.append('description', formData.description);
      data.append('stockStatus', formData.stockStatus);
      data.append('featured', formData.featured);
      data.append('brand', formData.brand);
      data.append('material', formData.material);
      data.append('dimensions', formData.dimensions);
      data.append('color', formData.color);
      data.append('imageFile', selectedFile);
      onSave(data, isEdit ? product._id : null);
    } else {
      onSave(
        {
          ...formData,
          price: Number(formData.price),
        },
        isEdit ? product._id : null
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-2xl w-full my-6 shadow-2xl border border-[#EAE4D9] overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#EAE4D9] bg-[#F9F7F2]">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#191816]">
              {isEdit ? 'Edit Furniture Product' : 'Add New Furniture Product'}
            </h2>
            <p className="text-xs sm:text-sm text-[#4F4B45] mt-0.5">
              Fill in the simple details below to update your online catalog.
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-2 rounded-xl text-[#8C8275] hover:text-[#191816] hover:bg-white transition-colors touch-target-lg flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body / Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-bold text-[#191816] mb-1.5">
              Product Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Modern Velvet Sofa, Solid Oak Dining Table"
              className={`w-full px-4 py-3 bg-[#F9F7F2] border rounded-xl text-base text-[#191816] placeholder-[#8C8275] focus:bg-white focus:border-[#18412F] transition-all touch-target-lg ${
                errors.name ? 'border-red-500 bg-red-50/20' : 'border-[#EAE4D9]'
              }`}
            />
            {errors.name && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Category & Price Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-bold text-[#191816] mb-1.5">
                Category <span className="text-red-600">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-[#F9F7F2] border border-[#EAE4D9] rounded-xl text-base text-[#191816] focus:bg-white focus:border-[#18412F] transition-all touch-target-lg"
              >
                {categories.length > 0 ? (
                  categories.map((c) => (
                    <option key={c._id || c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="Sofas">Sofas</option>
                    <option value="Chairs">Chairs</option>
                    <option value="Tables">Tables</option>
                    <option value="Beds">Beds</option>
                    <option value="Storage">Storage</option>
                    <option value="Decor">Decor</option>
                    <option value="Outdoor">Outdoor</option>
                  </>
                )}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-bold text-[#191816] mb-1.5">
                Price in INR (₹) <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-bold text-[#8C8275]">
                  ₹
                </span>
                <input
                  type="number"
                  min="1"
                  step="1"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="24999"
                  className={`w-full pl-8 pr-4 py-3 bg-[#F9F7F2] border rounded-xl text-base text-[#191816] placeholder-[#8C8275] focus:bg-white focus:border-[#18412F] transition-all touch-target-lg ${
                    errors.price ? 'border-red-500 bg-red-50/20' : 'border-[#EAE4D9]'
                  }`}
                />
              </div>
              {errors.price && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.price}
                </p>
              )}
            </div>
          </div>

          {/* Stock Status & Featured Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-[#F9F7F2] p-4 rounded-xl border border-[#EAE4D9]">
            {/* Stock Status */}
            <div>
              <label className="block text-sm font-bold text-[#191816] mb-1">
                Stock Status
              </label>
              <select
                value={formData.stockStatus}
                onChange={(e) => setFormData({ ...formData, stockStatus: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#EAE4D9] rounded-xl text-sm font-medium text-[#191816] focus:border-[#18412F] touch-target-lg"
              >
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

            {/* Featured Product Toggle */}
            <div className="pt-2 sm:pt-0">
              <label className="text-sm font-bold text-[#191816] mb-1 block">
                Featured Product?
              </label>
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 accent-[#18412F] rounded cursor-pointer"
                />
                <span className="text-sm text-[#4F4B45] font-medium flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#B88349]" />
                  Show in Featured List
                </span>
              </label>
            </div>
          </div>

          {/* Image Upload / URL */}
          <div>
            <label className="block text-sm font-bold text-[#191816] mb-1.5">
              Product Image <span className="text-red-600">*</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              {/* File Upload Box */}
              <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-[#EAE4D9] hover:border-[#18412F] rounded-2xl bg-[#F9F7F2] hover:bg-white cursor-pointer transition-all text-center group">
                <Upload className="w-6 h-6 text-[#18412F] mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-[#191816]">Upload from Device</span>
                <span className="text-[11px] text-[#8C8275] mt-0.5">JPG, PNG, WEBP (Max 5MB)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {/* URL Input Box */}
              <div>
                <span className="text-xs font-semibold text-[#8C8275] block mb-1">
                  Or paste Image Web Link (URL):
                </span>
                <div className="relative">
                  <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8275]" />
                  <input
                    type="url"
                    value={formData.image}
                    onChange={handleImageUrlChange}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full pl-10 pr-3 py-2.5 bg-[#F9F7F2] border border-[#EAE4D9] rounded-xl text-xs sm:text-sm text-[#191816] focus:bg-white focus:border-[#18412F]"
                  />
                </div>
              </div>
            </div>

            {/* Image Preview Box */}
            {imagePreview && (
              <div className="mt-3 p-3 bg-[#F9F7F2] rounded-xl border border-[#EAE4D9] flex items-center gap-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-lg border border-[#EAE4D9]"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="text-xs text-[#4F4B45]">
                  <p className="font-semibold text-[#191816]">Photo Selected</p>
                  <p className="text-[11px] text-[#8C8275] truncate max-w-xs">
                    {selectedFile ? selectedFile.name : 'Image URL Loaded'}
                  </p>
                </div>
              </div>
            )}
            {errors.image && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.image}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-[#191816] mb-1.5">
              Description
            </label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the style, craftsmanship, comfort, and materials..."
              className="w-full p-3.5 bg-[#F9F7F2] border border-[#EAE4D9] rounded-xl text-sm text-[#191816] placeholder-[#8C8275] focus:bg-white focus:border-[#18412F] transition-all leading-relaxed"
            />
          </div>

          {/* Optional Details Accordion */}
          <div className="pt-2 border-t border-[#EAE4D9]">
            <button
              type="button"
              onClick={() => setShowOptional(!showOptional)}
              className="text-xs font-bold text-[#18412F] hover:underline flex items-center gap-1 py-1"
            >
              {showOptional ? '− Hide Optional Specifications' : '+ Add Brand, Material, Dimensions & Color (Optional)'}
            </button>

            {showOptional && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 bg-[#F9F7F2] p-4 rounded-xl border border-[#EAE4D9]">
                <div>
                  <label className="block text-xs font-semibold text-[#4F4B45] mb-1">
                    Brand / Manufacturer
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="e.g. Ansari Studio"
                    className="w-full p-2.5 bg-white border border-[#EAE4D9] rounded-lg text-xs text-[#191816]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4F4B45] mb-1">
                    Material
                  </label>
                  <input
                    type="text"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    placeholder="e.g. Seasoned Teak & Velvet"
                    className="w-full p-2.5 bg-white border border-[#EAE4D9] rounded-lg text-xs text-[#191816]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4F4B45] mb-1">
                    Dimensions
                  </label>
                  <input
                    type="text"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    placeholder='e.g. 78" W x 34" D x 30" H'
                    className="w-full p-2.5 bg-white border border-[#EAE4D9] rounded-lg text-xs text-[#191816]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4F4B45] mb-1">
                    Color / Finish
                  </label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    placeholder="e.g. Moss Green / Natural Oak"
                    className="w-full p-2.5 bg-white border border-[#EAE4D9] rounded-lg text-xs text-[#191816]"
                  />
                </div>
              </div>
            )}
          </div>
        </form>

        {/* Modal Footer / Save & Cancel */}
        <div className="p-4 sm:p-5 border-t border-[#EAE4D9] bg-white flex flex-col sm:flex-row-reverse gap-3">
          <button
            type="button"
            disabled={isLoading}
            onClick={handleSubmit}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#18412F] hover:bg-[#123324] text-white font-bold text-base rounded-xl shadow-md transition-all touch-target-lg active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {isLoading ? 'Saving Product...' : isEdit ? 'Save Changes' : 'Save Product'}
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#F9F7F2] hover:bg-[#EAE4D9] text-[#191816] font-semibold text-base rounded-xl border border-[#EAE4D9] transition-colors touch-target-lg text-center"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
