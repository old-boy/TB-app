import { 
      getCaigouInfo,
      addCaigouInfo,
      getCaigou,
      addCaigou,
      getBuyerInviter,
      addBuyerInviter
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
            //查询邀请供应商
            GetBuyerInviter({ commit }){
                  return new Promise((reslove, reject) => {
                        getBuyerInviter().then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            //新增邀请供应商
            AddBuyerInviter({ commit }, data){
                  return new Promise((reslove, reject) => {
                        addBuyerInviter(data).then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
      }
}

export default caigou