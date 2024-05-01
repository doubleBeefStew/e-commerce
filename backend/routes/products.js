import Express from "express"
import parseImage from "../middlewares/multer"
import { validateProductInfo } from "../middlewares/validations"
import isAuthenticated from "../middlewares/auth"
import {getProduct,createProduct,updateProduct,deleteProduct} from "../controllers/products"

const router = Express.Router()

router.route('/:id?')
    .get(getProduct)

router.route('/create')
    .post(isAuthenticated,parseImage.array('images',5),validateProductInfo,createProduct)

router.route('/update/:id')
    .patch(isAuthenticated,parseImage.array('images',5 ),validateProductInfo,updateProduct)

router.route('/delete/:id')
    .delete(isAuthenticated,deleteProduct)

export default router