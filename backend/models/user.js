import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please fill in your name']
    },
    email:{
        type:String,
        required:[true,'Please fill in your email'],
        index:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please fill in your password'],
        minLength:[4,'Password must be between 8-20 characters length'],
        maxLength:[20,'Password must be between 8-20 characters length'],

    },
    phoneNumber:{
        type:String,
        minLength:[12,'Phone number must be between 12-18 characters length'],
        maxLength:[18,'Phone number must be between 12-18 characters length'],
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

//hash password
userSchema.pre('save',async function(next){
    if(!this.isModified('password'))
        next()
    this.password = await bcrypt.hash(this.password,10)
})

// validate password
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}


const userModel = mongoose.model('user', userSchema)
userModel.createIndexes()


export default userModel