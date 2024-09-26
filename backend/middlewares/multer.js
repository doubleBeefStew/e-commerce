import multer from "multer"
import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
    // disable local storage
    destination:async (req,file,cb)=>{
        const uploadPath = path.join(__dirname,'..','public','images',req.user._id.toString())
        fs.mkdir(uploadPath,{recursive:true},(err)=>{
            if(err){
                console.error(err)
                cb(err,null)
            }else{
                cb(null,uploadPath)
            }
        })
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
            cb(err)
        }
    }
})

export const clearStorage = ()=>{
    const uploadPath = path.join(__dirname,'..','public','images')
    if(fs.existsSync(uploadPath)){
        fs.rmSync(uploadPath,{ recursive: true, force: true },(err)=>{
            if(err)
                console.log(err)
        })
    }
} 

export default parseImage