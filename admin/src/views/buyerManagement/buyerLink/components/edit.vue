<template>
  <div class="edit-dialog">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
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
        <el-form-item label="供应商">
          <el-select v-model="form.business" placeholder="请选择供应商">
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
          <el-select v-model="form.caigou" placeholder="请选择采购商">
            <el-option
              v-for="item in caiGouCompanyList"
              :key="item.id"
              :label="item.buyerCompanyName"
              :value="item._id"
              @change="getCaigoValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="邀请名称 [不可重复]" labelWidth="600">
          <el-input
            v-model="form.caigouGuanxiName"
            placeholder="邀请名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="邀请人" labelWidth="600">
          <el-input v-model="form.inviter" placeholder="邀请人"></el-input>
        </el-form-item>
        <el-form-item label="邀请人来源" labelWidth="600">
          <el-input
            v-model="form.inviterSource"
            placeholder="邀请人来源"
          ></el-input>
        </el-form-item>
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
export default {
  name: "Edit",
  data() {
    return {
      title: "",
      addTitle: "新增",
      editTitle: "编辑",
      dialogVisible: false,
      loading: false,
      saveDataList: [],
      businessCompanyList: [],
      caiGouCompanyList: [],
      form: {
        caigouGuanxiName: "",
        inviter: "",
        inviterSource: "",
        business: "",
        caigou: ""
      },
      show: false,
      display: true,
      visible: false,
      rules: {}
    };
  },

  mounted() {},
  created() {},
  methods: {
    handleClose(done) {
      this.dialogVisible = false;
    },
    getBusinessValue(value) {
      this.form.business = value;
    },
    getCaigoValue(value) {
      this.form.caigou = value;
    },
    getBusinessCompanyList() {
      this.$store.dispatch("suuply/MerchantList").then(data => {
        if (data.status == 200) {
          this.businessCompanyList = data.data.result;
        }
      });
    },
    getCaigouList() {
      this.$store.dispatch("caigou/GetCaigou").then(data => {
        if (data.status == 200) {
          this.loadingFlag = false;
          this.caiGouCompanyList = data.data.result;
        }
      });
    },
    add() {
      this.dialogVisible = true;
      this.disable = false;
      this.form = {
        id: null,
        caigouGuanxiName: "",
        inviter: "",
        inviterSource: "",
        business: "",
        caigou: ""
      };

      this.title = this.addTitle;
      this.getBusinessCompanyList();
      this.getCaigouList();
    },
    edit() {},
    save() {
      this.loading = true;
      this.$refs.form.validate(valid => {
        if (valid) {
          let caigouGuanxiName = this.form.caigouGuanxiName;
          let inviter = this.form.inviter;
          let inviterSource = this.form.inviterSource;
          let business = this.form.business;
          let caigou = this.form.caigou;

          var newForm = {
            caigouGuanxiName,
            inviter,
            inviterSource,
            business,
            caigou
          };
          this.$store.dispatch("caigou/AddCaigouGuanxi", newForm).then(data => {
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
          this.$parent.getDataList();
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
