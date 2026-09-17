import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    image: {
      type: String,
      required: [true, 'Product image is required'],
      default: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    },
    stockStatus: {
      type: String,
      enum: ['In Stock', 'Low Stock', 'Out of Stock'],
      default: 'In Stock',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    brand: {
      type: String,
      trim: true,
      default: 'Artisan Woodcraft',
    },
    material: {
      type: String,
      trim: true,
      default: 'Solid Wood & Premium Upholstery',
    },
    dimensions: {
      type: String,
      trim: true,
      default: '',
    },
    color: {
      type: String,
      trim: true,
      default: 'Natural',
    },
  },
  {
    timestamps: true,
  }
);

// Index for search optimizations
productSchema.index({ name: 'text', category: 'text', description: 'text' });

const Product = mongoose.model('Product', productSchema);
export default Product;
