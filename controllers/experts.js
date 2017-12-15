var UsersModel = require('../models/users');
var ExpertsModel = require('../models/experts');
var ObjectID = require('mongodb').ObjectID;
//данный файл работает только с запросами и ответами. 

exports.all = function(req, res){
    ExpertsModel.all(function(err, docs){
        if(err){
            res.sendStatus(500);
            return console.log('get /api/experts error: ',err);
        }
        res.send(docs);
    });
}
exports.findById = function(req, res){
    ExpertsModel.findById(req.params.id, function(err, doc){
        if(err){
            res.sendStatus(500);
            return console.log('get /api/experts/:id error: ',err);
        }
        res.send(doc);
    });
}
exports.delete = function(req, res){

    ExpertsModel.delete(req.params.id, function(err, doc){
        if(err){
            res.sendStatus(500);
            return console.log('delete /api/experts/:id error: ',err);
        }
        
        res.sendStatus(200);
    });
    //TODO update DB user.experts
}