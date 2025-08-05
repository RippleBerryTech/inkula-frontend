import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // or your app URL
  headers: {
    Accept: 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login'; // or use router.push
    }
    return Promise.reject(error);
  }
);


export default api;
