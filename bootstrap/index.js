"use strict";
const mongoose = require('mongoose');
// const CONNECTION_URL = require('../config').mongodb.host;
const CONNECTION_URL = "mongodb://admin:Oleman9291@ds247077.mlab.com:47077/gimet_db";

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