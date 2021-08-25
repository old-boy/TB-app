/*
 * @Author: your name
 * @Date: 2021-05-29 19:51:54
 * @LastEditTime: 2021-08-25 22:53:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \TB-app\server\app\schemas\onlineShowroom.js
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 获取ObjectId,populate需用到，用于表与表的关联
const ObjectId = Schema.Types.ObjectId

const onlineShowroomSchema = new Schema({
    showroomName:String,
    showroomThumbnail: String,
    showroomStatus:Boolean,
    caigou:{
        type: ObjectId,
        ref: 'Caigou' //采购商
    },
    productNum:Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        defalut: Date.now
    }
}) 



module.exports = onlineShowroomSchema