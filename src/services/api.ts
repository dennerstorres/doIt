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

export {api};
