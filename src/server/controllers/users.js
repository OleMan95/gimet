import User from '../models/user';
import {Types} from 'mongoose';
import jwtService from '../services/jwt-service';
import pick from 'lodash/pick';

const ObjectId = Types.ObjectId;

class Users{
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

			res.cookie('at', token, {maxAge: 86400000});
			res.cookie('lc', '0').send({token:token});

		}catch(err){
			console.log('err: ', err.message);
		}
		next();
	}
	//GET /api/user/:id PUBLIC
	async findOneById(req, res){
		try{
			if(!req.cookies.aat || req.cookies.aat != 'true'){
				res.status(400).send({message:'Rejected'});
				return;
			}

			const {authorization} = req.headers;
			const paramsId = req.params.id;
			let user;

			let id = '';
			if(authorization.toString() != 'undefined') {
				const payload = await jwtService.verify(authorization);
				id = payload._id;
			}

			if(paramsId){
				if(id.toString().trim() != paramsId.toString().trim()){
					id = paramsId;
					if(req.query.populate){
						user = await User.findById(id).select({password:0, __v: 0}).populate('experts');
					}else{
						user = await User.findById(id).select({password:0, __v: 0});
					}
					res.status(401).send(user);
					return;
				}
			}


			if(req.query.populate){
				user = await User.findById(id).select({password:0, __v: 0}).populate('experts');
			}else{
				user = await User.findById(id).select({password:0, __v: 0});
			}

			res.send(user);
		}catch(err){
			res.status(500).send({message: err.message});
		}
	}
	// POST /signup
	async signup(req, res){
		try{
			if(!req.cookies.aat || req.cookies.aat != 'true'){
				res.status(400).send({message:'Rejected'});
				return;
			}
			const {_id} = await User.create(pick(req.body, User.createFields));
			const user = await User.findById({_id}).select({password:0, __v: 0});
			res.status(200).send(user);
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
}

export default Users;