import 'dotenv/config'; // must be first — loads .env before any other module reads process.env
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import { connectDB } from './config/db.js';
import { logSupabaseStatus } from './config/supabase.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import seedRoutes from './routes/seedRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Setup __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Also load server/.env if it exists (overrides root .env for server-specific vars)
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend
app.use(cors());

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded static files
const uploadsPath = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsPath));

// API Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Ansari Furniture Admin API',
    backend: 'Prisma / Supabase & Express',
    supabase: process.env.SUPABASE_URL
      ? `connected (${process.env.SUPABASE_URL})`
      : 'not configured',
  });
});

// Mount Routes
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/seed', seedRoutes);
app.use('/api/auth', authRoutes);

// Centralized Error Handler
app.use(errorHandler);

// Start Server & Connect Database
const startServer = async () => {
  logSupabaseStatus(); // log Supabase connection status after env vars are loaded
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[Express] Furniture Shop Backend running on http://localhost:${PORT}`);
  });
};

startServer();
