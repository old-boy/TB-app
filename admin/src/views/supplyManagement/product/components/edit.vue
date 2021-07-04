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
                        <el-form-item label="商品名称">
                              <el-input v-model="form.productName" placeholder="请输入商品名称"></el-input>
                        </el-form-item>
                        <el-form-item label="产地">
                             <el-input v-model="form.productOrigin"></el-input>
                        </el-form-item>
                        <el-form-item label="产品分类">
                              <el-select v-model="form.productCatalog" placeholder="请选择商品分类"  >
                                    <el-option
                                    v-for="item in catalogNameList"
                                    :key="item.id"
                                    :label="item.catalogName"
                                    :value="item._id"
                                    @change="getCatalogValue"
                                    />
                              </el-select>
                        </el-form-item>
                        <el-form-item label="品牌">
                             <el-select v-model="form.brandName" placeholder="请选择品牌"  >
                                    <el-option
                                    v-for="item in brandNameList"
                                    :key="item.id"
                                    :label="item.brandName"
                                    :value="item._id"
                                    @change="getBrandValue"
                                    />
                              </el-select>
                        </el-form-item>
                        
                        <el-form-item label="商品售价">
                             <el-input v-model="form.productPrice"></el-input>
                        </el-form-item>
                        <el-form-item label="商品库存">
                             <el-input v-model="form.productTotal"></el-input>
                        </el-form-item>
                        <el-form-item label="销量">
                             <el-input v-model="form.productSalesTotal"></el-input>
                        </el-form-item>
                        <el-form-item label="状态">
                             <el-switch
                              v-model="form.productStatus"
                              active-color="#13ce66"
                              inactive-color="#ff4949">
                              </el-switch>
                        </el-form-item>
                        <el-form-item label="商品主图">
                             <Upload ref="upload" v-model="form.productMainPicture" />
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
import Upload from "./upload.vue";
export default {
      name:'Edit',
      components: {
            Upload
      },
      data() {
            return {
                  title:'新增产品',
                  addTitle:'新增产品',
                  editTitle:'编辑产品',
                  dialogVisible: false,
                  loading: false,
                  catalogNameList:[],
                  brandNameList:[],
                  form:{
                        productName:'',
                        productCatalog:'',
                        productMainPicture:'',
                        productPrice:'',
                        productTotal:'',
                        productSalesTotal:'',
                        productStatus:false,
                        productOrigin:'',
                        brandName:''
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
            getBrandValue(value){
                  this.form.brandName = value
            },
            getCatalogValue(value){
                  this.form.productCatalog = value
            },
            getCatalogList(){
                  this.$store.dispatch('suuply/GetProductCatalog').then((data) => {
                        if(data.status == 200){
                              let arr = data.data.result
                              arr.map((value,key) => {
                                    let catalogName = value.catalogName
                                    
                                    let id = value._id
                                    let itemEntity = {
                                          id,
                                          catalogName
                                    }
                                    console.log('catalogname +++' + itemEntity)
                                    this.catalogNameList.push(itemEntity)
                              })
                              
                        }
                  })
               
            },
            getBrandList(){
                  this.$store.dispatch('suuply/GetBrand').then((data) => {
                        if(data.status == 200){
                        this.brandNameList = data.data.result
                        }
                  })
            },
            getCatalogList(){
                  this.$store.dispatch('suuply/GetProductCatalog').then((data) => {
                        if(data.status == 200){
                        this.catalogNameList = data.data.result
                        }
                  })
               
            },
            add(){
                  this.dialogVisible = true
                  this.disable = false
                  this.form = {
                        id:null,
                        productName:'',
                        productCatalog:'',
                        productMainPicture:'',
                        productPrice:'',
                        productTotal:'',
                        productSalesTotal:'',
                        productStatus:false,
                        productOrigin:'',
                        brandName:''
                  }
                  
                  this.title = this.addTitle
                  this.getCatalogList()
                  this.getBrandList()
            },
            edit(){},
            save(){
                  this.loading = true
                  this.$refs.form.validate((valid) => {
                        if(valid){
                              let productName = this.form.productName
                              let productCatalog = this.form.productCatalog
                              let productMainPicture = this.form.productMainPicture
                              let productPrice = this.form.productPrice
                              let productTotal = this.form.productTotal
                              let productSalesTotal = this.form.productSalesTotal
                              let productStatus = this.form.productStatus
                              let productOrigin = this.form.productOrigin
                              let brandName = this.form.brandName
                             
                              
                              var newForm = {
                                    productName,
                                    productCatalog,
                                    productMainPicture,
                                    productPrice,
                                    productTotal,
                                    productSalesTotal,
                                    productStatus,
                                    productOrigin,
                                    brandName
                              }
                              console.log('add +++' + newForm)
                              this.$store.dispatch('suuply/AddProduct',newForm).then((data) => {
                                    if(data.status == 200){
                                          this.loading = false
                                          this.dialogVisible = false
                                          this.$message({
                                                message: '添加成功',
                                                showClose: true,
                                                type: 'success'
                                          })
                                    }else if(data.status == 400){
                                          this.$message({
                                                message: data.message,
                                                showClose: true,
                                                type: 'danger'
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