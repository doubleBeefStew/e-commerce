import Express from "express"
import {DealDashpayPayment,createPaypalPayment,capturePaypalPayment} from "../controllers/payment.js"

const router = Express.Router()

router.route('/DealDashpay')
    .post(DealDashpayPayment)
    
router.route('/paypal/create')
    .post(createPaypalPayment)
router.route('/paypal/capture')
    .post(capturePaypalPayment)

export default router