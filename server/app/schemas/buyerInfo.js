/**采购商人员信息表
 * 头像
 * 姓名
 * 电话
 * 邮箱
 * 地址
 * 关联采购商名称
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 获取ObjectId,populate需用到，用于表与表的关联
const ObjectId = Schema.Types.ObjectId

const buyerInfoSchema = new Schema({
    // buyerAvatar:String,
    buyerName:String,
    buyerTel:String,
    buyerEmail:String,
    buyerAddress:String,
    buyerCompanyName:{
        type: ObjectId,
        ref: 'Buyers' //采购商
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        defalut: Date.now
    }
}) 

// buyerInfoSchema.pre('save', function() {
//     if (this.isNew) {
//         this.createdAt = this.updatedAt = Date.now()
//     } else {
//         this.updatedAt = Date.now()
//     }
//     next()
// })

module.exports = buyerInfoSchema