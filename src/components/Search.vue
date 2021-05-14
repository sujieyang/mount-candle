<template>
<div >
    <!-- <el-select v-model="value" placeholder="请选择" style="position:absolute;left:430px;width:100px" width="40px" size="small">
    <el-option 
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select> -->
    <el-col :span="8" :offset="5">
      <el-input placeholder="请输入内容" v-model="inputs" class="input-with-select" style="width:400px;margin-top:10px">
    
        <el-button slot="append" icon="el-icon-search" @click="Search()"></el-button>
      </el-input>

    </el-col>
    <beforeLogin />
</div>
</template>

<script>
import beforeLogin from "../components/beforeLogin/Logo.vue";
  export default {
    name:'searchs',
    data:function() {
      return {
        options: [{
          value: '选项1',
          label: '视频'
        },
        {
            value:'选项2',
            label:'作者'
        }, 
        {
          value: '选项3',
          label: '帖子'
        }, 
        {
          value: '选项4',
          label: '活动'
        },], 
        value: '',
        inputs:''
      }
    },
    methods:{
        Search(){
            this.$message({
                showClose: true,
                message: '测试搜索',
                type: 'success'
        });
        }
    },
    components:{
        beforeLogin,
    }
  }
</script>

<style scoped>
.el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>