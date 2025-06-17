import { API_CONFIG, CounterBase } from './counterapi.shared';
export class CounterV1 extends CounterBase {
    constructor(options = {}) {
        super({
            baseUrl: options.baseUrl || API_CONFIG.v1.baseUrl,
            endpoints: API_CONFIG.v1.endpoints,
            timeoutMs: options.timeoutMs,
        });
    }
    up(namespace, name) {
        const url = this.buildUrl(this.endpoints.up, { namespace, name });
        return this.request(url, { method: 'GET' });
    }
    down(namespace, name) {
        const url = this.buildUrl(this.endpoints.down, { namespace, name });
        return this.request(url, { method: 'GET' });
    }
    get(namespace, name) {
        const url = this.buildUrl(this.endpoints.get, { namespace, name });
        return this.request(url, { method: 'GET' });
    }
    set(namespace, name, value) {
        const url = this.buildUrl(this.endpoints.set, { namespace, name, value });
        return this.request(url, { method: 'GET' });
    }
}
