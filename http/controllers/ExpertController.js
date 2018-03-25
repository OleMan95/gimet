"use strict";
const {Expert} = require('./../../models');
const {User} = require('./../../models');
const ObjectId = require('mongoose').Types.ObjectId;
const jwtService = require('../../services/jwt-service');

class ExpertController{
    //GET /experts
    async find(ctx, next){
        // if(!ctx.user){
        //     ctx.throw(403, {message:'Forbidden'});
        //     ctx.body = ctx.user;
        //     return next();
        // }
        ctx.body = await Expert.find();
        ctx.status = 200;
        return next();
    }
    //GET /user/:id/experts
    async findUserExperts(ctx, next){
        if(!ctx.user){
            ctx.throw(403, {message:'Forbidden'});
            return next();
        }

        const {id} = ctx.params;
        console.log('id: ', id);

        const experts = await Expert.find({'author': ObjectId(id)});
        console.log('experts: ', experts);

        ctx.body = experts;
        ctx.status = 200;
    }
    //GET /expert/:expertId?populate=<value> (true or nothing)
    async findById(ctx, next){
        if(!ctx.user){
            ctx.throw(403, {message:'Forbidden'});
            ctx.body = ctx.user;
            return next();
        }
        const {id, expertId} = ctx.params;

        if(ctx.query.populate === 'true'){
            ctx.body = await Expert.findById(expertId).populate('author');
        }else{
            ctx.body = await Expert.findById(expertId);
        }

        ctx.status = 200;
        return next();
    }
    //POST /user/:id/
    async create(ctx, next){
        if(!ctx.user){
            ctx.throw(403, {message:'Forbidden'});
            ctx.body = ctx.user;
            return next();
        }
        const {id} = ctx.params;

        const data = {
            name: ctx.request.body.name,
            description: ctx.request.body.description,
            questions: ctx.request.body.questions,
            author:id,
        };
        const expert = new Expert(data);
        const expertFromDB = await expert.save();

        const user = await User.findById(id);
        const userExperts = user.experts;
        userExperts.push(ObjectId(expertFromDB._id));

        await User.findByIdAndUpdate(id, {experts: userExperts}, {new:false});

        ctx.status = 200;
        ctx.body = expertFromDB;
        return next();
    }
    //PUT /expert/:id?expertId=<num>
    async update(ctx, next){
        if(!ctx.user){
            ctx.throw(403, {message:'Forbidden'});
            ctx.body = ctx.user;
            return next();
        }
        const {id} = ctx.params;
        const data = ctx.request.body;
      
        ctx.status = 200;
        ctx.body = await User.findByIdAndUpdate(ctx.query.expertId, data, {new:true});
        return next();
    }
    //DELETE /expert/:id?expertId=<num>
    async delete(ctx, next){
        const {authorization} = ctx.headers;
        const payload = await jwtService.verify(authorization);
        const {id} = ctx.params;
        const user = await User.findById({_id: ObjectId(payload._id)});
        const userExperts = user.experts;

        let index;
        for(let i=0;i<userExperts.length;i++){
            if(userExperts[i] == id){
                // удаление эксперта в общем списке
                let {deletedCount} = await Expert.deleteOne({_id: ObjectId(id)});
                userExperts[i] = deletedCount === 1 ? undefined : userExperts[i];
                index = deletedCount === 1 ? i : null;
            }
        }

        if(index){
            // удаление эксперта у пользователя
            await User.findByIdAndUpdate(payload._id, {experts: userExperts});
            ctx.status = 200;
        }
        else ctx.status = 204;
    }
}
module.exports = ExpertController;