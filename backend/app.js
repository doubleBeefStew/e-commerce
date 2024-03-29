import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { dirname } from 'path'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

// MIDDLEWARES & UTILS
import logger from './utils/logger.js'
import isAuthenticated from './middlewares/auth.js'
// ROUTES
import auth from './routes/auth.js'
import user from './routes/user.js'
// ERROR HANDLERS
import customErrorHandler from './errors/customErrorHandler.js'
import notFoundHandler from './errors/notFoundHandler.js'


// INITIALIZATION
dotenv.config()
const app = express()
app.use(cors({
    origin:process.env.FE_URL,
    credentials:true,
}))
app.use(express.json())
app.use(cookieParser())
app.use(logger)


// PUBLIC FOLDER
const __dirname = dirname((fileURLToPath(import.meta.url)))
app.use(express.static(path.resolve(__dirname,'./public')))


// TEST PING
app.use('/api/v1/ping',(req,res,next)=>{
    res.status(200).json({output:{message:'OK'}})
})

// ROUTING
app.use('/api/v1/auth', auth)
app.use('/api/v1/user',isAuthenticated,user)

// ERRORS
app.use(notFoundHandler)
app.use(customErrorHandler)



export default app