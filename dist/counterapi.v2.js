import { API_CONFIG, CounterBase } from './counterapi.shared';
class CounterV2 extends CounterBase {
    constructor(options = {}) {
        super({
            baseUrl: options.baseUrl || API_CONFIG.v2.baseUrl,
            endpoints: API_CONFIG.v2.endpoints,
            timeoutMs: options.timeoutMs,
        });
    }
    async up(workspace, name) {
        const url = this.buildUrl(this.endpoints.up, { workspace, name });
        const res = await this.request(url, { method: 'GET' });
        if (res.code !== '200' || !res.data)
            throw new Error(res.message || 'Failed to increment counter');
        return res.data;
    }
    async down(workspace, name) {
        const url = this.buildUrl(this.endpoints.down, { workspace, name });
        const res = await this.request(url, { method: 'GET' });
        if (res.code !== '200' || !res.data)
            throw new Error(res.message || 'Failed to decrement counter');
        return res.data;
    }
    async get(workspace, name) {
        const url = this.buildUrl(this.endpoints.get, { workspace, name });
        const res = await this.request(url, { method: 'GET' });
        if (res.code !== '200' || !res.data)
            throw new Error(res.message || 'Failed to get counter');
        return res.data;
    }
    async reset(workspace, name) {
        const url = this.buildUrl(this.endpoints.reset, { workspace, name });
        const res = await this.request(url, { method: 'GET' });
        if (res.code !== '200' || !res.data)
            throw new Error(res.message || 'Failed to reset counter');
        return res.data;
    }
    async stats(workspace, name) {
        const url = this.buildUrl(this.endpoints.stats, { workspace, name });
        const res = await this.request(url, { method: 'GET' });
        if (res.code !== '200' || !res.data)
            throw new Error(res.message || 'Failed to get stats');
        return res.data;
    }
}
export { CounterV2 as Counter };
