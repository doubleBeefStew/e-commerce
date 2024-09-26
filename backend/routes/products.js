import Express from "express"
import parseImage from "../middlewares/multer.js"
import { validateCreateProduct,validateUpdateProduct } from "../middlewares/validations.js"
import isAuthenticated from "../middlewares/auth.js"
import {getProduct,createProduct,updateProduct,deleteProduct} from "../controllers/products.js"

const router = Express.Router()

router.route('/s')
    .get(getProduct)
    
router.route('/:id?')
    .get(getProduct)

router.route('/create')
    .post(isAuthenticated,parseImage.array('images',5),validateCreateProduct,createProduct)

router.route('/update/:id')
    .patch(isAuthenticated,parseImage.array('images',5 ),validateUpdateProduct,updateProduct)

router.route('/delete/:id')
    .delete(isAuthenticated,deleteProduct)

export default router