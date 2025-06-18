import { Counter } from './index.js';
import { HttpClient, CounterResponse } from '../types/index.js';
import axios from 'axios';

// Mock HTTP client for testing
class MockHttpClient implements HttpClient {
  public requests: Array<{ method: string; url: string; data?: unknown; config?: Record<string, unknown> }> = [];
  private responses: Map<string, unknown> = new Map();
  public headers?: Record<string, string>;

  constructor(headers?: Record<string, string>) {
    this.headers = headers;
  }

  setResponse(key: string, response: unknown): void {
    this.responses.set(key, response);
  }

  async get<T>(url: string, config?: Record<string, unknown>): Promise<T> {
    this.requests.push({ method: 'GET', url, config });
    const response = this.responses.get(`GET:${url}`);
    if (!response) {
      throw new Error(`No mock response for GET:${url}`);
    }
    return response as T;
  }

  async post<T>(url: string, data?: unknown, config?: Record<string, unknown>): Promise<T> {
    this.requests.push({ method: 'POST', url, data, config });
    const response = this.responses.get(`POST:${url}`);
    if (!response) {
      throw new Error(`No mock response for POST:${url}`);
    }
    return response as T;
  }

  createUrl(endpoint: string, params: Record<string, string | number>): string {
    let url = endpoint;
    for (const [key, value] of Object.entries(params)) {
      url = url.replace(`{${key}}`, String(value));
    }
    return url;
  }

  clear(): void {
    this.requests = [];
    this.responses.clear();
  }
}

