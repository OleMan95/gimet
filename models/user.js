"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    experts:[{ type: Schema.ObjectId, ref: 'Expert' }]
});
schema.set('toJSON', {versionKey:false});

const User = mongoose.model('User', schema);

module.exports = User;