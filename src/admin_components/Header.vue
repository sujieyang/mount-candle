<template>
    <div>
        <el-row>
            <el-col :span="1" :offset="0" style="margin-top:-5px;margin-left:20px;">
                <img src="../assets/团队网站logo.png" height="50px" width="50px"  />
                
            </el-col>
            <el-col :span="2" :offset="0" style="margin-top:-2px;">
                <h1  style="font-size:35px;color:rgb(26, 188, 156);">山烛</h1>
            </el-col>
            <el-col :span="2" :offset="17">
                <el-button @click="redirectToFrontEnd">前台</el-button>
            </el-col>
        </el-row>
        <!-- <img src="../assets/团队网站logo.png" height="50px" width="50px" style="position:absolute;left:60px;top:4px" /> -->
      <!-- <span><h1  style="position:absolute;left:120px;top:0px;font-size:35px;color:rgb(26, 188, 156);">山烛</h1></span> -->
    </div>
</template>


<script> 
export default{
    name:'headers',
    data(){
        return{
        }
    },
    methods:{
        redirectToFrontEnd(){
            this.$router.replace("/about")
        }
    },
    components:{
    }
}
</script>