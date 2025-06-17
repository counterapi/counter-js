import { AxiosRequestConfig } from 'axios';
export interface CounterOptions {
    version?: 'v1' | 'v2';
    baseUrl?: string;
    timeoutMs?: number;
}
export interface CounterData {
    id: string;
    name: string;
    slug: string;
    description?: string;
    up_count: number;
    down_count: number;
    workspace_id: string;
    workspace_slug: string;
    team_id?: string;
    user_id?: string;
    created_at: string;
    updated_at: string;
}
export interface CounterStats {
    up_count: number;
    down_count: number;
    [key: string]: any;
}
export interface CounterResponse {
    code: string;
    message?: string;
    data?: CounterData | CounterStats;
    error?: string;
}
export interface CounterResponseV1 {
    namespace?: string;
    workspace?: string;
    name: string;
    value?: number;
    counts?: Record<string, number>;
    [key: string]: any;
}
export declare const API_CONFIG: {
    v1: {
        baseUrl: string;
        endpoints: {
            up: string;
            down: string;
            get: string;
            set: string;
        };
    };
    v2: {
        baseUrl: string;
        endpoints: {
            up: string;
            down: string;
            get: string;
            reset: string;
            stats: string;
        };
    };
};
export type V1Endpoints = typeof API_CONFIG.v1.endpoints;
export type V2Endpoints = typeof API_CONFIG.v2.endpoints;
export declare function axiosRequestWithTimeout<T>(url: string, options?: AxiosRequestConfig, timeoutMs?: number): Promise<T>;
export declare class CounterBase<TEndpoints> {
    protected baseUrl: string;
    protected endpoints: TEndpoints;
    protected timeoutMs: number;
    constructor(config: {
        baseUrl: string;
        endpoints: TEndpoints;
        timeoutMs?: number;
    });
    protected buildUrl(endpoint: string, params: Record<string, string | number>): string;
    protected request<T = CounterResponseV1>(url: string, options?: AxiosRequestConfig): Promise<T>;
}
