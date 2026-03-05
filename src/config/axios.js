import axios from 'axios';
import { BASE_URL } from './api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'ngrok-skip-browser-warning': 'true',
  },
});

export default axiosInstance;
