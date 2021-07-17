<template>
  <div class="carousel app-container">
    <el-row class="top-options">
      <el-col :span="12" class="title">
        轮播图
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
      <el-table-column prop="carouselName" label="标题">
      </el-table-column>
      <el-table-column
        prop="carouselThumbnail"
        label="缩略图"
      ></el-table-column>
      <el-table-column
        prop="carouselPosition"
        label="跳转位置"
      ></el-table-column>
      <el-table-column prop="carouselUrl" label="产品链接"></el-table-column>
      <el-table-column prop="carouselStatus" label="状态"></el-table-column>
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
  name: "Carousel",
  components:{
    Edit
  },
  data() {
    return {
      tableData: [],
      loadingFlag: false
    };
  },
  methods: {
    addModal() {
      this.$refs.edit.add()
    },
    editModal() {},
    removeModal() {}
  }
};
</script>
