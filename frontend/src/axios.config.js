import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem(
  'token',
)}`;

export default axios;
