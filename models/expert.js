"use strict";
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name:String,
    description:String,
    questions:[],
    author:String,
});
schema.set('toJSON', {versionKey:false});

const Expert = mongoose.model('Expert', schema);

module.exports = Expert;