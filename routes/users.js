var express = require('express');
var router = express.Router();

var users = [
  {
  	id: 1,
  	username: "oleman"
  }, {
  	id: 2,
  	username: "admin"
  }
];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(users);
});

module.exports = router;
