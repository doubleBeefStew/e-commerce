import {Schema, model} from "mongoose"

const orderSchema = new Schema({
    userId:Schema.ObjectId,
    totalPrice:Number,
    shippingFee:Number,
    shippingMethod:String,
    address:String,
    paymentMethod:{
        type:String,
        enum: ['SHEEPOPAY','CREDITCARD','PAYPAL'],
    },
    products:{
        type:[{
            productId:Schema.ObjectId,
            productName:String,
            quantity:Number,
        }],
    },
    voucherCode:{
        type:String,
        default:null
    },
    discount:{
        type:Number,
        default:0
    },
    status:{
        type:String,
        enum: ['WAITING FOR PAYMENT','PAID','SHIPPING','DELIVERED','RETURNED','CANCELLED'],
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

const orderModel = model('orders',orderSchema)

// orderModel.createIndexes()

export default orderModel