<template>
  <div class="merchant app-container">
    <el-row class="top-options">
      <el-col :span="12" class="title">
        商户管理
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
      <el-table-column prop="companyName" label="供应商"> </el-table-column>
      <el-table-column prop="factoryName" label="厂家名称"></el-table-column>
      <el-table-column prop="brandNumber" label="品牌数量"> </el-table-column>
      <el-table-column prop="invitationPeople" label="邀请人">
      </el-table-column>
      <el-table-column prop="caigou.buyerCompanyName" label="采购商">
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

import Edit from './components/edit.vue'
export default {
  name: "Merchant",
  components:{
    Edit
  },
  data() {
    return {
      tableData: [],
      loadingFlag: false,
      id:null
    };
  },
  created() {
    this.getDataList()
  },
 
  methods: {
    // ...mapActions([
    //   MerchantList
    // ]),
      getDataList(){
        this.loadingFlag = true
        console.log('ppppp  ' +this.$store.dispatch)
        // 触发异步里面的方法是用 this.$store.dispatch('空间名/方法名')
          this.$store.dispatch('suuply/MerchantList').then((data) => {
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
    removeModal(index,row) {
      this.id = row._id
      var data = this.id
      this.$confirm('是否确认要删除?', '提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      })
      .then( async () => {
                await this.$store.dispatch('suuply/DelMerchant',data)
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
