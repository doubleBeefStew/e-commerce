import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()

let isConnected

const connectDB = async ()=>{
    if(isConnected)
        return

    try{
        const db = await mongoose.connect(process.env.DB_CONNECTION,{
                useNewUrlParser: true,
                useUnifiedTopology: true,
                maxPoolSize:10,
                serverSelectionTimeoutMS: 30000, // Increase timeout to handle cold starts
            }
        )
        isConnected = db.connections[0].readyState
        console.log('Connected to MongoDB')
    }catch(err){
        console.error('Error connecting to MongoDB:', err)
        throw err
    }
}

export default connectDB