import * as qs from "qs";

const BASE_URL = "https://api.counterapi.dev/v1/";

export const apiConfig = {
  returnRejectedPromiseOnError: true,
  withCredentials: false,
  timeout: 30000,
  baseURL: BASE_URL,
  headers: {
    common: {
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
