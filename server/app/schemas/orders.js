const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 获取ObjectId,populate需用到，用于表与表的关联
const ObjectId = Schema.Types.ObjectId

const orderSchema = new Schema({
    orderNo: {
        unique: true,
        type: String//订单号
    },
    orderDate: Date,//订单日期
    orderPrice:String, //订单金额
    productNum: Number, //商品数量
    username: String, //收货人
    userTel:String, //收货人手机号
    productCatalog: {
        type: ObjectId,
        ref: 'ProductCatalog' //商品分类 
    },
    product: {
        type: ObjectId,
        ref: 'Product' //商品名称
    },
    caigou:{
        type: ObjectId,
        ref: 'Caigou' //采购商
    },
    business:{
        type: ObjectId,
        ref: 'Business' //供应商
    },
    orderStatus:Boolean, //订单状态
    // orderCertificate:Array,//交易凭证
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        defalut: Date.now
    }
}) 

module.exports = orderSchema