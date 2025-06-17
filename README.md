# CounterAPI JavaScript/TypeScript Library

> Main library code is located in `src/counterapi.ts`.

<p align="center">
  <a href="https://counterapi.dev/" target="_blank">
    <img width="180" src="https://counterapi.dev/img/logo.png" alt="logo">
  </a>
</p>

<p align="center">
    <img src="https://img.shields.io/npm/dm/counterapi.svg" alt="Downloads">
    <img src="https://img.shields.io/github/workflow/status/counterapi/counter-js/Tests" alt="Check">
    <a href="https://www.npmjs.com/package/counterapi"><img src="https://img.shields.io/npm/v/counterapi.svg" alt="Version"></a>
    <a href="https://github.com/counterapi/counter-js/blob/master/LICENSE"><img src="https://img.shields.io/github/license/counterapi/counter-js" alt="License"></a>
</p>

## Documentation

Counter API Javascript Library

Check out our docs at https://counterapi.dev/.

## How to use

### Increase by Name

```typescript
import {CounterAPI} from "counterapi";

const counter = new CounterAPI();

counter.up("test", "test").then((res) => {
    console.log(res)
})
```

Output

```shell
Counter {
  ID: 1,
  Name: 'test',
  Count: 15,
  UpdatedAt: '2023-03-27T13:33:51.315934+01:00',
  CreatedAt: '2023-03-26T21:46:18.624369+08:00'
}
```

### Decrease by Name

```typescript
import {CounterAPI} from "counterapi";

const counter = new CounterAPI();

counter.down("test", "test").then((res) => {
    console.log(res)
})
```

Output

```shell
Counter {
  ID: 1,
  Name: 'test',
  Count: 14,
  UpdatedAt: '2023-03-27T13:33:51.315934+01:00',
  CreatedAt: '2023-03-26T21:46:18.624369+08:00'
}
```

### Get by Name

```typescript
import {CounterAPI} from "counterapi";

const counter = new CounterAPI();

counter.get("test", "test").then((res) => {
    console.log(res)
})
```

Output

```shell
Counter {
  ID: 1,
  Name: 'test',
  Count: 14,
  UpdatedAt: '2023-03-27T13:33:51.315934+01:00',
  CreatedAt: '2023-03-26T21:46:18.624369+08:00'
}
```

### Set by Name

```typescript
import {CounterAPI} from "counterapi";

const counter = new CounterAPI();

counter.set("test", "test", 10).then((res) => {
    console.log(res)
})
```

Output

```shell
Counter {
  ID: 1,
  Name: 'test',
  Count: 10,
  UpdatedAt: '2023-03-27T13:33:51.315934+01:00',
  CreatedAt: '2023-03-26T21:46:18.624369+08:00'
}
```

### Get Count List by Name

```typescript
import {CounterAPI, GroupByTypes, OrderByTypes} from "counterapi";

const counter = new CounterAPI();

const q = {
    group_by: GroupByTypes.Day,
    order_by: OrderByTypes.ASC,
};

counter.counts("test", "test", q).then((res) => {
    console.log(res);
});
```

Output

```shell
[
  Count { Count: 2, Date: '2023-03-07T00:00:00+08:00' },
  Count { Count: 14, Date: '2023-03-26T00:00:00+08:00' },
  Count { Count: 40, Date: '2023-03-27T00:00:00+08:00' }
]
```

## Usage

### Install

```
npm install counterapi axios
```

> **Note:** This library uses [axios](https://github.com/axios/axios) for HTTP requests. Make sure you have it installed as shown above.

### Import and Use (v2 by default)

```ts
import { CounterAPI } from 'counterapi';

const counter = new CounterAPI();

// Increment a counter
const upResult = await counter.up('myworkspace', 'mycounter');
console.log('Up:', upResult.value);

// Decrement a counter
const downResult = await counter.down('myworkspace', 'mycounter');
console.log('Down:', downResult.value);

// Get current value
const getResult = await counter.get('myworkspace', 'mycounter');
console.log('Get:', getResult.value);

// Reset the counter
const resetResult = await counter.reset('myworkspace', 'mycounter');
console.log('Reset:', resetResult.value);

// Get stats
const statsResult = await counter.stats('myworkspace', 'mycounter');
console.log('Stats:', statsResult);
```

### Use v1 API

```ts
import { CounterAPIv1 } from 'counterapi';

const counterV1 = new CounterAPIv1();

// Increment a counter
const upResult = await counterV1.up('myspace', 'mycounter');
console.log('Up:', upResult.value);

// Decrement a counter
const downResult = await counterV1.down('myspace', 'mycounter');
console.log('Down:', downResult.value);

// Get current value
const getResult = await counterV1.get('myspace', 'mycounter');
console.log('Get:', getResult.value);

// Set the counter to a specific value
const setResult = await counterV1.set('myspace', 'mycounter', 42);
console.log('Set:', setResult.value);
```

### API Methods

#### v2 (CounterAPI)
- `up(workspace, name)`
- `down(workspace, name)`
- `get(workspace, name)`
- `reset(workspace, name)`
- `stats(workspace, name)`

#### v1 (CounterAPIv1)
- `up(namespace, name)`
- `down(namespace, name)`
- `get(namespace, name)`
- `set(namespace, name, value)`

All methods return a Promise with the counter response.

## License

[MIT](https://github.com/counterapi/counter-js/blob/master/LICENSE)
