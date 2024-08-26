import express from "express"
import { getOrder, createOrder, updateOrder, deleteOrder } from "../controllers/orders"

const router = express.Router()

router.route("/:id?")
    .get(getOrder)

router.route("/create")
    .post(createOrder)

router.route("/update/:id")
    .patch(updateOrder)

router.route("/delete/:id")
    .delete(deleteOrder)

export default router
