<template>
<div id="login-page-content">
    <el-row justify="center">
      <!-- 页面主体 -->
      <el-col :span="22" id="main" :offset="1">
        <el-row>
          
          <!-- 左侧内容 -->
          <el-col :span="14" :offset="1">
            <!-- 文字 -->
            <div class="words-left">
              
              <h2>山烛~教育是一道不会熄灭的光</h2>
              <el-divider />
              <p>
                教育的本质是：一棵树摇动另一棵树，一朵云推动另一朵云，一个灵魂唤醒另一个灵魂。
              </p>
              <p>让每个山区孩子都有能得到教育的机会。</p>
            </div>

            <!-- 图片 -->
            <div class="pic-left">
              <el-col :span="4"  style="margin-top:140px;">
              <img src="../../assets/login-register-imgs/注册登陆首页图片1.png" alt="#"   />
              </el-col>
              <el-col :span="5" style="margin-top:110px;">
              <img src="../../assets/login-register-imgs/注册登陆首页图片2.png" alt="#"  />
              </el-col >
              <el-col :span="6" style="margin-top:80px;">
              <img src="../../assets/login-register-imgs/注册登陆首页图片3.png" alt="#"  />
              </el-col>
            </div>
          </el-col>
          <!-- 右侧登录框 -->
          <el-col :span="6" :offset="1">
            <el-card class="login-card">
              <el-row justify="center">
                <!-- logo -->
                <el-col :span="20" :offset="2" style="text-align: center">
                  <img src="../../assets/团队网站logo.png" alt="#" width="130px" style="margin-top:5px;" />
                  <h3 class="login-word">山烛教育视频网站</h3>
                </el-col>
                <!-- 登录框 -->
                <el-col :span="18" :offset="3" style="text-align: center">
                  <el-form
                    ref="loginForm"
                    :model="loginForm"
                    :rules="LoginFormRules"
                    class="login-form"
                  >
                    <!-- 用户名 -->
                    <el-form-item prop="username" class="login-form-username">
                      <el-input
                        prefix-icon="el-icon-user"
                        v-model="loginForm.username"
                        placeholder="请输入用户名"
                        style="width:300px"
                      ></el-input>
                    </el-form-item>
                    <el-form-item prop="password" class="login-form-password">
                      <el-input
                      prefix-icon="el-icon-lock"
                        v-model="loginForm.password"
                        placeholder="请输入密码"
                        class="pwd-input"
                        type="password"
                        style="width:300px"
                      ></el-input>
                    </el-form-item>
                    <el-form-item style="margin-left:220px;margin-top:-20px"> 
                      <el-checkbox v-model="loginForm.rememberMe" >记住我</el-checkbox>
                    </el-form-item>
                    <el-form-item style="margin-top:-30px;">
                      <el-button type="success" class="login-btn" @click="validateLogin()">登录</el-button>
                    </el-form-item>
                  </el-form>
                </el-col>

                <el-col :span=4 :offset="3">
                  <p style="margin-top:10px;font-size:14px;cursor:pointer;" @click="regretPassword">忘记密码?</p>
                </el-col>
                <el-col :span=2 :offset="12">
                  <p style="margin-top:10px;font-size:14px;cursor:pointer;"  @click="redirectToRegister">注册</p>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      api:'auth/login',
      //身份
      roles:[{
        value:"USER",
        label:"用户"
      },{
        value:"ADMIN",
        label:"管理员"
      }
      ],


      // 登录信息表单
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
      },

      // 数据验证
      LoginFormRules:{
        username : [{required:true,message:"用户名不得为空!",trigger:"blur"},
                    {min:3,max:10,message: "用户名长度在三到十个字符",trigger:"blur"}],
        password : [{required:true,message:"密码不得为空",trigger:"blur"}]

      }
    };
  },
  created(){
    if(localStorage.getItem("showNeedLoginInfo")!=null){
      this.$message.error("你还未登录，请先登录")
      localStorage.removeItem("showNeedLoginInfo")
    }
  },
  methods:{

    validateLogin(){
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            console.log(this.api)
            console.log({"password":this.loginForm.password,
                                "rememberMe":this.loginForm.rememberMe,
                                
                                "username":this.loginForm.username})
            this.$http.post(this.api,{password:this.loginForm.password,
                                rememberMe:this.loginForm.rememberMe,
                                role:this.loginForm.value,
                                username:this.loginForm.username}).then((res)=>{
                                  console.log(res.data)
                                  if (res.data.code == 200) {
                                    this.$message.success("登陆成功!");
                                    console.log(res.data.data)
                                    console.log(this.$store.getters.getIsLogin);
                                    this.$store.commit("saveLoginForm",res.data.data);
                                    console.log(this.$store.getters.getUserInfo);
                                     for(var i=0;i<res.data.data.roles.length;i++)
                                    {
                                      if("VOLUNTEER"==res.data.data.roles[i])
                                      {
                                        console.log("竟然是志愿者！欢迎欢迎")
                                      this.$store.commit("setVolunteer")
                                      }
                                    }
                                    this.$http.get("/user/"+res.data.data.idToken+"/hasApply").then((res2)=>{
                                      
                                      console.log(res2.data)
                                      if(res2.data.code==200)
                                      {
                                          if(res2.data.data)
                                        {
                                          this.$store.commit("setExamining")
                                        }
                                      }
                                    });
                                    localStorage.setItem("idToken",res.data.data.idToken)
                                    localStorage.setItem("state",JSON.stringify(this.$store.state));
                                    
                                   
                                    this.$router.push("/about");
                                    
                                    
                                    
                                    } else {
                                    this.$message.error("登陆失败");
                                    this.loginForm.username="";
                                    this.loginForm.password="";
                                    this.loginForm.rememberMe=false;
                                    }
                                });
                                }
          else {
            console.log('error submit!!');
            return false;
          }
        });
      

    },
    redirectToRegister(){
      this.$router.push('/register')
    },
    Console(){
      console.log(this.$store.state.isLogin)
    },
    regretPassword(){
      this.$router.push("/setpwd")
    }
  }
};
</script>

<style scoped>
#main {
  height: 700px;
}

/* #login-logo {
} */
.logo-pic,
.logo-title {
  float: left;
}
/* 标题颜色 */
.logo-title > h1 {
  color: rgb(26, 188, 156);
  font-size: 40px;
  margin-left: 10px;
}
/* 左侧文字样式 */
.words-left {
  margin-top: 50px;
}
.words-left > h2 {
  font-size: 27px;
  color: rgb(26, 188, 156);
}
.words-left > p {
  font-size: 16px;
  color:#7F7F7F;
}
/* 登录框样式 */
.login-card {
  width: 500px;
  height: 550px;
  margin-top: 50px;
}

.login-word {
  font-size: 25px;
  color: rgb(26, 188, 156);
  margin-top: -10px;
}
.login-form{
  margin-top: 20px;
}

.login-form-password{
  margin-top: 30px;
}
.login-btn{
  width:100%;
  font-size: 18px;
  background-color:rgb(35, 224, 161);
  border:none;
  font-weight:550;
  margin-top: 10px;
}
.login-btn:hover{
  background-color:rgba(35, 224, 161, 0.678);
}
</style>