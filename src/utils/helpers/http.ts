// third-party libraries
import axios from 'axios';

// helpers
import { authService } from '@utils/auth';

const token = authService.getToken();

const http = axios.create({
  baseURL: process.env.ALMOND_API,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});

export default http;
