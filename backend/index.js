import app from './app.js'
import dotenv from 'dotenv'
import connectDB from './db/database.js'

dotenv.config()

const start = async ()=>{
    try{
        await connectDB()
        app.listen(3000, ()=>{
            console.log(`server running on port ${process.env.PORT}`)
        })
    }catch(err){
        console.log(err);
    }
}

start()

