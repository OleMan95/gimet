"use strict";
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    experts:[],
});
schema.set('toJSON', {versionKey:false});

const User = mongoose.model('User', schema);

module.exports = User;