import { CounterOptions, CounterData, CounterStats, CounterResponse, V2Endpoints, API_CONFIG, CounterBase } from './counterapi.shared.js';

class CounterV2 extends CounterBase<V2Endpoints> {
  constructor(options: CounterOptions = {}) {
    super({
      baseUrl: options.baseUrl || API_CONFIG.v2.baseUrl,
      endpoints: API_CONFIG.v2.endpoints,
      timeoutMs: options.timeoutMs,
    });
  }

  async up(workspace: string, name: string): Promise<CounterData> {
    const url = this.buildUrl(this.endpoints.up, { workspace, name });
    const res = await this.request<CounterResponse>(url, { method: 'GET' });
    if (res.code !== '200' || !res.data) throw new Error(res.message || 'Failed to increment counter');
    return res.data as CounterData;
  }

  async down(workspace: string, name: string): Promise<CounterData> {
    const url = this.buildUrl(this.endpoints.down, { workspace, name });
    const res = await this.request<CounterResponse>(url, { method: 'GET' });
    if (res.code !== '200' || !res.data) throw new Error(res.message || 'Failed to decrement counter');
    return res.data as CounterData;
  }

  async get(workspace: string, name: string): Promise<CounterData> {
    const url = this.buildUrl(this.endpoints.get, { workspace, name });
    const res = await this.request<CounterResponse>(url, { method: 'GET' });
    if (res.code !== '200' || !res.data) throw new Error(res.message || 'Failed to get counter');
    return res.data as CounterData;
  }

  async reset(workspace: string, name: string): Promise<CounterData> {
    const url = this.buildUrl(this.endpoints.reset, { workspace, name });
    const res = await this.request<CounterResponse>(url, { method: 'GET' });
    if (res.code !== '200' || !res.data) throw new Error(res.message || 'Failed to reset counter');
    return res.data as CounterData;
  }

  async stats(workspace: string, name: string): Promise<CounterStats> {
    const url = this.buildUrl(this.endpoints.stats, { workspace, name });
    const res = await this.request<CounterResponse>(url, { method: 'GET' });
    if (res.code !== '200' || !res.data) throw new Error(res.message || 'Failed to get stats');
    return res.data as CounterStats;
  }
}

export { CounterV2 as Counter }; 