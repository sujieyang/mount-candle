<template>
<div>
  
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-active="this.$route.path"   :default-openeds="['1']" class="el-menu-vertical-demo" :collapse="isCollapse" router >

        

      <el-menu-item index="/about"  >
    <i class="el-icon-menu"></i>
    <span slot="title">首页</span>
  </el-menu-item>
      <el-menu-item index="/talking" >
    <i class="el-icon-position"></i>
    <span slot="title">讨论区</span>
  </el-menu-item>
      <el-menu-item index="/donation">
    <i class="el-icon-sugar"></i>
    <span slot="title">捐赠区</span>
  </el-menu-item>
  <el-menu-item index="/personal">
    <i class="el-icon-user-solid"></i>
    <span slot="title">个人中心</span>
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
        isCollapse: false
      };
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-aside {
    color: #333;
  }

</style>
