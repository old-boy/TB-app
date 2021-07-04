<template>
  <div class="product app-container">
    <el-row class="top-options">
      <el-col :span="12" class="title">
        产品管理
      </el-col>
      <el-col :span="2" :offset="10" class="options">
        <el-button @click="addModal" type="success" size="mini"
          >添加产品</el-button
        >
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
      <el-table-column prop="productCatalog" label="商品分类">
        
      </el-table-column>
      <el-table-column prop="productMainPicture" label="商品主图">
      </el-table-column>
      <el-table-column prop="brandName" label="品牌">
      </el-table-column>
      <el-table-column prop="productPrice" label="商品售价"></el-table-column>
      <el-table-column prop="productTotal" label="库存"></el-table-column>
      <el-table-column prop="productSalesTotal" label="销量"></el-table-column>
      <el-table-column prop="productStatus" label="状态">
        <template slot-scope="scope">
          <el-tag
          :type="scope.row.productStatus === true ? 'success' : 'danger'"
          disable-transitions>{{scope.row.productStatus === true ? '开' : '关'}}</el-tag>
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
    <Edit ref="edit" />
  </div>
</template>
<script>
import Edit from "./components/edit.vue";
export default {
  name: "Product",
  components: {
    Edit
  },
  data() {
    return {
      id:'',
      productCatalogName:'',
      catalgoId:'',
      tableData: [],
      list:[],
      loadingFlag: false
    };
  },
  created() {
    this.getTableList()
  },
  methods: {
    addModal() {
      this.$refs.edit.add();
    },
    getTableList() {
      this.loadingFlag = true;
      var arr = []
      var obj = {}
      this.$store.dispatch("suuply/GetProductList").then(data => {
        if (data.status == 200) {
          this.loadingFlag = false;
          this.tableData = data.data.result
        }
      });
    },
    
    editModal() {},
    removeModal() {}
  }
};
</script>