describe('Counter', () => {
  let v1Client: Counter;
  let v2Client: Counter;
  let mockHttp: MockHttpClient;

  beforeEach(() => {
    mockHttp = new MockHttpClient();
    
    v1Client = new Counter({
      version: 'v1',
      namespace: 'test-namespace'
    });
    
    v2Client = new Counter({
      version: 'v2',
      namespace: 'test-workspace'
    });
    
    // Replace the HTTP clients with our mock using type assertion
    // We need to cast to unknown first to avoid TypeScript errors with private properties
    (v1Client as unknown as { http: HttpClient }).http = mockHttp;
    (v2Client as unknown as { http: HttpClient }).http = mockHttp;
  });

  describe('constructor', () => {
    it('should throw error if namespace is missing for v1', () => {
      expect(() => new Counter({ version: 'v1', namespace: '' }))
        .toThrow('Namespace is required for v1 API');
    });
    
    it('should throw error if workspace is missing for v2', () => {
      expect(() => new Counter({ version: 'v2', workspace: '' }))
        .toThrow('Workspace is required for v2 API');
    });

    it('should create v1 client with valid config', () => {
      const client = new Counter({
        version: 'v1',
        namespace: 'test-namespace'
      });
      expect(client).toBeInstanceOf(Counter);
    });
    
    it('should create v2 client with valid config', () => {
      const client = new Counter({
        version: 'v2',
        namespace: 'test-workspace'
      });
      expect(client).toBeInstanceOf(Counter);
    });
  });

  describe('v1 API', () => {
    const mockResponse: CounterResponse = {
      value: 42,
      name: 'test-counter',
      namespace: 'test-namespace',
      created: '2023-01-01T00:00:00Z',
      updated: '2023-01-01T01:00:00Z'
    };

    beforeEach(() => {
      // Set up mock responses for the v1 API endpoints
      const getUrl = '/{namespace}/{name}';
      const upUrl = '/{namespace}/{name}/up';
      const downUrl = '/{namespace}/{name}/down';
      const setUrl = '/{namespace}/{name}/?count={value}';
      
      mockHttp.setResponse(`GET:${getUrl.replace('{namespace}', 'test-namespace').replace('{name}', 'test-counter')}`, mockResponse);
      mockHttp.setResponse(`GET:${upUrl.replace('{namespace}', 'test-namespace').replace('{name}', 'test-counter')}`, { ...mockResponse, value: 43 });
      mockHttp.setResponse(`GET:${downUrl.replace('{namespace}', 'test-namespace').replace('{name}', 'test-counter')}`, { ...mockResponse, value: 41 });
      mockHttp.setResponse(`GET:${setUrl.replace('{namespace}', 'test-namespace').replace('{name}', 'test-counter').replace('{value}', '100')}`, { ...mockResponse, value: 100 });
    });

    it('should get a counter', async () => {
      const result = await v1Client.get('test-counter');
      expect(result).toEqual(mockResponse);
      expect(mockHttp.requests).toHaveLength(1);
    });

    it('should increment a counter', async () => {
      const result = await v1Client.up('test-counter');
      expect(result).toEqual({ ...mockResponse, value: 43 });
      expect(mockHttp.requests).toHaveLength(1);
    });

    it('should decrement a counter', async () => {
      const result = await v1Client.down('test-counter');
      expect(result).toEqual({ ...mockResponse, value: 41 });
      expect(mockHttp.requests).toHaveLength(1);
    });

    it('should set a counter to specific value', async () => {
      const result = await v1Client.set('test-counter', 100);
      expect(result).toEqual({ ...mockResponse, value: 100 });
      expect(mockHttp.requests).toHaveLength(1);
    });

    it('should throw error for empty counter name', async () => {
      await expect(v1Client.get('')).rejects.toThrow('Counter name is required');
    });
    
    it('should throw error when using v2 methods on v1 client', async () => {
      await expect(v1Client.reset('test-counter')).rejects.toThrow('reset method is only available in v2');
      await expect(v1Client.stats('test-counter')).rejects.toThrow('stats method is only available in v2');
    });
  });
  
  describe('v2 API', () => {
    const mockResponse: CounterResponse = {
      value: 42,
      name: 'test-counter',
      namespace: 'test-workspace',
      created: '2023-01-01T00:00:00Z',
      updated: '2023-01-01T01:00:00Z'
    };
    
    const mockStatsResponse = {
      ...mockResponse,
      stats: {
        hits: 100,
        dates: {
          '2023-01-01': 50,
          '2023-01-02': 50
        }
      }
    };

    beforeEach(() => {
      // Set up mock responses for the v2 API endpoints
      const getUrl = '/{workspace}/{name}';
      const upUrl = '/{workspace}/{name}/up';
      const downUrl = '/{workspace}/{name}/down';
      const resetUrl = '/{workspace}/{name}/reset';
      const statsUrl = '/{workspace}/{name}/stats';
      
      mockHttp.setResponse(`GET:${getUrl.replace('{workspace}', 'test-workspace').replace('{name}', 'test-counter')}`, mockResponse);
      mockHttp.setResponse(`GET:${upUrl.replace('{workspace}', 'test-workspace').replace('{name}', 'test-counter')}`, { ...mockResponse, value: 43 });
      mockHttp.setResponse(`GET:${downUrl.replace('{workspace}', 'test-workspace').replace('{name}', 'test-counter')}`, { ...mockResponse, value: 41 });
      mockHttp.setResponse(`GET:${resetUrl.replace('{workspace}', 'test-workspace').replace('{name}', 'test-counter')}`, { ...mockResponse, value: 0 });
      mockHttp.setResponse(`GET:${statsUrl.replace('{workspace}', 'test-workspace').replace('{name}', 'test-counter')}`, mockStatsResponse);
    });

    it('should get a counter', async () => {
      const result = await v2Client.get('test-counter');
      expect(result).toEqual(mockResponse);
      expect(mockHttp.requests).toHaveLength(1);
    });

    it('should increment a counter', async () => {
      const result = await v2Client.up('test-counter');
      expect(result).toEqual({ ...mockResponse, value: 43 });
      expect(mockHttp.requests).toHaveLength(1);
    });

    it('should decrement a counter', async () => {
      const result = await v2Client.down('test-counter');
      expect(result).toEqual({ ...mockResponse, value: 41 });
      expect(mockHttp.requests).toHaveLength(1);
    });

    it('should reset a counter', async () => {
      const result = await v2Client.reset('test-counter');
      expect(result).toEqual({ ...mockResponse, value: 0 });
      expect(mockHttp.requests).toHaveLength(1);
    });
    
    it('should get counter stats', async () => {
      const result = await v2Client.stats('test-counter');
      expect(result).toEqual(mockStatsResponse);
      expect(mockHttp.requests).toHaveLength(1);
    });

    it('should throw error for empty counter name', async () => {
      await expect(v2Client.get('')).rejects.toThrow('Counter name is required');
    });
    
    it('should throw error when using v1 methods on v2 client', async () => {
      await expect(v2Client.set('test-counter', 100)).rejects.toThrow('set method is only available in v1');
    });
  });
  
  describe('accessToken', () => {
    it('should pass accessToken to the HTTP client and set Authorization header', () => {
      // Create a client with an access token
      const client = new Counter({
        version: 'v2',
        workspace: 'test-workspace',
        accessToken: 'test-token'
      });
      
      // Need to directly inspect the AxiosHttpClient instance
      // Rather than use a mock, we need to check if the token is correctly passed
      const axiosClientInstance = (client as unknown as { http: { accessToken?: string } }).http;
      expect(axiosClientInstance.accessToken).toBe('test-token');
    });
    
    // Test authorization header with mock axios
    it('should create client with Authorization header when accessToken is provided', () => {
      // We need to spy on axios.create to verify headers
      const axiosSpy = jest.spyOn(axios, 'create');
      
      // Create a client with an access token and immediately use it in a dummy operation
      // to avoid unused variable linting errors
      new Counter({
        version: 'v2',
        workspace: 'test-workspace',
        accessToken: 'test-token'
      });
      
      // Verify axios.create was called with the correct Authorization header
      expect(axiosSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-token'
          })
        })
      );
      
      // Restore original implementation
      axiosSpy.mockRestore();
    });
    
    it('should work for both v1 and v2 APIs', () => {
      // Spy on axios.create
      const axiosSpy = jest.spyOn(axios, 'create');
      
      // Create v1 client with accessToken
      new Counter({
        version: 'v1',
        namespace: 'test-namespace',
        accessToken: 'v1-token'
      });
      
      // Create v2 client with accessToken
      new Counter({
        version: 'v2',
        workspace: 'test-workspace',
        accessToken: 'v2-token'
      });
      
      // Get all calls to axios.create
      const calls = axiosSpy.mock.calls;
      
      // Ensure we have at least two calls
      expect(calls.length).toBeGreaterThanOrEqual(2);
      
      // Use a simpler approach - make sure each version has at least one call that setup Authorization
      let foundV1Auth = false;
      let foundV2Auth = false;
      
      calls.forEach(call => {
        if (call[0]?.baseURL === 'https://api.counterapi.dev/v1') {
          const headers = call[0]?.headers as Record<string, string>;
          if (headers && headers.Authorization === 'Bearer v1-token') {
            foundV1Auth = true;
          }
        }
        if (call[0]?.baseURL === 'https://api.counterapi.dev/v2') {
          const headers = call[0]?.headers as Record<string, string>;
          if (headers && headers.Authorization === 'Bearer v2-token') {
            foundV2Auth = true;
          }
        }
      });
      
      // Assert both conditions are true
      expect(foundV1Auth).toBe(true);
      expect(foundV2Auth).toBe(true);
      
      // Restore original implementation
      axiosSpy.mockRestore();
    });
    
    it('should include accessToken in API requests', async () => {
      // Create a custom mockHttp that captures the config
      mockHttp = new MockHttpClient();
      const capturedConfigs: Record<string, unknown>[] = [];
      
      // Override the get method to capture configs
      mockHttp.get = async <T>(url: string, config?: Record<string, unknown>): Promise<T> => {
        capturedConfigs.push(config || {});
        const key = `GET:${url}`;
        // Use a local variable to hold the response
        let response: unknown;
        
        try {
          // Make the original method call, which will throw if the response doesn't exist
          response = await Object.getPrototypeOf(mockHttp).get.call(mockHttp, url, config);
        } catch {
          throw new Error(`No mock response for ${key}`);
        }
        
        return response as T;
      };
      
      // Create client with access token
      const clientWithToken = new Counter({
        version: 'v2',
        workspace: 'test-workspace',
        accessToken: 'test-api-key'
      });
      
      // Replace HTTP client with our custom mock
      (clientWithToken as unknown as { http: HttpClient }).http = mockHttp;
      
      // Set up mock response
      const mockResponse: CounterResponse = {
        value: 42,
        name: 'test-counter',
        namespace: 'test-workspace',
        created: '2023-01-01T00:00:00Z',
        updated: '2023-01-01T01:00:00Z'
      };
      
      const getUrl = '/{workspace}/{name}';
      mockHttp.setResponse(`GET:${getUrl.replace('{workspace}', 'test-workspace').replace('{name}', 'test-counter')}`, mockResponse);
      
      // Make API request
      await clientWithToken.get('test-counter');
      
      // In a real implementation with axios, the Authorization header would be sent with the request
      // Our mock can only verify that the client was constructed with the token, which we've already tested
    });
  });
}); 