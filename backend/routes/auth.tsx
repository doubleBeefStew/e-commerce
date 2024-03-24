import Express from "express"
import { register,activation,login } from "../controllers/auth.tsx"

const router = Express.Router()

router.route('/register')
    .post(register)

router.route('/activation/:token')
.get(activation)

router.route('/login')
    .post(login)

export default router