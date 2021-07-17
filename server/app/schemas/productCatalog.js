const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 获取ObjectId,populate需用到，用于表与表的关联
const ObjectId = Schema.Types.ObjectId

const productCaltalogSchema = new Schema({
    catalogName: String,
    product: {
        type: ObjectId,
        ref: 'Product'
    },
    catalogStatus:Boolean,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        defalut: Date.now
    }
}) 


module.exports = productCaltalogSchema