import { AxiosInstance } from "axios";
import { Count, Counter } from "./counter";
export declare enum GroupByTypes {
    Day = "day",
    Week = "week",
    Month = "month",
    Year = "year"
}
export declare enum OrderByTypes {
    ASC = "asc",
    DESC = "desc"
}
export interface CountsQuery {
    group_by: GroupByTypes;
    order?: OrderByTypes;
    hash?: boolean;
}
export declare class CounterAPI {
    axios: AxiosInstance;
    constructor();
    up(namespace: string, name: string, hash?: boolean): Promise<Counter>;
    down(namespace: string, name: string, hash?: boolean): Promise<Counter>;
    get(namespace: string, name: string, hash?: boolean): Promise<Counter>;
    set(namespace: string, name: string, count: number, hash?: boolean): Promise<Counter>;
    counts(namespace: string, name: string, query: CountsQuery): Promise<Count[]>;
}
