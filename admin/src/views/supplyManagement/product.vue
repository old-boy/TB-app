<template>
  <div class="product app-container">
    <el-row class="top-options">
      <el-col :span="12" class="title">
        产品管理
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
      <el-table-column prop="productName" label="商品名称"> </el-table-column>
      <el-table-column prop="productCatalog" label="商品分类"></el-table-column>
      <el-table-column prop="productMainPicture" label="商品主图"> </el-table-column>
      <el-table-column prop="productPrice" label="商品售价"></el-table-column>
      <el-table-column prop="productTotal" label="库存"></el-table-column>
      <el-table-column prop="productSalesTotal" label="销量"></el-table-column>
      <el-table-column prop="productStatus" label="状态"></el-table-column>
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
  name: "Product",
  data() {
    return {
        tableData:[],
        loadingFlag:false
    }
  },
  methods: {
        addModal(){

        },
    editModal() {
      
    },
    removeModal() {
      
    }
  }
};
</script>
