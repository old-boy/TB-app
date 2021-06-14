// import { getBusiness, addBusiness } from '@/api/business'

// const state = {
//      businessList:[] 
// }

// const mutations = {
//       SET_BUSINESS_LIST: (state, businessList) => {
//         state.businessList = businessList
//       }
// }
// const actions = {
//       namespaced: true,
//       state: {
//       },
//       mutations: {
//       },
//       actions: {
//             AddBusiness({ commit },data) {
//                   return new Promise((resolve, reject) => {
//                         addBusiness(data).then(res => {
//                               resolve(res)
//                         }).catch(err => {
//                               reject(err)
//                         })
//                   })
//             },
//             GetBusiness({ commit, state }){
//                   return new Promise((resolve, reject) => {
//                         getBusiness().then(res => {
//                               resolve(res)
//                         }).catch(err => {
//                               reject(err)
//                         })
//                   })
//             }
//       }
// }
    
// export default {
//       namespaced: true,
//       state,
//       mutations,
//       actions
// }
    