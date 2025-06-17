import axios, { AxiosRequestConfig, AxiosError } from 'axios';

export interface CounterOptions {
  version?: 'v1' | 'v2';
  baseUrl?: string;
  timeoutMs?: number;
}

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

export interface CounterStats {
  up_count: number;
  down_count: number;
  [key: string]: any;
}

export interface CounterNamespaceV1 {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface CounterResponseV1 {
  id: number;
  name: string;
  count: number;
  created_at: string;
  updated_at: string;
  namespace_id: number;
  namespace: CounterNamespaceV1;
}

export interface CounterResponse {
  code: string;
  message?: string;
  data?: CounterData | CounterStats;
  error?: string;
}

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

export async function axiosRequestWithTimeout<T>(url: string, options: AxiosRequestConfig = {}, timeoutMs = 5000): Promise<T> {
  try {
    const response = await axios({
      url,
      timeout: timeoutMs,
      ...options,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError;
      let message = err.message;
      if (err.response) {
        message = `HTTP ${err.response.status}: ${err.response.statusText}`;
        if (err.response.data && (err.response.data as any).error) {
          message += ` - ${(err.response.data as any).error}`;
        }
      }
      throw new Error(message);
    } else {
      throw new Error('Unknown error occurred');
    }
  }
}

export class CounterBase<TEndpoints> {
  protected baseUrl: string;
  protected endpoints: TEndpoints;
  protected timeoutMs: number;

  constructor(config: { baseUrl: string; endpoints: TEndpoints; timeoutMs?: number }) {
    this.baseUrl = config.baseUrl;
    this.endpoints = config.endpoints;
    this.timeoutMs = config.timeoutMs || 5000;
  }

  protected buildUrl(endpoint: string, params: Record<string, string | number>): string {
    let url = endpoint;
    for (const [key, value] of Object.entries(params)) {
      url = url.replace(`{${key}}`, encodeURIComponent(String(value)));
    }
    return this.baseUrl + url;
  }

  protected async request<T = CounterResponseV1>(url: string, options: AxiosRequestConfig = {}): Promise<T> {
    return axiosRequestWithTimeout<T>(url, options, this.timeoutMs);
  }
} 