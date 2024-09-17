import sendEmail from "../utils/sendEmail.js"
import asyncHandler from "express-async-handler"
import userModel from "../models/user.js"
import {badRequestError, unauthorizedError} from "../errors/customErrors.js"
import { generateToken,validateToken } from "../utils/token.js"
import dotenv from 'dotenv'
dotenv.config()

export const register = asyncHandler(async (req,res,next)=>{
    const {email,password} = req.body

    const user = await userModel.findOne({email})

    if(user)
        throw new badRequestError('user is already registered','RGS-401')

    const token = generateToken({email,password})

    await sendEmail({
        recipient:email,
        subject:'Confirm Your Email Registration',
        text: `Hello,

        Welcome to Sheepo!

        We received a registration request to Sheepo.com
        Please click on the link below to continue your registration and activate your account:

        ${process.env.FE_URL}/register/activation/${token}

        Ignore this email if you did not signup for this registration process.

        Sheepo, BAA BAA DISCOUNT!`
    })
    
    res.status(200).json({output:{message:'confirmation email sent',email}})
})

export const activation = asyncHandler(async(req,res,next)=>{
    const token = req.params.token
    const phoneNumber = ''
    const address = ''
    const avatar= ''

    const data = validateToken(token)
    const {email,password} = data
    const name = 'user'+ Math.floor(Math.random()*100000).toString()

    const existingUser = await userModel.findOne({email})
    if(existingUser){
        throw new badRequestError('user is already registered','RGS-201')
    }

    const user = await userModel.create({name,email,password,phoneNumber,address,avatar})
    
    res.status(201).json({output:{message:'user registered successfully',payload:user}})
})

export const login = asyncHandler(async(req,res,next)=>{
    const {email,password,rememberMe} = req.body

    const user = await userModel.findOne({email}).select('+password')
    if(!user)
        throw new badRequestError("user is not registered",'LGN-400')

    const verifyPassword = user.comparePassword(password)
    if(!verifyPassword)
        throw new unauthorizedError("invalid username or password",'LGN-401')

    const userData = {
        _id:user._id,
        cartId:user.cartId,
        name:user.name,
        email:user.email,
        avatar:user.avatar,
        phoneNumber:user.phoneNumber,
        role:user.role,
        address:user.address,
        createdAt:user.createdAt
    }
    const token = generateToken({userData})
    const options = {
        expires:new Date(Date.now() + ((rememberMe?60:1)*24*60*60*1000)),
        httpOnly:true,
        sameSite:"none",
        secure:true,
    }
    
    res.cookie('token',token,options)
    res.status(200).json({output:{message:'login successful',payload:userData}})
        
})

export const logout = asyncHandler(async(req,res,next)=>{    
    res.clearCookie('token')
    res.status(200)
        .json({output:{message:'logout successful'}})
})