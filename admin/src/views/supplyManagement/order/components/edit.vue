<template>
  <div class="edit-dialog">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="70%"
      @close="handleClose"
      class="dialog-box"
    >
      <span></span>

      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        label-width="80px"
        :inline="false"
        size="normal"
      >
        <el-row :gutter="10">
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"></el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <div class="grid-content bg-purple left">
              <el-form-item label="订单编号">
                <el-input
                  v-model="form.orderNo"
                  placeholder="请输入订单编号"
                ></el-input>
              </el-form-item>
              <el-form-item label="订单时间">
                <el-date-picker
                  v-model="form.orderDate"
                  type="datetime"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="订单金额">
                <el-input
                  v-model="form.orderPrice"
                  placeholder="请输入订单金额"
                ></el-input>
              </el-form-item>
              <el-form-item :span="4" label="产品数量">
                <el-input v-model="form.productNum"></el-input>
              </el-form-item>
              <el-form-item label="收货人">
                <el-input v-model="form.username"></el-input>
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input v-model="form.userTel"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <div class="grid-content bg-purple-light right">
              <el-form-item label="产品名称">
                <el-select v-model="form.product" placeholder="请选择商品">
                  <el-option
                    v-for="item in productList"
                    :key="item.id"
                    :label="item.productName"
                    :value="item._id"
                    @change="getProductValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="产品分类">
                <el-select
                  v-model="form.productCatalog"
                  placeholder="请选择商品分类"
                >
                  <el-option
                    v-for="item in catalogNameList"
                    :key="item.id"
                    :label="item.catalogName"
                    :value="item._id"
                    @change="getCatalogValue"
                  />
                </el-select>
              </el-form-item>
              
              <el-form-item label="供应商">
                <el-select
                  v-model="form.business"
                  placeholder="请选择供应商"
                >
                  <el-option
                    v-for="item in businessCompanyList"
                    :key="item.id"
                    :label="item.companyName"
                    :value="item._id"
                    @change="getBusinessValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="采购商">
                <el-select
                  v-model="form.caigou"
                  placeholder="请选择采购商"
                >
                  <el-option
                  v-for="item in caiGouCompanyList"
                  :key="item.id"
                  :label="item.buyerCompanyName"
                  :value="item._id"
                  @change="getCaigoValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="订单状态">
                <el-switch
                  v-model="form.orderStatus"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                >
                </el-switch>
              </el-form-item>
              <el-form-item label="交易凭证">
                <Upload ref="upload" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"></el-col>
        </el-row>
      </el-form>

      <span slot="footer">
        <el-button size="small" @click="cancel">Cancel</el-button>
        <el-button :loading="loading" size="small" type="primary" @click="save"
          >Save</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Upload from "./upload.vue";
export default {
  name: "Edit",
  components: {
    Upload
  },
  data() {
    return {
      title: "新增订单",
      editTitle: "编辑订单",
      dialogVisible: false,
      loading: false,
      catalogNameList: [],
      businessCompanyList: [],
      caiGouCompanyList: [],
      productList: [],
      form: {
        orderNo: "",
        product:'',
        productCatalog: "",
        productNum: "",
        business: "",
        caigou: "",
        username: "",
        orderStatus: false,
        userTel: "",
        orderDate: "",
        orderPrice: "",
        orderCertificate: []
      },
      show: false,
      display: true,
      visible: false,
      rules: {}
    };
  },
  created() {},
  methods: {
    handleClose(done) {
      this.dialogVisible = false;
    },
    getBusinessCompanyList() {
      this.$store.dispatch("suuply/MerchantList").then(data => {
        if (data.status == 200) {
          this.businessCompanyList = data.data.result;
        }
      });
    },
    getCaigoValue(value){
          this.form.caigou = value
    },
    getBusinessValue(value){
          this.form.business = value
    },
    getCatalogValue(value){
          this.form.productCatalog = value
    },
    getProductValue(value){
          this.form.product = value
    },
    getCaigouList(){
          this.$store.dispatch('caigou/GetCaigou').then((data) => {
                if(data.status == 200){
                      this.loadingFlag = false
                      this.caiGouCompanyList = data.data.result
                }
          })
    },
    getProductList() {
      this.$store.dispatch("suuply/GetProductList").then(data => {
        if (data.status == 200) {
          this.productList = data.data.result;
        }
      });
    },
    getCatalogList() {
      this.$store.dispatch("suuply/GetProductCatalog").then(data => {
        if (data.status == 200) {
          this.catalogNameList = data.data.result;
        }
      });
    },
    
    add() {
      this.dialogVisible = true;
      this.disable = false;
      this.form = {
        id: null,
        orderNo: "",
        product:'',
        productCatalog: "",
        productNum: "",
        business: "",
        caigou: "",
        username: "",
        orderStatus: false,
        userTel: "",
        orderDate: "",
        orderPrice: "",
        orderCertificate: []
      };

      this.title = "新增";
      this.getCatalogList();
      this.getBusinessCompanyList();
      this.getProductList();
      this.getCaigouList()
      // this.getBrandNameList()
    },
    edit() {},
    save() {
      this.loading = true;
      this.$refs.form.validate(valid => {
        if (valid) {
            const orderNo = this.form.orderNo;
            const orderDate = this.form.orderDate;
            const orderPrice = this.form.orderPrice;
            const productNum = this.form.productNum;
            const username = this.form.username;
            const userTel = this.form.userTel;
            const productCatalog = this.form.productCatalog;
            const product = this.form.product;
            const caigou = this.form.caigou;
            const business = this.form.business;
            const orderStatus = this.form.orderStatus;
            const orderCertificate = this.form.orderCertificate;

          var newForm = {
            orderNo,
            orderDate,
            orderPrice,
            productNum,
            username,
            userTel,
            productCatalog,
            product,
            caigou,
            business,
            orderStatus
          };
          this.$store.dispatch("suuply/AddOrder", newForm)
            .then(data => {
              if (data.status == 200) {
                this.loading = false;
                this.dialogVisible = false;
                this.$message({
                  message: "添加成功",
                  showClose: true,
                  type: "success"
                });
              }
            });
            this.$parent.getTableList()
        }
      });
    },

    cancel() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    onSubmit() {}
  }
};
</script>
<style lang="scss" scoped></style>
