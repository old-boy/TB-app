<template>
  <div class="buyer app-container">
    <el-row class="top-options">
      <el-col :span="12" class="title">
        采购商
      </el-col>
      <el-col :span="1" :offset="10" class="options">
        <el-button @click="addModal" type="success" size="mini">添加</el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading="loadingFlag"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="buyerCompanyName" label="公司名称"> </el-table-column>
      <el-table-column prop="buyerCompanyTel" label=" 公司电话"></el-table-column>
      <el-table-column prop="buyerCompanyAddres" label="公司地址"></el-table-column>
      <el-table-column
        prop="buyerAvatar"
        label="采购员头像"
      ></el-table-column>
      <el-table-column prop="buyerName" label="采购员姓名"></el-table-column>
      <el-table-column prop="buyerTel" label="采购员电话"></el-table-column>
      <el-table-column prop="buyerEmail" label="采购员邮箱"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间"> </el-table-column>
      <el-table-column label="操作" width="400">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="editModal(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="removeModal(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Edit ref="edit"/>
  </div>
</template>
<script>
import Edit from './components/edit.vue'
export default {
  name: "Buyer",
  components:{
    Edit
  },
  data() {
    return {
      tableData: [],
      loadingFlag: false
    };
  },
  created() {
    this.getBuyerList()
  },
  methods: {
    addModal() {
      this.$refs.edit.add()
    },
    getBuyerList(){
      this.loadingFlag = true
      this.$store.dispatch('buyers/GetBuyer').then((data) => {
            if(data.status == 200){
              this.loadingFlag = false
              this.tableData = data.data.result
            }
          })
    },
    editModal() {},
    removeModal() {}
  }
};
</script>
