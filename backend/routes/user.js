import Express from "express"
import { getUser,updateUser } from "../controllers/user"
import uploadProfile from "../middlewares/uploadProfile"

const router = Express.Router()

router.route('/:id')
    .get(getUser)

router.route('/')
    .get(getUser)

router.route('/update/:id')
    .patch(uploadProfile.single('image'),updateUser)

export default router