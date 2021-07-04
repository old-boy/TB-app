const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 邀请供应商
const ObjectId = Schema.Types.ObjectId

const supplierInviterSchema = new Schema({
    inviterName:String,
    supplierCompany: {
        type: ObjectId,
        ref: 'Supplier' 
    },
    buyerCompany: {
        type: ObjectId,
        ref: 'Buyer' 
    },
    inviter:String,
    inviterSource:String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        defalut: Date.now
    }
}) 

module.exports = supplierInviterSchema