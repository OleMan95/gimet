import User from '../models/user';
import Expert from '../models/expert';
import {Types} from 'mongoose';
import jwtService from '../services/jwt-service';
import pick from 'lodash/pick';

const ObjectId = Types.ObjectId;

class Users{
	//GET /users
	async find(req, res){
		const {authorization} = req.headers;
		try{
			const payload = await jwtService.verify(authorization);
			console.log('payload: ',payload);

			const {str, srchby} = req.query;
			if(str && srchby){
				const filter = {[srchby]: new RegExp(str, 'ig') };
				res.send(await User.find(filter).select({password:0, __v: 0}));
			}else{
				res.send(await User.find().select({password:0, __v: 0}));
			}

		}catch(err){
			res.status(403).send({ error: err});
		}
	}
	//POST /api/login
	async login(req, res, next){
		if(!req.cookies.aat || req.cookies.aat != 'true'){
			res.status(400).send({message:'Rejected'});
			return next();
		}

		const { email, password } = req.body;
		try{
			let lcCookie = req.cookies.lc ? parseInt(req.cookies.lc) : 0;

			if(lcCookie >= 3){
				res.cookie('lc', lcCookie+1, {maxAge: 10000, httpOnly: true}).status(400).send({message:'Please try again later.'});
				return next();
			}
			if(!email || !password){
				res.cookie('lc', lcCookie+1, {maxAge: 10000, httpOnly: true}).status(400).send({message:'Invalid data'});
				return next();
			}

			const user = await User.findOne({email});

			if(!user){
				res.cookie('lc', lcCookie+1, {maxAge: 10000, httpOnly: true}).status(400).send({message:'User not found'});
				return next();
			}
			if(!user.comparePasswords(password)){
				res.cookie('lc', lcCookie+1, {maxAge: 10000, httpOnly: true}).status(400).send({message:'Invalid data'});
				return next();
			}

			const token = await jwtService.genToken({
				_id: user._id,
				email: user.email
			});
			user.password = undefined;

			res.cookie('token', token, {expire : 86400000, httpOnly: true});
			res.cookie('lc', '0').send({token:token});

		}catch(err){
			console.log('err: ', err.message);
		}
		next();
	}
	//GET /user
	async findOne(req, res){
		try{
			const {authorization} = req.headers;
			const payload = await jwtService.verify(authorization);
			const id = req.query.id || ObjectId(payload._id);

			if(req.query.populate){
				res.send(await User.findById(id).select({password:0, __v: 0}).populate('experts'));
			}else{
				res.send(await User.findById(id).select({password:0, __v: 0}));
			}

		}catch(err){
			res.status(403).send({ error: err});
		}
	}
	// POST /signup
	async signup(req, res){
		try{
			const {_id} = await User.create(pick(req.body, User.createFields));
			const user = await User.findById({_id}).select({password:0, __v: 0});
			res.send({ data: user });
		}catch(err){
			res.status(500).send({ error: err});
		}
	}
	//PUT /users
	async update(req, res){
		const {authorization} = req.headers;
		console.log('req.query.id: ',req.query.id);

		try{
			const payload = await jwtService.verify(authorization);
			console.log('payload: ',payload);
			const id = req.query.id || ObjectId(payload._id);
			const data = req.body;

			res.send(await User.findByIdAndUpdate(id, data, {new:true}).select({password:0, __v: 0}));
		}catch(err){
			res.status(500).send({ error: err});
		}
	}
	//DELETE /users?id=id
	async deleteOne(req, res){
		const {authorization} = req.headers;
		try{
			const payload = await jwtService.verify(authorization);
			const {id} = req.query;

			const user = await User.findById(id);
			if(!user) res.status(204).send({error: 'User not found!'});

			const userExperts = user.experts;
			for(let i=0;i<userExperts.length;i++){
				await Expert.deleteOne({_id: ObjectId(userExperts[i])});
			}
			res.send(await User.deleteOne({_id: ObjectId(id)}));
		}catch(err){
			res.status(500).send({ error: err});
		}
	}
}

export default Users;