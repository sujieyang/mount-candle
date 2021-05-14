<template>
  <el-container style="height: auto; border: 1px solid #eee">
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <img src="../assets/团队网站logo.png" height="50px" width="50px" style="position:absolute;left:60px;top:8px" />
      <span><h1  style="position:absolute;left:120px;top:5px;font-size:35px;color:rgb(26, 188, 156);">山烛-注册</h1></span>
    </el-header>  
    
  <el-container>
    <el-main>
      <register_component />
    </el-main>
  </el-container>
  <footers/>
</el-container>
  </el-container>
</template>


<style scoped>
  .el-header {
    background-color: #f1f4f8;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  h2{
    size: 18px large;
  }
</style>

<script>

  import register_component from "../components/beforeLogin/register_component.vue";
  import footers from "../components/Footer.vue";
  export default {
    data() {
      return {

      }
    },
    components:{
      footers,
      register_component


    }
  };
</script>