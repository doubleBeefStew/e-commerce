import asyncHandler from "express-async-handler"
import productModel from "../models/products.js"
import { clearStorage } from "../middlewares/multer.js"
import { notFoundError,unauthorizedError } from "../errors/customErrors.js"
import dotenv from 'dotenv'
import uploadCloudinary from "../utils/uploadCloudinary.js"
import cloudinary from "../middlewares/cloudinary.js"

dotenv.config()

export const getProduct = asyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const {keyword,sort} = req.query
    
    let foundProduct
    const sortTerm = sort?.toLowerCase() == 'desc' ? -1 : 1

    if(!id){
        if(keyword){
            foundProduct = await productModel.find({
                $text:{$search:keyword}
            }).sort({name:sortTerm})
        }else{
            foundProduct = await productModel.find({}).sort({name:sortTerm})
        }
    }
    else{
        foundProduct = await productModel.findById(id)
        if (!foundProduct)
            throw new notFoundError('the product is not available','GET-404')
    }

    res.status(200).json({output:{message:'OK',payload:foundProduct}})
})

export const createProduct = asyncHandler(async (req,res,next)=>{
    if(req.user.role!='admin' && process.env.BYPASS_ADMIN=='false'){
        throw new unauthorizedError('only admin can create new products','CRT-401')
    }

    const files = req.files
    const {name,description,initialPrice,discountPrice,stock} = req.body

    const newProduct = await productModel.create({name,description,initialPrice,discountPrice,stock})

    if(files){
        const imageData = await uploadCloudinary(files,`products/${req.user._id}/${newProduct._id}`)
        newProduct.images = imageData
        newProduct.save()
    }

    clearStorage()
    res.status(201).json({output:{message:'product created successfully',payload:newProduct}})
})

export const updateProduct = asyncHandler(async (req,res,next)=>{
    if(req.user.role!='admin' && process.env.BYPASS_ADMIN=='false')
        throw new unauthorizedError('only admin can update products','UPDT-401')
    
    const {id} = req.params
    const {name,description,initialPrice,discountPrice,images,stock} = req.body
    const updatedProduct = await productModel.findById(id)

    name && (updatedProduct.name = name)
    description && (updatedProduct.description = description)
    initialPrice && (updatedProduct.initialPrice = initialPrice)
    discountPrice && (updatedProduct.discountPrice = discountPrice)
    images && (updatedProduct.images = images)
    stock && (updatedProduct.stock = stock)

    updatedProduct.save()

    clearStorage()
    res.status(200).json({output:{message:'product updated successfully',payload:updatedProduct}})
})

export const deleteProduct = asyncHandler(async (req,res,next)=>{
    if(req.user.role!='admin' && process.env.BYPASS_ADMIN=='false')
        throw new unauthorizedError('only admin can update products','UPDT-401')

    const {id} = req.params

    const deletedProduct = await productModel.findByIdAndDelete(id)

    const deletedImages = deletedProduct.images.map((image)=>{
        return image.public_id
    })
    
    await cloudinary.api.delete_resources(deletedImages)
    //TODO: 2. delete the folder from cloudinary
    await cloudinary.api.delete_folder(deletedProduct._id)

    res.status(200).json({output:{message:'product deleted successfully',payload:deletedProduct}})

})