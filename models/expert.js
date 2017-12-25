"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = mongoose.Schema({
    name:String,
    description:String,
    questions:[],
    author:{ type: Schema.ObjectId, ref: 'User' }
});
schema.set('toJSON', {versionKey:false});

const Expert = mongoose.model('Expert', schema);

module.exports = Expert;