const API_BASE = '/api';

/**
 * Reusable fetch wrapper with standard JSON & Error handling
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  
  // Set headers if body is standard JSON and not FormData
  const config = { ...options };
  if (config.body && !(config.body instanceof FormData)) {
    config.headers = {
      'Content-Type': 'application/json',
      ...(config.headers || {}),
    };
    if (typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }
  }

  try {
    const response = await fetch(url, config);
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(result.message || `Request failed with status ${response.status}`);
    }

    return result;
  } catch (error) {
    console.error(`[API Error] ${endpoint}:`, error.message);
    throw error;
  }
}

export const apiService = {
  // Authentication
  login: (credentials) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: credentials,
    }),

  getMe: () => apiRequest('/auth/me'),

  // Dashboard
  getStats: () => apiRequest('/dashboard/stats'),

  // Products
  getProducts: (params = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.category && params.category !== 'All') query.append('category', params.category);
    if (params.featured) query.append('featured', 'true');
    if (params.stockStatus && params.stockStatus !== 'All') query.append('stockStatus', params.stockStatus);
    
    const queryString = query.toString() ? `?${query.toString()}` : '';
    return apiRequest(`/products${queryString}`);
  },

  getProductById: (id) => apiRequest(`/products/${id}`),

  createProduct: (productData) => {
    // If FormData (has file upload)
    if (productData instanceof FormData) {
      return apiRequest('/products', {
        method: 'POST',
        body: productData,
      });
    }
    // Standard JSON
    return apiRequest('/products', {
      method: 'POST',
      body: productData,
    });
  },

  updateProduct: (id, productData) => {
    if (productData instanceof FormData) {
      return apiRequest(`/products/${id}`, {
        method: 'PUT',
        body: productData,
      });
    }
    return apiRequest(`/products/${id}`, {
      method: 'PUT',
      body: productData,
    });
  },

  deleteProduct: (id) =>
    apiRequest(`/products/${id}`, {
      method: 'DELETE',
    }),

  incrementViews: (id) =>
    apiRequest(`/products/${id}/view`, {
      method: 'PUT',
    }),

  // Categories
  getCategories: () => apiRequest('/categories'),

  createCategory: (data) =>
    apiRequest('/categories', {
      method: 'POST',
      body: data,
    }),

  updateCategory: (id, data) =>
    apiRequest(`/categories/${id}`, {
      method: 'PUT',
      body: data,
    }),

  deleteCategory: (id) =>
    apiRequest(`/categories/${id}`, {
      method: 'DELETE',
    }),

  // Seed / Reset
  seedData: () =>
    apiRequest('/seed/reset', {
      method: 'POST',
    }),
};
