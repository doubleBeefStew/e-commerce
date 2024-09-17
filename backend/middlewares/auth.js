import asyncHandler from "express-async-handler"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import userModel from "../models/user.js"
import { validateToken } from "../utils/token.js"
import { badRequestError } from "../errors/customErrors.js"
dotenv.config()

const isAuthenticated = asyncHandler(async (req,res,next)=>{
    const {token} = req.cookies
    
    if(!token)
        throw new badRequestError('token is invalid or not provided','AUT-401')
    const {userData} = validateToken(token)
    req.user = await userModel.findOne({_id:userData._id})
    next()
})

export default isAuthenticated