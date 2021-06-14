/**用户权限
 * 角色名称
 * 角色码
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const roleSchema = new Schema({
    //0: normal 普通用户  1: verify 邮件激活后的用户 2: customer 平台客服 3: businesser 经销商 4: africanBuyer 非洲采购  10: admin 管理员 >50: super admin 超级管理员(开发时候用)
    roleName: String,
    roleCode:Number,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

roleSchema.pre('save', function(next) {
    if (this.isNew) {
        this.createdAt = this.updatedAt = Date.now()
    } else {
        this.updatedAt = Date.now()
    }
    next()
})

module.exports = roleSchema