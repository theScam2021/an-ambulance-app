import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export const cases = {
  create: (caseData) => api.post('/cases', caseData),
  getAll: () => api.get('/cases'),
  updateStatus: (id, status) => api.put(`/cases/${id}/status`, { status }),
};

export const hospitals = {
  getAll: () => api.get('/hospitals'),
  create: (hospitalData) => api.post('/hospitals', hospitalData),
  update: (id, data) => api.put(`/hospitals/${id}`, data),
};

export const dashboard = {
  getHospital: (hospitalId) => api.get(`/dashboard/hospital/${hospitalId}`),
  getAdmin: () => api.get('/dashboard/admin'),
};

export default api;
