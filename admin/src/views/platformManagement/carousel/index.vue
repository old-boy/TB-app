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
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column
        prop="thumbnail"
        label="缩略图"
      ></el-table-column>
      <el-table-column
        prop="position"
        label="跳转位置"
      ></el-table-column>
      <el-table-column prop="url" label="产品链接"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag
          :type="scope.row.status === true ? 'success' : 'danger'"
          disable-transitions>{{scope.row.status === true ? '开' : '关'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="序号"></el-table-column>
      <el-table-column prop="userName" label="操作人"></el-table-column>
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
  created() {
    this.getDataList()
  },
  methods: {
    addModal() {
      this.$refs.edit.add()
    },
    getDataList(){
      this.loadingFlag = true
      this.$store.dispatch('carousel/GetCarousel').then((data) => {
            if(data.status == 200){
              this.loadingFlag = false
              this.tableData = data.data.result
            }
          })
    },
    editModal() {},
    removeModal(index,row) {
      this.id = row._id
      var data = this.id
      this.$confirm('是否确认要删除?', '提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      })
      .then( async () => {
                await this.$store.dispatch('carousel/DelCarousel',data)
                this.getDataList()
                this.$message({
                    type:'success',
                    message:'删除成功'
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
    }
  }
};
</script>
