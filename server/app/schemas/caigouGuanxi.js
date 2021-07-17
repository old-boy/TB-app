/**采购商关系管理
 * 邀请人（平台客服表）
 * 被邀请供应商(供应商表)
 * 被邀请其它采购商(采购商表)
 */

 const mongoose = require('mongoose')
 const Schema = mongoose.Schema
 
 const ObjectId = Schema.Types.ObjectId
 
 
 const caigouGuanxiSchema = new Schema({
     inviter: {
         type: ObjectId,
         ref: 'Users' //邀请人
     },
     inviterSource:{
         type:String //邀请人来源
     },
     supplierCompanyName:{
         type: ObjectId,
         ref: 'Suppliers' //供应商
     },
     buyerCompanyName:{
         type: ObjectId,
         ref:'Caigou'
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
 

 module.exports = caigouGuanxiSchema