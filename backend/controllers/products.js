import asyncHandler from "express-async-handler"
import cloudinary from "../middlewares/cloudinary"
import productModel from "../models/products"
import { notFoundError,badRequestError, unauthorizedError } from "../errors/customErrors"
import dotenv from 'dotenv'
dotenv.config()


export const createProduct = asyncHandler(async (req,res,next)=>{
    if(req.user.role!='admin')
        throw new unauthorizedError('only admin can create new products','CRT-401')

    const {name,description,initialPrice,discountPrice,images,stock} = req.body
    const data = {name,description,initialPrice,discountPrice,images,stock}

    const newProduct = await productModel.create({name,description,initialPrice,discountPrice,images,stock})

    res.status(201).json({output:{message:'product created successfully',payload:newProduct}})
})