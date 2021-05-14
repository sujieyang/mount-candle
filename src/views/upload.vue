<template>
  <div style="width:300px">
    <el-upload
      class="upload-demo"
      action="http://localhost:8081/course/upload"
      :before-upload="beforeVideoUpload"
      :on-preview="handlePreview"
      :before-remove="beforeRemove"
      :limit="99"
      :multiple="true"
      :on-exceed="handleExceed"
      :file-list="videoForm.videoUrl"
      :on-success="handleVideoSuccess"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">最多上传九十九个视频</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoForm: {
        id: "", //视频id,只有编辑的时候有显示
        name: "", //标题
        Src: "", //封面
        root: "", //目录
        videoUrl: [
          {
            name: "abc1.mp4",
            url:
              "http://150.158.191.172:8081/video/50011926_41_0.mp4",
          }
        ], //视频地址
        tag: "",
        type: "",
        videoMessage: "",
      },
    };
  },

  methods: {
    handleVideoSuccess(file) {
        console.log("success");
    //   this.videoForm.videoUrl = URL.createObjectURL(file.raw);
    //   this.$message.success(`$URL.createObjectURL(file.raw)`);
    },
    beforeVideoUpload(file) {
      const isProperType =
        file.type === "video/avi" || file.type === "video/mp4";
      const isLt300M = file.size / 1024 / 1024 < 300;
      if (!isProperType) {
        this.$message.error("上传视频只能是 AVI或MP4 格式!");
      }
      if (!isLt300M) {
        this.$message.error("上传视频大小不能超过 300MB!");
      }

      console.log(file);
      console.log(isProperType,isLt300M);
      return isProperType && isLt300M;
    },
    handlePreview(file) {
        // 预览视频，打开新的窗口
        window.open(file.url, '_blank', 'toolbar=yes, width=700, height=700')
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 99 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file){
        console.log(file);
    }
  },
};
</script>

<style>
</style>