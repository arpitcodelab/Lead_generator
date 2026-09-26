import axios from 'axios';

export const getApiBaseUrl = () => {
  const customUrl = localStorage.getItem('pdc_api_base_url');
  if (customUrl && customUrl.trim()) {
    return customUrl.trim().replace(/\/+$/, '');
  }
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/+$/, '');
  }
  // If running locally on localhost, use proxy /api
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return '/api';
  }
  return '/api';
};

export const setApiBaseUrl = (url) => {
  if (url && url.trim()) {
    localStorage.setItem('pdc_api_base_url', url.trim().replace(/\/+$/, ''));
  } else {
    localStorage.removeItem('pdc_api_base_url');
  }
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Dynamically apply current baseURL and auth token
api.interceptors.request.use((config) => {
  config.baseURL = getApiBaseUrl();
  const token = localStorage.getItem('pdc_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export const checkHealth = async () => {
  try {
    const base = getApiBaseUrl();
    const res = await axios.get(`${base}/health`, { timeout: 3000 });
    return { isOnline: res.data?.status === 'OK', service: res.data?.service || 'Active API' };
  } catch (err) {
    return { isOnline: false, error: err.message };
  }
};

export default api;
