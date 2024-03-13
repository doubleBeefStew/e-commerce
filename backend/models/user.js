import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        index:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
    },
    address:[
        {
          country: {
            type: String,
          },
          city:{
            type: String,
          },
          address1:{
            type: String,
          },
          address2:{
            type: String,
          },
          zipCode:{
            type: Number,
          },
          addressType:{
            type: String,
          },
        }
      ],
    role:{
        type:String,
        default:'user'
    },
    avatar:{
        public_id: {
            type: String,
            // required: true,
          },
          url: {
            type: String,
            // required: true,
          }
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    resetPasswordToken: String,
    resetPasswordTime:Date
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password'))
        next()
    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}


const userModel = mongoose.model('user', userSchema)
userModel.createIndexes()


export default userModel