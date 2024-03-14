import Express from "express"
import { register,verifyRegistration,login } from "../controllers/auth.js"

const router = Express.Router()

router.route('/register')
    .get(register)

router.route('/verify/:token')
.get(verifyRegistration)

router.route('/login')
    .post(login)

export default router