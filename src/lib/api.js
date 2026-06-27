import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Since auth tokens are short-lived, we should inject them dynamically before every request
// We will expose a setup function to inject the getToken function from our AuthContext
let getAuthToken = null;

export const setTokenProvider = (getTokenFn) => {
  getAuthToken = getTokenFn;
};

api.interceptors.request.use(async (config) => {
  if (getAuthToken) {
    try {
      const token = await getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error fetching auth token', error);
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
