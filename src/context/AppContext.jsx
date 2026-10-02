import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Auth state — check sessionStorage for persisted session
  const storedUser = sessionStorage.getItem('anzari_user');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(storedUser ? JSON.parse(storedUser) : null);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  // Dashboard & global data
  const [stats, setStats] = useState(null);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [filterMeta, setFilterMeta] = useState(null);

  const [loadingStats, setLoadingStats] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Modals state
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [invoiceOrder, setInvoiceOrder] = useState(null);

  // ── Supabase Auth Session Listener ──────────────────────────────────────────
  useEffect(() => {
    // Check for an existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const storedUserData = sessionStorage.getItem('anzari_user');
        const userData = storedUserData ? JSON.parse(storedUserData) : {
          id: session.user.id,
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'Admin',
          email: session.user.email,
          role: session.user.user_metadata?.role || session.user.app_metadata?.role || 'admin',
          phone: session.user.user_metadata?.phone || '',
        };
        setCurrentUser(userData);
        setIsAuthenticated(true);
      } else if (sessionStorage.getItem('anzari_user')) {
        // Clear stale session data
        sessionStorage.removeItem('anzari_user');
        sessionStorage.removeItem('anzari_token');
        setCurrentUser(null);
        setIsAuthenticated(false);
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setIsAuthenticated(true);
      } else {
        sessionStorage.removeItem('anzari_user');
        sessionStorage.removeItem('anzari_token');
        setCurrentUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback((user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    sessionStorage.removeItem('anzari_token');
    sessionStorage.removeItem('anzari_user');
    setCurrentUser(null);
    setIsAuthenticated(false);
  }, []);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ show: true, message, type });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, show: false }));
  }, []);

  // ── Fetch Dashboard Stats from Supabase ──────────────────────────────────────
  const refreshStats = useCallback(async () => {
    setLoadingStats(true);
    try {
      // Fetch counts in parallel
      const [ordersResult, productsResult, usersResult] = await Promise.all([
        supabase.from('Order').select('id, total, status, customerDetails, createdAt, trackingCode').order('createdAt', { ascending: false }),
        supabase.from('Product').select('id, name, stock, price, category, images'),
        supabase.from('User').select('id', { count: 'exact', head: true }),
      ]);

      const ordersData = ordersResult.data || [];
      const productsData = productsResult.data || [];
      const usersCount = usersResult.count || 0;

      const totalSales = ordersData.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
      const lowStockProducts = productsData.filter((p) => (Number(p.stock) || 0) <= 5);

      const statusCountsMap = {};
      for (const ord of ordersData) {
        const s = ord.status || 'Processing';
        statusCountsMap[s] = (statusCountsMap[s] || 0) + 1;
      }
      const statusCounts = Object.entries(statusCountsMap).map(([status, count]) => ({ _id: status, status, count }));

      setStats({
        totalSales,
        totalOrders: ordersData.length,
        totalProducts: productsData.length,
        totalUsers: usersCount,
        totalCategories: categories.length || 6,
        featuredProducts: productsData.filter((p) => p.featured).length,
        lowStockCount: lowStockProducts.length,
        lowStockProducts: lowStockProducts.slice(0, 10),
        recentOrders: ordersData.slice(0, 6),
        statusCounts,
        inStockCount: productsData.filter((p) => (Number(p.stock) || 0) > 0).length,
        outOfStockCount: productsData.filter((p) => (Number(p.stock) || 0) === 0).length,
        dbStatus: 'Supabase PostgreSQL Active',
      });
    } catch (err) {
      console.error('Failed to load stats:', err.message);
    } finally {
      setLoadingStats(false);
    }
  }, [categories.length]);

  // ── Fetch Categories from Supabase ────────────────────────────────────────────
  const refreshCategories = useCallback(async () => {
    setLoadingCategories(true);
    try {
      const { data, error } = await supabase
        .from('Category')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setCategories(data || []);
    } catch (err) {
      console.error('Failed to load categories:', err.message);
      // Fallback defaults
      setCategories([
        { id: '1', name: 'Sofas', slug: 'sofas', description: 'Curved, slatted, and upholstered seating', itemCount: 14 },
        { id: '2', name: 'Chairs', slug: 'chairs', description: 'Heritage ring-arm benches and dining seats', itemCount: 22 },
        { id: '3', name: 'Tables', slug: 'tables', description: 'Solid teak oval glass dining tables', itemCount: 18 },
        { id: '4', name: 'Beds', slug: 'beds', description: 'Carved wooden poster beds', itemCount: 9 },
        { id: '5', name: 'Storage', slug: 'storage', description: 'Heritage teak buffets and credenzas', itemCount: 12 },
        { id: '6', name: 'Lighting', slug: 'lighting', description: 'Warm brass and hand-blown glass luminaires', itemCount: 15 },
      ]);
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  // ── Fetch Orders from Supabase ────────────────────────────────────────────────
  const refreshOrders = useCallback(async () => {
    setLoadingOrders(true);
    try {
      const { data, error } = await supabase
        .from('Order')
        .select('*, items:OrderItem(*)')
        .order('createdAt', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      console.error('Failed to load orders:', err.message);
    } finally {
      setLoadingOrders(false);
    }
  }, []);

  // ── Fetch Users / Customers from Supabase ─────────────────────────────────────
  const refreshUsers = useCallback(async () => {
    setLoadingUsers(true);
    try {
      const { data, error } = await supabase
        .from('User')
        .select('id, name, email, role, phone, createdAt, addresses:Address(*)')
        .order('createdAt', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (err) {
      console.error('Failed to load users:', err.message);
    } finally {
      setLoadingUsers(false);
    }
  }, []);

  // ── Fetch Filter Meta from Supabase ──────────────────────────────────────────
  const refreshFilterMeta = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('Product')
        .select('category, room, material, collectionName, price');

      if (error) throw error;
      if (data && data.length > 0) {
        const categories = [...new Set(data.map((p) => p.category).filter(Boolean))];
        const rooms = [...new Set(data.map((p) => p.room).filter(Boolean))];
        const materials = [...new Set(data.map((p) => p.material).filter(Boolean))];
        const collections = [...new Set(data.map((p) => p.collectionName).filter(Boolean))];
        const prices = data.map((p) => Number(p.price) || 0);
        setFilterMeta({
          categories,
          rooms,
          materials,
          collections,
          minPrice: Math.min(...prices),
          maxPrice: Math.max(...prices),
        });
      }
    } catch (err) {
      console.error('Failed to load filter meta:', err.message);
    }
  }, []);

  // ── Initial load when authenticated ──────────────────────────────────────────
  useEffect(() => {
    if (isAuthenticated) {
      refreshCategories();
      refreshOrders();
      refreshUsers();
      refreshFilterMeta();
      refreshStats();
    }
  }, [isAuthenticated, refreshStats, refreshCategories, refreshOrders, refreshUsers, refreshFilterMeta]);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        login,
        logout,
        activeTab,
        setActiveTab,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        globalSearch,
        setGlobalSearch,
        stats,
        refreshStats,
        loadingStats,
        categories,
        refreshCategories,
        loadingCategories,
        orders,
        setOrders,
        refreshOrders,
        loadingOrders,
        users,
        refreshUsers,
        loadingUsers,
        filterMeta,
        toast,
        showToast,
        hideToast,
        isAddProductOpen,
        setIsAddProductOpen,
        editingProduct,
        setEditingProduct,
        viewingProduct,
        setViewingProduct,
        viewingOrder,
        setViewingOrder,
        invoiceOrder,
        setInvoiceOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
