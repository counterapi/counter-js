import { CounterAPI } from 'counterapi';

async function main() {
  const counter = new CounterAPI();
  const workspace = 'test';
  const name = 'test';

  try {
    const result = await counter.up(workspace, name);
    console.log('Counter incremented:', result);
  } catch (err) {
    console.error('Failed to increment counter:', err);
  }
}

main(); 