"use strict";
const {Expert} = require('./../../models');
const {User} = require('./../../models');
const ObjectId = require('mongoose').Types.ObjectId;

class ExpertController{
    //GET /experts
    async find(ctx, next){
        ctx.body = await Expert.find();
        ctx.status = 200;
        return next();
    }
    //GET /user/:id/experts
    async findUserExperts(ctx, next){
        const {id} = ctx.params;
        const expertList = [];
        const user = await User.findById(id);
        const userExperts = user.experts;
        
        for(let i=0;i<userExperts.length;i++){
            let expert = await Expert.findById(userExperts[i]);
            expertList.push(expert);
        }            

        ctx.body = expertList;
        ctx.status = 200;
        return next();
    }
    //GET /expert/:expertId?populate=<value> (true or nothing)
    async findById(ctx, next){
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
      const {id} = ctx.params;
      const data = ctx.request.body;
      
      ctx.status = 200;
      ctx.body = await User.findByIdAndUpdate(ctx.query.expertId, data, {new:true});
      return next();
    }
    //DELETE /expert/:id?expertId=<num>
    async delete(ctx, next){
        const {id} = ctx.params;
        const user = await User.findById(id);
        const userExperts = user.experts;
        
        for(let i=0;i<userExperts.length;i++){
            if(userExperts[i] == ctx.query.expertId){
                userExperts.splice(i, 1);
                await User.findByIdAndUpdate(id, {experts: userExperts}, {new:false});
                var {deletedCount} = await Expert.deleteOne({_id: ObjectId(ctx.query.expertId)});
            }
        }
        
        // var {deletedCount} = await Expert.deleteOne({_id: ObjectId(expertId)});
        if(deletedCount===1) ctx.status = 200;
        else ctx.status = 204;

        return next();
    }

}
module.exports = ExpertController;