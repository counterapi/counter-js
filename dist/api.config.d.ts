import { PathLike } from "fs";
export declare const apiConfig: {
    returnRejectedPromiseOnError: boolean;
    withCredentials: boolean;
    timeout: number;
    baseURL: string;
    headers: {
        common: {
            "Cache-Control": string;
            Pragma: string;
            "Content-Type": string;
            Accept: string;
        };
    };
    paramsSerializer: (params: PathLike) => any;
    validateStatus: (status: any) => boolean;
};
