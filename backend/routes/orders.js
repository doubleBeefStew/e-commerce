import express from "express"
import { getOrder, createOrder, updateOrder, deleteOrder } from "../controllers/orders"
import { validateCreateOrder, validateUpdateOrder } from "../middlewares/validations"

const router = express.Router()

router.route("/:orderId?")
    .get(getOrder)

router.route("/create")
    .post(validateCreateOrder,createOrder)

router.route("/update/:id")
    .patch(validateUpdateOrder,updateOrder)

router.route("/delete/:id")
    .delete(deleteOrder)

export default router
