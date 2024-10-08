import express from "express"
import { getOrder, createOrder, updateOrder, deleteOrder, cancelOrder } from "../controllers/orders.js"
import { validateCreateOrder, validateUpdateOrder } from "../middlewares/validations.js"

const router = express.Router()

router.route("/:orderId?")
    .get(getOrder)

router.route("/create")
    .post(validateCreateOrder,createOrder)

router.route("/update/:id")
    .patch(validateUpdateOrder,updateOrder)

router.route("/cancel/:id")
    .post(cancelOrder)

router.route("/delete/:id")
    .delete(deleteOrder)

export default router
