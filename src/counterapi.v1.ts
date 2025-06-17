import { CounterOptions, CounterResponseV1, V1Endpoints, API_CONFIG, CounterBase } from './counterapi.shared.js';

export class CounterV1 extends CounterBase<V1Endpoints> {
  constructor(options: CounterOptions = {}) {
    super({
      baseUrl: options.baseUrl || API_CONFIG.v1.baseUrl,
      endpoints: API_CONFIG.v1.endpoints,
      timeoutMs: options.timeoutMs,
    });
  }

  up(namespace: string, name: string) {
    const url = this.buildUrl(this.endpoints.up, { namespace, name });
    return this.request<CounterResponseV1>(url, { method: 'GET' });
  }

  down(namespace: string, name: string) {
    const url = this.buildUrl(this.endpoints.down, { namespace, name });
    return this.request<CounterResponseV1>(url, { method: 'GET' });
  }

  get(namespace: string, name: string) {
    const url = this.buildUrl(this.endpoints.get, { namespace, name });
    return this.request<CounterResponseV1>(url, { method: 'GET' });
  }

  set(namespace: string, name: string, value: number) {
    const url = this.buildUrl(this.endpoints.set, { namespace, name, value });
    return this.request<CounterResponseV1>(url, { method: 'GET' });
  }
} 