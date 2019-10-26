// third-party libraries
import axios from 'axios';

// thunk
import { displayInternalServerErrorMessage } from 'modules/internalServerError';

// store
import store from '../../store/index';

// helpers
import { authService } from 'utils/auth';
import CacheHandler from 'utils/helpers/CacheHandler';

const token = authService.getToken();

const http = axios.create({
  baseURL: process.env.ALMOND_API,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});

export default http;
