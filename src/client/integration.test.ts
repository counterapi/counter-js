import { CounterAPI, CounterAPIv1 } from './index.js';

describe('CounterAPI Integration Tests', () => {
  const counterV2 = new CounterAPI();
  const counterV1 = new CounterAPIv1();
  const workspace = 'test';
  const name = 'test';
  
  describe('V2 API', () => {
    it('should get counter', async () => {
      const result = await counterV2.get(workspace, name);
      console.log('V2 get response:', result);
      
      expect(result).toBeDefined();
      expect(result.code).toBe('200');
      expect(result.data).toBeDefined();
      if (result.data) {
        expect(result.data.name).toBe(name);
        expect(result.data.workspace_slug).toBe(workspace);
      }
    });
    
    it('should increment counter', async () => {
      const result = await counterV2.up(workspace, name);
      console.log('V2 up response:', result);
      
      expect(result).toBeDefined();
      expect(result.code).toBe('200');
      expect(result.data).toBeDefined();
    });
    
    it('should decrement counter', async () => {
      const result = await counterV2.down(workspace, name);
      console.log('V2 down response:', result);
      
      expect(result).toBeDefined();
      expect(result.code).toBe('200');
      expect(result.data).toBeDefined();
    });
    
    it('should get stats', async () => {
      const result = await counterV2.stats(workspace, name);
      console.log('V2 stats response:', result);
      
      expect(result).toBeDefined();
      expect(result.code).toBe('200');
      expect(result.data).toBeDefined();
    });
  });
  
  describe('V1 API', () => {
    const namespace = 'test';
    const name = 'test';
    
    it('should get counter', async () => {
      const result = await counterV1.get(namespace, name);
      console.log('V1 get response:', result);
      
      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.name).toBe(name);
      expect(result.namespace.name).toBe(namespace);
    });
    
    it('should increment counter', async () => {
      const result = await counterV1.up(namespace, name);
      console.log('V1 up response:', result);
      
      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.name).toBe(name);
    });
    
    it('should decrement counter', async () => {
      const result = await counterV1.down(namespace, name);
      console.log('V1 down response:', result);
      
      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.name).toBe(name);
    });
  });
}); 