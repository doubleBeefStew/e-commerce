import Express from "express"
import {payment} from "../controllers/payment"

const router = Express.Router()

router.route('/')
    .post(payment)

export default router