import { CounterBase, CounterResponseV1, API_CONFIG, V1Endpoints } from './counterapi.shared.js';

export class CounterAPIv1 extends CounterBase<V1Endpoints> {
  constructor(options: { timeoutMs?: number } = {}) {
    super({
      baseUrl: API_CONFIG.v1.baseUrl,
      endpoints: API_CONFIG.v1.endpoints,
      timeoutMs: options.timeoutMs
    });
  }

  async up(namespace: string, name: string): Promise<CounterResponseV1> {
    const url = this.buildUrl(this.endpoints.up, { namespace, name });
    return this.request<CounterResponseV1>(url);
  }

  async down(namespace: string, name: string): Promise<CounterResponseV1> {
    const url = this.buildUrl(this.endpoints.down, { namespace, name });
    return this.request<CounterResponseV1>(url);
  }

  async get(namespace: string, name: string): Promise<CounterResponseV1> {
    const url = this.buildUrl(this.endpoints.get, { namespace, name });
    return this.request<CounterResponseV1>(url);
  }

  async set(namespace: string, name: string, value: number): Promise<CounterResponseV1> {
    const url = this.buildUrl(this.endpoints.set, { namespace, name, value });
    return this.request<CounterResponseV1>(url);
  }
} 