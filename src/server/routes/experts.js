import express from "express";
import Experts from "../controllers/experts";

const router = express.Router();
const experts = new Experts();

router.get('/experts', experts.find);
router.get('/expert/:id', experts.findById);
// router.post('/expert/:id/', experts.create);
// router.put('/expert/:id', experts.update);
// router.delete('/expert/:id', experts.delete);

export default router;