# CounterAPI JavaScript Client

A lightweight, universal JavaScript client for [CounterAPI](https://counterapi.dev) - a simple API for tracking and managing counters.

## Features

- Universal JavaScript library (Node.js, browser, ESM)
- Support for both v1 and v2 CounterAPI endpoints
- Promise-based API
- TypeScript support
- Custom error handling
- Debugging mode

## Installation

```bash
npm install counterapi.js
```

## Usage

### Import

#### ES Modules (recommended)

```js
import { Counter } from 'counterapi.js';
```

#### CommonJS

```js
const { Counter } = require('counterapi.js');
```

#### Browser via CDN

```html
<script src="https://cdn.jsdelivr.net/npm/counterapi.js/dist/counter.browser.min.js"></script>
<script>
  // Counter is available as a global variable
  const counter = new Counter({ version: 'v2', namespace: 'my-namespace' });
</script>
```

### Creating a Client

```js
// For v1 API
const counterV1 = new Counter({
  version: 'v1',       // Use v1 API
  namespace: 'my-app', // Your namespace
  debug: false,        // Optional: Enable debug logging
  timeout: 5000        // Optional: Request timeout in ms (default: 10000)
});

// For v2 API
const counterV2 = new Counter({
  version: 'v2',          // Use v2 API
  namespace: 'my-workspace', // Your workspace name
  debug: false,           // Optional: Enable debug logging
  timeout: 5000           // Optional: Request timeout in ms (default: 10000)
});
```

### API Methods

#### Get Counter

```js
// Get the current value of a counter
const counter = await counterClient.get('page-views');
console.log(`Current count: ${counter.value}`);
```

#### Increment Counter

```js
// Increment a counter by 1
const counter = await counterClient.up('page-views');
console.log(`New count after increment: ${counter.value}`);
```

#### Decrement Counter

```js
// Decrement a counter by 1
const counter = await counterClient.down('page-views');
console.log(`New count after decrement: ${counter.value}`);
```

#### Set Counter Value (V1 API only)

```js
// Set a counter to a specific value
const counter = await counterV1.set('page-views', 100);
console.log(`Counter set to: ${counter.value}`);
```

#### Reset Counter (V2 API only)

```js
// Reset a counter to 0
const counter = await counterV2.reset('page-views');
console.log(`Counter reset to: ${counter.value}`);
```

#### Get Counter Stats (V2 API only)

```js
// Get statistics for a counter
const stats = await counterV2.stats('page-views');
console.log(`Current value: ${stats.value}`);
console.log(`Total hits: ${stats.stats.hits}`);
console.log('Usage by date:', stats.stats.dates);
```

### Response Type

All API methods return a Promise that resolves to a counter response object:

```js
{
  value: 42,              // Current counter value
  name: 'page-views',     // Counter name
  namespace: 'my-app',    // Namespace or workspace
  created: '2023-...',    // Creation timestamp
  updated: '2023-...'     // Last updated timestamp
}
```

The `stats()` method in v2 API also includes a `stats` property:

```js
{
  // ... standard counter fields
  stats: {
    hits: 42,             // Total number of hits
    dates: {              // Usage by date
      '2023-01-01': 5,
      '2023-01-02': 10
      // ...
    }
  }
}
```

## Error Handling

Use standard Promise error handling:

```js
try {
  const counter = await counterClient.up('page-views');
} catch (error) {
  console.error('Error:', error.message);
  console.error('Status:', error.status);
  console.error('Code:', error.code);
}
```

## Examples

See the [examples](./examples) directory for more usage examples.

## License

MIT
