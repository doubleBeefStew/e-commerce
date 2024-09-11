import Express from "express"
import {sheepopayPayment,createPaypalPayment,capturePaypalPayment} from "../controllers/payment"

const router = Express.Router()

router.route('/sheepopay')
    .post(sheepopayPayment)
router.route('/paypal/create')
    .post(createPaypalPayment)
router.route('/paypal/capture')
    .post(capturePaypalPayment)

export default router