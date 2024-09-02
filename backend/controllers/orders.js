import asyncHandler from "express-async-handler"
import orderModel from "../models/order"
import { notFoundError, unauthorizedError } from "../errors/customErrors"

export const getOrder = asyncHandler(async (req,res,next)=>{
    if(req.user.role!='admin' && req.user.role!='user')
        throw new unauthorizedError('please login to view order data','ODR-401')

    const userId = req.user._id
    
    const {orderId} = req.params
    let foundOrder

    if(!orderId){
        foundOrder = await orderModel.find({userId})
    }
    else{
        foundOrder = await orderModel.findById(orderId)
        if (!foundOrder)
            throw new notFoundError('order not found','ODR-404')

        if(foundOrder.userId.toString() != userId && req.user.role!='admin')
            throw new unauthorizedError('you cannot access this order','ODR-401')
    }

    res.status(200).json({output:{message:'OK',payload:foundOrder}})
})

export const createOrder = asyncHandler(async (req,res,next)=>{
    if(req.user.role!='admin' && req.user.role!='user')
        throw new unauthorizedError('please login to create order','ODR-401')

    const {userId,totalPrice,address,paymentMethod,products} = req.body

    const createdOrder = await orderModel.create({userId,totalPrice,address,paymentMethod,products})
    res.status(201).json({output:{message:'OK',payload:createdOrder}})
})

export const updateOrder = asyncHandler(async (req,res,next)=>{
    if(req.user.role!='admin')
        throw new unauthorizedError('only admin can update orders','UPDT-401')
    
    const {id} = req.params
    const options = {}
    const {totalPrice,address,paymentMethod,products,status,paidAt,shippedAt,deliveredAt,returnedAt} = req.body

    const updatedOrder = await orderModel.findById(id)

    totalPrice && (updatedOrder.totalPrice = totalPrice)
    address && (updatedOrder.address = address)
    paymentMethod && (updatedOrder.paymentMethod = paymentMethod)
    products && (updatedOrder.products = products)
    status && (updatedOrder.status = status)
    paidAt && (updatedOrder.paidAt = paidAt)
    shippedAt && (updatedOrder.shippedAt = shippedAt)
    deliveredAt && (updatedOrder.deliveredAt = deliveredAt)
    returnedAt && (updatedOrder.returnedAt = returnedAt)

    updatedOrder.save()

    res.status(200).json({output:{message:'OK',payload:updatedOrder}})
})

export const deleteOrder = asyncHandler(async (req,res,next)=>{
    if(req.user.role!='admin' && req.user.role!='user')
        throw new unauthorizedError('please login to delete order','ODR-401')

    const {id} = req.params
    const deletedOrder = await orderModel.findByIdAndDelete(id)

    res.status(200).json({output:{message:'OK',payload:deletedOrder}})
})

