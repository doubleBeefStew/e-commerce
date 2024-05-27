import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    userId:Schema.ObjectId,
    products:{
        type:[{
            productId:Schema.ObjectId,
            quantity:Number,
        }],
        default:[]
    }
})

const cartModel = model('carts',cartSchema)

export default cartModel