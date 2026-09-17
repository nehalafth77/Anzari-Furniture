import mongoose from 'mongoose';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS } from '../data/sampleData.js';

export let isConnectedToMongo = false;

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/furniture_shop';
  
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2500, // Quick fallback if local MongoDB is not running
    });
    
    isConnectedToMongo = true;
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
    
    // Auto-seed initial categories and products if database is empty
    const catCount = await Category.countDocuments();
    if (catCount === 0) {
      console.log('[MongoDB] Empty categories collection detected. Seeding defaults...');
      await Category.insertMany(INITIAL_CATEGORIES);
    }
    
    const prodCount = await Product.countDocuments();
    if (prodCount === 0) {
      console.log('[MongoDB] Empty products collection detected. Seeding defaults...');
      await Product.insertMany(INITIAL_PRODUCTS);
    }
    
    return true;
  } catch (err) {
    isConnectedToMongo = false;
    console.warn(`[MongoDB Warning] Could not connect to MongoDB at ${mongoURI}: ${err.message}`);
    console.warn('[MongoDB Info] Running with resilient local in-memory fallback store. All CRUD operations will work seamlessly without crashing.');
    return false;
  }
};
