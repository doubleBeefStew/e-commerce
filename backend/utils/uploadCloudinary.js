import cloudinary from "../middlewares/cloudinary.js"

const uploadCloudinary = async (files,folderPath)=>{
    const imageData = await Promise.all(files.map(async (file)=>{
        try{
            const result = await cloudinary.uploader.upload(file.path,{
                folder:folderPath,
                resource_type:'auto',
                invalidate:true,
                public_id:file.filename
            })
            return {public_id:result.public_id,url:result.url}
        }catch(e){
            console.log(e)
        }
    }))
    return imageData
}

export default uploadCloudinary