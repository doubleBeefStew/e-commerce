import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const generateToken = (data)=>{
    return jwt.sign(data,process.env.JWT_KEY,{expiresIn:process.env.JWT_EXPIRES})
}

export const validateToken = (token)=>{
    return jwt.verify(token,process.env.JWT_KEY)
}