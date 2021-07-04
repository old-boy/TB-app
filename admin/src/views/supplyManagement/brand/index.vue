<template>
  <div class="merchant app-container">
    <el-row class="top-options">
      <el-col :span="12" class="title">
        品牌管理
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
      <el-table-column prop="brandName" label="品牌名称"> </el-table-column>
      <el-table-column prop="brandDescription" label="品牌描述"></el-table-column>
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
  name: "Brand",
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
    this.getDataList()
  },
 
  methods: {
      getDataList(){
        this.loadingFlag = true
        // 触发异步里面的方法是用 this.$store.dispatch('空间名/方法名')
          this.$store.dispatch('suuply/GetBrand').then((data) => {
            if(data.status == 200){
              this.loadingFlag = false
              this.tableData = data.data.result
            }
          })
      },
    addModal() {
      this.$refs.edit.add()
    },
    editModal() {},
    removeModal() {}
  }
};
</script>
