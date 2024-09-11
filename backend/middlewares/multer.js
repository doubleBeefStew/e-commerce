import multer from "multer"
import fs from 'fs'

const storage = multer.diskStorage({
    // disable local storage
    destination:(req,file,cb)=>{
        const uploadPath = `./public/images/${req.user._id}`
        if(!fs.existsSync(uploadPath)){
            fs.mkdirSync(uploadPath,{recursive:true})
        }
        
        cb(null,uploadPath)
    },
    filename:(req,file,cb)=>{
        cb(null, `${req.user._id}-${file.originalname}`)
    }
})

const parseImage = multer({
    storage,
    limits:{fileSize:5*1024 *1024},
    fileFilter:(req,file,cb)=>{
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!')
            err.name = 'ExtensionError'
            return cb(err);
        }
    }
})

export const clearStorage = ()=>{
    const uploadPath = `./public/images`
        if(fs.existsSync(uploadPath)){
            fs.rmSync(uploadPath,{ recursive: true, force: true },(err)=>{
                if(err)
                    console.log(err)
            })
        }
} 

export default parseImage