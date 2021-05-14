<template>
  <el-container style="height: auto; border: 1px solid #eee">
  <el-container>
    <el-header style="font-size: 12px">
     <el-row>
            <el-col :span="1" :offset="0" style="margin-top:-5px;margin-left:20px;">
                <img src="../assets/团队网站logo.png" height="50px" width="50px"  />
                
            </el-col>
            <el-col :span="2" :offset="0" style="margin-top:-2px;">
                <h1  style="font-size:35px;color:rgb(26, 188, 156);">山烛</h1>
            </el-col>
        </el-row>
    </el-header>  
    
  <el-container>
    <el-main>
      <login_component />
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

  import login_component from "../components/beforeLogin/login_component.vue";
  import footers from "../components/Footer.vue";
  export default {
    data() {
      return {

      }
    },
    components:{
      footers,
      login_component 


    }
  };
</script>