const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 获取ObjectId,populate需用到，用于表与表的关联
const ObjectId = Schema.Types.ObjectId

const supplierSchema = new Schema({
    supplierCompanyName: {
        unique: true,
        type:String 
    },
    supplierStaffName: {
        type: ObjectId,
        ref: 'Users' //供应商员工
    },
    supplierStaffTel:String,
    supplierStaffEmail:String,
    supplierStatus:String,
    supplierLogo:String,
    supplierResources:Array,
    createdAt: {
        type: Date,
        defalut: Date.now()
    },
    updatedAt: {
        type: Date,
        defalut: Date.now()
    }
}) 


module.exports = supplierSchema