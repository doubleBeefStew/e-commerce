import expressAsyncHandler from "express-async-handler";
import userModel from "../models/user";
import { notFoundError } from "../errors/customErrors";

export const getUser = expressAsyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const {user} = req
    
    if(id){
        const data = await userModel.findById(id)
        if(!data)
            throw new notFoundError(`user with ID ${id} is not found`,'USR-404')
        return res.status(200).json({output:{message:'OK',data}})
    } else if(user){
        return res.status(200).json({output:{message:'OK',data:user}})
    }
})