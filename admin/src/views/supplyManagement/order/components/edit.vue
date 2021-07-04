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

              <el-form-item label="采购商">
                <el-select
                  v-model="form.buyerCompanyName"
                  placeholder="请选择采购商"
                >
                  <el-option
                  v-for="item in buyerCompanyList"
                  :key="item.id"
                  :label="item.buyerCompanyName"
                  :value="item._id"
                  @change="getValue"
                  />
                </el-select>
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
                    :value="item.productName"
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
                    :value="item.catalogName"
                  />
                </el-select>
              </el-form-item>
              <el-form-item :span="4" label="产品数量">
                <el-input v-model="form.productNum"></el-input>
              </el-form-item>
              <el-form-item label="供应商">
                <el-select
                  v-model="form.supplierCompanyName"
                  placeholder="请选择供应商"
                  multiple
                >
                  <el-option
                    v-for="item in supplierCompanyList"
                    :key="item.id"
                    :label="item.companyName"
                    :value="item.companyName"
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
      supplierCompanyList: [],
      buyerCompanyList: [],
      productList: [],
      form: {
        orderNo: "",
        productCatalog: "",
        productNum: "",
        supplierCompanyName: "",
        buyerCompanyName: "",
        username: "",
        orderStatus: false,
        userTel: "",
        orderDate: "",
        orderPrice: "",
        orderCertificate: ""
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
    getSupplierCompanyList() {
      this.$store.dispatch("suuply/MerchantList").then(data => {
        if (data.status == 200) {
          let arr = data.data.result;
          arr.map((value, key) => {
            let companyName = value.companyName;
            let id = value._id;
            let itemEntity = {
              companyName,
              id
            };
            this.supplierCompanyList.push(itemEntity);
          });
        }
      });
    },
    getValue(value){
          this.form.buyerCompanyName = value
    },
    getBuyerList(){
          this.$store.dispatch('buyers/GetBuyer').then((data) => {
                if(data.status == 200){
                this.loadingFlag = false
                this.buyerCompanyList = data.data.result
                }
          })
    },
    getProductList() {
      this.$store.dispatch("suuply/GetProductList").then(data => {
        if (data.status == 200) {
          let arr = data.data.result;
          arr.map((value, key) => {
            let productName = value.productName;
            let id = value._id;
            let itemEntity = {
              id,
              productName
            };
            this.productList.push(itemEntity);
          });
        }
      });
    },
    getCatalogList() {
      this.$store.dispatch("suuply/GetProductCatalog").then(data => {
        if (data.status == 200) {
          let arr = data.data.result;
          arr.map((value, key) => {
            let catalogName = value.catalogName;

            let id = value._id;
            let itemEntity = {
              id,
              catalogName
            };
            console.log("catalogname +++" + itemEntity);
            this.catalogNameList.push(itemEntity);
          });
        }
      });
    },
    getBrandNameList() {
      this.$store.dispatch("suuply/GetProductCatalog").then(data => {
        if (data.status == 200) {
          let arr = data.data.result;
          arr.map((value, key) => {
            let catalogName = value.catalogName;

            let id = value._id;
            let itemEntity = {
              id,
              catalogName
            };
            console.log("catalogname +++" + itemEntity);
            this.catalogNameList.push(itemEntity);
          });
        }
      });
    },
    add() {
      this.dialogVisible = true;
      this.disable = false;
      this.form = {
        id: null,
        orderNo: "",
        productCatalog: "",
        productNum: "",
        supplierCompanyName: "",
        buyerCompanyName: "",
        username: "",
        orderStatus: false,
        userTel: "",
        orderDate: "",
        orderPrice: "",
        orderCertificate: ""
      };

      this.title = "新增";
      this.getCatalogList();
      this.getSupplierCompanyList();
      this.getProductList();
      this.getBuyerList()
      // this.getBrandNameList()
    },
    edit() {},
    save() {
      this.loading = true;
      this.$refs.form.validate(valid => {
        if (valid) {
            const orderNo = this.form.orderNo;
		const productCatalog = this.form.productCatalog == null || this.form.productCatalog == undefined ? this.form.productCatalog : '';
		const productNum = this.form.productNum;
		const buyerCompanyName = this.form.buyerCompanyName == null || this.form.buyerCompanyName == undefined ? this.form.buyerCompanyName : '';
		const username = this.form.username;
		const userTel = this.form.userTel;
		const orderDate = this.form.orderDate;
		const product = this.form.product == null || this.form.product == undefined ? this.form.product : '';
		const orderTime = this.form.orderTime;
		const orderStatus = this.form.orderStatus;
		const orderPrice = this.form.orderPrice;
		const orderCertificate = this.form.orderCertificate == null || this.form.orderCertificate == '' ? [] : '';
		const supplierCompanyName = this.form.supplierCompanyName == null || this.form.supplierCompanyName == undefined ? this.form.supplierCompanyName : '';

          var newForm = {
            orderNo,
            productCatalog,
            productNum,
            buyerCompanyName,
            username,
            userTel,
            orderDate,
            product,
            orderTime,
            orderStatus,
            orderPrice,
            orderCertificate,
            supplierCompanyName
          };
          console.log("add +++" + newForm);
          this.$store
            .dispatch("suuply/AddOrder", newForm)
            .then(data => {
              if (data.status == 200) {
                console.log("saveCatalog ++" + data);
                this.loading = false;
                this.dialogVisible = false;
                this.$message({
                  message: "添加成功",
                  showClose: true,
                  type: "success"
                });
              }
            });
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
