// Browser-specific entry point that uses fetch instead of axios
import { CounterResponse } from './counterapi.shared.js';

class CounterAPI {
  private baseUrl: string;
  private timeoutMs: number;

  constructor(options: { timeoutMs?: number } = {}) {
    this.baseUrl = 'https://api.counterapi.dev/v2';
    this.timeoutMs = options.timeoutMs || 5000;
  }

  private buildUrl(endpoint: string, params: Record<string, string | number>): string {
    let url = endpoint;
    for (const [key, value] of Object.entries(params)) {
      url = url.replace(`{${key}}`, encodeURIComponent(String(value)));
    }
    return this.baseUrl + url;
  }

  private async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error(`Request timed out after ${this.timeoutMs}ms`);
        }
        throw error;
      }
      throw new Error('Unknown error occurred');
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async up(workspace: string, name: string): Promise<CounterResponse> {
    const url = this.buildUrl('/{workspace}/{name}/up', { workspace, name });
    return this.request<CounterResponse>(url, { method: 'GET' });
  }

  async down(workspace: string, name: string): Promise<CounterResponse> {
    const url = this.buildUrl('/{workspace}/{name}/down', { workspace, name });
    return this.request<CounterResponse>(url, { method: 'GET' });
  }

  async get(workspace: string, name: string): Promise<CounterResponse> {
    const url = this.buildUrl('/{workspace}/{name}', { workspace, name });
    return this.request<CounterResponse>(url, { method: 'GET' });
  }

  async reset(workspace: string, name: string): Promise<CounterResponse> {
    const url = this.buildUrl('/{workspace}/{name}/reset', { workspace, name });
    return this.request<CounterResponse>(url, { method: 'GET' });
  }

  async stats(workspace: string, name: string): Promise<CounterResponse> {
    const url = this.buildUrl('/{workspace}/{name}/stats', { workspace, name });
    return this.request<CounterResponse>(url, { method: 'GET' });
  }
}

export default CounterAPI; 