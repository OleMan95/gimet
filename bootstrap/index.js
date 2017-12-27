"use strict";
const mongoose = require('mongoose');
const CONNECTION_URL = require('../config').mongodb.host;

// const connectionUrl = 'mongodb://localhost:27017/gimet';
// const connectionUrl = 'mongodb://mongo/gimet';

mongoose.Promise = Promise;

mongoose.connect(CONNECTION_URL, {
    useMongoClient:true
})
.then(()=>console.log('MongoDB has started...'))
.catch(err => {
    console.error(err.message);
    process.exit(1);
});