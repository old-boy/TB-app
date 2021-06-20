/**供应商管理
 * 商户管理 merchant
 */
 import request from '@/utils/request'


// 获取商户列表
export function getMerchant(){
      return request({
            url:'/business/search',
            method:'get'
      })
}

// 添加商户
export function addMerchant(data) {
      return request({
        url:'/business/add',
        method: 'post',
        data
      })
}