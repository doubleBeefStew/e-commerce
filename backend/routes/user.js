import Express from "express"
import { getUser,updateUserInfo } from "../controllers/user"
import { validateUserInfo } from "../middlewares/validations"
import parseImage from "../middlewares/multer"

const router = Express.Router()

router.route('/:id?')
    .get(getUser)

router.route('/update/info/:id?')
    .patch(parseImage.single('image'),validateUserInfo,updateUserInfo)

export default router