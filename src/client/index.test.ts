import { Usertune } from './index.js';
import { HttpClient, TrackingResponse } from '../types/index.js';

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

  clear() {
    this.requests = [];
    this.responses.clear();
  }
}

describe('Usertune', () => {
  let client: Usertune;
  let mockHttp: MockHttpClient;

  beforeEach(() => {
    mockHttp = new MockHttpClient();
    client = new Usertune({
      workspace: 'test-workspace',
      accessToken: 'test-token'
    });
    // Replace the HTTP client with our mock
    (client as any).http = mockHttp;
  });

  describe('constructor', () => {
    it('should throw error if workspace is missing', () => {
      expect(() => new Usertune({ workspace: '' }))
        .toThrow('Workspace is required');
    });

    it('should create client with valid config (with accessToken)', () => {
      const client = new Usertune({
        workspace: 'test-workspace',
        accessToken: 'test-token'
      });
      expect(client).toBeInstanceOf(Usertune);
    });

    it('should create client without accessToken for public content', () => {
      const client = new Usertune({
        workspace: 'test-workspace'
      });
      expect(client).toBeInstanceOf(Usertune);
    });
  });

  describe('content()', () => {
    const mockContentResponse = {
      data: {
        text: 'Hello Berlin!'
      },
      metadata: {
        content_id: 1,
        variant_id: 1,
        workspace_id: 1
      }
    };

    beforeEach(() => {
      mockHttp.setResponse('GET:/v1/workspace/test-workspace/test-slug/', mockContentResponse);
      mockHttp.setResponse('GET:/v1/workspace/test-workspace/test-slug/track/', { success: true });
    });

    it('should retrieve content without attributes', async () => {
      const result = await client.content('test-slug');

      expect(result.data).toEqual(mockContentResponse.data);
      expect(result.metadata).toEqual(mockContentResponse.metadata);
      expect(typeof result.track).toBe('function');
      expect(mockHttp.requests).toHaveLength(1);
      expect(mockHttp.requests[0]).toEqual({
        method: 'GET',
        url: '/v1/workspace/test-workspace/test-slug/',
        config: { params: {} }
      });
    });

    it('should retrieve content with attributes', async () => {
      const attributes = {
        user_id: 'user123',
        location: 'san-francisco',
        premium: true,
        age: 25
      };

      const result = await client.content('test-slug', attributes);

      expect(result.data).toEqual(mockContentResponse.data);
      expect(typeof result.track).toBe('function');
      expect(mockHttp.requests[0].config.params).toEqual(attributes);
    });

    it('should filter out unsupported attribute types', async () => {
      const attributes: any = {
        valid_string: 'test',
        valid_number: 42,
        valid_boolean: true,
        invalid_null: null,
        invalid_undefined: undefined,
        invalid_object: { nested: 'value' },
        invalid_array: [1, 2, 3]
      };

      await client.content('test-slug', attributes);

      expect(mockHttp.requests[0].config.params).toEqual({
        valid_string: 'test',
        valid_number: 42,
        valid_boolean: true
      });
    });

    it('should attach working track method to content', async () => {
      const content = await client.content('test-slug');
      
      const trackResult = await content.track('purchase', 99.99);
      
      expect(trackResult).toEqual({ success: true });
      expect(mockHttp.requests).toHaveLength(2); // content + track
      expect(mockHttp.requests[1]).toEqual({
        method: 'GET',
        url: '/v1/workspace/test-workspace/test-slug/track/',
        config: {
          params: {
            conversion_type: 'purchase',
            conversion_value: 99.99,
            variant_id: 1
          }
        }
      });
    });

    it('should throw error for empty content slug', async () => {
      await expect(client.content('')).rejects.toThrow('Content slug is required');
    });

    it('should work without accessToken for public content', async () => {
      // Create a client without accessToken
      const publicClient = new Usertune({
        workspace: 'test-workspace'
      });
      
      // Replace with mock HTTP client
      const publicMockHttp = new MockHttpClient();
      (publicClient as any).http = publicMockHttp;
      
      // Set up mock response
      const publicContentResponse = {
        data: {
          title: 'Public Content',
          content: 'This is publicly accessible content'
        },
        metadata: {
          content_id: 2,
          variant_id: null, // Public content typically has no variant
          workspace_id: 1
        }
      };
      
      publicMockHttp.setResponse('GET:/v1/workspace/test-workspace/public-slug/', publicContentResponse);
      
      const result = await publicClient.content('public-slug');
      
      expect(result.data).toEqual(publicContentResponse.data);
      expect(result.metadata).toEqual(publicContentResponse.metadata);
      expect(typeof result.track).toBe('function');
      expect(publicMockHttp.requests).toHaveLength(1);
      expect(publicMockHttp.requests[0]).toEqual({
        method: 'GET',
        url: '/v1/workspace/test-workspace/public-slug/',
        config: { params: {} }
      });
    });

    it('should throw error when tracking content without variant_id', async () => {
      const contentWithoutVariant = {
        data: { title: 'Static Content' },
        metadata: { 
          content_id: 3,
          variant_id: null, 
          workspace_id: 1 
        }
      };
      
      mockHttp.setResponse('GET:/v1/workspace/test-workspace/static/', contentWithoutVariant);
      
      const content = await client.content('static');
      
      await expect(content.track('view')).rejects.toThrow(
        'No variant_id available. Cannot track conversions for content without variants.'
      );
    });
  });

  describe('integration scenarios', () => {
    it('should handle complete flow: content -> track', async () => {
      const contentResponse = {
        data: { title: 'Test' },
        metadata: { 
          content_id: 1,
          variant_id: 1, 
          workspace_id: 1 
        }
      };
      
      const trackingResponse: TrackingResponse = {
        success: true
      };

      mockHttp.setResponse('GET:/v1/workspace/test-workspace/banner/', contentResponse);
      mockHttp.setResponse('GET:/v1/workspace/test-workspace/banner/track/', trackingResponse);

      // Get content
      const content = await client.content('banner', { user_tier: 'premium' });
      expect(content.data).toEqual(contentResponse.data);
      expect(content.metadata).toEqual(contentResponse.metadata);
      expect(typeof content.track).toBe('function');

      // Track conversion using the content's track method
      const trackResult = await content.track('signup', 50);
      expect(trackResult).toEqual(trackingResponse);

      // Verify requests
      expect(mockHttp.requests).toHaveLength(2);
      expect(mockHttp.requests[0].config.params).toEqual({ user_tier: 'premium' });
      expect(mockHttp.requests[1].config.params).toEqual({
        conversion_type: 'signup',
        conversion_value: 50,
        variant_id: 1
      });
    });

    it('should handle content with null variant_id', async () => {
      const contentResponse = {
        data: { title: 'Static Content' },
        metadata: { 
          content_id: 3,
          variant_id: null, 
          workspace_id: 1 
        }
      };

      mockHttp.setResponse('GET:/v1/workspace/test-workspace/static/', contentResponse);

      const content = await client.content('static');
      expect(content.metadata.variant_id).toBeNull();

      // Should not be able to track
      await expect(content.track('view')).rejects.toThrow(
        'No variant_id available. Cannot track conversions for content without variants.'
      );
    });
  });
}); 