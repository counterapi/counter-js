# counter-js

Counter API Javascript Library

## How to use

### Increase by Name

```typescript
import {API} from "./api";

const api = new API();

api.up("test").then((res) => {
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
import {API} from "./api";

const api = new API();

api.down("test").then((res) => {
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
import {API} from "./api";

const api = new API();

api.get("test").then((res) => {
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
import {API, GroupByTypes, OrderByTypes} from "./api";

const api = new API();

const q = {
    name: "test",
    group_by: GroupByTypes.Day,
    order_by: OrderByTypes.ASC,
};

api.counts(q).then((res) => {
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
