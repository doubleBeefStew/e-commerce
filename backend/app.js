import express from 'express'
import cors from 'cors'
import logger from './utils/logger.js'
import cookieParser from 'cookie-parser'
import customErrorHandler from './errors/customErrorHandler.js'
import notFoundHandler from './errors/notFoundHandler.js'
import auth from './routes/auth.tsx'
import isAuthenticated from './middlewares/auth.js'
import user from './routes/user.tsx'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(cors({
    origin:process.env.FE_ORIGIN,
    credentials:true,
}))
app.use(express.json())
app.use(cookieParser())
app.use(logger)

app.use('/api/v1/ping', (req,res,next)=>{
    res.status(200).json({output:{message:'OK'}})
})

app.use('/api/v1/auth', auth)
app.use('/api/v1/user', isAuthenticated,user)

app.use(notFoundHandler)
app.use(customErrorHandler)

export default app