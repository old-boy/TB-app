/**采购商管理
 */
 import request from '@/utils/request'


// 获取采购商员工列表
export function getBuyerInfo(){
      return request({
            url:'/buyerInfo/',
            method:'get'
      })
}

// 添加采购商员工
export function addBuyerInfo(data) {
      return request({
        url:'/buyerInfo/add',
        method: 'post',
        data
      })
}

// 获取采购商列表
export function getBuyer(){
      return request({
            url:'/buyer/',
            method:'get'
      })
}

// 添加采购商
export function addBuyer(data) {
      return request({
        url:'/buyer/add',
        method: 'post',
        data
      })
}

//查询邀请供应商 /buyer/inviter
export function getBuyerInviter(){
      return request({
            url:'/buyer/inviter/',
            method:'get'
      })
}

// 新增邀请供应商
export function addBuyerInviter(data) {
      return request({
        url:'/buyer/inviter/add',
        method: 'post',
        data
      })
}