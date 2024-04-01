import Express from "express"
import { getUser,updateUserInfo,updateUserPicture } from "../controllers/user"
import parseImage from "../middlewares/multer"

const router = Express.Router()

router.route('/:id')
    .get(getUser)

router.route('/')
    .get(getUser)

router.route('/update/info/:id?')
    .patch(updateUserInfo)

router.route('/update/picture/:id?')
    .patch(parseImage.single('image'),updateUserPicture)

export default router