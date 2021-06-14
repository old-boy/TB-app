/**采购商表
 * 采购商公司名称
 * 采购商公司地址
 * 采购商公司电话
 * 关联采购商采购员工基本信息表
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const buyerSchema = new Schema({
    buyerCompanyName:String,
    buyerCompanyAddres:String,
    buyerCompanyTel:String,
    buyerInfo: {
        type: ObjectId,
        ref: 'BuyerInfo' //采购商人员基本信息表
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

buyerSchema.pre('save', function() {
    if (this.isNew) {
        this.createdAt = this.updatedAt = Date.now()
    } else {
        this.updatedAt = Date.now()
    }
    next()
})

module.exports = buyerSchema