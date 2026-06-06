import axios from 'axios';
import {api} from '../api';
import {API_CONFIG} from '../../config/api';

jest.mock('axios', () => {
  const mockAxiosInstance = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: {
        use: jest.fn(),
        eject: jest.fn(),
      },
      response: {
        use: jest.fn(),
        eject: jest.fn(),
      },
    },
  };

  return {
    create: jest.fn(() => mockAxiosInstance),
    interceptors: {
      request: {
        use: jest.fn(),
        eject: jest.fn(),
      },
      response: {
        use: jest.fn(),
        eject: jest.fn(),
      },
    },
  };
});

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
  });

  it('should register request interceptors', () => {
    expect(api.interceptors.request.use).toHaveBeenCalled();
  });

  it('should register response interceptors', () => {
    expect(api.interceptors.response.use).toHaveBeenCalled();
  });

  describe('Interceptors logic', () => {
    let requestInterceptorSuccess: (config: any) => any;
    let requestInterceptorError: (error: any) => any;
    let responseInterceptorSuccess: (response: any) => any;
    let responseInterceptorError: (error: any) => any;

    beforeEach(() => {
      // @ts-ignore
      [requestInterceptorSuccess, requestInterceptorError] = (api.interceptors
        .request.use as jest.Mock).mock.calls[0];
      // @ts-ignore
      [responseInterceptorSuccess, responseInterceptorError] = (api.interceptors
        .response.use as jest.Mock).mock.calls[0];
    });

    it('should handle request interceptor success', () => {
      const config = {url: '/test', method: 'get'};
      const result = requestInterceptorSuccess(config);
      expect(result).toBe(config);
    });

    it('should handle request interceptor error', async () => {
      const error = new Error('Request Error');
      try {
        await requestInterceptorError(error);
      } catch (e) {
        expect(e).toBe(error);
      }
    });

    it('should handle response interceptor success', () => {
      const response = {status: 200, config: {url: '/test'}};
      const result = responseInterceptorSuccess(response);
      expect(result).toBe(response);
    });

    it('should handle response interceptor error with response', async () => {
      const error = {
        response: {
          status: 401,
          config: {url: '/test'},
          data: {message: 'Unauthorized'},
        },
      };
      try {
        await responseInterceptorError(error);
      } catch (e) {
        expect(e).toBe(error);
      }
    });

    it('should handle response interceptor error without response', async () => {
      const error = {
        request: {},
        message: 'Network Error',
      };
      try {
        await responseInterceptorError(error);
      } catch (e) {
        expect(e).toBe(error);
      }
    });

    it('should handle response interceptor error without request or response', async () => {
      const error = {
        message: 'Something went wrong',
      };
      try {
        await responseInterceptorError(error);
      } catch (e) {
        expect(e).toBe(error);
      }
    });
  });
});
