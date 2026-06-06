import axios from 'axios';
import {api} from '../api';
import {API_CONFIG} from '../../config/api';

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  })),
}));

describe('ApiService', () => {
  it('should create axios instance with correct configuration', () => {
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  it('should export the api instance', () => {
    expect(api).toBeDefined();
    expect(api.get).toBeDefined();
    expect(api.post).toBeDefined();
  });
});
