import Express from "express"
import { getUser } from "../controllers/user"

const router = Express.Router()

router.route('/:id')
    .get(getUser)

router.route('/')
    .get(getUser)

export default router