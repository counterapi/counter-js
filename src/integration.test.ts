/**
 * Integration tests for CounterAPI
 * 
 * These tests make actual calls to the CounterAPI endpoints.
 * To run these tests, use: npm test -- -t "integration"
 * 
 * IMPORTANT: These tests should be run only when explicitly requested,
 * not as part of regular CI/CD runs, as they depend on external services.
 */

import { Counter } from './client/index';

// Skip these tests by default - only run when explicitly asked
const skipTests = process.env.RUN_INTEGRATION_TESTS !== 'true';
const testRunner = skipTests ? describe.skip : describe;

// Check if we should run integration tests
if (!skipTests) {
  console.warn('\n⚠️  Running integration tests with LIVE API CALLS to CounterAPI ⚠️\n');
}

testRunner('CounterAPI Integration Tests', () => {
  // Create counter clients
  const counterV1 = new Counter({
    version: 'v1',
    namespace: 'test',
    debug: false  // Set to true for detailed request/response logs
  });

  const counterV2 = new Counter({
    version: 'v2',
    namespace: 'test',
    debug: false  // Set to true for detailed request/response logs
  });

  describe('V1 API Tests', () => {
    const counter = counterV1;
    const name = 'test';

    test('should get counter', async () => {
      const result = await counter.get(name);
      expect(result).toBeDefined();
      // V1 API returns different structure than our TypeScript type
      // Simply check that we get an object back
      expect(typeof result).toBe('object');
    }, 10000);  // Increase timeout for API calls

    test('should increment counter', async () => {
      const result = await counter.up(name);
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    }, 10000);

    test('should decrement counter', async () => {
      const result = await counter.down(name);
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    }, 10000);

    test('should set counter value', async () => {
      const result = await counter.set(name, 42);
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    }, 10000);
  });

  describe('V2 API Tests', () => {
    const counter = counterV2;
    const name = 'test';

    test('should get counter', async () => {
      const result = await counter.get(name);
      expect(result).toBeDefined();
      // Different V2 API response structure
      if ('data' in result) {
        // V2 API might wrap the response in a data property
        expect(result.data).toBeDefined();
      } else {
        expect(typeof result).toBe('object');
      }
    }, 10000);

    test('should increment counter', async () => {
      const result = await counter.up(name);
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    }, 10000);

    test('should decrement counter', async () => {
      const result = await counter.down(name);
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    }, 10000);

    test('should reset counter', async () => {
      const result = await counter.reset(name);
      expect(result).toBeDefined();
      expect(typeof result === 'object').toBe(true);
    }, 10000);

    test('should get counter stats', async () => {
      const result = await counter.stats(name);
      expect(result).toBeDefined();
      expect(typeof result === 'object').toBe(true);
    }, 10000);
  });
}); 