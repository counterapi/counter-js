import { CounterAPI, GroupByTypes } from "./counterAPI";

import axios, { AxiosResponse } from "axios";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

mockedAxios.create = jest.fn(() => mockedAxios);

const mockedResponse: AxiosResponse = {
  data: {
    id: 1,
    name: "test",
    count: 14,
    created_at: "2021-03-27T13:33:51.315934+01:00",
    updated_at: "2021-03-26T21:46:18.624369+08:00",
  },
  status: 200,
  statusText: "OK",
  headers: {},
  config: {},
};

const mockedCountListResponse: AxiosResponse = {
  data: [
    {
      count: 1,
      date: "2021-03-07T00:00:00+08:00",
    },
    {
      count: 2,
      date: "2021-03-11T00:00:00+08:00",
    },
    {
      count: 5,
      date: "2021-03-24T00:00:00+08:00",
    },
  ],
  status: 200,
  statusText: "OK",
  headers: {},
  config: {},
};

it("returns get API successfully", async () => {
  mockedAxios.get.mockResolvedValue(mockedResponse);

  expect(axios.get).not.toHaveBeenCalled();

  const api = new CounterAPI();
  const actual = await api.get("test");

  expect(axios.get).toHaveBeenCalled();
  expect(actual.ID).toEqual(1);
  expect(actual.Name).toEqual("test");
  expect(actual.Count).toEqual(14);
});

it("returns get API successfully with hash", async () => {
  mockedAxios.get.mockResolvedValue(mockedResponse);

  const api = new CounterAPI();
  const actual = await api.get("test", true);

  expect(axios.get).toHaveBeenCalled();
  expect(actual.ID).toEqual(1);
  expect(actual.Name).toEqual("test");
  expect(actual.Count).toEqual(14);
});

it("returns up API successfully", async () => {
  mockedAxios.get.mockResolvedValue(mockedResponse);

  const api = new CounterAPI();
  const actual = await api.up("test");

  expect(axios.get).toHaveBeenCalled();
  expect(actual.ID).toEqual(1);
  expect(actual.Name).toEqual("test");
  expect(actual.Count).toEqual(14);
});

it("returns down API successfully", async () => {
  mockedAxios.get.mockResolvedValue(mockedResponse);

  const api = new CounterAPI();
  const actual = await api.down("test");

  expect(axios.get).toHaveBeenCalled();
  expect(actual.ID).toEqual(1);
  expect(actual.Name).toEqual("test");
  expect(actual.Count).toEqual(14);
});

it("returns count list API successfully", async () => {
  mockedAxios.get.mockResolvedValue(mockedCountListResponse);

  const api = new CounterAPI();
  const actual = await api.counts({
    name: "test",
    group_by: GroupByTypes.Day,
  });

  expect(axios.get).toHaveBeenCalled();
  expect(actual.length).toEqual(3);
  expect(actual[0].Count).toEqual(1);
  expect(actual[0].Date).toEqual("2021-03-07T00:00:00+08:00");
});
