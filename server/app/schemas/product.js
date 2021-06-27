const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
// node.js 核心模块，提供了安全相关的功能，如加密，签名等
const crypto = require('crypto')

const ProductSchema = new mongoose.Schema({
    productName:String,
    productCatalog: {
        type: ObjectId,
        ref: 'ProductCatalog'
    },
    productMainPicture:String,
    productPrice:Number,
    productTotal:Number,
    productSalesTotal:Number,
    productStatus:Boolean,
    productOrigin:String,//产地
    brandName:{
        type: ObjectId,
        ref: 'Brand' //品牌
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

// ProductSchema.pre('save', function() {
//     if (this.isNew) {
//         this.createdAt = this.updatedAt = Date.now()
//     } else {
//         this.updatedAt = Date.now()
//     }
//     next()
// })

module.exports = ProductSchema