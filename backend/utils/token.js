import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

export const generatePaypalToken = async ()=>{
    const BASE64_ENCODED_CLIENT_ID_AND_SECRET = Buffer.from(
        `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`
    ).toString("base64");

    const response = await axios.post(
        `https://api-m.sandbox.paypal.com/v1/oauth2/token`,
        new URLSearchParams({
            grant_type: "client_credentials",
            response_type: "id_token",
            intent: "sdk_init",
        }),
        { Authorization: `Basic ${BASE64_ENCODED_CLIENT_ID_AND_SECRET}` }
    )
    const json = await request.json();
    console.log(json)
    
    return json.access_token;
}

export const generateToken = (data)=>{
    return jwt.sign(data,process.env.JWT_KEY,{expiresIn:process.env.JWT_EXPIRES})
}

export const validateToken = (token)=>{
    return jwt.verify(token,process.env.JWT_KEY)
}