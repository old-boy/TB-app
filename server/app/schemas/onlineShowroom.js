const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 获取ObjectId,populate需用到，用于表与表的关联
const ObjectId = Schema.Types.ObjectId

const onlineShowroomSchema = new Schema({
    showroomName:{
        unique: true,
        type: String
    },
    showroomThumbnail: String,
    showroomStatus:String,
    operator:{
        type: ObjectId,
        ref: 'Users' //操作人
    },
    productNum:{
        type: ObjectId,
        ref: 'Product'
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

onlineShowroomSchema.pre('save', function() {
    if (this.isNew) {
        this.createdAt = this.updatedAt = Date.now()
    } else {
        this.updatedAt = Date.now()
    }
    next()
})

module.exports = onlineShowroomSchema