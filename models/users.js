var db = require('../db');
var ObjectID = require('mongodb').ObjectID;

//данный файл работает только с БД "users"

exports.all=function(cb){
    db.get().collection('users').find().toArray(function(err, docs){
        cb(err, docs);
      });
}
exports.findById = function(id, cb){
    db.get().collection('users').findOne({_id: ObjectID(id)}, function(err, doc){
        cb(err, doc);
    });
}
exports.create = function(user, cb){
    db.get().collection('users').insert(user, function (err, result){
        cb(err, result);
    });
}
exports.update = function(id, user, cb){
    db.get().collection('users').updateOne(
        {_id: ObjectID(id)},
        user,
        function(err, result){
            cb(err, result);
        }
    );
}
exports.delete = function(id, cb){
    db.get().collection('users').deleteOne(
        {_id: ObjectID(id)},
        function(err, result){
            cb(err, result);
        }
    );
}    