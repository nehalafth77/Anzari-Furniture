import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: [true, 'Product ID is required'],
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      required: [true, 'Slug is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    shortDescription: {
      type: String,
      trim: true,
      default: '',
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
    compareAtPrice: {
      type: Number,
      default: null,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    room: {
      type: String,
      required: [true, 'Room is required'],
      trim: true,
    },
    collectionName: {
      type: String,
      trim: true,
      default: '',
    },
    images: {
      type: [String],
      default: [],
    },
    secondaryImage: {
      type: String,
      default: null,
    },
    material: {
      type: String,
      trim: true,
      default: 'Solid Wood & Premium Veneer',
    },
    dimensions: {
      type: {
        unit: {
          type: String,
          default: 'cm',
        },
        width: {
          type: Number,
          default: 0,
        },
        depth: {
          type: Number,
          default: 0,
        },
        height: {
          type: Number,
          default: 0,
        },
      },
      default: { unit: 'cm', width: 0, depth: 0, height: 0 },
    },
    colors: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    bestseller: {
      type: Boolean,
      default: false,
    },
    badge: {
      type: String,
      trim: true,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
    },
    features: {
      type: [String],
      default: [],
    },
    careInstructions: {
      type: String,
      trim: true,
      default: '',
    },
    // Legacy fields for backward compatibility
    image: {
      type: String,
      default: null,
    },
    stockStatus: {
      type: String,
      enum: ['In Stock', 'Low Stock', 'Out of Stock'],
      default: 'In Stock',
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
