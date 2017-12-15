var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users');

var users = [
  {
  	_id: 1,
    name: "Oleksii Manachynskyi",
    email: "aom-95@live.com",
    experts: [],
  }
];

/* GET users listing. */
router.get('/', usersController.all);
router.get('/:id', usersController.findById);

/* POST users listing. */
router.post('/', usersController.create);
router.post('/:id', usersController.pushExpert);

/* PUT users listing. */
router.put('/:id', usersController.update);

/* DELETE users listing. */
router.delete('/:id', usersController.delete);

module.exports = router;


var experts = [
  {
  	_id: 1,
    name: "PC expert",
    description: "aom-95@live.com",
    owner:"_id", //user id
    questions: [],
  }
];