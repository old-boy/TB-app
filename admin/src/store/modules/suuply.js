import {
      getMerchant,
      addMerchant,
      delMerchant,
      getProductCatalog,
      addProductCatalog,
      getProductList,
      addProduct,
      getOneProductCatalgo,
      getOrderList,
      addOrder,
      getBrand,
      addBrand,
      delBrand,
      delProduct,
      delProductCatalgo,
      delOrder
} from '@/api/suuply'

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
            },
            //删除商户
            DelMerchant({ commit }, data){
                  return new Promise((reslove, reject) => {
                        delMerchant(data).then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            // 查询分类
            GetProductCatalog({commit}){
                  return new Promise((reslove, reject) => {
                        getProductCatalog().then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            //新增分类
            AddProductCatalog({commit},data){
                  return new Promise((reslove, reject) => {
                        addProductCatalog(data).then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            //删除产品分类
            DelProductCatalgo({ commit }, data){
                  return new Promise((reslove, reject) => {
                        delProductCatalgo(data).then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            //查询产品
            GetProductList({commit}){
                  return new Promise((reslove, reject) => {
                        getProductList().then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            //删除产品
            DelProduct({ commit }, data){
                  return new Promise((reslove, reject) => {
                        delProduct(data).then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            //查询某个产品的分类
            GetOneProductCatalgo({commit},params){
                  console.log('eeeee ' + params)
                  return new Promise((reslove, reject) => {
                        getOneProductCatalgo(params).then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            // 查询订单
            GetOrder({commit}){
                  return new Promise((reslove, reject) => {
                        getOrderList().then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            //新增订单
            AddOrder({commit},data){
                  return new Promise((reslove, reject) => {
                        addOrder(data).then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            // 删除订单
            DelOrder({ commit }, data){
                  return new Promise((reslove, reject) => {
                        delOrder(data).then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            // 查询品牌
            GetBrand({commit}){
                  return new Promise((reslove, reject) => {
                        getBrand().then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            //新增品牌
            AddBrand({commit},data){
                  return new Promise((reslove, reject) => {
                        addBrand(data).then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            //删除品牌
            DelBrand({ commit }, data){
                  return new Promise((reslove, reject) => {
                        delBrand(data).then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            //新增产品
            AddProduct({commit},data){
                  return new Promise((reslove, reject) => {
                        addProduct(data).then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
      }
}

export default suuply