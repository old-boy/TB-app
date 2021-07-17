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

//查询邀请关系表 
export function getCaigouGuanxi(){
      return request({
            url:'/caigou/guanxi',
            method:'get'
      })
}

// 新增邀请供应商
export function addCaigouGuanxi(data) {
      return request({
        url:'/caigou/guanxi/add',
        method: 'post',
        data
      })
}

// 删除采购商
export function delCaigou(data){
      return request({
            url:`/caigou/del/${data}`,
            method: 'delete'
          })
}

// 删除采购商员工
export function delCaigouInfo(data){
      return request({
            url:`/caigou/info/del/${data}`,
            method: 'delete'
          })
}

// 删除关系表
export function delCaigouGuanxi(data){
      return request({
            url:`/caigou/guanxi/del/${data}`,
            method: 'delete'
      })
}