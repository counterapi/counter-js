/**
 * Configuration options for the Usertune client
 */
export interface UsertuneConfig {
  /** The workspace identifier */
  workspace: string;
  /** Access token for authentication (optional, required only for private content) */
  accessToken?: string;
  /** Request timeout in milliseconds (optional, defaults to 10000) */
  timeout?: number;
  /** Enable debug logging (optional, defaults to false) */
  debug?: boolean;
}

/**
 * Custom attributes that can be passed when retrieving content
 * Values can be strings, numbers, or booleans
 */
export interface ContentAttributes {
  [key: string]: string | number | boolean;
}

/**
 * Response structure for content retrieval
 */
export interface ContentResponse {
  /** The actual content data - structure varies based on content type */
  data: {
    [key: string]: any;
  };
  /** Metadata about the response */
  metadata: {
    /** Content identifier */
    content_id: number;
    /** Unique identifier for the variant (null if no personalization) */
    variant_id: number | null;
    /** Workspace identifier */
    workspace_id: number;
    /** Additional metadata */
    [key: string]: any;
  };
  /** Method to track conversions for this specific content */
  track: (conversionType: string, conversionValue?: number) => Promise<TrackingResponse>;
}

/**
 * Options for tracking conversions
 */
export interface TrackingOptions {
  /** Type of conversion (e.g., 'purchase', 'signup', 'click') */
  conversionType: string;
  /** Monetary value of the conversion (optional) */
  conversionValue?: number;
}

/**
 * Response structure for tracking operations
 */
export interface TrackingResponse {
  /** Whether the tracking was successful */
  success: boolean;
  /** Response message */
  message?: string;
  /** Additional response data */
  [key: string]: any;
}

/**
 * HTTP client interface for dependency injection
 */
export interface HttpClient {
  get<T = any>(url: string, config?: any): Promise<T>;
  post<T = any>(url: string, data?: any, config?: any): Promise<T>;
}

/**
 * Error response structure from the API
 */
export interface ApiError {
  /** Error message */
  message: string;
  /** Error code */
  code?: string;
  /** HTTP status code */
  status?: number;
  /** Additional error details */
  details?: any;
} 