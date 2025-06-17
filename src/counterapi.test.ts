import axios from 'axios';
import { CounterAPI, CounterAPIv1 } from './counterapi.js';
import { CounterData, CounterStats, CounterResponseV1 } from './counterapi.shared.js';

jest.mock('axios');
const mockedAxios = axios as jest.MockedFunction<typeof axios>;

describe('CounterAPI (v2)', () => {
  const counter = new CounterAPI();
  const workspace = 'testspace';
  const name = 'testcounter';
  const mockData: CounterData = {
    id: '1',
    name,
    slug: 'testcounter',
    up_count: 5,
    down_count: 2,
    workspace_id: 'ws1',
    workspace_slug: workspace,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  };
  const mockStats: CounterStats = { up_count: 5, down_count: 2 };
  const ok = { code: '200', data: mockData };
  const okStats = { code: '200', data: mockStats };

  beforeEach(() => jest.clearAllMocks());

  it('up', async () => {
    mockedAxios.mockImplementationOnce(() => Promise.resolve({ data: ok }));
    const res = await counter.up(workspace, name);
    expect(res).toEqual(ok);
  });

  it('down', async () => {
    mockedAxios.mockImplementationOnce(() => Promise.resolve({ data: ok }));
    const res = await counter.down(workspace, name);
    expect(res).toEqual(ok);
  });

  it('get', async () => {
    mockedAxios.mockImplementationOnce(() => Promise.resolve({ data: ok }));
    const res = await counter.get(workspace, name);
    expect(res).toEqual(ok);
  });

  it('reset', async () => {
    mockedAxios.mockImplementationOnce(() => Promise.resolve({ data: ok }));
    const res = await counter.reset(workspace, name);
    expect(res).toEqual(ok);
  });

  it('stats', async () => {
    mockedAxios.mockImplementationOnce(() => Promise.resolve({ data: okStats }));
    const res = await counter.stats(workspace, name);
    expect(res).toEqual(okStats);
  });

  it('returns error object on error code', async () => {
    const errorObj = { code: '500', message: 'fail' };
    mockedAxios.mockImplementationOnce(() => Promise.resolve({ data: errorObj }));
    const res = await counter.get(workspace, name);
    expect(res).toEqual(errorObj);
  });
});

describe('CounterAPIv1', () => {
  const counterV1 = new CounterAPIv1();
  const namespace = 'testspace';
  const name = 'testcounter';
  const mockData: CounterResponseV1 = {
    id: 1,
    name,
    count: 3,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    namespace_id: 1,
    namespace: {
      id: 1,
      name: namespace,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
  };
  const ok = { code: '200', data: mockData };

  beforeEach(() => jest.clearAllMocks());

  it('up', async () => {
    mockedAxios.mockImplementationOnce(() => Promise.resolve({ data: ok }));
    const res = await counterV1.up(namespace, name);
    expect(res).toEqual(ok);
  });

  it('down', async () => {
    mockedAxios.mockImplementationOnce(() => Promise.resolve({ data: ok }));
    const res = await counterV1.down(namespace, name);
    expect(res).toEqual(ok);
  });

  it('get', async () => {
    mockedAxios.mockImplementationOnce(() => Promise.resolve({ data: ok }));
    const res = await counterV1.get(namespace, name);
    expect(res).toEqual(ok);
  });

  it('set', async () => {
    mockedAxios.mockImplementationOnce(() => Promise.resolve({ data: ok }));
    const res = await counterV1.set(namespace, name, 99);
    expect(res).toEqual(ok);
  });
}); 