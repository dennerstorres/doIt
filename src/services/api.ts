import axios from 'axios';
import {API_CONFIG} from '../config/api';
import {logger} from '../utils/logger';

/**
 * Base API service for future remote data synchronization.
 * Uses axios for HTTP requests.
 */

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  config => {
    // Here we can add auth tokens, log requests, etc.
    logger.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  response => {
    // Handle successful responses
    logger.log(`[API Response] ${response.status} ${response.config.url}`);
    return response;
  },
  error => {
    // Handle global errors (e.g. 401, 500)
    if (error.response) {
      logger.error(
        `[API Error] ${error.response.status} ${error.response?.config?.url}`,
        error.response.data,
      );
    } else if (error.request) {
      logger.error('[API Error] No response received', error.request);
    } else {
      logger.error('[API Error]', error.message);
    }
    return Promise.reject(error);
  },
);

export {api};
