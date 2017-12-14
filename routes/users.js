var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users');

var users = [
  {
  	id: 1,
    name: "Oleksii Manachynskyi",
    email: "aom-95@live.com",
    phoneNumber: 380731343161,
    experts: [],
  }
];

/* GET users listing. */
router.get('/', usersController.all);
router.get('/:id', usersController.findById);

/* POST users listing. */
router.post('/', usersController.create);

/* PUT users listing. */
router.put('/:id', usersController.update);

/* DELETE users listing. */
router.delete('/:id', usersController.delete);

module.exports = router;
