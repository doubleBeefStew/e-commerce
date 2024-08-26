import {Schema, model} from "mongoose"

const orderSchema = new Schema({
    userId:Schema.ObjectId,
    totalPrice:Number,
    address:String,
    products:{
        type:[{
            productId:Schema.ObjectId,
            productUrl:String,
            productName:String,
            productPrice:Number,
            quantity:Number,
            isChecked:Boolean
        }],
    },
    status:{
        type:String,
        enum: ['WAITING FOR PAYMENT','PAID','SHIPPING','DELIVERED','RETURNED'],
        default:'WAITING FOR PAYMENT'
    },
    paidAt:Date,
    shippedAt:Date,
    deliveredAt:Date,
    returnedAt:Date,
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

const orderModel = new model('orders',orderSchema)

orderModel.createIndexes()

export default orderModel