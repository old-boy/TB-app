const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ProductSchema = new mongoose.Schema({
    productName:String,
    productCatalog: {
        type: ObjectId,
        ref: 'ProductCatalog' //类目
    },
    productMainPicture:String,
    productPrice:Number,
    productTotal:Number,
    productSalesTotal:Number,
    productStatus:Boolean,
    productOrigin:String,      //产地
    brandName:{
        type: ObjectId,
        ref: 'Brand'           //品牌
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        defalut: Date.now
    }
});

module.exports = ProductSchema