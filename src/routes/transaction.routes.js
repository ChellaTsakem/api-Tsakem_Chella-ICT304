import express from 'express';
import { processTransaction, processVirement } from '../controllers/transaction.controller.js';

const router = express.Router();

router.post('/transaction', processTransaction);
router.post('/virement', processVirement);

export default router;