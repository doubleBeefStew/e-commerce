import { body,validationResult } from "express-validator"
import { badRequestError } from "../errors/customErrors"
import { validationData } from "../errors/validationData"
import { roles } from "../errors/validationData"
import { shippingMethod } from "../errors/validationData"
import { paymentMethod } from "../errors/validationData"
import { status } from "../errors/validationData"

const validateValues = (validations)=>{
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

export const validateCreateProduct = validateValues([
    body('name').escape().trim()
        .notEmpty().withMessage(validationData.product_name_required)
        .isLength({min:5,max:150}).withMessage(validationData.product_name_length),
    body('description').escape().trim()
        .notEmpty().withMessage(validationData.product_description_required)
        .isLength({max:1500}).withMessage(validationData.product_description_length),
    body('initialPrice').escape().trim()
        .notEmpty().withMessage(validationData.product_init_price_required)
        .isInt({gt:99}).withMessage(validationData.product_init_price_limit),
    body('discountPrice').escape().trim().optional()
        .isInt({gt:99}).withMessage(validationData.product_disc_price_limit),
    body('stock').escape().trim()
        .isInt({gt:0}).withMessage(validationData.stock_amount)
])

export const validateUpdateProduct = validateValues([
    body('name').escape().trim().optional()
        .isLength({min:5,max:150}).withMessage(validationData.product_name_length),
    body('description').escape().trim().optional()
        .isLength({max:1500}).withMessage(validationData.product_description_length),
    body('initialPrice').escape().trim().optional()
        .isInt({gt:99}).withMessage(validationData.product_init_price_limit),
    body('discountPrice').escape().trim().optional()
        .isInt({gt:99}).withMessage(validationData.product_disc_price_limit),
    body('stock').escape().trim().optional()
        .isInt({gt:0}).withMessage(validationData.stock_amount)
])

export const validateCreateOrder = validateValues([
    // products,voucherCode,shippingFee,shippingMethod,discount
    body('totalPrice')
        .notEmpty().withMessage(validationData.total_price_required)
        .isNumeric().withMessage(validationData.total_price_numeric),
    body('address').escape().trim()
        .notEmpty().withMessage(validationData.address_required),
    body('paymentMethod').escape().trim()
        .notEmpty().withMessage(validationData.payment_method_required)
        .isIn(paymentMethod).withMessage(`Payment method must be one of these options: ${paymentMethod}`),
    body('shippingFee')
        .notEmpty().withMessage(validationData.shipping_fee_required)
        .isNumeric().withMessage(validationData.shipping_fee_numeric),
    // body('shippingMethod').escape().trim().optional()
        // .notEmpty().withMessage(validationData.shipping_method_required)
        // .isIn(shippingMethod).withMessage(`Shipping method must be one of these options: ${shippingMethod}`),
    body('discount').optional()
        .isNumeric().withMessage(validationData.discount_numeric),
])

export const validateUpdateOrder = validateValues([
    body('totalPrice').optional()
        .isNumeric().withMessage(validationData.total_price_numeric),
    body('paymentMethod').escape().trim().optional()
        .isIn(paymentMethod).withMessage(`Payment method must be one of these options: ${paymentMethod}`),
    body('shippingFee').optional()
        .isNumeric().withMessage(validationData.shipping_fee_numeric),
    body('shippingMethod').escape().trim().optional()
        .isIn(shippingMethod).withMessage(`Shipping method must be one of these options: ${shippingMethod}`),
    body('discount').optional()
        .isNumeric().withMessage(validationData.discount_numeric),
    body('status').escape().trim().optional()
        .isIn(status).withMessage(`Status must be one of these options: ${status}`),
])