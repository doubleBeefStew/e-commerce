import asyncHandler from "express-async-handler"
import {badRequestError, unauthorizedError} from "../errors/customErrors.js"
import productModel from "../models/products.js"
import orderModel from "../models/order.js"
import userModel from "../models/user.tsx"
import {generatePaypalToken} from '../utils/token.js'
import dotenv from 'dotenv'
dotenv.config()

const handleResponse = async (response)=>{
    try {
        const jsonResponse = await response.json();
        return {
            jsonResponse,
            httpStatusCode: response.status,
        };
    } catch (err) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
}

//need orderId, userId
export const createPaypalPayment = asyncHandler(async (req,res,next)=>{
    res.status(200).json({message:'create paypal order'})
})

export const capturePaypalPayment = asyncHandler(async (req,res,next)=>{
    res.status(200).json({message:'capture paypal order'})
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