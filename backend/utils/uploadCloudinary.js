import cloudinary from "../middlewares/cloudinary.js"
import streamifier from 'streamifier'

const uploadCloudinary = async (buffer,folderPath,publicId)=>{
    return new Promise((resolve,reject)=>{
        let stream = cloudinary.uploader.upload_stream(
            {
                folder:folderPath,
                resource_type:'auto',
                invalidate:true,
                public_id:publicId
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