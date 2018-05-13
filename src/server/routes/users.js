import express from "express";
import Users from "../controllers/users";

const router = express.Router();
const users = new Users();

router.get('/user', users.findOneById);
router.get('/user/:id', users.findOneById); //public
router.post('/login', users.login);
router.post('/signup', users.signup);
router.put('/user', users.update);
router.delete('/user', users.deleteOne);

export default router;

