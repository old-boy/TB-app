<template>
  <div class="upload">
    <el-upload 
      ref="upload"
      list-type="picture-card" 
      :file-list="fileList"
      :multiple="false"
      :limit="1"
      :auto-upload="false"
      :http-request="uploadFile"
      accept=".xlsx,.xls,.csv,.txt,.jpg,.png"
      action=""
      class="upload"
      >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <i class="el-icon-download"></i>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
  export default {
   name:'Upload',
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        fileList: [],
        form: {
          ishead: 1
        }
      };
    },
    methods: {
      handleRemove(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleDownload(file) {
        console.log(file);
      },
      uploadFile(item){
        const fileObj = item.file
        const form = new FormData()// FormData 对象
        form.append('file', fileObj)// 文件对象
        form.append('ishead', this.form.ishead)
        this.$store.dispatch('upload/AddFile', form).then(response => {
            this.fileList = []
            this.$message({
              message: '添加成功',
              showClose: true,
              type: 'success'
            })
        })
      }
      // save(file){
      //   this.$store.dispatch('upload/AddFile',file).then((data) => {
      //     console.log(data)
      //       if(data.status == 200){
      //             this.loading = false
      //             this.$message({
      //                   message: '添加成功',
      //                   showClose: true,
      //                   type: 'success'
      //             })
      //       }
      //   })
      //   // this.$refs.upload.submit()
      // }
    }
  }
</script>
