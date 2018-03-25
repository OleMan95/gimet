"use strict";
const Router = require('koa-router');
const router = new Router({prefix: '/v1'});
const {UserController, ExpertController} = require('./controllers');

const userController = new UserController();
const expertController = new ExpertController();

router.get('/users', userController.find);
router.get('/user', userController.findById);
router.post('/auth/signup', userController.signup);
router.post('/auth/signin', userController.signin);
router.put('/user/:id', userController.update);
router.delete('/user/:id', userController.delete);

router.get('/experts', expertController.find);
router.get('/user/:id/experts', expertController.findUserExperts);
router.get('/expert/:expertId', expertController.findById);
router.post('/user/:id/', expertController.create);
router.put('/expert/:id', expertController.update); // /../../..?expertId=<num>
router.delete('/expert/:id', expertController.delete); // /../../..?expertId=<num>

module.exports = router;
