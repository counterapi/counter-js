import { CounterBase, CounterBaseConfig } from './base.js';
import { V2ApiResponse, Counter, CounterStats } from '../types/index.js';

/**
 * CounterAPI v2 client
 */
export class CounterAPI extends CounterBase {
  /**
   * Create a new CounterAPI v2 client
   */
  constructor(config: CounterBaseConfig = {}) {
    super(config);
  }

  /**
   * Get counter details
   * @param workspace Workspace slug
   * @param name Counter name or slug
   */
  async get(workspace: string, name: string): Promise<V2ApiResponse<Counter>> {
    return this.http.get(`/workspace/${workspace}/${name}`);
  }

  /**
   * Increment counter
   * @param workspace Workspace slug
   * @param name Counter name or slug
   */
  async up(workspace: string, name: string): Promise<V2ApiResponse<Counter>> {
    return this.http.get(`/workspace/${workspace}/${name}/up`);
  }

  /**
   * Decrement counter
   * @param workspace Workspace slug
   * @param name Counter name or slug
   */
  async down(workspace: string, name: string): Promise<V2ApiResponse<Counter>> {
    return this.http.get(`/workspace/${workspace}/${name}/down`);
  }

  /**
   * Get counter stats
   * @param workspace Workspace slug
   * @param name Counter name or slug
   */
  async stats(workspace: string, name: string): Promise<V2ApiResponse<CounterStats>> {
    return this.http.get(`/workspace/${workspace}/${name}/stats`);
  }
} 