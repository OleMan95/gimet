import User from '../models/user';
import {Types} from 'mongoose';
import jwtService from '../services/jwt-service';
import pick from 'lodash/pick';
import sgMail from '@sendgrid/mail';

const ObjectId = Types.ObjectId;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

			const user = await User.findOne({email}).populate('experts');

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
			res.cookie('lc', '0').send({
				token,
				user
			});

		}catch(err){
			console.log('err: ', err.message);
		}
		next();
	}
	//GET /api/user/:id
	async findOneById(req, res){
		try{
			if(!req.cookies.aat || req.cookies.aat != 'true'){
				res.status(400).send({message:'Rejected'});
				return;
			}
			const {id} = req.params;
			let user;

			try{
				if(req.headers.authorization != 'undefined'){
					let {_id} = await jwtService.verify(req.headers.authorization);

					if(req.query.populate){
						user = await User.findById(_id).select({password:0, __v: 0}).populate('experts');
					}else{
						user = await User.findById(_id).select({password:0, __v: 0});
					}

					res.send({
						isAuthorized: true,
						data: user,
					});
					return;
				}
			}catch(err){
				res.redirect('/login');
				return;
			}

			if(req.query.populate){
				user = await User.findById(id).select({password:0, __v: 0}).populate('experts');
			}else{
				user = await User.findById(id).select({password:0, __v: 0});
			}

			res.send({
				isAuthorized: false,
				data: user,
			});
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
			await User.create(pick(req.body, User.createFields), async (err, data) => {
				if (err) {
					res.status(500).send({
						error: {
							message: err.message,
							info: err
						}
					});
					return;
				}

				const token = await jwtService.genToken({_id: data._id, email: data.email});

				const link = process.env.NODE_ENV == 'development' ? `https://gimet.herokuapp.com/api/verify/${token}` : `http://gimethub.com/api/verify/${token}`;

				await sgMail.send({
					to: data.email,
					from: 'noreply@gimethub.com',
					subject: 'GIMETHUB email verification',
					html: `Link: <a href=${link}>${link}</a>`
				}, (err, responce)=>{
					if(err) {
						res.status(500).send({
							error: {
								message: 'Email verification error',
								info: 'Unable to send email'
							}
						});
						return;
					}

					res.send({
						data: {
							message: 'Please, check your email for confirmation link.',
							info: responce
						}
					});
				});
			});
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
	//GET /api/verify/:token
	async verifyEmail(req, res){
		try{
			const {token} = req.params;

			let payload = await jwtService.verify(token);

			User.findById(payload._id, (err, user)=>{
				if(err) {
					res.status(500).send({
						error: {
							message: 'User confirmation error',
							info: err
						}
					});
					return;
				}

				user.isConfirmed = true;
				user.save(function (err, updatedUser) {
					if(err) {
						res.status(500).send({
							error: {
								message: 'User confirmation error',
								info: err
							}
						});
						return;
					}
					res.redirect('/login');
				});
			});
		}catch (err){
			console.log(err)
		}

	}
}

export default Users;