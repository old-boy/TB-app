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
                        <el-form-item label="选择采购公司" labelWidth="800">
                              <el-select
                                    v-model="form.buyerCompany"
                                    placeholder="请选择采购商"
                                    ref="selection"
                                    @change="getBuyerValue"
                              >
                                    <el-option
                                    v-for="item in buyerCompanyList"
                                    :key="item.id"
                                    :label="item.buyerCompanyName"
                                    :value="item._id"
                                    />
                              </el-select>
                        </el-form-item>
                        <el-form-item label="被邀请供应商" labelWidth="600">
                              <el-select
                                    v-model="form.supplierCompany"
                                    placeholder="请选择供应商"
                              >
                                    <el-option
                                    v-for="item in supplierCompanyList"
                                    :key="item._id"
                                    :label="item.companyName"
                                    :value="item._id"
                                    />
                        </el-select>
                        </el-form-item>
                        <el-form-item label="邀请名称 [不可重复]" labelWidth="600">
                              <el-input v-model="form.inviterName" placeholder="邀请名称"></el-input>
                        </el-form-item>
                        <el-form-item label="邀请人" labelWidth="600">
                              <el-input v-model="form.inviter" placeholder="邀请人"></el-input>
                        </el-form-item>
                        <el-form-item label="邀请人来源" labelWidth="600">
                              <el-input v-model="form.inviterSource" placeholder="邀请人来源"></el-input>
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
                  supplierCompanyList:[],
                  form:{
                        inviterName:'',
                        buyerCompany:'',
                        supplierCompany:'',
                        inviter:'',
                        inviterSource:''
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
            getBuyerValue(value){
                  this.form.buyerCompany = value
            },
            getSupplierValue(value){
                  this.form.supplierCompany = value
            },
            getBuyerList(){
                  this.$store.dispatch('buyers/GetBuyer').then((data) => {
                        if(data.status == 200){
                              this.buyerCompanyList = data.data.result
                        }
                  })
            },
            getSupplierList(){
                  this.$store.dispatch('suuply/MerchantList').then((data) => {
                        if(data.status == 200){
                              this.supplierCompanyList = data.data.result
                        }
                  })
            },
            add(){
                  this.dialogVisible = true
                  this.disable = false
                  this.form = {
                        id:null,
                        inviterName:'',
                        buyerCompany:'',
                        supplierCompany:'',
                        inviter:'',
                        inviterSource:''
                  }
                  
                  this.title = this.addTitle
                  this.getBuyerList()
                  this.getSupplierList()
            },
            edit(){},
            save(){
                  this.loading = true
                  this.$refs.form.validate((valid) => {
                        if(valid){
                              let inviterName = this.form.inviterName
                              let buyerCompany = this.form.buyerCompany
                              let supplierCompany = this.form.supplierCompany
                              let inviter = this.form.inviter
                              let inviterSource = this.form.inviterSource
                              
                              var newForm = {
                                    inviterName,
                                    buyerCompany,
                                    supplierCompany,
                                    inviter,
                                    inviterSource
                              }
                              console.log('add +++' + newForm)
                              this.$store.dispatch('buyers/AddBuyerInviter',newForm).then((data) => {
                                    if(data.status == 200){
                                          this.loading = false
                                          this.dialogVisible = false
                                          this.$message({
                                                message: '添加成功',
                                                showClose: true,
                                                type: 'success'
                                          })
                                    }
                              })
                         this.$parent.getDataList()
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