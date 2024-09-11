import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import axios from 'axios'
import asyncHandler from "express-async-handler"

dotenv.config()

export const generatePaypalToken = asyncHandler(async ()=>{
    const BASE64_ENCODED_CLIENT_ID_AND_SECRET = Buffer.from(
        `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString("base64");

    const response = await axios.post(
        `https://api-m.sandbox.paypal.com/v1/oauth2/token`,
        new URLSearchParams({
            grant_type: "client_credentials",
            response_type: "id_token",
            intent: "sdk_init",
        }),
        { 
            headers:{ 
                Authorization: `Basic ${BASE64_ENCODED_CLIENT_ID_AND_SECRET}` 
            } 
        }
    )
    
    return response.data.access_token
})

export const generateToken = (data)=>{
    return jwt.sign(data,process.env.JWT_KEY,{expiresIn:process.env.JWT_EXPIRES})
}

export const validateToken = (token)=>{
    return jwt.verify(token,process.env.JWT_KEY)
}