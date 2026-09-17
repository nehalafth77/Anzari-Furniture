import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiService } from '../api/apiService';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Auth state — check sessionStorage for persisted session
  const storedUser = sessionStorage.getItem('anzari_user');
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(sessionStorage.getItem('anzari_token')));
  const [currentUser, setCurrentUser] = useState(storedUser ? JSON.parse(storedUser) : null);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  
  // Dashboard & global data
  const [stats, setStats] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loadingStats, setLoadingStats] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Add Product modal trigger helper
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);

  const login = useCallback((user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
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

  // Fetch Dashboard Stats
  const refreshStats = useCallback(async () => {
    setLoadingStats(true);
    try {
      const res = await apiService.getStats();
      if (res.success) {
        setStats(res.data);
      }
    } catch (err) {
      console.error('Failed to load stats:', err.message);
    } finally {
      setLoadingStats(false);
    }
  }, []);

  // Fetch Categories
  const refreshCategories = useCallback(async () => {
    setLoadingCategories(true);
    try {
      const res = await apiService.getCategories();
      if (res.success) {
        setCategories(res.data);
      }
    } catch (err) {
      console.error('Failed to load categories:', err.message);
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    refreshStats();
    refreshCategories();
  }, [refreshStats, refreshCategories]);

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
        toast,
        showToast,
        hideToast,
        isAddProductOpen,
        setIsAddProductOpen,
        editingProduct,
        setEditingProduct,
        viewingProduct,
        setViewingProduct,
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
