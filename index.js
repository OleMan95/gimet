"use strict";
require('./bootstrap');
const Koa = require('koa');
const bodyParser = require('koa-body');
const app = new Koa();
const router = require('./http/router');
const jwtService = require('./services/jwt-service');
const {User} = require('./models');

const PORT = require('./config').server.port;

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.status} ${ctx.url} - ${ms}ms`);
}); // logger

app.use(async(ctx, next) =>{
    try{
        await next();
    }catch({status = 500, message = 'Server error', name, errors}){
        if(name === 'ValidationError'){
            ctx.status = 400;
            ctx.body = {
                errors: Object.values(errors).reduce((errors, error)=>({
                    ...errors,
                    [error.path]:error.message,
                }), {}),
            };
        }else{
            ctx.status = status;
            ctx.body = {status, message};
        }

    }
}); // error handler

app.use(async(ctx, next) => {
    const {authorization} = ctx.headers;

    if(authorization){
        try{
            const email = await jwtService.verify(authorization);
            console.log(email);

            ctx.user = await User.findOne({ email }, function (err, person) {
                if (err) return console.log(err);
            });
        }catch(e){
            console.log(e);
            ctx.throw(401, {message:'Unauthorized. Invalid Token'});
        }
    }

    await next();
}); // auth

app.use(bodyParser());
app.use(router.middleware());
app.use(router.allowedMethods);


app.listen(PORT, ()=>{
    console.log('\nServer has started...');
});



