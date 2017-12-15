var db = require('../db');
var ObjectID = require('mongodb').ObjectID;

//данный файл работает только с БД "experts"
exports.all=function(cb){
    db.get().collection('experts').find().toArray(function(err, docs){
        cb(err, docs);
    });
}
exports.findById = function(id, cb){
    db.get().collection('experts').findOne({_id: ObjectID(id)}, function(err, doc){
        cb(err, doc);
    });
}
exports.create = function(expert, cb){
    db.get().collection('experts').insert(expert, function (err, result){
        cb(err, result);
    });
}
exports.delete = function(id, cb){
    db.get().collection('experts').deleteOne(
        {_id: ObjectID(id)},
        function(err, result){
            cb(err, result);
        }
    );
}  