/**采购商管理
 */
 import request from '@/utils/request'


// 获取轮播
export function getCarousel(){
      return request({
            url:'/carousel/',
            method:'get'
      })
}

// 添加轮播
export function addCarousel(data) {
      return request({
        url:'/carousel/add',
        method: 'post',
        data
      })
}

// 删除轮播
export function delCarousel(data){
      return request({
            url:`/carousel/del/${data}`,
            method: 'delete'
          })
}
