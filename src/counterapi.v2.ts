import { CounterBase, CounterResponse, API_CONFIG, V2Endpoints } from './counterapi.shared.js';

export class Counter extends CounterBase<V2Endpoints> {
  constructor(options: { timeoutMs?: number } = {}) {
    super({
      baseUrl: API_CONFIG.v2.baseUrl,
      endpoints: API_CONFIG.v2.endpoints,
      timeoutMs: options.timeoutMs
    });
  }

  async up(workspace: string, name: string): Promise<CounterResponse> {
    const url = this.buildUrl(this.endpoints.up, { workspace, name });
    return this.request<CounterResponse>(url);
  }

  async down(workspace: string, name: string): Promise<CounterResponse> {
    const url = this.buildUrl(this.endpoints.down, { workspace, name });
    return this.request<CounterResponse>(url);
  }

  async get(workspace: string, name: string): Promise<CounterResponse> {
    const url = this.buildUrl(this.endpoints.get, { workspace, name });
    return this.request<CounterResponse>(url);
  }

  async reset(workspace: string, name: string): Promise<CounterResponse> {
    const url = this.buildUrl(this.endpoints.reset, { workspace, name });
    return this.request<CounterResponse>(url);
  }

  async stats(workspace: string, name: string): Promise<CounterResponse> {
    const url = this.buildUrl(this.endpoints.stats, { workspace, name });
    return this.request<CounterResponse>(url);
  }
} 