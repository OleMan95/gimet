"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.plugin(uniqueValidator);

const UserSchema = new Schema({
    name:{
        type:String,
        lowercase:true,
        // Указывает на то, что поле обязательно.
        // В строке указывается сообщение при ошибке.
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
    experts:[{
        type: Schema.ObjectId,
        ref: 'Expert' // Это поле имеет ссылку на таблицу экспертов
    }]
},{timestamps:true});

UserSchema.set('toJSON', {versionKey:false});

// createFields указывает какие поля создать.
UserSchema.statics.createFields = ['name', 'email', 'password', 'experts'];

// Шифрование пароля
UserSchema.pre('save', function(next){
    if (!this.isModified('password')){
        return next();
    }

    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});

// Сравнение паролей
UserSchema.methods.comparePasswords = function(password){
    return bcrypt.compareSync(password, this.password);
};

// Выдает "публичные" поля: без пароля и остальной лабуды
UserSchema.statics.findOneWithPublicFields = function(params, cb){
    return this.findOne(params, cb).select({password:0, __v: 0});
};


module.exports = mongoose.model('User', UserSchema);