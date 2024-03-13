import Express from "express"
import { register,verifyToken,login } from "../controllers/auth.js"

const router = Express.Router()

router.route('/register')
    .get(register)

router.route('/verify/:token')
.get(verifyToken)

router.route('/login')
    .post(login)

export default router