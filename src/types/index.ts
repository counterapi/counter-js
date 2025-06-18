/**
 * Configuration options for the CounterAPI client
 */
export interface CounterOptions {
  /** API version (v1 or v2) */
  version?: 'v1' | 'v2';
  /** Custom base URL (optional) */
  baseUrl?: string;
  /** Request timeout in milliseconds (optional, defaults to 5000) */
  timeoutMs?: number;
}

/**
 * Counter data structure returned by v2 API
 */
export interface CounterData {
  id: string;
  name: string;
  slug: string;
  description?: string;
  up_count: number;
  down_count: number;
  workspace_id: string;
  workspace_slug: string;
  team_id?: string;
  user_id?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Counter statistics structure
 */
export interface CounterStats {
  up_count: number;
  down_count: number;
  [key: string]: any;
}

/**
 * V1 API namespace structure
 */
export interface CounterNamespaceV1 {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

/**
 * V1 API response structure
 */
export interface CounterResponseV1 {
  id: number;
  name: string;
  count: number;
  created_at: string;
  updated_at: string;
  namespace_id: number;
  namespace: CounterNamespaceV1;
}

/**
 * V2 API response structure
 */
export interface CounterResponse {
  code: string;
  message?: string;
  data?: CounterData | CounterStats;
  error?: string;
}

/**
 * API configuration constants
 */
export const API_CONFIG = {
  v1: {
    baseUrl: 'https://api.counterapi.dev/v1',
    endpoints: {
      up: '/{namespace}/{name}/up',
      down: '/{namespace}/{name}/down',
      get: '/{namespace}/{name}',
      set: '/{namespace}/{name}/?count={value}',
    },
  },
  v2: {
    baseUrl: 'https://api.counterapi.dev/v2',
    endpoints: {
      up: '/{workspace}/{name}/up',
      down: '/{workspace}/{name}/down',
      get: '/{workspace}/{name}',
      reset: '/{workspace}/{name}/reset',
      stats: '/{workspace}/{name}/stats',
    },
  },
};

export type V1Endpoints = typeof API_CONFIG.v1.endpoints;
export type V2Endpoints = typeof API_CONFIG.v2.endpoints;

/**
 * HTTP Client Configuration
 */
export interface HttpClientConfig {
  baseURL?: string;
  timeout?: number;
  debug?: boolean;
  headers?: Record<string, string>;
  [key: string]: any;
}

/**
 * HTTP Client Interface
 */
export interface HttpClient {
  get<T = any>(url: string, config?: any): Promise<T>;
  post<T = any>(url: string, data?: any, config?: any): Promise<T>;
  put<T = any>(url: string, data?: any, config?: any): Promise<T>;
  delete<T = any>(url: string, config?: any): Promise<T>;
}

/**
 * API Error Interface
 */
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: any;
}

/**
 * V2 API Response Interface
 */
export interface V2ApiResponse<T = any> {
  code: string;
  message?: string;
  data?: T;
  error?: string;
}

/**
 * Counter Interface
 */
export interface Counter {
  id: number;
  name: string;
  slug: string;
  description: string;
  workspace_id: number;
  workspace_slug: string;
  team_id: number;
  user_id: number;
  up_count: number;
  down_count: number;
  created_at: string;
  updated_at: string;
}

/**
 * Counter Stats Interface
 */
export interface CounterStats {
  id: number;
  counter_id: number;
  up_count: number;
  down_count: number;
  stats: {
    today: {
      up: number;
      down: number;
    };
    this_week: {
      up: number;
      down: number;
    };
    temporal: Array<{
      date: string;
      up: number;
      down: number;
    }>;
  };
  created_at: string;
  updated_at: string;
}

/**
 * V1 Counter Interface
 */
export interface V1Counter {
  id: number;
  name: string;
  count: number;
  created_at: string;
  updated_at: string;
  namespace_id: number;
  namespace: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
} 