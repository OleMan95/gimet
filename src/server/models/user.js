const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-node');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.plugin(uniqueValidator);

const UserSchema = new Schema({
	name:{
		type:String,
		required:'Name is required'
	},
	email:{
		type:String,
		unique:'User with email "{VALUE}" already exist.',
		lowercase:true,
		required:'Email is required'
	},
	password:{
		type:String,
		required:'Password is required'
	},
	isConfirmed:{
		type:Boolean,
		default: false
	},
	isAdmin:{
		type:Boolean,
		default: false
	},
	experts:[{
		type: Schema.ObjectId,
		ref: 'Expert'
	}]
},{timestamps:true});

UserSchema.set('toJSON', {versionKey:false});

UserSchema.statics.createFields = ['name', 'email', 'password', 'experts'];

UserSchema.pre('save', function(next){
	if (!this.isModified('password')){
		return next();
	}

	const salt = bcrypt.genSaltSync(10);
	this.password = bcrypt.hashSync(this.password, salt);
	next();
});

UserSchema.methods.comparePasswords = function(password){
	return bcrypt.compareSync(password, this.password);
};

UserSchema.statics.findOneWithPublicFields = function(params, cb){
	return this.getUser(params, cb).select({password:0, __v: 0});
};


export default mongoose.model('User', UserSchema);