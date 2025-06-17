import axios from 'axios';
export const API_CONFIG = {
    v1: {
        baseUrl: 'https://api.counterapi.dev/v1',
        endpoints: {
            up: '/{namespace}/{name}/up',
            down: '/{namespace}/{name}/down',
            get: '/{namespace}/{name}/get',
            set: '/{namespace}/{name}/?count={value}',
        },
    },
    v2: {
        baseUrl: 'https://api.counterapi.dev/v2',
        endpoints: {
            up: '/{workspace}/{name}/up',
            down: '/{workspace}/{name}/down',
            get: '/{workspace}/{name}',
            reset: '/{workspace}/{name}/reset',
            stats: '/{workspace}/{name}/stats',
        },
    },
};
export async function axiosRequestWithTimeout(url, options = {}, timeoutMs = 5000) {
    try {
        const response = await axios(Object.assign({ url, timeout: timeoutMs }, options));
        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            const err = error;
            let message = err.message;
            if (err.response) {
                message = `HTTP ${err.response.status}: ${err.response.statusText}`;
                if (err.response.data && err.response.data.error) {
                    message += ` - ${err.response.data.error}`;
                }
            }
            throw new Error(message);
        }
        else {
            throw new Error('Unknown error occurred');
        }
    }
}
export class CounterBase {
    constructor(config) {
        this.baseUrl = config.baseUrl;
        this.endpoints = config.endpoints;
        this.timeoutMs = config.timeoutMs || 5000;
    }
    buildUrl(endpoint, params) {
        let url = endpoint;
        for (const [key, value] of Object.entries(params)) {
            url = url.replace(`{${key}}`, encodeURIComponent(String(value)));
        }
        return this.baseUrl + url;
    }
    async request(url, options = {}) {
        return axiosRequestWithTimeout(url, options, this.timeoutMs);
    }
}
