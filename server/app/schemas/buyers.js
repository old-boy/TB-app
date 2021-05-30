const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 获取ObjectId,populate需用到，用于表与表的关联
const ObjectId = Schema.Types.ObjectId

const buyerSchema = new Schema({
    invitationCode: {
        unique: true,
        type:String //邀请码
    },
    invitationPeople: {
        type: ObjectId,
        ref: 'Users' //邀请人
    },
    supplierCompanyName:{
        type: ObjectId,
        ref: 'Suppliers' //供应商
    },
    buyerStaffInfo: {
        type: ObjectId,
        ref: 'BuyerInfo' //Info
    },
    buyerLogo:String,
    buyerCompanyName:String,
    createdAt: {
        type: Date,
        defalut: Date.now()
    },
    updatedAt: {
        type: Date,
        defalut: Date.now()
    }
}) 

buyerSchema.pre('save', function() {
    if (this.isNew) {
        this.createdAt = this.updatedAt = Date.now()
    } else {
        this.updatedAt = Date.now()
    }
    next()
})

module.exports = buyerSchema