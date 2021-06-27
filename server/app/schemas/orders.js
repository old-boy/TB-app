const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 获取ObjectId,populate需用到，用于表与表的关联
const ObjectId = Schema.Types.ObjectId

const orderSchema = new Schema({
    orderNo: {
        unique: true,
        type: String//订单号
    },
    productCatalog: {
        type: ObjectId,
        ref: 'ProductCatalog' //商品分类 
    },
    productNum: Number, //商品数量
    // buyerCompanyName:{
    //     type: ObjectId,
    //     ref: 'Buyers' //采购商
    // },
    username: String, //收货人
    userTel:String, //收货人手机号
    orderDate: Date, //下单时间
    product: {
        type: ObjectId,
        ref: 'Product' //商品名称
    },
   
    orderStatus:Boolean, //订单状态
    orderPrice:String, //订单金额
    orderCertificate:Array,//交易凭证
    supplierCompanyName:{
        type: ObjectId,
        ref: 'Suppliers' //供应商
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

// orderSchema.pre('save', function() {
//     if (this.isNew) {
//         this.createdAt = this.updatedAt = Date.now()
//     } else {
//         this.updatedAt = Date.now()
//     }
//     next()
// })

module.exports = orderSchema