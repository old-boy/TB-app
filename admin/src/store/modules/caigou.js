import { 
      getCaigouInfo,
      addCaigouInfo,
      getCaigou,
      addCaigou,
      getCaigouGuanxi,
      addCaigouGuanxi,
      delCaigou,
      delCaigouInfo,
      delCaigouGuanxi
 } from '@/api/caigou'

 const caigou = {
      namespaced: true,
      state: {
            buyersList: []
      },
      mutations:{
            SET_BUYERS_LIST: (state, buyersList) => {
                  state.buyersList = buyersList
            }
      },
      actions:{
            //查询采购商员工
            GetCaigouInfo({ commit }){
                  return new Promise((reslove, reject) => {
                        getCaigouInfo().then(response => {
                              commit('SET_BUYERS_LIST',response)
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            //新增员工
            AddCaigouInfo({ commit }, data){
                  return new Promise((reslove, reject) => {
                        addCaigouInfo(data).then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            //查询采购商
            GetCaigou({ commit }){
                  return new Promise((reslove, reject) => {
                        getCaigou().then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            //新增采购商
            AddCaigou({ commit }, data){
                  return new Promise((reslove, reject) => {
                        addCaigou(data).then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            // 删除采购商 
            DelCaigou({ commit }, data){
                  return new Promise((reslove, reject) => {
                        delCaigou(data).then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            
            // 删除采购商 员工
            DelCaigouInfo({ commit }, data){
                  return new Promise((reslove, reject) => {
                        delCaigouInfo(data).then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            //查询邀请关系表
            GetCaigouGuanxi({ commit }){
                  return new Promise((reslove, reject) => {
                        getCaigouGuanxi().then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            //新增邀请关系表
            AddCaigouGuanxi({ commit }, data){
                  return new Promise((reslove, reject) => {
                        addCaigouGuanxi(data).then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            //删除邀请关系表
            DelCaigouGuanxi({ commit }, data){
                  return new Promise((reslove, reject) => {
                        delCaigouGuanxi(data).then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
      }
}

export default caigou