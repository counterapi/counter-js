import { 
  UsertuneConfig, 
  ContentAttributes, 
  ContentResponse, 
  TrackingResponse, 
  HttpClient 
} from '../types/index.js';
import { AxiosHttpClient } from '../http/index.js';

/**
 * Main Usertune client class
 */
export class Usertune {
  private http: HttpClient;
  private workspace: string;

  constructor(config: UsertuneConfig) {
    this.workspace = config.workspace;
    
    // Validate required config
    if (!config.workspace) {
      throw new Error('Workspace is required');
    }

    // Initialize HTTP client
    this.http = new AxiosHttpClient({
      timeout: config.timeout,
      debug: config.debug,
      accessToken: config.accessToken // Pass even if undefined, HTTP client will handle it
    });
  }

  /**
   * Filter and validate attributes to only include supported types
   */
  private filterAttributes(attributes?: ContentAttributes): ContentAttributes {
    if (!attributes) return {};
    
    const filtered: ContentAttributes = {};
    
    for (const [key, value] of Object.entries(attributes)) {
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        filtered[key] = value;
      }
      // Skip null, undefined, objects, arrays, etc.
    }
    
    return filtered;
  }

  /**
   * Retrieve personalized content
   * @param contentSlug - The content slug identifier
   * @param attributes - Optional custom attributes for personalization
   * @returns Promise resolving to content response with attached track method
   */
  async content(contentSlug: string, attributes?: ContentAttributes): Promise<ContentResponse> {
    if (!contentSlug) {
      throw new Error('Content slug is required');
    }

    const filteredAttributes = this.filterAttributes(attributes);
    const url = `/v1/workspace/${this.workspace}/${contentSlug}/`;
    
    // Use GET request with query parameters for attributes
    const response = await this.http.get<Omit<ContentResponse, 'track'>>(url, {
      params: filteredAttributes
    });
    
    // Create bound track method for this specific content
    const track = async (conversionType: string, conversionValue?: number): Promise<TrackingResponse> => {
      if (!conversionType) {
        throw new Error('Conversion type is required');
      }

      if (!response.metadata.variant_id) {
        throw new Error('No variant_id available. Cannot track conversions for content without variants.');
      }

      const trackUrl = `/v1/workspace/${this.workspace}/${contentSlug}/track/`;
      const params: any = {
        conversion_type: conversionType,
        variant_id: response.metadata.variant_id
      };

      if (conversionValue !== undefined) {
        params.conversion_value = conversionValue;
      }
      
      // Use GET request with query parameters
      return await this.http.get<TrackingResponse>(trackUrl, { params });
    };
    
    // Return content response with attached track method
    return {
      ...response,
      track
    };
  }
}

// Backward compatibility alias
export const UsertuneClient = Usertune; 