import Express from "express"
import { getUser,updateUser } from "../controllers/user"
import parseImage from "../middlewares/multer"

const router = Express.Router()

router.route('/:id')
    .get(getUser)

router.route('/')
    .get(getUser)

router.route('/update/:id')
    .patch(parseImage.single('image'),updateUser)

export default router