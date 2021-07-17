/**采购商管理
 */
 import request from '@/utils/request'


// 获取采购商员工列表
export function getCaigouInfo(){
      return request({
            url:'/caigou/info/',
            method:'get'
      })
}

// 添加采购商员工
export function addCaigouInfo(data) {
      return request({
        url:'/caigou/info/add',
        method: 'post',
        data
      })
}

// 获取采购商列表
export function getCaigou(){
      return request({
            url:'/caigou/',
            method:'get'
      })
}

// 添加采购商
export function addCaigou(data) {
      return request({
        url:'/caigou/add',
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