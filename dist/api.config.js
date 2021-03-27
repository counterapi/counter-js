"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiConfig = void 0;
var qs = require("qs");
var BASE_URL = "https://api.counterapi.dev/v1/";
exports.apiConfig = {
    returnRejectedPromiseOnError: true,
    withCredentials: true,
    timeout: 30000,
    baseURL: BASE_URL,
    headers: {
        common: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    },
    paramsSerializer: function (params) {
        return qs.stringify(params, { indices: false });
    },
    validateStatus: function (status) {
        return status == 200;
    },
};
//# sourceMappingURL=api.config.js.map