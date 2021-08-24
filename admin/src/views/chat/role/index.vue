<!--
 * @Author: your name
 * @Date: 2021-08-25 02:31:54
 * @LastEditTime: 2021-08-25 02:53:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \TB-app\admin\src\views\chat\customer\index.vue
-->
<template>
  <div class="carousel app-container">
    <el-row class="top-options">
      <el-col :span="12" class="title">
        角色管理
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
      <el-table-column prop="title" label="头像">
      </el-table-column>
      <el-table-column
        prop="thumbnail"
        label="名字"
      ></el-table-column>
      <el-table-column
        prop="thumbnail"
        label="职务"
      ></el-table-column>
      <el-table-column prop="createdAt" label="创建时间"> </el-table-column>
      <el-table-column label="操作" width="400">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            disabled
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
  name: "Role",
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
  },
  methods: {
    addModal() {
      this.$refs.edit.add()
    },
    editModal() {},
  }
};
</script>
