"use strict";
const {User, Expert} = require('./../../models');
const ObjectId = require('mongoose').Types.ObjectId;
const pick = require('lodash/pick');
const jwtService = require('../../services/jwt-service');


//5a36cbdfcdaf0d4d7e34182b

class UserController{
    //GET /users
    async find(ctx, next){ // поле для админа
        if(!ctx.user){
            ctx.throw(403, {message:'Forbidden'});
            ctx.body = ctx.user;
            return next();
        }

        ctx.body = await User.find();

        ctx.status = 200;
        return next();
    }
    //GET /users/:id?populate=<value> (true or nothing)
    async findById(ctx, next){
        if(!ctx.user){
            ctx.throw(403, {message:'Forbidden'});
            ctx.body = ctx.user;
            return next();
        }

        const {id} = ctx.params;
        
        if(ctx.query.populate === 'true'){
            ctx.body = await User.findById(id).populate('experts');
        }else{
            ctx.body = await User.findById(id);
        }

        ctx.status = 200;
        return next();
    }
    // POST /auth/signup
    async signup(ctx){
        const { _id } = await User.create(pick(ctx.request.body, User.createFields));
        const user = await User.findOneWithPublicFields({_id});

        ctx.status = 200;
        ctx.body = { data: user };
    }
    // POST /auth/signin
    async signin(ctx){
        const { email, password } = ctx.request.body;

        if(!email || !password){
            ctx.throw(400, {message:'Invalid data'});
        }

        const user = await User.findOne({email});
        if(!user){
            ctx.throw(400, {message:'User not found'});
        }
        if(!user.comparePasswords(password)){
            ctx.throw(400, {message:'Invalid data'});
        }
        const token = await jwtService.genToken(email);
        ctx.status = 200;
        ctx.body = { data: token };
    }
    //PUT /users/:id
    async update(ctx, next){
        if(!ctx.user){
            ctx.throw(403, {message:'Forbidden'});
            ctx.body = ctx.user;
            return next();
        }

        const {id} = ctx.params;
        const data = ctx.request.body;
        ctx.status = 200;
        ctx.body = await User.findByIdAndUpdate(id, data, {new:true});
        return next();
    }
    //DELETE /users/:id
    async delete(ctx, next){
        if(!ctx.user){
            ctx.throw(403, {message:'Forbidden'});
            ctx.body = ctx.user;
            return next();
        }
        const {id} = ctx.params;
        
        const user = await User.findById(id);
        if(!user) {
            ctx.status = 204;
            return next();
        }
        const userExperts = user.experts;
        
        for(let i=0;i<userExperts.length;i++){
            await Expert.deleteOne({_id: ObjectId(userExperts[i])});
        }
        
        const {deletedCount} = await User.deleteOne({_id: ObjectId(id)});
        if(deletedCount===1) ctx.status = 200;
        else ctx.status = 204;

        return next();
    }

}
module.exports = UserController;