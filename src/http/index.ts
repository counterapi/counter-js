import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpClient, ApiError } from '../types/index.js';

/**
 * Axios-based HTTP client implementation
 */
export class AxiosHttpClient implements HttpClient {
  private client: AxiosInstance;

  constructor(config: {
    timeout?: number;
    debug?: boolean;
    accessToken?: string;
  }) {
    this.client = axios.create({
      baseURL: 'https://api.usertune.io',
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
        ...(config.accessToken && { 'Authorization': `Bearer ${config.accessToken}` })
      }
    });

    // Request interceptor for debugging
    if (config.debug) {
      this.client.interceptors.request.use((request) => {
        console.log('[Usertune] Request:', {
          method: request.method?.toUpperCase(),
          url: request.url,
          headers: request.headers,
          data: request.data
        });
        return request;
      });
    }

    // Response interceptor for debugging and error handling
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        if (config.debug) {
          console.log('[Usertune] Response:', {
            status: response.status,
            data: response.data
          });
        }
        return response;
      },
      (error) => {
        if (config.debug) {
          console.log('[Usertune] Error:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
          });
        }

        // Transform axios error to our custom error format
        const apiError: ApiError = {
          message: error.response?.data?.message || error.message || 'Request failed',
          status: error.response?.status,
          code: error.response?.data?.code || error.code,
          details: error.response?.data
        };

        throw apiError;
      }
    );
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }
} 