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
                                    v-model="form.caigouInfo"
                                    placeholder="请选择公司采购员"
                                    ref="selection"
                                    @change="getValue"
                              >
                                    <el-option
                                    v-for="item in caigouInfoList"
                                    :key="item._id"
                                    :label="item.buyerName"
                                    :value="item._id"
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
                  caigouInfoList:[],
                  form:{
                        buyerCompanyName:'',
                        buyerCompanyAddres:'',
                        buyerCompanyTel:'',
                        caigouInfo:''
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
                  this.$store.dispatch('caigou/GetCaigouInfo').then((data) => {
                        if(data.status == 200){
                              this.caigouInfoList = data.data.result
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
                        caigouInfo:''
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
                              let caigouInfo = this.form.caigouInfo
                             
                             console.log('aaafasdfadfa ++ ' + this.form.caigouInfo)
                              var newForm = {
                                    buyerCompanyName,
                                    buyerCompanyAddres,
                                    buyerCompanyTel,
                                    caigouInfo
                              }
                              this.$store.dispatch('caigou/AddCaigou',newForm).then((data) => {
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