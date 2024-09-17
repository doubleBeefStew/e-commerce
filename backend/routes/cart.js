import { Router } from "express"
import isAuthenticated from '../middlewares/auth.js'
import {createCart,getCart,updateCart,deleteCart} from "../controllers/cart.js" 

const router = Router()

router.route('/:all?')
    .get(isAuthenticated,getCart) 
    
router.route('/create/:userId')
    .post(createCart)

router.route('/delete/:cartId')
    .delete(isAuthenticated,deleteCart)

router.route('/update')
    .patch(isAuthenticated,updateCart)

export default router