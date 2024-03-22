import sendEmail from "../utils/sendEmail.js"
import asyncHandler from "express-async-handler"
import userModel from "../models/user.js"
import {badRequestError, unauthorizedError} from "../errors/customErrors.js"
import { generateToken,validateToken } from "../utils/token.js"
import responseSchema from "../data/models/responseSchema.tsx"
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

        ${process.env.FE_ORIGIN}/register/activation/${token}

        Ignore this email if you did not signup for this registration process.

        Sheepo, BAA BAA DISCOUNT!`
    })
    
    res.status(200).json({message:'confirmation email sent',email})
})

export const activation = asyncHandler(async(req,res,next)=>{
    const token = req.params.token
    
    const data = validateToken(token)

    const {email,password} = data

    const name = 'user'+ Math.floor(Math.random()*100000).toString()

    const existingUser = await userModel.findOne({email})
    if(existingUser){
        throw new badRequestError('user is already registered','RGS-201')
    }

    const user = await userModel.create({name,email,password})
    res.status(201).json({message:'user registered successfully',user})
})

export const login = asyncHandler(async(req,res,next)=>{
    const {email,password, rememberMe} = req.body

    const user = await userModel.findOne({email})
    if(!user)
        throw new badRequestError("user is not registered",'LGN-400')

    const verifyPassword = await user.comparePassword(password)
    if(!verifyPassword)
        throw new unauthorizedError("invalid username or password",'LGN-401')

    const userData = {
        name:user.name,
        email:user.email,
        role:user.role,
        address:user.address,
        createdAt:user.createdAt
    }
    const token = generateToken({userData})
    const options = {
        expires:new Date(Date.now() + ((rememberMe?60:1)*24*60*60*1000)),
        httpOnly:true,
        sameSite:"none",
        secure:true
    }
    res.status(200).cookie('token',token,options)
        .json({
            message:'login successful',
        })
})