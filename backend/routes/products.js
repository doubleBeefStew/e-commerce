import Express from "express"
import parseImage from "../middlewares/multer"
import { validateProductInfo } from "../middlewares/validations"
import isAuthenticated from "../middlewares/auth"
import {createProduct} from "../controllers/products"

const router = Express.Router()

// router.route('/:id')
//     .get(getProduct)

// router.route('/')
//     .get(getProduct)

//TODO: add upload image function for product
router.route('/create')
    .post(isAuthenticated,validateProductInfo,createProduct)

// router.route('/update/info/:id?')
//     .patch(parseImage.single('image'),updateProduct)

export default router