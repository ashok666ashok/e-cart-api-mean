import express from 'express';
import { getAllProducts, getProduct } from '../controller/productController.js';
import { userLogin, userRegister } from '../controller/userController.js';
import { addToWhishlist, getWhislist, removeItem } from '../controller/whishlistController.js';
import {addToCartController,cartTotalPriceController,decrementProductController,getCartController, incrementProductController, removeCartController} from '../controller/cartController.js'
import jwtMiddleware from '../middleware/jwtMiddleware.js';

const router=express.Router();

// get all products
router.get('/allproducts',getAllProducts);
router.post('/register',userRegister);
router.post('/login',userLogin);
router.get('/viewproduct/:id',getProduct)
router.post('/addwhishlist',jwtMiddleware,addToWhishlist)
router.get('/getwhishlist',jwtMiddleware,getWhislist)
router.delete('/removewishlist/:id',jwtMiddleware,removeItem)
router.post('/addtocart',jwtMiddleware,addToCartController)
router.get('/getcart',jwtMiddleware,getCartController)
router.delete('/removecart/:id',jwtMiddleware,removeCartController)
router.get('/incrementcartitem/:id',jwtMiddleware,incrementProductController)
router.get('/decrementcartitem/:id',jwtMiddleware,decrementProductController)
router.get('/carttotalprice',jwtMiddleware,cartTotalPriceController)


export default router;