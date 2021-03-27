export declare const apiConfig: {
    returnRejectedPromiseOnError: boolean;
    withCredentials: boolean;
    timeout: number;
    baseURL: string;
    headers: {
        common: {
            "Content-Type": string;
            Accept: string;
        };
    };
    paramsSerializer: (params: any) => any;
    validateStatus: (status: any) => boolean;
};
