import { apiConfig } from "./api.config";
import axios, { AxiosInstance } from "axios";
import { Count, Counter } from "./counter";
import { Hash } from "./hash";

export enum GroupByTypes {
  Hour = "hour",
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
  name: string;
  group_by: GroupByTypes;
  order?: OrderByTypes;
  hash?: boolean;
}

export class CounterAPI {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create(apiConfig);
  }

  async up(name: string, hash: boolean = false): Promise<Counter> {
    if (hash) {
      name = Hash.create(name);
    }

    return await this.axios
      .get("up", {
        params: {
          name,
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

  async down(name: string, hash: boolean = false): Promise<Counter> {
    if (hash) {
      name = Hash.create(name);
    }

    return await this.axios
      .get("down", {
        params: {
          name,
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

  async get(name: string, hash: boolean = false): Promise<Counter> {
    if (hash) {
      name = Hash.create(name);
    }

    return await this.axios
      .get("get", {
        params: {
          name,
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

  async counts(query: CountsQuery): Promise<Count[]> {
    if (query.hash) {
      query.name = Hash.create(query.name);
    }

    return await this.axios
      .get("counts", {
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
