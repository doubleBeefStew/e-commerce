import multer from "multer"
import fs from 'fs'

const storage = multer.diskStorage({
    // disable local storage
    destination:(req,file,cb)=>{
        const uploadPath = `./public/users/${req.user._id}`
        if(fs.existsSync(uploadPath)){
            fs.rmSync(uploadPath,{ recursive: true, force: true },(err)=>{
                if(err)
                    console.log(err)
            })
        }
        fs.mkdirSync(uploadPath,{recursive:true})
        
        cb(null,uploadPath)
    },
    
    filename:(req,file,cb)=>{
        const uniqueSuffix = Date.now()
        cb(null, `${req.user._id}-${file.originalname}`)
    }
})

const parseImage = multer({storage})

export default parseImage