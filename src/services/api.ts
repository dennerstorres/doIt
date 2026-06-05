/**
 * Base API service for future remote data synchronization.
 * This can be expanded to use axios or fetch for HTTP requests.
 */

// Example base configuration (commented out until needed)
/*
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
*/

export const api = {
  // Placeholder for future API methods
  async get(endpoint: string) {
    console.log(`GET request to ${endpoint}`);
    return Promise.resolve({data: {}});
  },

  async post(endpoint: string, data: any) {
    console.log(`POST request to ${endpoint}`, data);
    return Promise.resolve({data: {}});
  },
};
