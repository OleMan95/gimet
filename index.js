"use strict";
require('./bootstrap');
const Koa = require('koa');
const bodyParser = require('koa-body');
const logger = require('koa-logger');
const router = require('./http/router');
const jwtService = require('./services/jwt-service');
const {User} = require('./models');

const PORT = process.env.PORT || 3001;
const app = new Koa();

app.use(logger()); // logger
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
            const payload = await jwtService.verify(authorization);
            console.log('payload: ',payload);

            ctx.user = await User.findOne({email: payload.email}, function (err, person) {
                if (err) return console.log(err);
            });
        }catch(e){
            console.log(e);
            ctx.throw(401, {message:'Unauthorized. Invalid Token'});
        }
    }

    await next();
}); // auth

app.use(require('koa-static')(__dirname + '/public'));
app.use(bodyParser());
app.use(router.middleware());
app.use(router.allowedMethods);

app.listen(PORT, ()=>{
    console.log('\nServer has started on port:'+PORT);
});