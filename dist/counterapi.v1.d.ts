import { CounterOptions, CounterResponseV1, V1Endpoints, CounterBase } from './counterapi.shared';
export declare class CounterV1 extends CounterBase<V1Endpoints> {
    constructor(options?: CounterOptions);
    up(namespace: string, name: string): Promise<CounterResponseV1>;
    down(namespace: string, name: string): Promise<CounterResponseV1>;
    get(namespace: string, name: string): Promise<CounterResponseV1>;
    set(namespace: string, name: string, value: number): Promise<CounterResponseV1>;
}
