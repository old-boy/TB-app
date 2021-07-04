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
                        <el-form-item label="姓名">
                              <el-input v-model="form.buyerName" placeholder="请输入采购员姓名" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="电话">
                              <el-input v-model="form.buyerTel" placeholder="请输入采购员电话" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱">
                             <el-input v-model="form.buyerEmail" placeholder="请输入采购员邮箱地址" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="联系地址">
                             <el-input v-model="form.buyerAddress" placeholder="请输入采购员联系地址" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="采购公司">
                              <el-select
                                    v-model="form.buyerCompanyList"
                                    placeholder="请选择采购商"
                                    ref="selection"
                                    @change="getValue"
                              >
                                    <el-option
                                    v-for="item in buyerCompanyList"
                                    :key="item.id"
                                    :label="item.buyerCompanyName"
                                    :value="item._id"
                                    />
                              </el-select>
                        </el-form-item>
                        <el-form-item label="头像">
                             <Upload ref="upload" />
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
import Upload from './upload.vue'
export default {
      name:'Edit',
      components:{
            Upload
      },
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
                        buyerAvatar:'',
                        buyerName:'',
                        buyerTel:'',
                        buyerEmail:'',
                        buyerAddress:'',
                        buyerCompanyName:'上百香果'
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
            getBuyerList(){
                  this.$store.dispatch('buyers/GetBuyer').then((data) => {
                        if(data.status == 200){
                        this.loadingFlag = false
                        this.buyerCompanyList = data.data.result
                        }
                  })
            },
            getValue(value){
                  this.form.buyerCompanyName = value
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
                        buyerCompanyName:'上百午果公司'
                  }
                  
                  this.title = this.addTitle
                  this.getBuyerList()
            },
            edit(){},
            save(){
                  this.loading = true
                  this.$refs.form.validate((valid) => {
                        if(valid){
                              let buyerAvatar = this.form.buyerAvatar
                              let buyerName = this.form.buyerName
                              let buyerTel = this.form.buyerTel
                              let buyerEmail = this.form.buyerEmail
                              let buyerAddress = this.form.buyerAddress
                              let buyerCompanyName = this.form.buyerCompanyName
                              
                              var newForm = {
                                    buyerAvatar,
                                    buyerName,
                                    buyerTel,
                                    buyerEmail,
                                    buyerAddress,
                                    buyerCompanyName
                              }
                              console.log('add +++' + newForm)
                              this.$store.dispatch('buyers/AddBuyerInfo',newForm).then((data) => {
                                    if(data.status == 200){
                                          this.loading = false
                                          this.dialogVisible = false
                                          this.$message({
                                                message: data.message,
                                                showClose: true,
                                                type: 'success'
                                          })
                                    }
                              })
                              this.$parent.getBuyerInfoList()
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