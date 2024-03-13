import sendEmail from "../utils/sendEmail.js"
import asyncHandler from "express-async-handler"
import userModel from "../models/user.js"
import {badRequestError} from "../errors/customErrors.js"
import { generateToken } from "../utils/generateToken.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const register = asyncHandler(async (req,res,next)=>{
    const {email,password} = req.body

    const user = await userModel.findOne({email})

    if(user)
        throw new badRequestError('email already registered')

    const token = generateToken({email,password})

    await sendEmail({
        recipient:email,
        subject:'Confirm Your Email Registration',
        text: `Hello,

        Welcome to Sheepo!

        We received a registration request to Sheepo.com
        Please click on the link below to continue your registration and activate your account:

        ${process.env.API_URL}/auth/verify/${token}

        Ignore this email if you did not signup for this registration process.

        Sheepo, BAA BAA DISCOUNT!`
    })
    
    res.status(200).json({message:'confirmation email sent',email})
})

export const verifyToken = asyncHandler(async(req,res,next)=>{
    const token = req.params.token

    const {email,password} = jwt.verify(token,process.env.JWT_KEY)
    const name = 'user'+ Math.floor(Math.random()*100000).toString()

    const user = await userModel.create({name,email,password})

    res.status(201).json({message:'user registered successfully',user})
})


//TODO: set token and cookie for login
export const login = asyncHandler(async(req,res,next)=>{
    const {email,password, rememberMe} = req.body

    const user = await userModel.findOne({email})
    if(!user)
        throw new badRequestError("user is not registered")

    const verifyPassword = await user.comparePassword(password)
    if(!verifyPassword)
        throw new unauthorizedError("invalid username or password")

    res.status(200).json({message:'login successful'})
})