import { Counter } from 'counterapi';

const counter = new Counter();
const workspace = 'test';
const name = 'test';

const main = async () => {
  try {
    const result = await counter.get(workspace, name);
    console.log('Counter value:', result);
  } catch (err) {
    console.error('Error:', err);
  }
};

main(); 