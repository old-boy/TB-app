/**
 * 上传
 */

 const mongoose = require('mongoose')
 const Schema = mongoose.Schema
 const ObjectId = Schema.Types.ObjectId
 
 const uploadSchema = new Schema({
      name: String,
      url: String,
      type: String,
      size: String,
      createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            defalut: Date.now
        }
 }) 
 
 
 module.exports = uploadSchema