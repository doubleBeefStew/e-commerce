import asyncHandler from "express-async-handler"
import orderModel from "../models/order.js"
import productModel from "../models/products.js"
import { badRequestError, notFoundError, unauthorizedError } from "../errors/customErrors.js"

export const getOrder = asyncHandler(async (req,res,next)=>{
    if(req.user.role!='admin' && req.user.role!='user' && process.env.BYPASS_ADMIN=='false')
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

        if(foundOrder.userId.toString() != userId && req.user.role!='admin' && process.env.BYPASS_ADMIN=='false')
            throw new unauthorizedError('you cannot access this order','ODR-401')
    }

    res.status(200).json({output:{message:'OK',payload:foundOrder}})
})

export const createOrder = asyncHandler(async (req,res,next)=>{
    if(req.user.role!='admin' && req.user.role!='user' && process.env.BYPASS_ADMIN=='false')
        throw new unauthorizedError('please login to create order','ODR-401')

    let recalculatedTotal = 0
    const {userId,totalPrice,address,paymentMethod,products,voucherCode,shippingFee,shippingMethod} = req.body

    const productIds = products.map(product => product.productId)
    const dbProducts = await productModel.find({ _id: { $in: productIds } })
    
    recalculatedTotal += shippingFee
    products.forEach(product => {
        const dbProduct = dbProducts.find(p => p._id.toString() === product.productId)
        if(product.quantity > dbProduct.stock){
            throw new badRequestError(`insufficient stock for product ${product.productName}`, 'ODR-400')
        }
        
        if (dbProduct) {
            recalculatedTotal += dbProduct.initialPrice * product.quantity
        }
    });

    if (recalculatedTotal !== totalPrice) {
        throw new badRequestError(`total price mismatch:${recalculatedTotal} & ${totalPrice}`,'ODR-400')
    }

    const createdOrder = await orderModel.create({userId,totalPrice,address,paymentMethod,products,voucherCode,shippingFee,
        shippingMethod})

    const productUpdates = products.map((product)=>{
        return {
            updateOne:{
                filter:{
                    _id: product.productId
                },
                update: {
                    $inc: {
                        stock: -product.quantity,
                        sold_out: product.quantity
                    }
                }
            }
        }
    })
    
    const result = await productModel.bulkWrite(productUpdates)
    res.status(201).json({output:{message:'OK',payload:createdOrder}})
})

export const cancelOrder = asyncHandler(async (req,res,next)=>{
    const userId = req.user._id
    const {id} = req.params

    if(req.user.role!='admin' && req.user.role!='user' && process.env.BYPASS_ADMIN=='false')
        throw new unauthorizedError('please login to cancel order','ODR-401')

    const foundOrder = await orderModel.findById(id)
    if (!foundOrder)
        throw new notFoundError('order not found','ODR-404')

    if(foundOrder.userId.toString() != userId && req.user.role!='admin' && process.env.BYPASS_ADMIN=='false')
        throw new unauthorizedError('you cannot access this order','ODR-401')

    if(foundOrder.status == 'CANCELLED')
        throw new badRequestError('order is already cancelled','ODR-400')

    foundOrder.status = 'CANCELLED'
    foundOrder.save()

    const productUpdates = foundOrder.products.map((item)=>{
        return {
            updateOne:{
                filter:{
                    _id: item.productId
                },
                update: {
                    $inc: {
                        stock: item.quantity,
                        sold_out: -item.quantity
                    }
                }
            }
        }
    })

    const result = await productModel.bulkWrite(productUpdates)

    res.status(200).json({output:{message:'OK',payload:result}})
})

export const updateOrder = asyncHandler(async (req,res,next)=>{
    if(req.user.role!='admin' && req.user.role!='user' && process.env.BYPASS_ADMIN=='false')
        throw new unauthorizedError('please login to update order','ODR-401')
    
    const {id} = req.params
    
    const {totalPrice,address,paymentMethod,products,shippingFee,shippingMethod,voucherCode,discount,status,paidAt,shippedAt,deliveredAt,returnedAt} = req.body

    const updatedOrder = await orderModel.findById(id)

    totalPrice && (updatedOrder.totalPrice = totalPrice)
    address && (updatedOrder.address = address)
    paymentMethod && (updatedOrder.paymentMethod = paymentMethod)
    products?.length > 0 && (updatedOrder.products = products)
    status && (updatedOrder.status = status)
    paidAt && (updatedOrder.paidAt = paidAt)
    shippedAt && (updatedOrder.shippedAt = shippedAt)
    deliveredAt && (updatedOrder.deliveredAt = deliveredAt)
    returnedAt && (updatedOrder.returnedAt = returnedAt)

    updatedOrder.save()

    res.status(200).json({output:{message:'OK',payload:updatedOrder}})
})

export const deleteOrder = asyncHandler(async (req,res,next)=>{
    if(req.user.role!='admin' && req.user.role!='user' && process.env.BYPASS_ADMIN=='false')
        throw new unauthorizedError('please login to delete order','ODR-401')

    const {id} = req.params
    const deletedOrder = await orderModel.findByIdAndDelete(id)

    res.status(200).json({output:{message:'OK',payload:deletedOrder}})
})

