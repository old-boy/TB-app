const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 获取ObjectId,populate需用到，用于表与表的关联
const ObjectId = Schema.Types.ObjectId

const brandSchema = new Schema({
    brandName: {
        unique: true,
        type: String
    },
    brandDescription:String, //描述
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        defalut: Date.now
    }
}) 

// brandSchema.pre('save', function() {
//     if (this.isNew) {
//         this.createdAt = this.updatedAt = Date.now()
//     } else {
//         this.updatedAt = Date.now()
//     }
//     next()
// })

module.exports = brandSchema