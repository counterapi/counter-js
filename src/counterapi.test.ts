import axios from 'axios';
import { Counter } from './counterapi.v2';
import { CounterV1 } from './counterapi.v1';
import { CounterData, CounterStats, CounterResponseV1 } from './counterapi.shared';

jest.mock('axios');
const mockedAxios = axios as jest.MockedFunction<typeof axios>;

describe('Counter (v2)', () => {
  const counter = new Counter();
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
    expect(res).toEqual(mockData);
  });

  it('down', async () => {
    mockedAxios.mockImplementationOnce(() => Promise.resolve({ data: ok }));
    const res = await counter.down(workspace, name);
    expect(res).toEqual(mockData);
  });

  it('get', async () => {
    mockedAxios.mockImplementationOnce(() => Promise.resolve({ data: ok }));
    const res = await counter.get(workspace, name);
    expect(res).toEqual(mockData);
  });

  it('reset', async () => {
    mockedAxios.mockImplementationOnce(() => Promise.resolve({ data: ok }));
    const res = await counter.reset(workspace, name);
    expect(res).toEqual(mockData);
  });

  it('stats', async () => {
    mockedAxios.mockImplementationOnce(() => Promise.resolve({ data: okStats }));
    const res = await counter.stats(workspace, name);
    expect(res).toEqual(mockStats);
  });

  it('throws on error code', async () => {
    mockedAxios.mockImplementationOnce(() => Promise.resolve({ data: { code: '500', message: 'fail' } }));
    await expect(counter.get(workspace, name)).rejects.toThrow('fail');
  });
});

describe('CounterV1', () => {
  const counterV1 = new CounterV1();
  const namespace = 'testspace';
  const name = 'testcounter';
  const mockV1: CounterResponseV1 = { namespace, name, value: 42 };
  const ok = mockV1;

  beforeEach(() => jest.clearAllMocks());

  it('up', async () => {
    mockedAxios.mockImplementationOnce(() => Promise.resolve({ data: ok }));
    const res = await counterV1.up(namespace, name);
    expect(res).toEqual(mockV1);
  });

  it('down', async () => {
    mockedAxios.mockImplementationOnce(() => Promise.resolve({ data: ok }));
    const res = await counterV1.down(namespace, name);
    expect(res).toEqual(mockV1);
  });

  it('get', async () => {
    mockedAxios.mockImplementationOnce(() => Promise.resolve({ data: ok }));
    const res = await counterV1.get(namespace, name);
    expect(res).toEqual(mockV1);
  });

  it('set', async () => {
    mockedAxios.mockImplementationOnce(() => Promise.resolve({ data: ok }));
    const res = await counterV1.set(namespace, name, 99);
    expect(res).toEqual(mockV1);
  });
}); 