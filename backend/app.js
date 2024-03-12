import express from 'express'
import cors from 'cors'
import asyncHandler from 'express-async-handler'
import logger from './utils/logger.js'

const app = express()

app.use(cors({
    origin:"https://studious-couscous-x9gxvg999g2v5wx-5173.app.github.dev",
    credentials:true
}))
app.use(express.json())
app.use(logger)

app.use('/api', asyncHandler(async (req,res,next)=>{
    res.status(200).json({msg:'OK'})
}))

export default app