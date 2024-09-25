import Express from "express"
import { validateRegister } from "../middlewares/validations.js"
import { register,activation,login,logout } from "../controllers/auth.js"

const router = Express.Router()

router.route('/register')
    .post(validateRegister,register)

router.route('/activation/:token')
.post(activation)

router.route('/login')
    .post(login)

router.route('/logout')
    .post(logout)

export default router