var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./db');

var users = require('./routes/users');
var experts = require('./routes/experts');

//"proxy": "http://localhost:3001"
//sudo service mongod start
//PORT=3001 node bin/www

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', users);
app.use('/api/experts', experts);

app.get('*', function(req, res){
  res.send('Sorry, this is an invalid URL.');
});


db.connect('mongodb://localhost:27017/api', function (err){
  if(err){
    return console.log('MongoClient connection error: ',err);
  }
  console.log('MongoClient connected.');  
});

module.exports = app;
