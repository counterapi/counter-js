import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpClientConfig } from '../types/index.js';

/**
 * HTTP client implementation using Axios
 */
export class AxiosHttpClient {
  private client: AxiosInstance;
  private config: HttpClientConfig;

  constructor(config: HttpClientConfig = {}) {
    this.config = {
      baseURL: config.baseURL || 'https://api.counterapi.dev/v2',
      debug: config.debug || false,
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
        ...(config.headers || {})
      },
      ...config
    };

    // Create axios instance
    this.client = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: this.config.headers
    });

    // Request interceptor for debugging
    this.client.interceptors.request.use(
      (config) => {
        if (this.config.debug) {
          console.log('[CounterAPI] Request:', {
            method: config.method,
            url: config.url,
            data: config.data
          });
        }
        return config;
      },
      (error) => {
        if (this.config.debug) {
          console.error('[CounterAPI] Request Error:', error);
        }
        return Promise.reject(error);
      }
    );

    // Response interceptor for debugging and error handling
    this.client.interceptors.response.use(
      (response) => {
        if (this.config.debug) {
          console.log('[CounterAPI] Response:', {
            status: response.status,
            data: response.data
          });
        }
        return response;
      },
      (error) => {
        if (this.config.debug) {
          console.error('[CounterAPI] Response Error:', error);
        }
        return Promise.reject(error);
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

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
} 