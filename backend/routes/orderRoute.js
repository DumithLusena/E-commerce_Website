import express from 'express';
import { placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, verifyStripe } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// Admin Features
orderRouter.get('/list', adminAuth, allOrders);
orderRouter.patch('/update-status', adminAuth, updateStatus);

// Payment Features
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);

// User Features
orderRouter.get('/userOrders', authUser, userOrders);

// Verify Payment
orderRouter.post('/verify-stripe', authUser, verifyStripe);

export default orderRouter;