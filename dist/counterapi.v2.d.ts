import { CounterOptions, CounterData, CounterStats, V2Endpoints, CounterBase } from './counterapi.shared';
declare class CounterV2 extends CounterBase<V2Endpoints> {
    constructor(options?: CounterOptions);
    up(workspace: string, name: string): Promise<CounterData>;
    down(workspace: string, name: string): Promise<CounterData>;
    get(workspace: string, name: string): Promise<CounterData>;
    reset(workspace: string, name: string): Promise<CounterData>;
    stats(workspace: string, name: string): Promise<CounterStats>;
}
export { CounterV2 as Counter };
