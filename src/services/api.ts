import axios from 'axios';
import {API_CONFIG} from '../config/api';

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
    if (__DEV__) {
      console.log(
        `[API Request] ${config.method?.toUpperCase()} ${config.url}`,
      );
    }
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
    if (__DEV__) {
      console.log(`[API Response] ${response.status} ${response.config.url}`);
    }
    return response;
  },
  error => {
    // Handle global errors (e.g. 401, 500)
    if (error.response) {
      if (__DEV__) {
        console.error(
          `[API Error] ${error.response.status} ${error.response?.config?.url}`,
          error.response.data,
        );
      }
    } else if (error.request) {
      if (__DEV__) {
        console.error('[API Error] No response received', error.request);
      }
    } else {
      if (__DEV__) {
        console.error('[API Error]', error.message);
      }
    }
    return Promise.reject(error);
  },
);

export {api};
