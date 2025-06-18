import { 
  CounterConfig, 
  CounterResponse,
  CounterStatsResponse,
  HttpClient 
} from '../types/index.js';
import { AxiosHttpClient, API_CONFIG } from '../http/index.js';

/**
 * Main Counter client class
 */
export class Counter {
  private http: HttpClient;
  private namespace: string;
  private version: 'v1' | 'v2';

  constructor(config: CounterConfig) {
    this.namespace = config.namespace;
    this.version = config.version || 'v2'; // Default to v2 if not specified
    
    // Validate required config
    if (!config.namespace) {
      throw new Error('Namespace/Workspace is required');
    }

    // Initialize HTTP client
    this.http = new AxiosHttpClient({
      version: this.version,
      timeout: config.timeout,
      debug: config.debug
    });
  }

  /**
   * Get the current counter value
   * @param name - The counter name
   * @returns Promise resolving to counter response
   */
  async get(name: string): Promise<CounterResponse> {
    if (!name) {
      throw new Error('Counter name is required');
    }

    const endpoint = this.createEndpointUrl('get', { name });
    return await this.http.get<CounterResponse>(endpoint);
  }

  /**
   * Increment the counter value by 1
   * @param name - The counter name
   * @returns Promise resolving to counter response
   */
  async up(name: string): Promise<CounterResponse> {
    if (!name) {
      throw new Error('Counter name is required');
    }

    const endpoint = this.createEndpointUrl('up', { name });
    return await this.http.get<CounterResponse>(endpoint);
  }

  /**
   * Decrement the counter value by 1
   * @param name - The counter name
   * @returns Promise resolving to counter response
   */
  async down(name: string): Promise<CounterResponse> {
    if (!name) {
      throw new Error('Counter name is required');
    }

    const endpoint = this.createEndpointUrl('down', { name });
    return await this.http.get<CounterResponse>(endpoint);
  }

  /**
   * Set the counter value (v1 only)
   * @param name - The counter name
   * @param value - The value to set
   * @returns Promise resolving to counter response
   */
  async set(name: string, value: number): Promise<CounterResponse> {
    if (this.version !== 'v1') {
      throw new Error('set method is only available in v1');
    }
    
    if (!name) {
      throw new Error('Counter name is required');
    }

    const endpoint = this.createEndpointUrl('set', { name, value });
    return await this.http.get<CounterResponse>(endpoint);
  }

  /**
   * Reset the counter value to 0 (v2 only)
   * @param name - The counter name
   * @returns Promise resolving to counter response
   */
  async reset(name: string): Promise<CounterResponse> {
    if (this.version !== 'v2') {
      throw new Error('reset method is only available in v2');
    }
    
    if (!name) {
      throw new Error('Counter name is required');
    }

    const endpoint = this.createEndpointUrl('reset', { name });
    return await this.http.get<CounterResponse>(endpoint);
  }

  /**
   * Get counter statistics (v2 only)
   * @param name - The counter name
   * @returns Promise resolving to counter stats response
   */
  async stats(name: string): Promise<CounterStatsResponse> {
    if (this.version !== 'v2') {
      throw new Error('stats method is only available in v2');
    }
    
    if (!name) {
      throw new Error('Counter name is required');
    }

    const endpoint = this.createEndpointUrl('stats', { name });
    return await this.http.get<CounterStatsResponse>(endpoint);
  }

  /**
   * Creates a URL by replacing placeholders in the endpoint pattern
   */
  private createEndpointUrl(method: string, params: { name: string, value?: number }): string {
    // Get the endpoint pattern based on version and method
    const endpoints = API_CONFIG[this.version].endpoints;
    let endpointPattern: string | undefined;
    
    if (this.version === 'v1') {
      const v1Endpoints = endpoints as typeof API_CONFIG['v1']['endpoints'];
      endpointPattern = v1Endpoints[method as keyof typeof v1Endpoints];
    } else {
      const v2Endpoints = endpoints as typeof API_CONFIG['v2']['endpoints'];
      endpointPattern = v2Endpoints[method as keyof typeof v2Endpoints];
    }
    
    if (!endpointPattern) {
      throw new Error(`Invalid method: ${method}`);
    }

    // Replace namespace/workspace placeholder based on version
    const namespaceKey = this.version === 'v1' ? 'namespace' : 'workspace';
    
    // Prepare params for URL creation
    const urlParams = {
      [namespaceKey]: this.namespace,
      ...params
    };

    // In axios HTTP client, create the URL by replacing placeholders
    return (this.http as AxiosHttpClient).createUrl(endpointPattern, urlParams);
  }
}

// Backward compatibility alias
export const CounterClient = Counter; 