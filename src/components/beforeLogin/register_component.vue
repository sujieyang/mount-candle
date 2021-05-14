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
              <el-row justify="start">
                <el-col :span="2" :offset="0">
                  <el-button icon="el-icon-back" @click="redirectToLogin"></el-button>
                </el-col>
              </el-row>
              <el-row justify="center">
                <!-- logo -->
                <el-col :span="20" :offset="2" style="text-align: center">
                  <img src="../../assets/团队网站logo.png" alt="#" width="130px" style="margin-top:5px;" />
                  <h3 class="login-word">山烛教育视频网站</h3>
                </el-col>
                <!-- 登录框 -->
                <el-col :span="18" :offset="3" style="text-align: center">
                  <el-form
                    ref="form"
                    :model="RegisterForm"
                    :rules="RegisterFormRules"
                    class="login-form"
                  >
                  <el-form-item prop="nickname" class="login-form-username">
                      <el-input
                      prefix-icon="el-icon-user"
                        v-model="RegisterForm.nickname"
                        placeholder="请输入昵称"
                        
                        
                        style="width:300px"
                      ></el-input>
                    </el-form-item>
                    <!-- 用户名 -->
                    <el-form-item prop="username" class="login-form-username">
                      <el-input
                        prefix-icon="el-icon-user"
                        v-model="RegisterForm.username"
                        placeholder="请输入用户名"
                        style="width:300px"
                      ></el-input>
                    </el-form-item>
                    <el-form-item prop="password" class="login-form-password">
                      <el-input
                      prefix-icon="el-icon-lock"
                        v-model="RegisterForm.password"
                        placeholder="请输入密码"
                        class="pwd-input"
                        type="password"
                        style="width:300px"
                      ></el-input>
                    </el-form-item>

                    <el-form-item prop="repassword" class="login-form-password">
                      <el-input
                      prefix-icon="el-icon-lock"
                        v-model="RegisterForm.repassword"
                        placeholder="请再一次输入密码"
                        class="pwd-input"
                        type="password"
                        style="width:300px"
                      ></el-input>
                    </el-form-item>
                    <el-form-item prop="email" class="login-form-password">
                      <el-input
                      @change="varifyExistEmail"
                      prefix-icon="el-icon-ice-cream-round"
                        v-model="RegisterForm.email"
                        placeholder="请输入邮箱"
                        class="pwd-input"
                        
                        style="width:300px"
                      ></el-input>
                    </el-form-item>
                    
                    <el-form-item prop="verificationCode" class="login-form-password">
                      <el-input
                      prefix-icon="el-icon-lock"
                        v-model="RegisterForm.verificationCode"
                        placeholder="请输入验证码"
                        class="pwd-input"
                        
                        style="width:200px;margin-left:-100px;"
                      >
                      </el-input>
                      
                    </el-form-item>
                    
                    <el-col :span="4" :offset="17">
                    <el-button type="primary" style="position:relative;top:-63px;" :disabled="disabled" @click="sendcode" >{{btntxt}}</el-button>
                    </el-col>
                    <el-form-item >
                      <el-button type="success" class="login-btn" @click="validateRegister">注册</el-button>
                    </el-form-item>
                  </el-form>
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

    var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          console.log(reg.test(value));
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
      };
    return {
      apis:[
        "common/email?email=",
        "auth/register",
        "common/email/exist?email="
      ],

      code:"",
      disabled:true,
      time:60,
      btntxt:"验证码",
      // //身份
      // roles:[{
      //   value:"用户",
      //   label:"用户"
      // },{
      //   value:"管理员",
      //   label:"管理员"
      // }
      // ],
      // value:"用户",


      // 注册信息表单
      RegisterForm: {
        username: "",
        nickname:"",
        password: "",
        repassword:"",
        phone:"",
        email:"",
        verificationCode:"",
        rememberMe: false,
      },

      // 数据验证
      RegisterFormRules:{
        nickname : [{required:true,message:"昵称不得为空!",trigger:"blur"},
                    {min:3,max:10,message: "昵称长度在三到十个字符",trigger:"blur"}],
        username : [{required:true,message:"账号不得为空!",trigger:"blur"},
                    {min:3,max:15,message: "账号长度在三到十五个字符",trigger:"blur"}],
        password : [{required:true,message:"密码不得为空",trigger:"blur"},
                    {min:8,max:18,message: "密码长度在八到十八个字符",trigger:"blur"}],
        repassword : [{required:true,message:"密码不得为空",trigger:"blur"},
                      {min:8,max:18,message: "密码长度在八到十八个字符",trigger:"blur"}],
        phone: [
            {validator: checkPhone, trigger: 'blur'}
          ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "不合法的邮箱!", trigger: "blur" },
        ],
        verificationCode:[
          {required:true,message:"验证码不得为空!",trigger:"blur"}
        ]

      },
    };
  },

  methods:{
    // 验证邮箱是否注册
    varifyExistEmail(){
      const regEmail = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+.([a-zA-Z]{2,4})$/;
      if (!regEmail.test(this.RegisterForm.email)) {
        return;
        
      }
      else{
        // 发送异步请求，发送邮箱
      this.$http.get(this.apis[2] + this.RegisterForm.email).then((res) => {
        if (res.data.code == "200") {
          if(res.data.data==true){
            this.disabled=true;
            this.$message.warning("该邮箱已被注册");
          }
          else{
            this.$message.success("该邮箱未被注册，可使用")
            this.disabled=false;
            

          }
          
        }

        // 开始倒计时
        
      });
      }
    },


    validateRegister(){
      this.$refs.form.validate((valid)=>{
        if(valid){
          
          
          if(this.RegisterForm.password==this.RegisterForm.repassword){
            var userForms={
            correctCode:this.code,
            email:this.RegisterForm.email,
            inputCode:this.RegisterForm.verificationCode,
            password:this.RegisterForm.password,
            username:this.RegisterForm.username,
            nickname:this.RegisterForm.nickname
          }
            console.log(userForms)
            this.$http.post(this.apis[1],userForms
            ).then((res)=>{
              if(res.data.code=="200"){
                this.$message.success("注册成功")
                console.log(res.data)
                this.$router.push("/login")

              }else{
                this.$message.error("注册失败")
                console.log(res.data)
                this.RegisterForm= {
        username: "",
        nickname:"",
        password: "",
        repassword:"",
        phone:"",
        email:"",
        verificationCode:"",
        rememberMe: false,
      }
              }
            })
          }else{
            this.message.error("密码输入不一致");
            this.RegisterForm.password="";
            this.RegisterForm.repassword="";
          }
          
        }
      })


    },
    redirectToLogin(){
      this.$router.push("/login")
    },
    Console(){
      console.log(this.$store.state.isLogin)
    },
    regretPassword(){
      this.$router.push("/setpwd")
    },
    sendcode(){
      console.log(this.email_blur())
      if(this.email_blur()){
        this.time=60;
        this.timer(); 
        console.log(this.RegisterForm.email)
        this.$http.get(this.apis[0]+this.RegisterForm.email).then((res)=>{
          if(res.data.code=="200"){
            this.$message.success("发送验证码成功");
            this.code=res.data.data;
            console.log(res.data.data)

          }
          else{
            this.$message.error("发送验证码失败");
          }
        })
      }else{
        this.$message.error("输入邮箱格式有误");
      }
      
    },
    //发送手机验证码倒计时
    timer() {
    if (this.time > 0) {
      this.disabled=true;
      this.time--;
      this.btntxt=this.time+"秒";
      setTimeout(this.timer, 1000);
    } else{
        this.time=0;
        this.btntxt="发送验证码";
        this.disabled=false;
    }
 },
      email_blur() {
                var verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
                if (!verify.test(this.RegisterForm.email)) {
                    return false;
                } else {
                    return true;

                }
            },
  }
};
</script>

<style scoped>
#main {
  height:800px;
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
  height: 800px;
  margin-top: 0px;
  
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
  margin-top: 0px;
}
.login-btn:hover{
  background-color:rgba(35, 224, 161, 0.678);
}
</style>