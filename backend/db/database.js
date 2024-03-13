import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()

const connectDB = ()=>{
    mongoose
        .connect(process.env.DB_CONNECTION)
        .then(()=>{
            console.log('connected to DB')
        })
}

export default connectDB