import { Counter } from './counterapi.v2';
import { CounterV1 } from './counterapi.v1';

describe('Counter (v2) integration (real API)', () => {
  const workspace = 'test';
  const name = 'test';
  const counter = new Counter();

  it('should up, down, get, reset, and stats', async () => {
    // Up
    const upRes = await counter.up(workspace, name);
    expect(upRes).toHaveProperty('id');
    expect(upRes.name).toBe(name);

    // Down
    const downRes = await counter.down(workspace, name);
    expect(downRes).toHaveProperty('id');
    expect(downRes.name).toBe(name);

    // Get
    const getRes = await counter.get(workspace, name);
    expect(getRes).toHaveProperty('id');
    expect(getRes.name).toBe(name);

    // Stats
    const statsRes = await counter.stats(workspace, name);
    expect(statsRes).toHaveProperty('up_count');
    expect(statsRes).toHaveProperty('down_count');

    // Reset
    const resetRes = await counter.reset(workspace, name);
    expect(resetRes).toHaveProperty('id');
    expect(resetRes.name).toBe(name);
  });
});

describe('CounterV1 integration (real API)', () => {
  const namespace = 'test';
  const name = 'test';
  const counterV1 = new CounterV1();

  it('should up, down, get, and set', async () => {
    // Up
    const upRes = await counterV1.up(namespace, name);
    expect(upRes).toHaveProperty('name');
    expect(upRes.name).toBe(name);
    expect(upRes).toHaveProperty('count');

    // Down
    const downRes = await counterV1.down(namespace, name);
    expect(downRes).toHaveProperty('name');
    expect(downRes.name).toBe(name);
    expect(downRes).toHaveProperty('count');

    // Get
    const getRes = await counterV1.get(namespace, name);
    expect(getRes).toHaveProperty('name');
    expect(getRes.name).toBe(name);
    expect(getRes).toHaveProperty('count');

    // Set
    const setRes = await counterV1.set(namespace, name, 123);
    expect(setRes).toHaveProperty('name');
    expect(setRes.name).toBe(name);
    expect(setRes).toHaveProperty('count');
    expect(setRes.count).toBe(123);
  });
}); 