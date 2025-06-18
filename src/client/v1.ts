import { CounterBase, CounterBaseConfig } from './base.js';
import { V1Counter } from '../types/index.js';

/**
 * CounterAPI v1 client
 */
export class CounterAPIv1 extends CounterBase {
  /**
   * Create a new CounterAPI v1 client
   */
  constructor(config: CounterBaseConfig = {}) {
    super({
      ...config,
      baseURL: config.baseURL || 'https://api.counterapi.dev/v1'
    });
  }

  /**
   * Get counter details
   * @param namespace Counter namespace
   * @param name Counter name
   */
  async get(namespace: string, name: string): Promise<V1Counter> {
    return this.http.get(`/namespace/${namespace}/counter/${name}`);
  }

  /**
   * Increment counter
   * @param namespace Counter namespace
   * @param name Counter name
   */
  async up(namespace: string, name: string): Promise<V1Counter> {
    return this.http.get(`/namespace/${namespace}/counter/${name}/up`);
  }

  /**
   * Decrement counter
   * @param namespace Counter namespace
   * @param name Counter name
   */
  async down(namespace: string, name: string): Promise<V1Counter> {
    return this.http.get(`/namespace/${namespace}/counter/${name}/down`);
  }
} 