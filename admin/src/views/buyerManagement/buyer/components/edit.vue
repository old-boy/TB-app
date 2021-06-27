<template>
      <div class="edit-dialog">
            <el-dialog
                  :title="title"
                  :visible.sync="dialogVisible"
                  width="30%"
                  @close="handleClose"
                  class="dialog-box">
                  <span></span>
                  <el-form :model="form" ref="form" :rules="rules" label-width="80px" :inline="false" size="normal">
                        <el-form-item label="公司名称">
                              <el-input v-model="form.buyerCompanyName" placeholder="请输入公司名称" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="公司地址">
                              <el-input v-model="form.buyerCompanyAddres" placeholder="请输入公司地址" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="公司电话">
                             <el-input v-model="form.buyerCompanyTel" placeholder="请输入公司电话" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="采购员">
                             <el-select
                                    v-model="form.buyerList"
                                    placeholder="请选择公司采购员"
                                    multiple
                              >
                                    <el-option
                                    v-for="item in buyerList"
                                    :key="item.id"
                                    :label="item.buyerInfo"
                                    :value="item.buyerInfo"
                                    />
                              </el-select>
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
      name:'Edit',
      data() {
            return {
                  title:'',
                  addTitle:'新增',
                  editTitle:'编辑',
                  dialogVisible: false,
                  loading: false,
                  saveDataList:[],
                  buyerCompanyList:[],
                  form:{
                        companyName:'',
                        factoryName:'',
                        brandNumber:'',
                        invitationPeople:'',
                        supplierCompanyName:'',
                        buyerCompanyName:'',

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
                        buyerAvatar:'',
                        buyerName:'',
                        buyerTel:'',
                        buyerEmail:'',
                        buyerAddress:'',
                        buyerCompanyName:''
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