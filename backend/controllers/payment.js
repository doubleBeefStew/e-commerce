import asyncHandler from "express-async-handler"
import axios from 'axios'
import {badRequestError, unauthorizedError} from "../errors/customErrors.js"
import orderModel from "../models/order.js"
import userModel from "../models/user.tsx"
import {generatePaypalToken} from '../utils/token.js'
import dotenv from 'dotenv'
dotenv.config()

//need orderId, userId
export const createPaypalPayment = asyncHandler(async (req,res,next)=>{
    const { orderId }= req.body
    const foundOrder = await orderModel.findById(orderId)
    const accessToken = await generatePaypalToken()

    const payload = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: "10",
                },
            },
        ],
    }

    const response  = await axios.post(`${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`, payload, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            // Uncomment one of these to force an error for negative testing (in sandbox mode only).
            // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
            // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
            // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
        }
    })
    res.status(response.status).json(response.data)
})

export const capturePaypalPayment = asyncHandler(async (req,res,next)=>{
    const { paypalOrderId, orderId }= req.body
    const foundOrder = await orderModel.findById(orderId)
    const accessToken = await generatePaypalToken()

    const response  = await axios.post(`${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${paypalOrderId}/capture`,{},{
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
            // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
            // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
        }
    })
    if(response.data.status=='COMPLETED'){
        foundOrder.status='PAID'
        foundOrder.save()
        
        res.status(response.status).json(response.data)
    }
})

export const sheepopayPayment = asyncHandler(async (req,res,next)=>{
    const {orderId,pin} = req.body
    const user = req.user
    
    if(req.user.role!='user')
        throw new unauthorizedError('please login as user to pay','ODR-401')

    if(pin.toString()=='123456'){

        //update user balance
        const foundUser = await userModel.findById(user._id)
        const foundOrder = await orderModel.findById(orderId)

        if(foundUser.sheepoPayBalance){
            if(foundUser.sheepoPayBalance - foundOrder.totalPrice < 0)
                throw new badRequestError('insufficient SheepoPay balance','PAY-400')
            else{
                foundUser.sheepoPayBalance -= foundOrder.totalPrice
            }
        }
        else
            throw new badRequestError(`SheepoPay is not available for this user`, 'PAY-400')
        
        foundOrder.status='PAID'
        
        foundUser.save()
        foundOrder.save()
            
        res.status(200).json({output:{message:'OK',payload:'payment successful'}})
    }else
        throw new unauthorizedError('wrong PIN','PIN-401')
})