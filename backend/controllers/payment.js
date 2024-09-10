import asyncHandler from "express-async-handler"
import {badRequestError, unauthorizedError} from "../errors/customErrors.js"
import productModel from "../models/products.js"
import orderModel from "../models/order.js"
import userModel from "../models/user.tsx"
import generatePaypalToken from '../utils/token.js'
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

export const createPaypalOrder = asyncHandler(async (req,res,next)=>{

})

export const payment = asyncHandler(async (req,res,next)=>{
    const {data,pin} = req.body
    const foundItems = []
    
    if(req.user.role!='user')
        throw new unauthorizedError('please login as user to pay','ODR-401')

    if(pin.toString()=='123456'){
        if(!data.products)
            throw new badRequestError('no products','PAY-400')

        //update user balance
        const foundUser = await userModel.findById(data.userId)
        if(foundUser.sheepoPayBalance){
            if(foundUser.sheepoPayBalance - data.totalPrice < 0)
                throw new badRequestError('insufficient balance','PAY-400')
            else{
                foundUser.sheepoPayBalance -= data.totalPrice
            }
        }
        else
            throw new badRequestError(`SheepoPay is not available for this user`, 'PAY-400')
        
        //update order status
        const foundOrder = await orderModel.findById(data._id)
        foundOrder.status='PAID'
        
        //update stock
        for (const item of data.products) {
            const foundItem = await productModel.findById(item.productId)
            if (!foundItem)
                throw new badRequestError(`Product with ID ${item.productId} not found`, 'PAY-404')
            if (foundItem.stock - item.quantity < 0) {
                throw new badRequestError(`Insufficient stock for product ${item.productId}`, 'PAY-400')
            }
            foundItems.push({foundItem,quantity: item.quantity})
        }

        foundUser.save()
        foundOrder.save()
        for (const { foundItem, quantity } of foundItems) {
            foundItem.stock -= quantity
            foundItem.save()
        }
            
        res.status(200).json({output:{message:'OK',payload:'payment successful'}})
    }else
        throw new unauthorizedError('wrong PIN','PIN-401')
})