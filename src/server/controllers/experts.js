import Expert from '../models/expert';
import User from '../models/user';
import {Types} from 'mongoose';
import jwtService from '../services/jwt-service';
const ObjectId = Types.ObjectId;

class Experts{
	//GET /experts
	async find(req, res){
		try{
			if(!req.cookies.aat || req.cookies.aat != 'true'){
				res.status(400).send({message:'Rejected'});
				return;
			}
			res.send(await Expert.find());
		}catch(err){
			res.status(500).send({message: err.message});
		}
	}
	//GET /expert/:id
	async findById(req, res){
		try{
			if(!req.cookies.aat || req.cookies.aat != 'true'){
				res.status(400).send({message:'Rejected'});
				return;
			}
			const {authorization} = req.headers;
			const payload = await jwtService.verify(authorization);
			const authorId = payload._id;

			const id = ObjectId(req.params.id);
			const expert = await Expert.findById(id).select({__v: 0});

			if(expert.author.toString().trim() != authorId.toString().trim()) throw new Error('Forbidden');

			res.send(expert);
		}catch(err){
			res.status(403).send({message: err.message});
		}
	}
	//POST /user/:id/
	async create(req, res){
		try{
			if(!req.cookies.aat || req.cookies.aat != 'true'){
				res.status(400).send({message:'Rejected'});
				return;
			}
			const {id} = req.params;
			const {name, description, questions, contributors} = req.body;

			const data = {
				name: req.body.name,
				description: req.body.description,
				questions: req.body.questions,
				author:id,
			};
			let expert = new Expert(data);
			expert = await expert.save();

			const user = await User.findById(id);
			const userExperts = user.experts;
			userExperts.push(ObjectId(expert._id));
			await User.findByIdAndUpdate(id, {experts: userExperts}, {new:false});

			res.send(expert);
		}catch (err){
			res.status(403).send({message: err.message});
		}

	}
	//PUT /expert/:id?expertId=<num>
	// async update(ctx, next){
	// 	if(!ctx.user){
	// 		ctx.throw(403, {message:'Forbidden'});
	// 		ctx.body = ctx.user;
	// 		return next();
	// 	}
	// 	const {id} = ctx.params;
	// 	const data = ctx.request.body;
	//
	// 	ctx.status = 200;
	// 	ctx.body = await User.findByIdAndUpdate(ctx.query.expertId, data, {new:true});
	// 	return next();
	// }
	//DELETE /expert/:id?expertId=<num>
	// async delete(ctx, next){
	// 	const {authorization} = ctx.headers;
	// 	const payload = await jwtService.verify(authorization);
	// 	const {id} = ctx.params;
	// 	const user = await User.findById({_id: ObjectId(payload._id)});
	// 	const userExperts = user.experts;
	//
	// 	let index;
	// 	for(let i=0;i<userExperts.length;i++){
	// 		if(userExperts[i] == id){
	// 			// удаление эксперта в общем списке
	// 			let {deletedCount} = await Expert.deleteOne({_id: ObjectId(id)});
	// 			userExperts[i] = deletedCount === 1 ? undefined : userExperts[i];
	// 			index = deletedCount === 1 ? i : null;
	// 		}
	// 	}
	//
	// 	if(index){
	// 		// удаление эксперта у пользователя
	// 		await User.findByIdAndUpdate(payload._id, {experts: userExperts});
	// 		ctx.status = 200;
	// 	}
	// 	else ctx.status = 204;
	// }
}
export default Experts;