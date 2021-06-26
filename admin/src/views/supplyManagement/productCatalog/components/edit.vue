<template>
      <div class="edit-dialog">
            <el-dialog
                  title="title"
                  :visible.sync="dialogVisible"
                  width="30%"
                  @close="handleClose"
                  class="dialog-box">
                  <span></span>
                  <el-form :model="form" ref="form" :rules="rules" label-width="80px" :inline="false" size="normal">
                        <el-form-item label="分类名称">
                              <el-input v-model="form.catalogName" placeholder="请输入产品分类名称"></el-input>
                        </el-form-item>
                        <el-form-item label="产品数量">
                              <el-input v-model="form.productTotalNum" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="分类状态">
                             <el-switch
                              v-model="form.status"
                              active-color="#13ce66"
                              inactive-color="#ff4949">
                              </el-switch>
                        </el-form-item>
                  </el-form>
                  
                  <span slot="footer">
                        <el-button size="small" @click="cancel">Cancel</el-button>
                        <el-button :loading="loading" size="small" type="primary" @click="save">Save</el-button>
                  </span>
            </el-dialog>
            
      </div>
</template>

<script>
export default {
      data() {
            return {
                  title:'新增分类',
                  addTitle:'',
                  editTitle:'编辑分类',
                  dialogVisible: false,
                  loading: false,
                  saveDataList:[],
                  form:{
                        catalogName:'',
                        productTotalNum:'',
                        status:''
                  },
                  show: false,
                  display: true,
                  visible: false,
                  rules:{
                        
                  }
            }
      },
     
      mounted() {
            
      },
      created() {
            
      },
      methods: {
            handleClose(done) {
                  this.dialogVisible = false
            },
            getProductNumber(){
                  this.$store.dispatch('suuply/GetProductList').then((data) => {
                        if(data.status == 200){
                              let arr = data.data.result
                              arr.map((value,key) => {
                                    let companyName = value.companyName
                                    let id = value._id
                                    let itemEntity = {
                                          companyName,
                                          id
                                    }
                                    this.supplierCompanyList.push(itemEntity)
                              })
                              
                        }
                  })
            },
            add(){
                  this.dialogVisible = true
                  this.disable = false
                  this.form = {
                        id:null,
                        catalogName:'',
                        productTotalNum:'',
                        status:true
                  }
                  
                  this.title = this.addTitle
                  // this.getSupplierCompanyList()
            },
            edit(){},
            save(){
                  this.loading = true
                  this.$refs.form.validate((valid) => {
                        if(valid){
                              let catalogName = this.form.catalogName
                              let productTotalNum = this.form.productTotalNum ? this.form.productTotalNum : 0
                              let catalogStatus = this.form.status
                             
                              
                              var newForm = {
                                    catalogName,
                                    productTotalNum,
                                    catalogStatus
                              }
                              console.log('add +++' + newForm)
                              this.$store.dispatch('suuply/AddProductCatalog',newForm).then((data) => {
                                    if(data.status == 200){
                                          console.log('saveCatalog ++' + data)
                                          this.loading = false
                                          this.dialogVisible = false
                                          this.$message({
                                                message: '添加成功',
                                                showClose: true,
                                                type: 'success'
                                          })
                                    }
                              })
                         
                        }
                  })
            },
            
            cancel() {
                  this.$refs.form.resetFields()
                  this.dialogVisible = false
            },
            onSubmit(){}
      },
}
</script>
<style lang="scss" scoped></style>