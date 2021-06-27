/**采购商管理
 */
 import request from '@/utils/request'


// 获取采购商员工列表
export function getBuyerInfo(){
      return request({
            url:'/buyerInfo',
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