import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authApi = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  onboarding: (data) => api.post('/auth/onboarding', data),
};

export const userApi = {
  getProfileData: () => api.get('/user/profile'),
};

export const dashboardApi = {
  getData: () => api.get('/dashboard'),
  logMood: (data) => api.post('/mood', data),
  getMoodHistory: () => api.get('/mood/history'),
  logSession: (data) => api.post('/session', data),
};

export const yogaApi = {
  getFlows: () => api.get('/yoga/flows'),
  getFlow: (id) => api.get(`/yoga/flow/${id}`),
  getPoses: () => api.get('/yoga/poses'),
  getAsanas: () => api.get('/asanas'),
  logSession: (data) => api.post('/yoga/session', data),
};

export const aiApi = {
  chat: (data) => api.post('/ai/guru-chat', data),
};

export default api;
