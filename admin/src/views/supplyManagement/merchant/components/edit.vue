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
                              <el-input v-model="form.companyName" placeholder="请输入公司名称"></el-input>
                        </el-form-item>
                        <el-form-item label="厂家信息" prop="desc">
                              <el-input type="textarea" v-model="form.factoryName" placeholder="请输入厂家信息"></el-input>
                        </el-form-item>
                        <el-form-item label="品牌数量">
                              <el-input v-model="form.brandNumber"></el-input>
                        </el-form-item>
                        <el-form-item label="邀请人">
                               <el-input v-model="form.invitationPeople" placeholder="请输入邀请人"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="选择被邀请供应商" labelWidth="600">
                              <el-select v-model="form.supplierCompanyName" placeholder="请选择供应商" >
                                    <el-option
                                    v-for="item in supplierCompanyList"
                                    :key="item.id"
                                    :label="item.companyName"
                                    :value="item._id"
                                    @change="getBusinessValue"/>
                              </el-select>
                        </el-form-item> -->
                        <el-form-item label="选择被邀请采购商" labelWidth="600">
                              <el-select v-model="form.caigou" placeholder="请选择采购" >
                                    <el-option
                                    v-for="item in caiGouCompanyList"
                                    :key="item.id"
                                    :label="item.buyerCompanyName"
                                    :value="item._id"
                                    @change="getValue"
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
import { addMerchant } from "@/api/suuply";
export default {
      data() {
            return {
                  title:'新增',
                  addTitle:'新增客户',
                  editTitle:'编辑客户',
                  dialogVisible: false,
                  loading: false,
                  supplierCompanyList:[],
                  caiGouCompanyList:[],
                  form:{
                        companyName:'',
                        factoryName:'',
                        brandNumber:'',
                        invitationPeople:'',
                        caigou:''
                  },
                  show: false,
                  display: true,
                  visible: false,
                  rules:{
                        companyName: [
                              { required: true, message: '请输入公司名称', trigger: 'blur' }
                        ],
                        factoryName: [
                              { required: true, message: '请输入工厂信息', trigger: 'blur' }
                        ],
                        invitationPeople: [
                              { required: true, message: '请输入邀请人名称', trigger: 'blur' }
                        ],
                        buyerCompanyName: [
                              { required: true, message: '请选择采购商', trigger: 'blur' }
                        ]
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
                  this.form.caigou = value
            },
          
            getCaigouList(){
                  this.$store.dispatch('caigou/GetCaigou').then((data) => {
                        if(data.status == 200){
                              this.loadingFlag = false
                              this.caiGouCompanyList = data.data.result
                        }
                  })
            },
            getSupplierCompanyList(){
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
                        companyName:'',
                        factoryName:'',
                        brandNumber:'',
                        invitationPeople:'',
                        caigou:''
                  }
                  this.supplierCompanyList = []
                  this.title = this.addTitle
                  this.getSupplierCompanyList()
                  this.getCaigouList()
            },
            edit(){},
            save(){
                  this.loading = true
                  this.$refs.form.validate((valid) => {
                        if(valid){
                           const companyName = this.form.companyName
                           const factoryName = this.form.factoryName
                           const brandNumber = this.form.brandNumber
                           const invitationPeople = this.form.invitationPeople
                           const caigou = this.form.caigou

                              var newForm = {
                                    companyName,
                                    factoryName,
                                    brandNumber,
                                    invitationPeople,
                                    caigou
                              }
                              console.log('添加商户 +++' + newForm)
                              this.$store.dispatch('suuply/MerchantAdd',newForm).then((data) => {
                                    if(data.status == 200){
                                          this.loading = false
                                          this.dialogVisible = false
                                          this.$message({
                                                message: '添加成功',
                                                showClose: true,
                                                type: 'success'
                                          })
                                    }
                                    this.$parent.getDataList()
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