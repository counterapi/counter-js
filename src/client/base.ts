import { AxiosHttpClient } from '../http/index.js';
import { HttpClient, HttpClientConfig } from '../types/index.js';

/**
 * Base client configuration
 */
export interface CounterBaseConfig {
  /**
   * Base URL for the API
   * @default 'https://api.counterapi.dev/v2'
   */
  baseURL?: string;

  /**
   * Request timeout in milliseconds
   * @default 10000
   */
  timeout?: number;

  /**
   * Enable debug logging
   * @default false
   */
  debug?: boolean;

  /**
   * Custom HTTP headers
   */
  headers?: Record<string, string>;

  /**
   * Custom HTTP client implementation
   */
  httpClient?: HttpClient;
}

/**
 * Base client class with shared functionality
 */
export class CounterBase {
  protected http: HttpClient;
  protected config: CounterBaseConfig;

  constructor(config: CounterBaseConfig = {}) {
    this.config = {
      baseURL: config.baseURL || 'https://api.counterapi.dev/v2',
      timeout: config.timeout || 10000,
      debug: config.debug || false,
      headers: config.headers || {},
      ...config
    };

    // Use custom HTTP client or create a new one
    this.http = config.httpClient || new AxiosHttpClient({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      debug: this.config.debug,
      headers: this.config.headers
    });
  }

  /**
   * Build a URL with path parameters
   */
  protected buildUrl(endpoint: string, params: Record<string, string | number>): string {
    let url = endpoint;
    for (const [key, value] of Object.entries(params)) {
      url = url.replace(`{${key}}`, encodeURIComponent(String(value)));
    }
    return url;
  }
} 