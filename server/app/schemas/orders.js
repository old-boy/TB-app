const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 获取ObjectId,populate需用到，用于表与表的关联
const ObjectId = Schema.Types.ObjectId

const orderSchema = new Schema({
    orderNo: {
        unique: true,
        type: String//订单号
    },
    orderTime: {
        type: Date,
        defalut: Date.now()
    },
    orderStatus:String,
    orderPrice:String,
    orderCertificate:Array,//交易凭证
    product: {
        type: ObjectId,
        ref: 'Product'
    },
    productCatalog: {
        type: ObjectId,
        ref: 'ProductCatalog'
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

orderSchema.pre('save', function() {
    if (this.isNew) {
        this.createdAt = this.updatedAt = Date.now()
    } else {
        this.updatedAt = Date.now()
    }
    next()
})

module.exports = orderSchema