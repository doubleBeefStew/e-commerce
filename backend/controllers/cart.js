import asyncHandler from "express-async-handler"
import cartModel from "../models/cart"
import userModel from "../models/user"
import { badRequestError } from "../errors/customErrors"

export const getCart = asyncHandler(async (req,res,next)=>{
    const {cartId} = req.params
    
    if(cartId){
        const cart = await cartModel.findById(cartId)
        if(!cart)
            throw new badRequestError('Cart not found','CRT-404')
        res.status(200).json({output:{message:'OK',payload:cart}})
    }else if(!cartId){
        const carts = await cartModel.find({})
        res.status(200).json({output:{message:'OK',payload:carts}})
    }
})

//TODO: integrate create cart with create user
export const createCart = asyncHandler(async (req,res,next)=>{
    const {userId} = req.params
    const user = await userModel.findById(userId)
    const cart = await cartModel.findOne({userId})

    if (!user)
        throw new badRequestError('Invalid User ID','CRT-400')
    if(cart)
        throw new badRequestError('Cart already created','CRT-400')

    const newCart = await cartModel.create({userId})

    res.status(201).json({output:{message:'OK',payload:newCart}})
})

export const deleteCart = asyncHandler(async (req,res,next)=>{
    const {cartId} = req.params
    const deletedCart = await cartModel.findByIdAndDelete(cartId)
    res.status(200).json({output:{message:'OK',payload:deletedCart}})

})

export const updateCart = asyncHandler(async (req,res,next)=>{
    const {cartId} = req.params
    const {products} = req.body
    
    const cart = await cartModel.findById(cartId)
    if(!cart)
        throw new badRequestError('Cart not found','CRT-404')

    products && (cart.products = products)
    cart.save()

    res.status(200).json({output:{message:'OK',payload:cart}})
})

