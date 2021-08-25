<!--
 * @Author: your name
 * @Date: 2021-07-11 11:31:50
 * @LastEditTime: 2021-08-25 23:24:43
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \TB-app\admin\src\views\platformManagement\features\memberShowroom\components\edit.vue
-->
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
                        <el-form-item label="房间标题">
                              <el-input v-model="form.showroomName" placeholder="请输入房间名称" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="房间缩略图">
                              <el-input v-model="form.showroomThumbnail" placeholder="请输入产品数量" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="产品数量">
                              <el-input v-model="form.productNum" placeholder="请输入产品数量" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="状态">
                             <el-switch
                              v-model="form.showroomStatus"
                              active-color="#13ce66"
                              inactive-color="#ff4949">
                              </el-switch>
                        </el-form-item>
                        <el-form-item label="操作人">
                             <el-select
                                    v-model="form.caigou"
                                    placeholder="请选择员工"
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
                        showroomName:'',
                        showroomThumbnail:'',
                        showroomStatus:false,
                        caigou:'',
                        productNum:''
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
                        showroomName:'',
                        showroomThumbnail:'',
                        showroomStatus:false,
                        caigou:'',
                        productNum:''
                  }
                  
                  this.title = this.addTitle
                  this.getBuyerInfoList()
            },
            edit(){},
            save(){
                  this.loading = true
                  this.$refs.form.validate((valid) => {
                        if(valid){
                              let showroomName = this.form.showroomName
                              let showroomThumbnail = this.form.showroomThumbnail
                              let showroomStatus = this.form.showroomStatus
                              let caigou = this.form.caigou
                              let productNum = this.form.productNum
                             
                              var newForm = {
                                    showroomName,
                                    showroomThumbnail,
                                    showroomStatus,
                                    caigou,
                                    productNum
                              }
                              console.log('room  ' + newForm)
                              this.$store.dispatch('platform/AddOnLineRoom',newForm).then((data) => {
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
                              this.$parent.getTableList()
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