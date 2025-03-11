import axios from 'axios';

axios.defaults.baseURL = 'https://tcc-free-production.up.railway.app';

// Interceptor para adicionar o token dinamicamente
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default axios;
