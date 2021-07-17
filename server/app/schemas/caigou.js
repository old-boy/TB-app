/**采购商表
 * 采购商公司名称
 * 采购商公司地址
 * 采购商公司电话
 * 关联采购商采购员工基本信息表
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const caigouSchema = new Schema({
    buyerCompanyName:String,
    buyerCompanyAddres:String,
    buyerCompanyTel:String,
    caigouInfo: {
        type: ObjectId,
        ref: 'CaigouInfo' //采购商人员基本信息表
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


module.exports = caigouSchema