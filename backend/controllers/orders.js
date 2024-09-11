import asyncHandler from "express-async-handler"
import orderModel from "../models/order"
import productModel from "../models/products"
import { badRequestError, notFoundError, unauthorizedError } from "../errors/customErrors"

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
                        stock: -product.quantity
                    }
                }
            }
        }
    })
    
    const result = await productModel.bulkWrite(productUpdates)

    res.status(201).json({output:{message:'OK',payload:createdOrder}})
})

//TODO: create cancel order

export const updateOrder = asyncHandler(async (req,res,next)=>{
    if(req.user.role!='admin' && req.user.role!='user')
        throw new unauthorizedError('please login to update order','ODR-401')
    
    const {id} = req.params
    
    const {totalPrice,address,paymentMethod,products,shippingFee,shippingMethod,voucherCode,discount,status,paidAt,shippedAt,deliveredAt,returnedAt} = req.body

    const updatedOrder = await orderModel.findById(id)
    console.log(req.body)
    console.log(id, status)
    

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
    if(req.user.role!='admin' && req.user.role!='user')
        throw new unauthorizedError('please login to delete order','ODR-401')

    const {id} = req.params
    const deletedOrder = await orderModel.findByIdAndDelete(id)

    res.status(200).json({output:{message:'OK',payload:deletedOrder}})
})

