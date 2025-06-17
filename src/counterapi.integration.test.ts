import { CounterAPI, CounterAPIv1 } from './counterapi.js';

describe('CounterAPI (v2) integration (real API)', () => {
  const workspace = 'test';
  const name = 'test';
  const counter = new CounterAPI();

  it('should up, down, get, reset, and stats', async () => {
    // Up
    const upRes = await counter.up(workspace, name);
    expect(upRes.data).toBeDefined();
    expect(upRes.data?.id).toBeDefined();
    expect(upRes.data?.name).toBe(name);

    // Down
    const downRes = await counter.down(workspace, name);
    expect(downRes.data).toBeDefined();
    expect(downRes.data?.id).toBeDefined();
    expect(downRes.data?.name).toBe(name);

    // Get
    const getRes = await counter.get(workspace, name);
    expect(getRes.data).toBeDefined();
    expect(getRes.data?.id).toBeDefined();
    expect(getRes.data?.name).toBe(name);

    // Stats
    const statsRes = await counter.stats(workspace, name);
    expect(statsRes.data).toBeDefined();
    expect(statsRes.data?.up_count).toBeDefined();
    expect(statsRes.data?.down_count).toBeDefined();

    // Reset
    const resetRes = await counter.reset(workspace, name);
    expect(resetRes.data).toBeDefined();
    expect(resetRes.data?.id).toBeDefined();
    expect(resetRes.data?.name).toBe(name);
  });
});

describe('CounterAPIv1 integration (real API)', () => {
  const namespace = 'test';
  const name = 'test';
  const counterV1 = new CounterAPIv1();

  it('should up, down, get, and set', async () => {
    // Up
    const upRes = await counterV1.up(namespace, name);
    expect(upRes).toBeDefined();
    expect(upRes.id).toBeDefined();
    expect(upRes.name).toBe(name);

    // Down
    const downRes = await counterV1.down(namespace, name);
    expect(downRes).toBeDefined();
    expect(downRes.id).toBeDefined();
    expect(downRes.name).toBe(name);

    // Get
    const getRes = await counterV1.get(namespace, name);
    expect(getRes).toBeDefined();
    expect(getRes.id).toBeDefined();
    expect(getRes.name).toBe(name);

    // Set
    const setRes = await counterV1.set(namespace, name, 123);
    expect(setRes).toBeDefined();
    expect(setRes.id).toBeDefined();
    expect(setRes.name).toBe(name);
  });
}); 