const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 获取ObjectId,populate需用到，用于表与表的关联
const ObjectId = Schema.Types.ObjectId

const suppliersReviewSchema = new Schema({
    supplierInvitationCode: {
        unique: true,
        type:String //邀请码
    },
    supplier: {
        type: ObjectId,
        ref: 'Supplier' //供应商
    },
    supplierCertificate: Array, //相关资源
    createdAt: {
        type: Date,
        defalut: Date.now()
    },
    updatedAt: {
        type: Date,
        defalut: Date.now()
    }
}) 

suppliersReviewSchema.pre('save', function() {
    if (this.isNew) {
        this.createdAt = this.updatedAt = Date.now()
    } else {
        this.updatedAt = Date.now()
    }
    next()
})

module.exports = suppliersReviewSchema