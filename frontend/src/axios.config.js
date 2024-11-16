import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

// Interceptor para adicionar o token dinamicamente
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default axios;
