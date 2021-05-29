const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 获取ObjectId,populate需用到，用于表与表的关联
const ObjectId = Schema.Types.ObjectId

const appApplicationSchema = new Schema({
    applicationName: {
        unique: true,
        type: String
    },
    applicationUrl:String,
    applicationQRCode:String,
    applicationVersion:String,
    applicationSize:Number,
    applicationDownloadTotal:Number,
    applicationUpdate:String,
    createdAt: {
        type: Date,
        defalut: Date.now()
    },
    updatedAt: {
        type: Date,
        defalut: Date.now()
    }
}) 

appApplicationSchema.pre('save', function() {
    if (this.isNew) {
        this.createdAt = this.updatedAt = Date.now()
    } else {
        this.updatedAt = Date.now()
    }
    next()
})

module.exports = appApplicationSchema