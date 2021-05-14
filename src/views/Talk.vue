<template>
  <el-container style="height: auto; border: 1px solid #eee">
  <el-container>
    <el-header style=" font-size: 12px">
      <headers/>
      
    </el-header>  
    
  
  <el-container>
      <sidebars/>
    
    <el-main>
      <talkings />
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
  import headers from "../components/Header.vue";
  import sidebars from "../components/SideBar.vue";
  import footers from "../components/Footer.vue";
  import talkings from "../components/talk/talkings.vue";
  export default {
    data() {
      return {

      }
    },
    components:{
      sidebars,
      footers,
      headers,
      talkings

    }
  };
</script>