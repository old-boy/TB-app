const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 获取ObjectId,populate需用到，用于表与表的关联
const ObjectId = Schema.Types.ObjectId

const buyerInfoSchema = new Schema({
    buyerName: {
        type: ObjectId,
        ref: 'Users' //采购商名称
    },
    buyerAvatar:String,
    buyerTel:String,
    buyerEmail:String,
    buyerAddress:String,
    buyerCompanyName:{
        type: ObjectId,
        ref: 'Buyers' //采购商
    },
    createdAt: {
        type: Date,
        defalut: Date.now()
    },
    updatedAt: {
        type: Date,
        defalut: Date.now()
    }
}) 

buyerInfoSchema.pre('save', function() {
    if (this.isNew) {
        this.createdAt = this.updatedAt = Date.now()
    } else {
        this.updatedAt = Date.now()
    }
    next()
})

module.exports = buyerInfoSchema