import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    userId:Schema.ObjectId,
    products:{
        type:[{
            productId:Schema.ObjectId,
            productUrl:String,
            productName:String,
            productPrice:Number,
            quantity:Number,
        }],
        default:[]
    }
})

const cartModel = model('carts',cartSchema)

export default cartModel