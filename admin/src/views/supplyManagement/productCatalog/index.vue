<template>
  <div class="product-catalog app-container">
    <el-row class="top-options">
      <el-col :span="12" class="title">
        产品分类
      </el-col>
      <el-col :span="2" :offset="10" class="options">
        <el-button @click="addModal" type="success" size="mini">添加分类</el-button>
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
      <el-table-column prop="catalogName" label="分类名称"> </el-table-column>
      <el-table-column prop="productNum" label="商品数量"></el-table-column>
      <el-table-column prop="catalogStatus" label="状态">
        <template slot-scope="scope">
          <el-tag
          :type="scope.row.catalogStatus === true ? 'success' : 'danger'"
          disable-transitions>{{scope.row.catalogStatus === true ? '开' : '关'}}</el-tag>
        </template>
        
      </el-table-column>
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
import getDate from '@/utils/getDate'
import Edit from './components/edit.vue'
export default {
  name: "ProductCatalog",
  components:{
    Edit
  },
  data() {
    return {
      tableData: [],
      loadingFlag: false,

      form:{
        status:true
      }
    };
  },
  mounted() {
    this.getTableList()
  },
  created() {
    this.getTableList()
  },
  methods: {
    addModal() {
      this.$refs.edit.add()
    },
    getTableList(){
      this.loadingFlag = true
      this.$store.dispatch('suuply/GetProductCatalog').then((data) => {
        console.log('catalog  +++' + data)
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
