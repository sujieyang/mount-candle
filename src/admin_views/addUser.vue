<template>
    <el-container style="height: auto; border: 1px solid #eee">
  <el-container>
    <el-header >
      <headers/>
      
    </el-header>  
    
  
  <el-container>
      <sidebars/>
    
    <el-main>
      <el-page-header @back="goBack" content="添加新用户">
  
      </el-page-header>
      <br>
      <el-form :model="form"  :rules="rules" class="adduser">
                <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
                  <el-input  v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
                  <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="mobile" :label-width="formLabelWidth">
                  <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
                  <el-input  v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                
                <!--<el-form-item label="用户角色" prop="role" :label-width="formLabelWidth">
                  <template>
                      <el-select
                          v-model="form.role"
                          placeholder="请选择类型">
                          <el-option
                              v-for="item in roleOptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                          </el-option>
                      </el-select>
                  </template>
                </el-form-item>-->
              </el-form>
              <!--确认按钮-->
              <el-button  class="check" type="primary"  @click="addUser">确 定</el-button>
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
  .adduser{
      width: 500px;
  }
  .check{
    margin-left: 300px;
  }
</style>

<script>
  import headers from "../admin_components/Header.vue";
  import sidebars from "../admin_components/Sidebar.vue";
  import footers from "../admin_components/Footer.vue";
  export default {
    data() {
      return {
        /*roleOptions: [{
            value: 'adminUser',
            label: '管理员'
            }, {
            value: 'normalUser',
            label: '普通用户'
        },],*/
        //用户表单
        form: {
            username: '',
            password: '', 
            mobile: '15280834650',
            email: '1595601643@qq.com',
        },
        formLabelWidth:'150px',
        userId:1,
        //表单规则
        rules:{
          username:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          email: [{
              required: true,//是否必填
              message: '请输入邮箱地址',//错误提示信息
              trigger: 'blur'//检验方式（blur为鼠标点击其他地方，）
            },
            {
              type: 'email',//要检验的类型（number，email，date等）
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change']//（change为检验的字符变化的时候）
            }
          ],
          mobile: [{
            required: true,
            pattern: /^1[34578]\d{9}$/,//可以写正则表达式呦呦呦
            message: '目前只支持中国大陆的手机号码',
            trigger: 'blur'
          }],
        },
        api:{
          adduser:'/admin/user/add'
        }


      }
    },
    created(){
      this.addUser()

    },
    methods:{
        goBack(){
            this.$router.push('/admin/userManager/'+this.userId);
        },
        addUser(){
          console.log(this.form)
          this.$http.post('admin/user/add',this.form).then((res)=>{
            if(res.data.code==200){
              this.$message.success("用户添加成功")
              this.$router.push('/admin/userManager/'+this.userId,
              {
                newUser:this.form
              })
              console.log('添加成功')
            }
            else{
              //this.$message.console.error("用户添加失败");
              console.log(res.data.code)
            }
          })
        }


    },
    components:{
      sidebars,
      footers,
      headers

    }
  };
</script>