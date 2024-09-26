import {Schema, model} from "mongoose"


//TODO: integrate with category, reviews, shop model
const productSchema = new Schema({
    name:{
        type:String,
        index:'text'
    },
    description:String,
    category:Schema.ObjectId,
    tags:[String],
    initialPrice:Number,
    discountPrice:Number,
    stock:Number,
    images:[{
        public_id:String,
        url:String
    }],
    reviews:[{
        user:Schema.ObjectId,
        rating:Number,
        comment: String,
        createdAt:{
            type:Date,
            default:Date.now()
        }
    }],
    rating:{
        type:Number,
        default:0
    },
    shop:Schema.ObjectId,
    sold_out:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const productModel = model('products',productSchema)
productModel.createIndexes()

export default productModel