import Express from "express"
import { getUser,updateUser as updateUser } from "../controllers/user"
import { validateUserInfo } from "../middlewares/validations"
import parseImage from "../middlewares/multer"

const router = Express.Router()

router.route('/:id?')
    .get(getUser)

router.route('/update/:id?')
    .patch(parseImage.single('image'),validateUserInfo,updateUser)

export default router