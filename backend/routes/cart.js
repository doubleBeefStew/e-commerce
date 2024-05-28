import { Router } from "express"
import isAuthenticated from '../middlewares/auth.js'
import {createCart,getCart,updateCart,deleteCart} from "../controllers/cart" 

const router = Router()

router.route('/:cartId?')
    .get(isAuthenticated,getCart) 
    
router.route('/create/:userId')
    .post(createCart)

router.route('/delete/:cartId')
    .delete(isAuthenticated,deleteCart)

router.route('/update/:cartId')
    .patch(isAuthenticated,updateCart)

export default router