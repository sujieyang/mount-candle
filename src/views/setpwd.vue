<template>
  <el-container>
  <el-container>
    <el-header style=" font-size: 12px">
      
      <div>
        <img src="../assets/团队网站logo.png" height="50px" width="50px" style="position:absolute;left:60px;top:8px" />
      <span><h1  style="position:absolute;left:120px;top:5px;font-size:35px;color:rgb(26, 188, 156);">山烛</h1></span>
    </div>
    </el-header>  
    
  
  <el-container>
    <el-main>
     <div class="reset-pwd">
    <el-card style="width: 800px; height: 600px">
      <a-steps :current="Current">
        <a-step title="验证邮箱" description="Check your validation"/>
        <a-step title="修改密码" description="Reset your password" style="margin-right:85px;" />
        <a-step title="完成修改" description="Finished" style="margin-right:10px"/>
      </a-steps>

      <!-- 第一步 -->
      <div class="steps-content" v-if="Current == 0">
        <!-- 邮箱表单 -->
        <el-row>
          <el-col>
            <span class="info"
              >*为了确保是本人在操作，我们需要通过邮箱验证您的身份。</span
            >
          </el-col>
          <el-col :span="12" :offset="6" style="margin-top: 20px">
            <el-form :model="emailForm" :rules="emailRules" ref="emailFormRef">
              <el-form-item label="邮箱" prop="email">
                <el-input
                  type="text"
                  placeholder="请输入邮箱"
                  style="margin-top: 10px"
                  v-model="emailForm.email"
                  @change="varifyExistEmail"
                ></el-input>
              </el-form-item>
              <el-form-item prop="code" label="验证码">
                <el-row style="margin-top: 30px">
                  <el-col
                    :span="17"
                    :offset="0"
                    style="position: relative; right: 60px"
                  >
                    <el-input
                      type="text"
                      placeholder="请输入验证码"
                      style="margin-top: 10px"
                      v-model="emailForm.code"
                    ></el-input>
                  </el-col>
                  <el-col
                    :span="2"
                    :offset="0"
                    style="position: relative; right: 50px"
                  >
                    <el-button
                      type="primary"
                      style="margin-top: 15px; font-size: 13px"
                      size="small"
                      @click="sendCode()"
                      :disabled="btnLoading"
                      >{{ codeMsg }}</el-button
                    >
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item style="margin-top: 70px">
                <el-button type="info" plain style="float: left" @click="back()"
                  >返回</el-button
                >
                <el-button
                  type="primary"
                  plain
                  style="float: right"
                  @click="codeNext()"
                  >下一步</el-button
                >
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <!-- 
              <el-col style="margin-top: 80px">

              </el-col>
            </el-row>
          </el-col>
        </el-row> -->
      </div>

      <!-- 第二步 -->
      <div class="steps-content" v-if="Current == 1">
        <el-row>
          <el-col :span="20" :offset="3">
            <el-alert
              title="请重置你的密码"
              type="info"
              :show-icon="true"
              :closable="false"
            >
            </el-alert>
          </el-col>
          <el-col :span="20">
            <el-form
              :model="info"
              :rules="passwordRules"
              
              ref="ResetPwdFormRef"
              style="margin-top: 30px"
            >
              <el-form-item
                label="密码"
                label-width="150px"
                prop="password"
                style="margin-top: 50px"
              >
                <el-input
                  placeholder="请输入密码"
                  v-model="info.password"
                  style="width: 400px"
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="确认密码"
                label-width="150px"
                prop="repassword"
                style="margin-top: 50px"
              >
                <el-input
                  placeholder="请再次输入密码"
                  v-model="info.repassword"
                  style="width: 400px"
                  type="password"
                ></el-input>
              </el-form-item>

              <el-form-item style="margin-top: 60px">
                <el-button
                  type="info"
                  plain
                  style="margin-right: 160px"
                  @click="back()"
                >
                  取消
                </el-button>
                <el-button
                  type="primary"
                  plain
                  style="float: right"
                  @click="resetNext()"
                >
                  下一步
                </el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <!-- 邮箱表单 -->
      </div>

      <!-- 第三步 -->
      <div class="steps-content" v-if="Current == 2">
        <a-result
          status="success"
          title="密码修改成功"
          sub-title="密码修改完成，请牢记您的密码。您现在可以选择回到首页或者去登录，享受更多的专属功能"
        >
          <template #extra>
            <a-button type="default" @click="back()">去首页</a-button>
            <a-button
              key="console"
              type="primary"
              size="mini"
              style="margin-left: 20px"
              @click="toLogin()"
            >
              去登录
            </a-button>
          </template>
        </a-result>
      </div>
    </el-card>
  </div>
    </el-main>
  </el-container>
  <!-- <footers/> -->
