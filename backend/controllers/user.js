import expressAsyncHandler from "express-async-handler";
import userModel from "../models/user";
import { notFoundError, unauthorizedError } from "../errors/customErrors";
import { log } from "console";

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
    console.log(req.file)
    const {id} = req.params
    const { name,email,role,phoneNumber,address,avatar } = req.body
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
    avatar && (foundUser.avatar = avatar)

    await foundUser.save()
   
    res.status(200).json({output:{message:'OK',id,data:foundUser}})
})