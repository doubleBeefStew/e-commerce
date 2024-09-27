import asyncHandler from "express-async-handler"
import userModel from "../models/user.js"
import cloudinary from "../middlewares/cloudinary.js"
import { notFoundError } from "../errors/customErrors.js"
import dotenv from 'dotenv'
import uploadCloudinary from "../utils/uploadCloudinary.js"
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
    const { name,cartId,email,phoneNumber,sheepoPayBalance,address,image,role } = req.body

    let updatedUser

    if(id && req.user.role=='admin')
        updatedUser = id
    else
        updatedUser = req.user._id.toString()
    
    const foundUser = await userModel.findById(updatedUser)
    if(!foundUser)
        throw new notFoundError(`user with ID ${id} is not found`,'USR-404')

    name && (foundUser.name = name)
    cartId && (foundUser.cartId = cartId)
    email && (foundUser.email = email)
    phoneNumber && (foundUser.phoneNumber = phoneNumber)
    sheepoPayBalance && (foundUser.sheepoPayBalance = sheepoPayBalance)
    address && (foundUser.address = address)
    role && (foundUser.role = role)

    if(req.file){
        const folderPath = `users/profiles/${updatedUser}`
        // const result = await cloudinary.uploader.upload(imagePath,{
        //     folder:folderPath,
        //     resource_type:'auto',
        //     invalidate:true,
        //     public_id:encodeURIComponent(updatedUser.trim())
        // })
        const result = await uploadCloudinary(req.file.buffer,folderPath,encodeURIComponent(updatedUser.trim()))
        
        foundUser.avatar = {
            public_id:result.public_id,
            url:result.secure_url
        }
    }

    await foundUser.save()
    res.status(200).json({output:{message:'OK',payload:foundUser}})
})