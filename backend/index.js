import app from './app.js'
import dotenv from 'dotenv'
import connectDB from './db/database.js'
import responseSchema from './responseSchema.ts'

dotenv.config()

const start = async ()=>{
    try{
        await connectDB()
        app.listen(process.env.PORT, ()=>{
            console.log(`server running on port ${process.env.PORT}`)
            const testData:responseSchema ={
                error:{
                    message:'test',
                    code:'TEST-001'
                },
                output:{
                    message:'success',
                    payload:{
                        user:{
                            age:21
                        }
                    }
                }
            }
            console.log(testData);
        })
    }catch(err){
        console.log(err);
    }
}

start()

