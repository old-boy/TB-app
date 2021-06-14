<template>
  <div class="buyer app-container">
    <el-row class="top-options">
      <el-col :span="12" class="title">
        采购商审核
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
      <el-table-column prop="companyName" label="公司名称"> </el-table-column>
      <el-table-column prop="contact" label="联系人"></el-table-column>
      <el-table-column prop="tel" label="联系电话"></el-table-column>
      <el-table-column prop="email" label="联系人邮箱"></el-table-column>
      <el-table-column prop="qualification" label="相关资质"></el-table-column>
      <el-table-column prop="invitationCode" label="邀请码"></el-table-column>
      <el-table-column prop="statue" label="状态"></el-table-column>
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
  name: "BuyerAudit",
  data() {
    return {
      tableData: [],
      loadingFlag: false
    };
  },
  methods: {
    addModal() {},
    editModal() {},
    removeModal() {}
  }
};
</script>
