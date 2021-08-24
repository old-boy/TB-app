/*
 * @Author: kk
 * @Date: 2021-08-25 01:38:25
 * @LastEditTime: 2021-08-25 01:51:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \TB-app\admin\src\api\platform.js
 * 平台接口
 */

 import request from '@/utils/request'


// 获取线上展厅数据
export function getOnLineRoom(){
      return request({
            url:'/platform/online/room/',
            method:'get'
      })
}

// 添加线上展厅数据
export function addOnLineRoom(data) {
      return request({
        url:'/platform/online/room/add',
        method: 'post',
        data
      })
}

// 删除线上展厅数据
export function delOnLineRoom(data){
      return request({
            url:`/platform/online/room/del/${data}`,
            method: 'delete'
          })
}
