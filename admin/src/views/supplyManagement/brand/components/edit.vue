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
                        <el-form-item label="品牌名称">
                              <el-input v-model="form.brandName" placeholder="请输入品牌名称"></el-input>
                        </el-form-item>
                        <el-form-item label="品牌信息" prop="desc">
                              <el-input type="textarea" v-model="form.brandDescription" placeholder="请输入品牌信息"></el-input>
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
import { addMerchant } from "@/api/suuply";
export default {
      data() {
            return {
                  title:'新增',
                  addTitle:'新增客户',
                  editTitle:'编辑客户',
                  dialogVisible: false,
                  loading: false,
                  form:{
                        brandName:'',
                        brandDescription:''
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
            add(){
                  this.dialogVisible = true
                  this.disable = false
                  this.form = {
                        id:null,
                        brandName:'',
                        brandDescription:''
                  }
                  this.title = this.addTitle
            },
            edit(){},
            save(){
                  this.loading = true
                  this.$refs.form.validate((valid) => {
                        if(valid){
                              var newForm = {
                                    brandName:this.form.brandName,
                                    brandDescription:this.form.brandDescription
                              }
                              this.$store.dispatch('suuply/AddBrand',newForm).then((data) => {
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