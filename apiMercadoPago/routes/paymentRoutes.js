import express from 'express';
import { createPixPayment, handleWebhook } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create-payment', createPixPayment);
router.post('/webhook', handleWebhook);

export default router;
