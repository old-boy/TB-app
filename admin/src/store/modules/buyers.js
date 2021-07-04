import { 
      getBuyerInfo,
      addBuyerInfo,
      getBuyer,
      addBuyer,
      getBuyerInviter,
      addBuyerInviter
 } from '@/api/buyers'

 const buyers = {
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
            GetBuyerInfo({ commit }){
                  return new Promise((reslove, reject) => {
                        getBuyerInfo().then(response => {
                              commit('SET_BUYERS_LIST',response)
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            //新增员工
            AddBuyerInfo({ commit }, data){
                  return new Promise((reslove, reject) => {
                        addBuyerInfo(data).then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            //查询采购商
            GetBuyer({ commit }){
                  return new Promise((reslove, reject) => {
                        getBuyer().then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            //新增采购商
            AddBuyer({ commit }, data){
                  return new Promise((reslove, reject) => {
                        addBuyer(data).then(response => {
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

export default buyers