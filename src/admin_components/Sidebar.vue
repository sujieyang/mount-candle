<template>
<div>
  
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-active="this.$route.path"   :default-openeds="['1']" class="el-menu-vertical-demo" :collapse="isCollapse" router >

        

      <el-menu-item :index="'/admin/logManager/' + userId"  >
    <i class="el-icon-menu"></i>
    <span slot="title">日志管理</span>
  </el-menu-item>
      <el-menu-item :index="'/admin/talkManager/' + userId" >
    <i class="el-icon-position"></i>
    <span slot="title">讨论管理</span>
  </el-menu-item>
      <el-menu-item :index="'/admin/donateManager/' + userId">
    <i class="el-icon-sugar"></i>
    <span slot="title">捐赠管理</span>
  </el-menu-item>
  <el-menu-item :index="'/admin/userManager/' + userId">
    <i class="el-icon-user-solid"></i>
    <span slot="title">用户管理</span>
  </el-menu-item>
  <el-menu-item :index="'/admin/videoManager/' + userId">
    <i class="el-icon-user-solid"></i>
    <span slot="title">视频管理</span>
  </el-menu-item>
    </el-menu>
  </el-aside>
</div>
</template>

<script>
export default {
  name: 'sidebars',
  data() {
      return {
        isCollapse: false,
        userId:"",
      };
    },
    created(){
      this.userId=this.$store.state.userInfos.idToken;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-aside {
    color: #333;
  }

</style>
