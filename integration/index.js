#!/usr/bin/env node

import {CounterAPI} from "counterapi";

const counter = new CounterAPI();

counter.counts(
    "test",
    "test",
    {
        group_by: "day"
    }).then((res) => {
    console.log(res)
})
