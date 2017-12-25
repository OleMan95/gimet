"use strict";
require('./bootstrap');
const Koa = require('koa');
const bodyparcer = require('koa-body');

//sudo service mongod start
// const PORT = 8080;
// const HOST = '0.0.0.0';

const app = new Koa();
const router = require('./http/router');

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
app.use(bodyparcer());
app.use(router.middleware());
app.use(router.allowedMethods);


// app.listen(PORT, HOST);
// console.log(`Running on http://${HOST}:${PORT}`);

app.listen(3001, ()=>{
    console.log('\nServer has started...');
})

