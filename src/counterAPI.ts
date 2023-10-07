import { apiConfig } from "./api.config";
import axios, { AxiosInstance } from "axios";
import { Count, Counter } from "./counter";
import { Hash } from "./hash";

export enum GroupByTypes {
  Day = "day",
  Week = "week",
  Month = "month",
  Year = "year",
}

export enum OrderByTypes {
  ASC = "asc",
  DESC = "desc",
}

export interface CountsQuery {
  group_by: GroupByTypes;
  order?: OrderByTypes;
  hash?: boolean;
}

export class CounterAPI {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create(apiConfig);
  }

  async up(namespace: string, name: string, hash: boolean = false): Promise<Counter> {
    if (hash) {
      name = Hash.create(name);
    }

    return await this.axios
      .get(`${namespace}/${name}/up`)
      .then((res) => {
        return new Counter({
          ID: res.data.id,
          Name: res.data.name,
          Count: res.data.count,
          UpdatedAt: res.data.updated_at,
          CreatedAt: res.data.created_at,
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  async down(namespace: string, name: string, hash: boolean = false): Promise<Counter> {
    if (hash) {
      name = Hash.create(name);
    }

    return await this.axios
      .get(`${namespace}/${name}/down`)
      .then((res) => {
        return new Counter({
          ID: res.data.id,
          Name: res.data.name,
          Count: res.data.count,
          UpdatedAt: res.data.updated_at,
          CreatedAt: res.data.created_at,
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  async get(namespace: string, name: string, hash: boolean = false): Promise<Counter> {
    if (hash) {
      name = Hash.create(name);
    }

    return await this.axios
      .get(`${namespace}/${name}/`)
      .then((res) => {
        return new Counter({
          ID: res.data.id,
          Name: res.data.name,
          Count: res.data.count,
          UpdatedAt: res.data.updated_at,
          CreatedAt: res.data.created_at,
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  async set(
    namespace: string,
    name: string,
    count: number,
    hash: boolean = false
  ): Promise<Counter> {
    if (hash) {
      name = Hash.create(name);
    }

    return await this.axios
      .get(`${namespace}/${name}/set`, {
        params: {
          count,
        },
      })
      .then((res) => {
        return new Counter({
          ID: res.data.id,
          Name: res.data.name,
          Count: res.data.count,
          UpdatedAt: res.data.updated_at,
          CreatedAt: res.data.created_at,
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  async counts(
      namespace: string,
      name: string,
      query: CountsQuery
  ): Promise<Count[]> {
    if (query.hash) {
      name = Hash.create(name);
    }

    return await this.axios
      .get(`${namespace}/${name}/list`, {
        params: query,
      })
      .then((res) => {
        let counts: Count[] = [];
        res.data.forEach((row) => {
          counts.push(
            new Count({
              Count: row.count,
              Date: row.date,
            })
          );
        });
        return counts;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
