import { 
      getCarousel,
      addCarousel,
      delCarousel
 } from '@/api/carousel'

 const carousel = {
      namespaced: true,
      state: {},
      mutations:{},
      actions:{
            //查询
            GetCarousel({ commit }){
                  return new Promise((reslove, reject) => {
                        getCarousel().then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            //新增
            AddCarousel({ commit }, data){
                  return new Promise((reslove, reject) => {
                        addCarousel(data).then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            //删除
            DelCarousel({ commit }, data){
                  return new Promise((reslove, reject) => {
                        delCarousel(data).then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
      }
}


export default carousel
