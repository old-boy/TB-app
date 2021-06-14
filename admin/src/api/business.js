import request from '@/utils/request'

export function getBusiness() {
      return request({
            url: '/business/search',
            method: 'get'
      })
}

export function addBusiness(data) {
      return request({
        url:'/business/add',
        method: 'post',
        data
      })
}

