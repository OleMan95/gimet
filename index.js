"use strict";
require('./bootstrap');
const Koa = require('koa');
const bodyparcer = require('koa-body');

//sudo service mongod start

const app = new Koa();
const router = require('./http/router');

app.use(bodyparcer());
app.use(router.middleware());
app.use(router.allowedMethods);

app.listen(3001, ()=>{
    console.log('\nserver started');
})

