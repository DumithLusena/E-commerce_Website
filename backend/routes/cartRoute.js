import express from 'express';
import { addToCart, updateCart, getUserCart } from '../controllers/cartController.js';
import authUser from '../middleware/auth.js';


const carRouter = express.Router();

carRouter.post('/add', authUser, addToCart);
carRouter.put('/update', authUser, updateCart);
carRouter.get('/get', authUser, getUserCart);

export default carRouter;
