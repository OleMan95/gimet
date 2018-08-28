import express from "express";
import Users from "../controllers/users";
import MailController from '../controllers/mail-controller';

const router = express.Router();
const users = new Users();
const mailCtrl = new MailController();

router.get('/user', users.findOneById);
router.get('/user/:id', users.findOneById);
router.post('/login', users.login);
router.put('/user', users.update);
router.post('/api/mail', mailCtrl.sendMail);
router.post('/signup', users.signup);
router.get('/verify/:token', users.verifyEmail);

export default router;