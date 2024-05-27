import { Router } from "express"
import {createCart,getCart,updateCart,deleteCart} from "../controllers/cart" 

const router = Router()

router.route('/:cartId?')
    .get(getCart) 
    
router.route('/create/:userId')
    .post(createCart)

router.route('/delete/:cartId')
    .delete(deleteCart)

router.route('/update/:cartId')
    .patch(updateCart)

export default router