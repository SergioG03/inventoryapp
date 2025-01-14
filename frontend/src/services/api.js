// src/services/api.js
import axios from 'axios';

const API_URL = '/api';

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para manejar errores
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data?.message || 'Error desconocido');
    return Promise.reject(error);
  }
);

// Servicios para productos
export const productService = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (product) => api.post('/products', product),
  update: (id, product) => api.put(`/products/${id}`, product),
  delete: (id) => api.delete(`/products/${id}`)
};

// Servicios para stock
export const stockService = {
  updateStock: (data) => api.post('/stock/update', data),
  getStatus: () => api.get('/stock/status')
};

// Servicios para movimientos
export const movementService = {
  getAll: () => api.get('/movements'),
  getByProduct: (productId) => api.get(`/movements/product/${productId}`),
  getByDateRange: (startDate, endDate) => 
    api.get(`/movements/date/${startDate}/${endDate}`)
};

export default api;
