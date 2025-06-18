import { CounterAPI, CounterAPIv1 } from './index.js';
import { HttpClient } from '../types/index.js';

// Mock HTTP client for testing
class MockHttpClient implements HttpClient {
  public requests: Array<{ method: string; url: string; data?: any; config?: any }> = [];
  private responses: Map<string, any> = new Map();

  setResponse(key: string, response: any) {
    this.responses.set(key, response);
  }

  async get<T = any>(url: string, config?: any): Promise<T> {
    this.requests.push({ method: 'GET', url, config });
    const response = this.responses.get(`GET:${url}`);
    if (!response) {
      throw new Error(`No mock response for GET:${url}`);
    }
    return response;
  }

  async post<T = any>(url: string, data?: any, config?: any): Promise<T> {
    this.requests.push({ method: 'POST', url, data, config });
    const response = this.responses.get(`POST:${url}`);
    if (!response) {
      throw new Error(`No mock response for POST:${url}`);
    }
    return response;
  }

  async put<T = any>(url: string, data?: any, config?: any): Promise<T> {
    this.requests.push({ method: 'PUT', url, data, config });
    const response = this.responses.get(`PUT:${url}`);
    if (!response) {
      throw new Error(`No mock response for PUT:${url}`);
    }
    return response;
  }

  async delete<T = any>(url: string, config?: any): Promise<T> {
    this.requests.push({ method: 'DELETE', url, config });
    const response = this.responses.get(`DELETE:${url}`);
    if (!response) {
      throw new Error(`No mock response for DELETE:${url}`);
    }
    return response;
  }

  clear() {
    this.requests = [];
    this.responses.clear();
  }
}

describe('CounterAPI', () => {
  let client: CounterAPI;
  let mockHttp: MockHttpClient;

  beforeEach(() => {
    mockHttp = new MockHttpClient();
    client = new CounterAPI();
    // Replace the HTTP client with our mock
    (client as any).http = mockHttp;
  });

  describe('constructor', () => {
    it('should create client with default config', () => {
      expect(client).toBeInstanceOf(CounterAPI);
    });
  });

  describe('up()', () => {
    const mockUpResponse = { code: "200", data: { id: "1", up_count: 1 } };

    beforeEach(() => {
      mockHttp.setResponse('GET:/workspace/test-workspace/test-counter/up', mockUpResponse);
    });

    it('should increment counter', async () => {
      const result = await client.up('test-workspace', 'test-counter');

      expect(result).toEqual(mockUpResponse);
      expect(mockHttp.requests).toHaveLength(1);
      expect(mockHttp.requests[0]).toEqual({
        method: 'GET',
        url: '/workspace/test-workspace/test-counter/up',
        config: undefined
      });
    });
  });

  describe('down()', () => {
    const mockDownResponse = { code: "200", data: { id: "1", down_count: 1 } };

    beforeEach(() => {
      mockHttp.setResponse('GET:/workspace/test-workspace/test-counter/down', mockDownResponse);
    });

    it('should decrement counter', async () => {
      const result = await client.down('test-workspace', 'test-counter');

      expect(result).toEqual(mockDownResponse);
      expect(mockHttp.requests).toHaveLength(1);
      expect(mockHttp.requests[0]).toEqual({
        method: 'GET',
        url: '/workspace/test-workspace/test-counter/down',
        config: undefined
      });
    });
  });

  describe('get()', () => {
    const mockGetResponse = { code: "200", data: { id: "1", up_count: 1, down_count: 0 } };

    beforeEach(() => {
      mockHttp.setResponse('GET:/workspace/test-workspace/test-counter', mockGetResponse);
    });

    it('should get counter', async () => {
      const result = await client.get('test-workspace', 'test-counter');

      expect(result).toEqual(mockGetResponse);
      expect(mockHttp.requests).toHaveLength(1);
      expect(mockHttp.requests[0]).toEqual({
        method: 'GET',
        url: '/workspace/test-workspace/test-counter',
        config: undefined
      });
    });
  });
}); 