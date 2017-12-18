"use strict";
const {User} = require('./../../models');
const {Expert} = require('./../../models');
const ObjectId = require('mongoose').Types.ObjectId;
//5a36cbdfcdaf0d4d7e34182b

class UserController{
    //GET /users
    async find(ctx, next){
        ctx.body = await User.find();

        ctx.status = 200;
        return next();
    }
    //GET /users/:id?populate=<value> (true or nothing)
    async findById(ctx, next){
        const {id} = ctx.params;
        
        if(ctx.query.populate === 'true'){
            ctx.body = await User.findById(id).populate('experts');
        }else{
            ctx.body = await User.findById(id);
        }

        ctx.status = 200;
        return next();
    }
    //POST /users
    async create(ctx, next){
        const data = {
            name: ctx.request.body.name,
            email: ctx.request.body.email,
            password: ctx.request.body.password,
            experts: [],
        };
        const user = new User(data);
        
        ctx.status = 200;
        ctx.body = await user.save();
        return next();
    }
    //PUT /users/:id
    async update(ctx, next){
        const {id} = ctx.params;
        const data = ctx.request.body;
        ctx.status = 200;
        ctx.body = await User.findByIdAndUpdate(id, data, {new:true});
        return next();
    }
    //DELETE /users/:id
    async delete(ctx, next){
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