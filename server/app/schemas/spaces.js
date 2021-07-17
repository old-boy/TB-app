const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 获取ObjectId,populate需用到，用于表与表的关联
const ObjectId = Schema.Types.ObjectId

const spacesSchema = new Schema({
    spaceName: {
        unique: true,
        type: String
    },
    buyer: {
        type: ObjectId,
        ref: 'Caigou' //采购商
    },
    supplier:{
        type: ObjectId,
        ref:'Suppliers' // 供应商
    },
    customers:{
        type: ObjectId,
        ref:'Users' //客服
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

spacesSchema.pre('save', function() {
    if (this.isNew) {
        this.createdAt = this.updatedAt = Date.now()
    } else {
        this.updatedAt = Date.now()
    }
    next()
})

module.exports = spacesSchema