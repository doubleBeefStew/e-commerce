import { Schema, model } from "mongoose"
import bcrypt from "bcrypt"

interface User {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: Address[];
  role: string;
  avatar: Avatar;
  createdAt: Date;
  resetPasswordToken: String;
  resetPasswordTime: Date;
  isActive: boolean;
  comparePassword(password: string): boolean
}

interface Address {
  country: string;
  city: string;
  address: string;
  zipCode: number;
  addressType: string;
}

interface Avatar {
  public_id: string;
  url: string;
}

const userSchema = new Schema<User>({
  name: String,
  email: {
    type: String,
    index: true,
    unique: true
  },
  password: {
    type: String,
    select: false
  },
  phoneNumber: String,
  address:String,
    // [
    //   {
    //     country: {
    //       type: String,
    //     },
    //     city: {
    //       type: String,
    //     },
    //     address: {
    //       type: String,
    //     },
    //     zipCode: {
    //       type: Number,
    //     },
    //     addressType: {
    //       type: String,
    //     },
    //   }
    // ],
  role: {
    type: String,
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  avatar: String,
  // {
  //   public_id: {
  //     type: String,
  //   },
  //   url: {
  //     type: String,
  //   }
  // },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  resetPasswordToken: String,
  resetPasswordTime: Date
})

//hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password'))
    next()
  this.password = await bcrypt.hash(this.password, 10)
})

// validate password
userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password)
}


const userModel = model<User>('user', userSchema)
userModel.createIndexes()


export default userModel