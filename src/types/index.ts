/**
 * Configuration options for the Counter client
 */
export interface CounterConfig {
  /** API version to use (v1 or v2, defaults to 'v2' if not specified) */
  version?: 'v1' | 'v2';
  /** The namespace identifier (used for v1 API) */
  namespace?: string;
  /** The workspace identifier (used for v2 API, preferred over namespace for v2) */
  workspace?: string;
  /** Request timeout in milliseconds (optional, defaults to 10000) */
  timeout?: number;
  /** Enable debug logging (optional, defaults to false) */
  debug?: boolean;
}

/**
 * Counter response structure
 */
export interface CounterResponse {
  /** The current count value */
  value: number;
  /** The name of the counter */
  name: string;
  /** The namespace (v1) or workspace (v2) of the counter */
  namespace: string;
  /** Creation timestamp */
  created: string;
  /** Last updated timestamp */
  updated: string;
}

/**
 * Counter stats response structure (v2 only)
 */
export interface CounterStatsResponse extends CounterResponse {
  /** Stats about the counter usage */
  stats: {
    /** Total number of hits */
    hits: number;
    /** Usage by date */
    dates: {
      [date: string]: number;
    };
  };
}

/**
 * HTTP client interface for dependency injection
 */
export interface HttpClient {
  get<T = any>(url: string, config?: any): Promise<T>;
  post<T = any>(url: string, data?: any, config?: any): Promise<T>;
}

/**
 * API configuration structure
 */
export interface ApiConfig {
  v1: {
    baseUrl: string;
    endpoints: {
      up: string;
      down: string;
      get: string;
      set: string;
    };
  };
  v2: {
    baseUrl: string;
    endpoints: {
      up: string;
      down: string;
      get: string;
      reset: string;
      stats: string;
    };
  };
}

/**
 * Error response structure from the API
 */
export interface ApiError {
  /** Error message */
  message: string;
  /** Error code */
  code?: string;
  /** HTTP status code */
  status?: number;
  /** Additional error details */
  details?: any;
} 