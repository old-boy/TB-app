<template>
  <div class="buyer app-container">
    <el-row class="top-options">
      <el-col :span="12" class="title">
        邀请供应商
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
      <el-table-column prop="buyerCompanyName" label="采购商名称">
      </el-table-column>
      <el-table-column
        prop="inviter"
        label="邀请人"
      ></el-table-column>
      <el-table-column
        prop="inviterSource"
        label="邀请人来源"
      ></el-table-column>
      <el-table-column prop="supplierCompanyName" label="被邀请供应商"></el-table-column>
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
  </div>
</template>
<script>
export default {
  name: "BuyerLink",
  data() {
    return {
      tableData: [],
      loadingFlag: false
    };
  },
  methods: {
    addModal() {
      
    },
    editModal() {},
    removeModal() {}
  }
};
</script>
