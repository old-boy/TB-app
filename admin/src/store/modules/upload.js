import { 
      addFile
 } from '@/api/upload'

 const uploadFile = {
      namespaced: true,
      state: {
            buyersList: []
      },
      mutations:{
            SET_UPLOAD_FILE: (state, uploadFiles) => {
                  state.uploadFiles = uploadFiles
            }
      },
      actions:{
            
            AddFile({ commit }, data){
                  return new Promise((reslove, reject) => {
                        addFile(data).then(response => {
                              reslove(response)
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            
      }
}

export default uploadFile