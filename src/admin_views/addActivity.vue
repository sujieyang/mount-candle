<template>
    <el-container style="height: auto; border: 1px solid #eee">
  <el-container>
    <el-header>
      <headers/>
      
    </el-header>  
    
  
  <el-container>
      <sidebars/>
    
    <el-main>
      <el-page-header @back="goBack" content="添加新活动">
  
      </el-page-header>
      <br>
      <!--添加活动表单-->
      <el-form :model="addActivityForm" :rules="rules" class="addActivity">
        <el-form-item label="活动名称:" prop="dname" :label-width="formLabelWidth"> 
          <el-input v-model="addActivityForm.dname"></el-input>
        </el-form-item>
        <el-form-item label="开始时间:" prop="starttime" :label-width="formLabelWidth"> 
          <el-date-picker
            v-model="addActivityForm.starttime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间:" prop="endtime" :label-width="formLabelWidth">
          <el-date-picker
            v-model="addActivityForm.endtime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="捐赠地点:" prop="location" :label-width="formLabelWidth">
          <el-input v-model="addActivityForm.location"></el-input>
        </el-form-item>
        <el-form-item label="发起人:" prop="from_user_id" :label-width="formLabelWidth">
          <el-input v-model="addActivityForm.from_user_id"></el-input>
        </el-form-item>
        <el-form-item label="活动类型:" prop="type" :label-width="formLabelWidth">
          <el-input v-model="addActivityForm.type"></el-input>
        </el-form-item>
        <el-form-item label="活动内容:" prop="content" :label-width="formLabelWidth">
          <el-input v-model="addActivityForm.content"></el-input>
        </el-form-item>
        <!--<el-form-item label="活动介绍:" prop="recommend" :label-width="formLabelWidth"> 
          <el-input v-model="addActivityForm.recommend" type="textarea" :rows="3" ></el-input>
        </el-form-item>-->
      </el-form>
      
      <!--确认按钮-->
      <el-button  class="check" type="primary"  @click="addActivity">确 定</el-button>
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
  .el-form{
    margin-top: 15px;
  }
  .addActivity{
    width: 500px;
  }
  .check{
    margin-left: 400px;
  }
</style>

<script>
  import headers from "../admin_components/Header.vue";
  import sidebars from "../admin_components/Sidebar.vue";
  import footers from "../admin_components/Footer.vue";
  export default {
    data() {
      return {
        userId:1,
        addActivityForm:{
          content:'',
          dname:'',
          endtime:'',
          from_user_id:null,
          location:'',
          starttime:'',
          type:'',
        },
        defaultTime: new Date(2000, 1, 1, 12, 0, 0),
        formLabelWidth:'150px',
        //表单规则
        rules:{
          dname:[
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
          ],
          location:[
            { required:true,message:'请输入地址', trigger:'blur'},
          ],
          type:[
            { required:true,message:'请输入捐赠类型', trigger:'blur'},
          ],
          content:[
            { required: true, message: '请输入活动介绍', trigger: 'blur' },
            { min:20,max:100, message: '请输入介绍', trigger: 'blur' }

          ],


        }

      }
      
    },
    created(){
      this.addActivity()

    },
    methods:{
      goBack(){
        this.$router.push({
          path:'/admin/donateManager/' + this.userId,
          });
      },
      addActivity(){
        this.$http.post('admin/donate/add',this.addActivityForm).then((res)=>{
          console.log(this.addActivityForm.starttime)
            if(res.data.code==200){
              this.$message.success("活动添加成功")
              this.$router.push('/admin/donateManager/'+this.userId)
              console.log('添加成功')
            }
            else{
              //this.$message.console.error("用户添加失败");
              console.log(res.data.message)
            }
          })

      },
        
      },
    components:{
      sidebars,
      footers,
      headers

    }
  };
</script>