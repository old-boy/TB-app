/**采购商关系管理
 * 邀请人（平台客服表）
 * 被邀请供应商(供应商表)
 * 被邀请其它采购商(采购商表)
 */

 const mongoose = require('mongoose')
 const Schema = mongoose.Schema
 
 const ObjectId = Schema.Types.ObjectId
 
 
 const caigouGuanxiSchema = new Schema({
    caigouGuanxiName: {
        unique: true,
        type: String
    },
     inviter:String, //邀请人
     inviterSource:String, //邀请人来源
     business:{
        type: ObjectId,
        ref: 'Business' //供应商
    },
     caigou:{
         type: ObjectId,
         ref:'Caigou'  //采购商
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
 

 module.exports = caigouGuanxiSchema