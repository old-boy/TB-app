import {getMerchant,addMerchant} from '@/api/suuply'

const suuply = {
      namespaced: true,
      state: {
            merchantList: []
      },
      mutations:{
            SET_MERCHANT_LIST: (state, merchantList) => {
                  state.merchantList = merchantList
            }
      },
      actions:{
            //查询商户
            MerchantList({ commit }){
                  return new Promise((reslove, reject) => {
                        getMerchant().then(response => {
                              commit('SET_MERCHANT_LIST',response)
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            //新增商户
            MerchantAdd({ commit }, data){
                  return new Promise((reslove, reject) => {
                        addMerchant(data).then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            }
      }
}

export default suuply