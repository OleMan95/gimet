import express from "express";
import Experts from "../controllers/experts";

const router = express.Router();
const experts = new Experts();

router.get('/experts', experts.find);
router.get('/expert/:id', experts.findById);
router.post('/experts', experts.createOrUpdate);
router.put('/expert/:id', experts.createOrUpdate);
router.put('/expert/:id/count', experts.newConsultationCount);
// router.delete('/expert/:id', experts.delete);

export default router;