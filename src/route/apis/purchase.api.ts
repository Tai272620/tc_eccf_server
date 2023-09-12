import express from "express";
const router = express.Router();
import token from "../../middlewares/token";

import purchaseController from "../../controllers/purchase.controller";
router.post('/customer-order', purchaseController.findUserReceipt);
router.patch('/:orderId', token.isAdmin, purchaseController.update);
router.post('/order-history', purchaseController.findGuestReceipt);
router.post('/', purchaseController.createGuestReceipt);
router.post('/customer', purchaseController.createUserReceipt);
router.get('/', token.isAdmin, purchaseController.findManyGuestReceipts);
router.get('/:orderId', purchaseController.findById);

export default router;