import expressAsyncHandler from "express-async-handler"
import userModel from "../models/user"
import cloudinary from "../middlewares/cloudinary"
import { notFoundError,badRequestError } from "../errors/customErrors"
import dotenv from 'dotenv'
dotenv.config()

export const getUser = expressAsyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const {user} = req
    
    console.log(id)
    console.log(user);
    
    if(id){
        const data = await userModel.findById(id)
        if(!data)
            throw new notFoundError(`user with ID ${id} is not found`,'USR-404')
        return res.status(200).json({output:{message:'OK',data}})
    } else if(user){
        return res.status(200).json({output:{message:'OK',data:user}})
    }
})

export const updateUserInfo = expressAsyncHandler(async(req,res,next)=>{
    console.log('updating profile info');
    const {id} = req.params
    const { name,email,role,phoneNumber,address } = req.body
    console.log(req.body)

    let updatedUser

    if(id && req.user.role=='admin')
        updatedUser = id
    else
        updatedUser = req.user._id
    
    const foundUser = await userModel.findById(updatedUser)
    if(!foundUser)
        throw new notFoundError(`user with ID ${id} is not found`,'USR-404')

    email && (foundUser.email = email)
    name && (foundUser.name = name)
    role && (foundUser.role = role)
    phoneNumber && (foundUser.phoneNumber = phoneNumber)
    address && (foundUser.address = address)

    await foundUser.save()
    res.status(200).json({output:{message:'OK',id,data:foundUser}})
})

export const updateUserPicture = expressAsyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const imagePath = req.file.path
    let updatedUser

    if(id && req.user.role=='admin')
        updatedUser = id
    else
        updatedUser = req.user._id
    
    const foundUser = await userModel.findById(updatedUser)
    if(!foundUser)
        throw new notFoundError(`user with ID ${id} is not found`,'USR-404')
    
    if(!imagePath){
        throw new badRequestError(`no image file was found`,'PRF-400')
    }

    const folderPath = `users/profiles/${updatedUser}`
    const result = await cloudinary.uploader.upload(imagePath,{
        folder:folderPath,
        resource_type:'auto',
        public_id:updatedUser
    })
    foundUser.avatar.url = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${result.public_id}`

    await foundUser.save()
   
    res.status(200).json({output:{message:'OK',id,data:foundUser.avatar.url}})
})