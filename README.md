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
npm install counterapi
```

## Usage

### Import

#### ES Modules (recommended)

```js
import { Counter } from 'counterapi';
```

#### CommonJS

```js
const { Counter } = require('counterapi');
```

#### Browser via CDN

```html
<script src="https://cdn.jsdelivr.net/npm/counterapi/dist/counter.browser.min.js"></script>
<script>
  // Counter is available as a global variable
  const counter = new Counter({ workspace: 'my-workspace' });
</script>
```

### Creating a Client

```js
// For v1 API
const counterV1 = new Counter({
  version: 'v1',       // Use v1 API
  namespace: 'my-app', // Your namespace
  debug: false,        // Optional: Enable debug logging
  timeout: 5000,       // Optional: Request timeout in ms (default: 10000)
});

// For v2 API (default)
const counterV2 = new Counter({
  workspace: 'my-workspace', // Your workspace name
  debug: false,              // Optional: Enable debug logging
  timeout: 5000,             // Optional: Request timeout in ms (default: 10000)
  accessToken: 'your-token'  // Optional: Authentication token for API requests
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
console.log(`Up count: ${counter.data.up_count}, Down count: ${counter.data.down_count}`);
```

#### Decrement Counter

```js
// Decrement a counter by 1
const counter = await counterClient.down('page-views');
console.log(`New count after decrement: ${counter.value}`);
console.log(`Up count: ${counter.data.up_count}, Down count: ${counter.data.down_count}`);
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
const result = await counterV2.stats('page-views');
console.log(`Up count: ${result.data.up_count}`);
console.log(`Down count: ${result.data.down_count}`);
console.log(`Today's up count: ${result.data.stats.today.up}`);
console.log(`This week's down count: ${result.data.stats.this_week.down}`);
console.log(`Most active hour: ${getMostActiveHour(result.data.stats.temporal.hours)}`);
```

### Response Types

#### Standard Counter Response

Basic counter operations return a response with this structure:

```js
{
  code: "200",
  data: {
    created_at: "2025-06-17T11:33:23Z",
    description: "",
    down_count: 4,
    id: 1,
    name: "test",
    slug: "test",
    team_id: 4,
    up_count: 4,
    updated_at: "2025-06-17T11:33:23Z",
    user_id: 7,
    workspace_id: 1,
    workspace_slug: "test"
  }
}
```

#### Stats Response (V2 API)

The `stats()` method returns a comprehensive statistics object:

```js
{
  code: "200",
  data: {
    id: 1,
    counter_id: 1,
    up_count: 6,
    down_count: 4,
    stats: {
      today: {
        up: 6,
        down: 4
      },
      this_week: {
        up: 6,
        down: 4
      },
      temporal: {
        hours: {
          // Hourly breakdown (00-23)
          "07": { up: 6, down: 4 },
          // ... other hours
        },
        weekdays: {
          // Day of week breakdown
          "monday": { up: 0, down: 0 },
          "tuesday": { up: 0, down: 0 },
          "wednesday": { up: 6, down: 4 },
          // ... other days
        },
        quarters: {
          // Quarterly breakdown
          "q1": { up: 0, down: 0 },
          "q2": { up: 6, down: 4 },
          "q3": { up: 0, down: 0 },
          "q4": { up: 0, down: 0 }
        }
      }
    },
    created_at: "2025-06-17T11:33:23Z",
    updated_at: "2025-06-18T07:44:11Z"
  },
  message: "Counter stats retrieved successfully"
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

We provide ready-to-use examples to help you get started with CounterAPI:

### Browser Example

The [browser example](./examples/browser) demonstrates how to use CounterAPI in a web application:

- Interactive UI for counter operations
- Display of up and down counts
- Visualization of counter statistics
- Real-time API responses

To run the browser example:

```bash
# Build the library first
npm run build

# Serve the example using a web server
cd examples/browser
python -m http.server 8000
# Then open http://localhost:8000 in your browser
```

### Node.js Example

The [Node.js example](./examples/node) shows how to use CounterAPI in a server-side application:

- Simple counter retrieval
- Using ESM imports
- Error handling

To run the Node.js example:

```bash
# Build the library first
npm run build

# Run the example
cd examples/node
node index.js
```

### Visualizing Stats

You can use the stats data to create visualizations:

```js
// Example: Creating a simple chart from hourly stats
function createHourlyChart(stats) {
  const hours = stats.data.stats.temporal.hours;
  const labels = Object.keys(hours).sort();
  const upData = labels.map(hour => hours[hour].up);
  const downData = labels.map(hour => hours[hour].down);
  
  // Use your preferred charting library
  renderChart({
    labels,
    datasets: [
      { label: 'Up', data: upData },
      { label: 'Down', data: downData }
    ]
  });
}

// Example usage
const stats = await counter.stats('my-counter');
createHourlyChart(stats);
```

## License

MIT
