import cloudinary from "../middlewares/cloudinary.js"
import streamifier from 'streamifier'
import crypto from 'crypto'

const uploadCloudinary = async (buffer,folderPath,publicId)=>{
    const uniqueIdentifier = crypto.randomBytes(8).toString('hex')

    return new Promise((resolve,reject)=>{
        let stream = cloudinary.uploader.upload_stream(
            {
                folder:folderPath,
                resource_type:'auto',
                invalidate:true,
                public_id:`${publicId}_${uniqueIdentifier}`
            },
            (error,result)=>{
                if(result)
                    resolve(result)
                else
                    reject(error)
            }
        )
        streamifier.createReadStream(buffer).pipe(stream)
    })
}

export default uploadCloudinary