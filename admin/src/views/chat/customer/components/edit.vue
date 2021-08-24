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
                        <el-form-item label="标题">
                              <el-input v-model="form.title" placeholder="请输入标题" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="序号">
                              <el-input v-model="form.sort" placeholder="请输入序号" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="操作人">
                              <el-input v-model="form.userName" placeholder="请输入操作人" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="链接地址">
                              <el-input v-model="form.url" placeholder="请输入链接地址" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="轮播位置">
                             <el-input v-model="form.position" placeholder="请输入位置" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="状态">
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
      name:'Edit',
      data() {
            return {
                  title:'',
                  addTitle:'新增',
                  editTitle:'编辑',
                  dialogVisible: false,
                  loading: false,
                  form:{
                        title:'',
                        thumbnail:'',
                        url:'',
                        position:'',
                        status:false,
                        sort:'',
                        userName:''
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
                        title:'',
                        thumbnail:'',
                        url:'',
                        position:'',
                        status:false,
                        sort:'',
                        userName:''
                  }
                  
                  this.title = this.addTitle
            },
            edit(){},
            save(){
                  this.loading = true
                  this.$refs.form.validate((valid) => {
                        if(valid){
                              const title = this.form.title
                              const thumbnail = this.form.thumbnail
                              const url = this.form.url
                              const position = this.form.position
                              const status = this.form.status
                              const sort = this.form.sort
                              const userName = this.form.userName
                             
                              var newForm = {
                                    title,
                                    thumbnail,
                                    url,
                                    position,
                                    status,
                                    sort,
                                    userName
                              }
                              this.$store.dispatch('carousel/AddCarousel',newForm).then((data) => {
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