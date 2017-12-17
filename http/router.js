"use strict";
const Router = require('koa-router');
const router = new Router();
const {UserController, ExpertController} = require('./controllers');

const userController = new UserController();
const expertController = new ExpertController();

router.get('/v1/users', userController.find);
router.get('/v1/user/:id', userController.findById);
router.post('/v1/user', userController.create);
router.put('/v1/user/:id', userController.update);
router.delete('/v1/user/:id', userController.delete);

router.get('/v1/experts', expertController.find);
router.get('/v1/user/:id/experts', expertController.findUserExperts);
router.get('/v1/expert/:expertId', expertController.findById);
router.post('/v1/user/:id/', expertController.create);
router.put('/v1/user/:id/:expertId', expertController.update);
router.delete('/v1/user/:id/:expertId', expertController.delete);

module.exports = router;