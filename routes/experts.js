var express = require('express');
var router = express.Router();
var expertsController = require('../controllers/experts');



/* GET experts listing. */
router.get('/', expertsController.all);  //получение всех экспертов, которые есть в GIMET
router.get('/:id', expertsController.findById);

/* POST experts listing. */

/* PUT experts listing. */
// router.put('/:id', expertsController.update);

/* DELETE experts listing. */
router.delete('/:id', expertsController.delete);

module.exports = router;


// var experts = [
//   {
//   	_id: 1,
//     name: "PC expert",
//     description: "aom-95@live.com",
//     owner:"_id", //user id
//     questions: [],
//   }
// ];
// var users = [
//   {
//   	_id: 1,
//     name: "Oleksii Manachynskyi",
//     email: "aom-95@live.com",
//     experts: [],
//   }
// ];