"use strict";
const mongoose = require('mongoose');
const connectionUrl = 'mongodb://localhost:27017/gimet';

mongoose.Promise = Promise;

mongoose.connect(connectionUrl, {
    useMongoClient:true
})
.then(()=>console.log('MongoDB has started...'))
.catch(err => {
    console.error(err.message);
    process.exit(1);
});