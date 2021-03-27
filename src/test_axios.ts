import { CounterAPI } from "./counterAPI";

const api = new CounterAPI();
api.up("test").then((res) => {
  console.log(res);
});

// api.down("test").then((res) => {
//     console.log(res)
// })

// api.get("test111")
//     .then((res) => {
//         console.log(res)
//     }).catch((err) => {
//     console.log("failed")
// })

// const q = {
//   name: "test",
//   group_by: GroupByTypes.Day,
//   order_by: OrderByTypes.ASC,
// };
// api.counts(q).then((res) => {
//   console.log(res);
// });
