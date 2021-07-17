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
              <el-form-item label="姓名">
                <el-input
                  v-model="form.buyerName"
                  placeholder="请输入供应商姓名"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="电话">
                <el-input
                  v-model="form.buyerTel"
                  placeholder="请输入供应商电话"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  v-model="form.buyerEmail"
                  placeholder="请输入供应商地址"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="邀请码">
                <el-input
                  v-model="form.buyerAddress"
                  placeholder="请输入邀请码"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="相关资源">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="url"
                  :preview-src-list="srcList"
                >
                </el-image>
              </el-form-item>
              <el-form-item label="审核状态">
                <el-form-item label="状态">
                  <el-switch
                    v-model="form.productStatus"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                  >
                  </el-switch>
                </el-form-item>
                  </el-form>
                  
                  <span slot="footer">
                        <el-button size="small" @click="cancel">Cancel</el-button>
                        <el-button @click="addModal" type="success" size="mini">同意</el-button>
                        <el-button @click="addModal" type="danger" size="mini">拒绝</el-button>
                        <el-button @click="addModal" type="danger" size="mini">删除</el-button>
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
                  buyerInfoList:[],
                  form:{
                        buyerCompanyName:'',
                        buyerCompanyAddres:'',
                        buyerCompanyTel:'',
                        buyerInfo:''
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
            getValue(value){
                  this.form.buyerInfo = value
            },
            getBuyerInfoList(){
                  this.$store.dispatch('buyers/GetBuyerInfo').then((data) => {
                        if(data.status == 200){
                              this.buyerInfoList = data.data.result
                        }
                  })
            },
            add(){
                  this.dialogVisible = true
                  this.disable = false
                  this.form = {
                        id:null,
                        buyerCompanyName:'',
                        buyerCompanyAddres:'',
                        buyerCompanyTel:'',
                        buyerInfo:''
                  }
                  
                  this.title = this.addTitle
                  this.getBuyerInfoList()
            },
            edit(){},
            save(){
                  this.loading = true
                  this.$refs.form.validate((valid) => {
                        if(valid){
                              let buyerCompanyName = this.form.buyerCompanyName
                              let buyerCompanyAddres = this.form.buyerCompanyAddres
                              let buyerCompanyTel = this.form.buyerCompanyTel
                              let buyerInfo = this.form.buyerInfo
                             
                              var newForm = {
                                    buyerCompanyName,
                                    buyerCompanyAddres,
                                    buyerCompanyTel,
                                    buyerInfo
                              }
                              this.$store.dispatch('buyers/AddBuyer',newForm).then((data) => {
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
                              this.$parent.getBuyerList()
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