</el-container>
  </el-container>
</template>

<script>
// import footers from "../components/Footer.vue";
export default {
    
    
  data(){
    // 确认密码与密码一致验证器
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.info.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      apis: {
        emailApi: "common/email?email=",
        emailExistApi:"common/email/exist?email=",
        nextToResetApi: "common/valify",
        toReset: "common/reset",
      },
      Current: 0,
      codeMsg: "发送验证码",
      t: 60,
      btnLoading: true,
      correctCode: "",
      resetKey: "",
      // 确认密码表单
      info: {
        password: "",
        repassword: "",
      },
      emailForm: {
        email: "",
        code: "",
      },
      emailRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "不合法的邮箱!", trigger: "blur" },
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      // 确认密码校验
      passwordRules: {
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 8,
            max: 18,
            message: "密码应在8-18个字符之间",
            trigger: "blur",
          },
        ],
        repassword: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 验证邮箱是否注册
    varifyExistEmail(){
      const regEmail = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+.([a-zA-Z]{2,4})$/;
      if (!regEmail.test(this.emailForm.email)) {
        return;
        
      }
      else{
        // 发送异步请求，发送邮箱
      this.$http.get(this.apis.emailExistApi + this.emailForm.email).then((res) => {
        if (res.data.code == "200") {
          if(res.data.data==true){
            this.btnLoading=false;
            // this.$message.warning("该邮箱已被注册");
          }
          else{
            this.btnLoading=true;
            this.$message.warning("该邮箱未被注册");

          }
          
        }
        // 获得返回的验证码
        // 开始倒计时
        
      });
      }
    },

    // 发送验证码
    sendCode() {
      
      // 验证邮箱是否合法
      const regEmail = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+.([a-zA-Z]{2,4})$/;
      if (!regEmail.test(this.emailForm.email)) {
        this.$message.error("请输入正确的邮箱");
        return;
      }
      
 
      

      var timer = setInterval(() => {
          this.t--;
          this.codeMsg = this.t + "秒后重新发送";
          this.btnLoading = true;
          if (this.t == 1) {
            clearInterval(timer);
            this.btnLoading = false;
            this.codeMsg = "发送验证码";
          }
        }, 1000);
        
      // 发送异步请求，发送邮箱
      this.$http.get(this.apis.emailApi + this.emailForm.email).then((res) => {
        if (res.data.code == 200) {
          this.$message.success("发送成功");
        } else {
          this.$message.error("邮箱未注册或发送失败，请检查后重新发送");
        }
        // 获得返回的验证码
        this.correctCode = res.data.data;
        // 开始倒计时
        
      });
    },

    // 验证码已输入，请求前往设置密码页面
    codeNext() {
      this.$refs.emailFormRef.validate((valid) => {
        // 表单校验通过
        if (valid) {
          // 请求后端判断验证码是否正确
          this.$http
            .post(this.apis.nextToResetApi, {
              // 用户输入验证码
              inputCode:this.emailForm.code,
              // inputCode: "1234",
              // 正确的验证码
              correctCode:this.correctCode
              // correctCode: "1234",
            })
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success(res.data.message);
                // 进入重设密码页面
                this.Current += 1;
                // 保存resetKey
                this.resetKey = res.data.data;
                
              } else {
                this.$message.error(res.data.message);
              }
            });
        }
      });
    },

    // 用户请求重设密码
    resetNext() {
      this.$refs.ResetPwdFormRef.validate((valid) => {
        if (valid) {
          //  发送请求，修改密码
          this.$http
            .post(this.apis.toReset, {
              // 新密码
              newPassword: this.info.password,
              // resetKey
              resetKey: this.resetKey,
              // email
              email: this.emailForm.email,
            })
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success(res.data.message);
                // 进入成功页面
                console.log(res.data)
                this.Current += 1;
              } else {
                console.log(res.data)
                this.$message.error(res.data.message);
              }
            });
        }
      });
    },

    // TODO 点击返回，返回主页
    back() {
      this.$router.replace("/about")
    },

    // TODO 点击去登陆，跳转到登录页面
    toLogin(){
      this.$router.replace("/login")
    }
  },
//   components:{
//       footers
//   }
};
</script>

<style scoped>
.reset-pwd {
  position: absolute;
  top:75px;
  left:350px;
}

.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 500px;
  text-align: center;
  padding-top: 80px;
}

.info {
  font-size: 14px;
  color: rgba(116, 106, 106, 0.562);
  margin-bottom: -5px;
}
</style>