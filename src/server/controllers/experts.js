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

      let options = {sort: {consultationCount: -1}};
      if(req.query.sort == 'false')
        options = {};

			let search = {published: true};
			if(req.query.search){
				search.name = new RegExp(decodeURI(req.query.search), 'ig');
			}

			if(req.query.published == 'false'){
				if(req.query.search){
					search = {
						name: new RegExp(decodeURI(req.query.search), 'ig')
					}
				}else{
					search = {};
				}
			}

			const experts = Expert.find(search, {questions: 0, contributors: 0, createdAt: 0}, options);

			experts.exec(async (err, experts) => {
				if (err) {
					res.status(500).send({error: {message: err.message, info: err}});
					return;
				}

				res.send({
					data: {
						experts,
						count: 3
						// count: await Expert.count(search, null, {
						// 	skip: options.skip
						// })
					}
				});
			});

		}catch(err){
			res.status(500).send({error:{message: err.message}});
		}
	}
	//GET /expert/:id
	async findById(req, res){
		try{
			if(!req.cookies.aat || req.cookies.aat != 'true'){
				res.status(400).send({message:'Rejected'});
				return;
			}

			await Expert.findOne({_id: ObjectId(req.params.id)}, function (err, doc){
				if(err) res.status(500).send(err);
				res.send(doc);
			});
		}catch(err){
			res.status(500).send({message: err.message});
		}
	}
	//PUT /expert/:id/count
	async newConsultationCount(req, res){
		try{
			if(!req.cookies.aat || req.cookies.aat != 'true'){
				res.status(400).send({message:'Rejected'});
				return;
			}
			let authorId = '';

			if(req.headers.authorization != 'undefined'){
				const payload = await jwtService.verify(req.headers.authorization);
				authorId = payload._id;
			}

			const id = ObjectId(req.params.id);
			await Expert.findById(id, (err, expert)=>{
				if (err) {
					console.log(err);
					return;
				}

				if(expert.author.toString() == authorId.toString())
					res.send({data:{consultationCount: expert.consultationCount}});
				else{
					expert.consultationCount = ++expert.consultationCount || 1;

					expert.save(function (err, expert) {
						if (err) return console.log(err);
						res.send({data:{consultationCount: expert.consultationCount}});
					});
				}


			});
		}catch(err){
			res.status(403).send({error:{message: err.message}});
		}
	}
	//POST or PUT /experts or PUT /expert/:id
	async createOrUpdate(req, res){
		try{
			if(!req.cookies.aat || req.cookies.aat != 'true'){
				res.status(400).send({message:'Rejected'});
				return;
			}
			let payload;
			let user;
			let expert = {};

			try{
				payload = await jwtService.verify(req.headers.authorization);
				user = await User.findById(payload._id);
			}catch (err){
				res.redirect('/login');
			}

			const {id} = req.params;
			const data = req.body;

			if(!data.name ||
					!data.description ||
					!data.questions ||
					!data.consultationCount ||
					!data.published ||
					!data.contributors){
				new Error('Wrong data');
			}

			if(id){
				if(!data.author || data.author != user._id){
					res.status(403).send({error:{message: 'Rejected'}});
					return;
				}

				Expert.findByIdAndUpdate(id, { $set: data}, { new: true }, function (err, expert) {
					if (err){
						res.status(500).send({error:{message: err.message}});
						return;
					}
					res.send(expert);
				});
			}else{
				data.author = user._id;
				expert = new Expert(data);
				expert = await expert.save();
				user.experts.push(ObjectId(expert._id));

				User.findByIdAndUpdate({_id: payload._id}, user, { new: true }, function (err, user) {
					if (err){
						res.status(500).send({error:{message: err.message}});
						return;
					}

					res.send(expert);
				});
			}

		}catch (err){
			console.log(err);
			res.status(500).send({error:{message: err.message}});
		}

	}
	// DELETE /expert/:id?expertId=<num>
	async delete(req, res){
		try{
			if(!req.cookies.aat || req.cookies.aat != 'true'){
				res.status(400).send({error:{message:'Rejected'}});
				return;
			}

			const {id} = req.params;
			let payload,
				expert = await Expert.findById(id),
				user;

			if(!expert){
				res.status(500).send({error:{message: "Oops! Can\'t find an expert"}});
				return;
			}

			try{
				payload = await jwtService.verify(req.headers.authorization);
				user = await User.findById(payload._id);
			}catch (err){
				res.redirect('/login');
				return;
			}

			if(expert.author == payload._id){
				let data = await Expert.deleteOne({_id: ObjectId(id)});
				const userExperts = user.experts.filter(item=>item._id != id);

				if(data.ok === 1){
					await User.findByIdAndUpdate(payload._id, {experts: userExperts}, {new: true})
						.populate('experts')
						.exec((err,  user)=>{
							if (err){
								res.status(500).send({error:{message: err.message}});
								return;
							}

							res.send({
								data:{
									experts: user.experts,
									message: 'Expert has deleted successfully'
								}
							});
						});
				}else{
					res.status(500).send({error:{message: "Oops! An error occurred while deleting the expert"}});
				}
			}else{
				res.status(403).send({error:{message: 'Unfortunately, you are not the author of this expert'}});
			}
		}catch (err){
			console.log(err);
			res.status(500).send({error:{message: err.message}});
		}
	}
}
export default Experts;