/**文件上传
 */
 import request from '@/utils/request'


// 添加
export function addFile(data) {
      return request({
        url:'/upload/file/add',
        method: 'post',
        data
      })
}

