
/**商户
 * 公司名称
 * 厂家名称
 * 品牌数量
 * 邀请人
 * 被邀请供应商列表
 * 被邀请采购商列表
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 获取ObjectId,populate需用到，用于表与表的关联
const ObjectId = Schema.Types.ObjectId

const businessSchema = new Schema({
    companyName: String, 
    factoryName:String,
    brandNumber:{
        type: ObjectId,
        ref: 'Brand' //品牌数量
    },
    invitationPeople: {
        type: ObjectId,
        ref: 'Users' //邀请人
    },
    supplierCompanyName:{
        type: ObjectId,
        ref: 'Suppliers' //供应商
    },
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

businessSchema.pre('save', function() {
    if (this.isNew) {
        this.createdAt = this.updatedAt = Date.now()
    } else {
        this.updatedAt = Date.now()
    }
    next()
})

module.exports = businessSchema