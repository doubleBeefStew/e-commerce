import asyncHandler from "express-async-handler"
import userModel from "../models/user"
import cloudinary from "../middlewares/cloudinary"
import { clearStorage } from "../middlewares/multer"
import { notFoundError } from "../errors/customErrors"
import dotenv from 'dotenv'
dotenv.config()

export const getUser = asyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const {user} = req
    
    if(id){
        const payload = await userModel.findById(id)
        if(!payload)
            throw new notFoundError(`user with ID ${id} is not found`,'USR-404')
        return res.status(200).json({output:{message:'OK',payload}})
    } else if(user){
        return res.status(200).json({output:{message:'OK',payload:user}})
    }
})

export const updateUser = asyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const { name,cartId,email,phoneNumber,address,image,role } = req.body

    let updatedUser

    if(id && req.user.role=='admin')
        updatedUser = id
    else
        updatedUser = req.user._id
    
    const foundUser = await userModel.findById(updatedUser)
    if(!foundUser)
        throw new notFoundError(`user with ID ${id} is not found`,'USR-404')

    name && (foundUser.name = name)
    cartId && (foundUser.cartId = cartId)
    email && (foundUser.email = email)
    phoneNumber && (foundUser.phoneNumber = phoneNumber)
    address && (foundUser.address = address)
    role && (foundUser.role = role)

    if(req.file){
        const imagePath = req.file.path
        const folderPath = `users/profiles/${updatedUser}`
        const result = await cloudinary.uploader.upload(imagePath,{
            folder:folderPath,
            resource_type:'auto',
            invalidate:true,
            public_id:encodeURIComponent(updatedUser.trim())
        })
        foundUser.avatar = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${result.public_id}`
    }

    await foundUser.save()
    clearStorage()
    res.status(200).json({output:{message:'OK',payload:{id,foundUser}}})
})