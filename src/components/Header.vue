<template>
    <div class="Header">
        <el-row>
            <el-col :span="1" :offset="0" style="margin-top:-5px;margin-left:20px;">
                <img src="../assets/团队网站logo.png" height="50px" width="50px"  />
                
            </el-col>
            <el-col :span="2" :offset="0" style="margin-top:-2px;">
                <h1  style="font-size:35px;color:rgb(26, 188, 156);">山烛</h1>
            </el-col>
            <searchs />
        </el-row>
    </div>
</template>


<script> 
import searchs from "../components/Search.vue";
export default{
    name:'headers',
    data(){
        return{

        }
    },
    components:{
        searchs,
    }
}
</script>
<style scoped>
/* .Header{
    height:200px;
} */
</style>