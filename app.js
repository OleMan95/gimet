var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var db = require('./db');
// "proxy": "http://localhost:3001"
//sudo service mongod start
//PORT=3001 node bin/www

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var users = [
  {
  	id: 1,
    name: "oleman",
    fullName: "Oleksii Manachynskyi",
    phoneNumber: 380731343161,
    experts: [],
  }, {
  	id: 2,
    name: "admin",
  }
];

app.get('/api', function(req, res){
  res.send('Hello, GIMET!');
});
app.get('/api/users', function(req, res){
  db.get().collection('users').find().toArray(function(err, docs){
    if(err){
      res.sendStatus(500);
      return console.log('get /api/users error: ',err);
    }
    res.send(docs);
  });
});
app.get('/api/users/:id', function(req, res){
  db.get().collection('users').findOne({_id: ObjectID(req.params.id)}, function(err, docs){
    if(err){
      res.sendStatus(500);
      return console.log('get /api/users/:id error: ',err);
    }
    res.send(doc);
  });
});
app.post('/api/users', function(req, res){
  var user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };
  db.get().collection('users').insert(user, function (err, result){
    if(err){
      res.sendStatus(500);
      return console.log(err);
    }
    res.send(user);
  });

});
app.put('/api/users/:id', function(req, res){
  db.get().collection('users').updateOne(
    {_id: ObjectID(req.params.id)},
    {name: req.body.name},
    function(err, result){
      if(err){
        res.sendStatus(500);
        return console.log('put /api/users/:id error: ',err);
      }
      res.sendStatus(200);
    });
});
app.delete('/api/users/:id', function(req, res){
  db.get().collection('users').deleteOne(
    {_id: ObjectID(req.params.id)},
    function(err, result){
      if(err){
        res.sendStatus(500);
        return console.log('delete /api/users/:id error: ',err);
      }
      res.sendStatus(200);
    });
});

db.connect('mongodb://localhost:27017/api', function (err){
  if(err){
    return console.log('MongoClient connection error: ',err);
  }
  console.log('MongoClient connected.');  
});

module.exports = app;
