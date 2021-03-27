import { AxiosInstance } from "axios";
import { Count, Counter } from "./counter";
export declare enum GroupByTypes {
    Day = "day",
    Month = "month",
    Year = "year"
}
export declare enum OrderByTypes {
    ASC = "asc",
    DESC = "desc"
}
export interface CountsQuery {
    name: string;
    group_by: GroupByTypes;
    order?: OrderByTypes;
    hash?: boolean;
}
export declare class CounterAPI {
    axios: AxiosInstance;
    constructor();
    up(name: string, hash?: boolean): Promise<Counter>;
    down(name: string, hash?: boolean): Promise<Counter>;
    get(name: string, hash?: boolean): Promise<Counter>;
    counts(query: CountsQuery): Promise<Count[]>;
}
