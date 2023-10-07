#!/usr/bin/env node

import {CounterAPI} from "counterapi";

const counter = new CounterAPI();

counter.up("test").then((res) => {
    console.log(res)
})
