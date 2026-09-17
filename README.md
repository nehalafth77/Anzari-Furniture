# 🪑 Ansari Studio — MERN Furniture Shop Admin Dashboard

A complete, production-ready Furniture Store Administrator Dashboard built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js), styled with Tailwind CSS, and powered by Lucide React icons.

Designed with a calm, elegant lifestyle aesthetic (dark forest green navigation, warm cream backgrounds, and rounded cards) and optimized for non-technical users on smartphones, tablets, and desktops.

---

## 🌟 Features & Highlights

- **Streamlined Navigation (4 Sections Only)**:
  - 📊 **Dashboard**: Live dynamic metrics computed from MongoDB (Total Products, Categories, Featured Products, Total Product Views) and quick actions.
  - 🛋️ **Products**: Full catalog management with search, category filtering chips, featured filters, stock status badges, and 3 explicit action buttons (`View`, `Edit`, `Delete`).
  - 📁 **Categories**: Add, rename, and safely delete furniture categories with safeguards against deleting categories with active products.
  - ⚙️ **Settings**: Showroom contact information, database status monitor, and a 1-click **Restore Sample Furniture** tool.
- **Mobile-First Touch Architecture**:
  - Tested for phone screen sizes (`320px`, `360px`, `375px`, `390px`, `412px`, `430px`).
  - Minimum 48px touch targets, sticky mobile header, smooth slide-out drawer, and zero horizontal page overflow.
- **Indian Rupee (₹ INR) Formatting**:
  - Realistic furniture pricing (e.g. ₹24,999, ₹18,999, ₹8,999, ₹32,999).
- **Dynamic Metrics & View Increment**:
  - Opening any product detail modal automatically triggers `PUT /api/products/:id/view` to increment views in MongoDB.
  - Dashboard statistics are computed dynamically using MongoDB aggregations (`COUNT`, `$sum`).
- **Resilient Database Fallback**:
  - Seamlessly connects to MongoDB or MongoDB Atlas via Mongoose.
  - Automatically seeds realistic sample data on first run.
  - If a local MongoDB daemon is not currently active, the server gracefully falls back to an active in-memory store so the app **never crashes or freezes**.

---

## 📁 Architecture & Folder Structure

```
vite-project/
├── server/
│   ├── config/
│   │   ├── db.js                 # Mongoose connection & auto-seeding
│   │   └── memoryStore.js        # Resilient fallback store
│   ├── controllers/
│   │   ├── productController.js  # CRUD + filter/search + view counter
│   │   ├── categoryController.js # CRUD + safety deletion checks
│   │   └── dashboardController.js# Dynamic MongoDB metrics
│   ├── data/
│   │   └── sampleData.js         # Realistic INR furniture items
│   ├── middleware/
│   │   ├── upload.js             # Multer image upload storage
│   │   └── errorHandler.js       # User-friendly error messages
│   ├── models/
│   │   ├── Product.js            # Product Mongoose Schema
│   │   └── Category.js           # Category Mongoose Schema
│   ├── routes/
│   │   ├── productRoutes.js      # /api/products
│   │   ├── categoryRoutes.js     # /api/categories
│   │   ├── dashboardRoutes.js    # /api/dashboard/stats
│   │   └── seedRoutes.js         # /api/seed/reset
│   ├── uploads/                  # Uploaded product photos
│   ├── server.js                 # Express server entry point (Port 5000)
│   └── package.json              # Server dependencies
│
├── src/                          # React + Vite Frontend
│   ├── api/
│   │   └── apiService.js         # Centralized API fetch client
│   ├── components/
│   │   ├── common/
│   │   │   ├── Badge.jsx         # Stock status & featured badges
│   │   │   ├── ConfirmModal.jsx  # Deletion confirmation dialog
│   │   │   ├── EmptyState.jsx    # "No products found" handler
│   │   │   ├── LoadingSkeleton.jsx# Skeleton loaders
│   │   │   └── Toast.jsx         # Success / Error toast notifications
│   │   ├── dashboard/
│   │   │   ├── GreetingSection.jsx# "Good Morning, Admin" greeting
│   │   │   └── StatCard.jsx      # Rounded stat cards
│   │   ├── layout/
│   │   │   ├── Header.jsx        # Desktop top bar
│   │   │   ├── MobileDrawer.jsx  # Slide-out navigation drawer
│   │   │   ├── MobileHeader.jsx  # Mobile sticky top bar
│   │   │   └── Sidebar.jsx       # Dark green desktop sidebar
│   │   ├── products/
│   │   │   ├── FilterBar.jsx     # Category chips + search + toggles
│   │   │   ├── ProductCard.jsx   # 3 action buttons + INR price
│   │   │   ├── ProductDetailModal.jsx # Large view + view counter trigger
│   │   │   ├── ProductGrid.jsx   # Responsive grid (1 to 4 cols)
│   │   │   └── ProductModal.jsx  # Add & Edit form with file upload
│   │   └── categories/
│   │       ├── CategoryCard.jsx  # Category item with product count
│   │       └── CategoryModal.jsx # Add / Rename modal
│   ├── context/
│   │   └── AppContext.jsx        # Global notifications and store state
│   ├── pages/
│   │   ├── DashboardHome.jsx     # Admin summary & recent items
│   │   ├── ProductsPage.jsx      # Product management & filtering
│   │   ├── CategoriesPage.jsx    # Department management
│   │   └── SettingsPage.jsx      # Store info & database tools
│   ├── index.css                 # Forest green & cream palette tokens
│   └── App.jsx                   # Layout container & routing
│
├── .env.example
├── package.json
└── vite.config.js
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18 or higher (v24 recommended)
- **MongoDB**: Local MongoDB community server or MongoDB Atlas connection URI (optional, falls back gracefully if not running)

### 1. Install Dependencies

In the project root:
```bash
# Frontend dependencies
npm install

# Backend dependencies
npm install --prefix server
```

### 2. Environment Configuration (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Default values:
- `PORT=5000`
- `MONGODB_URI=mongodb://127.0.0.1:27017/furniture_shop`

### 3. Run the Application

#### Terminal 1 — Start the Express Backend:
```bash
npm run server
# Running on http://localhost:5000
```

#### Terminal 2 — Start the Vite Frontend:
```bash
npm run dev
# Running on http://localhost:5173
```

Open your browser at **`http://localhost:5173`**.

---

## 📡 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/dashboard/stats` | Dynamic metrics: counts of products, categories, featured, sum of views |
| `GET` | `/api/products` | Get products (supports `?search=`, `?category=`, `?featured=true`, `?stockStatus=`) |
| `GET` | `/api/products/:id` | Get single product by ID |
| `POST` | `/api/products` | Create product (supports `multipart/form-data` file upload or JSON) |
| `PUT` | `/api/products/:id` | Update product details or replace image |
| `DELETE` | `/api/products/:id` | Delete product |
| `PUT` | `/api/products/:id/view` | Increment view counter for product by 1 |
| `GET` | `/api/categories` | Get all categories with assigned product count |
| `POST` | `/api/categories` | Create new category |
| `PUT` | `/api/categories/:id` | Rename / update category |
| `DELETE` | `/api/categories/:id` | Delete category (guards against active products) |
| `POST` | `/api/seed/reset` | Restore sample furniture catalog & categories |
