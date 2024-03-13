import express from 'express'
import cors from 'cors'
import asyncHandler from 'express-async-handler'
import logger from './utils/logger.js'
import customErrorHandler from './errors/customErrorHandler.js'
import notFoundHandler from './errors/notFoundHandler.js'

import auth from './routes/auth.js'

const app = express()

app.use(cors({
    origin:"https://studious-couscous-x9gxvg999g2v5wx-5173.app.github.dev",
    credentials:true
}))
app.use(express.json())
app.use(logger)

app.use('/api/v1/ping', (req,res,next)=>{
    res.status(200).json({message:'OK'})
})

app.use('/api/v1/auth', auth)

app.use(notFoundHandler)
app.use(customErrorHandler)

export default app