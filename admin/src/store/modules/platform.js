/*
 * @Author: your name
 * @Date: 2021-08-25 01:52:27
 * @LastEditTime: 2021-08-25 01:53:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \TB-app\admin\src\store\modules\platform.js
 */
import { 
      getOnLineRoom,
      addOnLineRoom,
      delOnLineRoom
 } from '@/api/platform'

 const platform = {
      namespaced: true,
      state: {},
      mutations:{},
      actions:{
            //查询
            GetOnLineRoom({ commit }){
                  return new Promise((reslove, reject) => {
                        getOnLineRoom().then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            //新增
            AddOnLineRoom({ commit }, data){
                  return new Promise((reslove, reject) => {
                        addOnLineRoom(data).then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            //删除
            DelOnLineRoom({ commit }, data){
                  return new Promise((reslove, reject) => {
                        delOnLineRoom(data).then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
      }
}


export default platform
