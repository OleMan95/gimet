var UsersModel = require('../models/users');
//данный файл работает только с запросами и ответами. 

exports.all = function(req, res){
    UsersModel.all(function(err, docs){
        if(err){
            res.sendStatus(500);
            return console.log('get /api/users error: ',err);
        }
        res.send(docs);
    });
}
exports.findById = function(req, res){
    UsersModel.findById(req.params.id, function(err, doc){
        if(err){
            res.sendStatus(500);
            return console.log('get /api/users/:id error: ',err);
        }
        res.send(doc);
    });
}
exports.create = function(req, res){
    var user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    UsersModel.create(user, function(err, doc){
        if(err){
            res.sendStatus(500);
            return console.log(err);
        }
        res.send(user);
    });        
}
exports.update = function(req, res){
    var user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    UsersModel.update(req.params.id, user, function(err, doc){
        if(err){
            res.sendStatus(500);
            return console.log('put /api/users/:id error: ',err);
        }
        res.sendStatus(200);
    });        
}
exports.delete = function(req, res){
    UsersModel.delete(req.params.id, function(err, doc){
        if(err){
            res.sendStatus(500);
            return console.log('delete /api/users/:id error: ',err);
        }
        res.sendStatus(200);
    });
}