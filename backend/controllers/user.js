import expressAsyncHandler from "express-async-handler"
import userModel from "../models/user"
import cloudinary from "../middlewares/cloudinary"

export const getUser = expressAsyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const {user} = req
    
    if(id){
        const data = await userModel.findById(id)
        if(!data)
            throw new notFoundError(`user with ID ${id} is not found`,'USR-404')
        return res.status(200).json({output:{message:'OK',data}})
    } else if(user){
        return res.status(200).json({output:{message:'OK',data:user}})
    }
})

export const updateUser = expressAsyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const { name,email,role,phoneNumber,address,avatar } = req.body
    const imagePath = req.file.path
    let updatedUser

    if(id && req.user.role=='admin')
        updatedUser = id
    else
        updatedUser = req.user._id
    
    const foundUser = await userModel.findById(updatedUser)
    if(!foundUser)
        throw new notFoundError(`user with ID ${id} is not found`,'USR-404')

    if(imagePath){
        const result = await cloudinary.uploader.upload(imagePath,{public_id:'test_upload'})
        foundUser.avatar.url = result.secure_url
    }

    email && (foundUser.email = email)
    name && (foundUser.name = name)
    role && (foundUser.role = role)
    phoneNumber && (foundUser.phoneNumber = phoneNumber)
    address && (foundUser.address = address)

    await foundUser.save()
   
    res.status(200).json({output:{message:'OK',id,data:foundUser}})
})