import { body,validationResult } from "express-validator"
import { badRequestError } from "../errors/customErrors"
import { validationData } from "../errors/validationData"
import { roles } from "../errors/validationData"

const validateValues = (validations)=>{
    console.log(body('name'))
    return [validations,(req,res,next)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const errorMessages = errors.array().map((item)=>{ return item.msg })
            throw new badRequestError(errorMessages[0],'VLD-400') 
        }
        next()
    }]
}

//TODO: make password more complex
export const validateRegister = validateValues([
    body('email').escape().trim()
        .notEmpty().withMessage(validationData.email_required)
        .isEmail().withMessage(validationData.email_format),
    body('password').escape().trim()
        .notEmpty().withMessage(validationData.password_required)
        .isAlphanumeric().withMessage(validationData.password_format)
        .isLength({min:6,max:20}).withMessage(validationData.password_length)
])
    
export const validateUserInfo = validateValues([
    body('name').escape().trim().optional()
        .isLength({min:2,max:30}).withMessage(validationData.name_length),
    body('email').escape().trim().optional()
        .isEmail().withMessage(validationData.email_format),
    body('phoneNumber').escape().trim().optional()
        .matches(/^\d+$/).withMessage(validationData.phone_format)
        .isLength({min:10,max:15}).withMessage(validationData.phone_length),
    body('address').escape().trim().optional()
        .isLength({max:300}).withMessage(validationData.address_length),
    body('role').escape().trim().optional()
        .isIn(roles).withMessage(`role must be one of these options: ${roles}`),
])

export const validateProductInfo = validateValues([
    body('name').escape().trim()
        .notEmpty().withMessage(validationData.product_name_required)
        .isLength({min:10,max:150}).withMessage(validationData.product_name_length),
    body('description').escape().trim()
        .notEmpty().withMessage(validationData.product_description_required)
        .isLength({max:1500}).withMessage(validationData.product_description_length),
    body('initialPrice').escape().trim()
        .notEmpty().withMessage(validationData.product_init_price_required)
        .isInt({gt:99}).withMessage(validationData.product_init_price_limit),
    body('discountPrice').escape().trim()
        .optional()
        .isInt({gt:99}).withMessage(validationData.product_disc_price_limit),
    body('stock').escape().trim()
        .isInt({gt:0}).withMessage(validationData.stock_amount)
])