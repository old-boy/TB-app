const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 获取ObjectId,populate需用到，用于表与表的关联
const ObjectId = Schema.Types.ObjectId

const chatSchema = new Schema({
    spaceName: {
        type: ObjectId,
        ref:'Space' //交易空间
    },
    buyerStaff: {
        type: ObjectId,
        ref: 'Caigou' //采购商
    },
    customer:{
        type: ObjectId,
        ref: 'Users' //平台客服
    },
    business:{
        type: ObjectId,
        ref: 'Business' //商户
    },
    chatList: Array,
    createdAt: {
        type: Date,
        defalut: Date.now()
    },
    updatedAt: {
        type: Date,
        defalut: Date.now()
    }
}) 

chatSchema.pre('save', function() {
    if (this.isNew) {
        this.createdAt = this.updatedAt = Date.now()
    } else {
        this.updatedAt = Date.now()
    }
    next()
})

module.exports = chatSchema