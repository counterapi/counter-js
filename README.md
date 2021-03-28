<p align="center">
  <a href="https://counterapi.dev/" target="_blank">
    <img width="180" src="https://raw.githubusercontent.com/counterapi/docs/master/src/.vuepress/public/favicons/apple-icon-180x180.png" alt="logo">
  </a>
</p>

<p align="center">
    <img src="https://img.shields.io/npm/dm/counterapi.svg" alt="Downloads"></a>
    <img src="https://img.shields.io/github/workflow/status/counterapi/counter-js/ci" alt="Check"></a>
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

counter.up("test").then((res) => {
    console.log(res)
})
```

Output

```shell
Counter {
  ID: 1,
  Name: 'test',
  Count: 15,
  UpdatedAt: '2021-03-27T13:33:51.315934+01:00',
  CreatedAt: '2021-03-26T21:46:18.624369+08:00'
}
```

### Decrease by Name

```typescript
import {CounterAPI} from "counterapi";

const counter = new CounterAPI();

counter.down("test").then((res) => {
    console.log(res)
})
```

Output

```shell
Counter {
  ID: 1,
  Name: 'test',
  Count: 14,
  UpdatedAt: '2021-03-27T13:33:51.315934+01:00',
  CreatedAt: '2021-03-26T21:46:18.624369+08:00'
}
```

### Get by Name

```typescript
import {CounterAPI} from "counterapi";

const counter = new CounterAPI();

counter.get("test").then((res) => {
    console.log(res)
})
```

Output

```shell
Counter {
  ID: 1,
  Name: 'test',
  Count: 14,
  UpdatedAt: '2021-03-27T13:33:51.315934+01:00',
  CreatedAt: '2021-03-26T21:46:18.624369+08:00'
}
```

### Get Count List by Name

```typescript
import {CounterAPI, GroupByTypes, OrderByTypes} from "counterapi";

const counter = new CounterAPI();

const q = {
    name: "test",
    group_by: GroupByTypes.Day,
    order_by: OrderByTypes.ASC,
};

counter.counts(q).then((res) => {
    console.log(res);
});
```

Output

```shell
[
  Count { Count: 2, Date: '2021-03-07T00:00:00+08:00' },
  Count { Count: 14, Date: '2021-03-26T00:00:00+08:00' },
  Count { Count: 40, Date: '2021-03-27T00:00:00+08:00' }
]
```

## License

[MIT](https://github.com/counterapi/counter-js/blob/master/LICENSE)
