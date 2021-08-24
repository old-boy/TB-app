/**轮播图
 * 标题
 * 缩略图
 * 跳转位置
 * 产品链接
 * 状态
 * 操作人
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 获取ObjectId,populate需用到，用于表与表的关联
const ObjectId = Schema.Types.ObjectId

const carouselSchema = new Schema({
    title: {
        unique: true,
        type: String
    },
    thumbnail:String,
    url:String,
    position:String,
    status:Boolean,
    sort: Number,
    userName:String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        defalut: Date.now
    }
}) 


module.exports = carouselSchema