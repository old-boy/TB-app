const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 获取ObjectId,populate需用到，用于表与表的关联
const ObjectId = Schema.Types.ObjectId

const customerSchema = new Schema({
    customerNumber:{
        unique: true,
        type: Number
    },
    customerName:{
        type: ObjectId,
        ref: 'Users' //平台客服
    },
    customerTel:String,
    customerMaxReceptionNumber:Number,
    customerStatus:String,
    createdAt: {
        type: Date,
        defalut: Date.now()
    },
    updatedAt: {
        type: Date,
        defalut: Date.now()
    }
}) 

customerSchema.pre('save', function() {
    if (this.isNew) {
        this.createdAt = this.updatedAt = Date.now()
    } else {
        this.updatedAt = Date.now()
    }
    next()
})

module.exports = customerSchema