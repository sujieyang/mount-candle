
<template>
    <div class="tabs">
        <el-row>

        </el-row>
        <div class="formInfos">
            <el-row>
                        <el-col :span="5" :offset="0">
                            <h2 style="font-weight:bold;font-size:25px;" >我的个人信息</h2>
                        </el-col>
                    </el-row>
            <el-form ref="userForm" :rules="userRules" :model="userForms"  label-width="80px">
                <el-form-item prop="username" label="昵称:"  label-position="right"  style="margin-left:300px;" >
                    <el-input v-model="userForms.nickname" :clearable="true" style="width:200px;"></el-input>
                </el-form-item>
                <el-form-item  label="账号:"  label-position="right"  style="margin-left:300px;" >
                    <el-input v-model="userForms.username" :disabled="true" style="width:200px;"></el-input>
                </el-form-item>
                <el-form-item prop="age" label="年龄:" label-position="right"  style="margin-left:300px;" >
                    <el-input v-model="userForms.age"  style="width:200px;"></el-input>
                </el-form-item>
                <el-form-item label="性别:"  label-position="right"  style="margin-left:300px;" >
                            <el-radio-group v-model="userForms.gender">
                                <el-radio label="男"></el-radio>
                                <el-radio label="女"></el-radio>
                            </el-radio-group>
                </el-form-item>
                <el-form-item prop="mobile" label="手机号:"  label-position="right" style="margin-left:300px;" >
                    <el-input v-model="userForms.mobile" :clearable="true" style="width:200px;"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="邮箱:"  label-position="right"  style="margin-left:300px;" >
                    <el-input v-model="userForms.email" :clearable="true" style="width:200px;"></el-input>
                </el-form-item>
                <el-form-item prop="info" label="简介:" label-position="right" style="margin-left:300px;">
                    <el-input type="textarea" v-model="userForms.info" :clearable="true" :rows="4" style="width:400px;"></el-input>
                </el-form-item>
            </el-form>
            <el-divider></el-divider>
            <el-button type="primary" style="margin-left:400px;" @click="saveuserForms">
                保存
            </el-button>
        </div>
    </div>
</template>


<style scoped>
.tabs{
    box-shadow: 0px 0px 2px #cecdcd;
    border:1px solid #dddddd;
    width:95%;
    margin-left:2.5%;
}
/* 表单 */
.formInfos{
    width:80%;
    margin-left: 10%;
    height:auto;
    padding: 20px;
    /* background-color: rgba(252, 250, 248, 0.966); */
  }
/* 具体每条信息布局 */
.formDetail{
    width:80%;
    margin-left:10%;
    height: 100px;
}

</style>


<script>
    export default{
        data(){
            return {
                apis:{
                    isExistEmail:"common/email/exist?email=",
                    updateInfo:'user/info/',
                    getInfo:'user/info/',
                },
                beforeEmail:'1005309071@qq.com',

                userForms:{
                    nickname:'',
                    username:'',
                    mobile:'',
                    email:'',
                    info:'',
                    gender:'',
                    age:''
                },
                userRules:{
                    username : [{required:true,message:"用户名不得为空!",trigger:"blur"},
                    {min:3,max:10,message: "用户名长度在三到十个字符",trigger:"blur"}],
                    age:[{required:true,message:"年龄不能为空",trigger:"blur"}],
                    email: [
                        { required: true, message: "邮箱不能为空", trigger: "blur" },
                        { type: "email", message: "不合法的邮箱!", trigger: "blur" },
                    ],
                    info :[
                        { required: true, message: "请留下你的简介，不要为空哦~", trigger: "blur" }
                    ]
                }
            }
        },
        mounted(){
            this.getPersonalInfo();
        },
        name:'mainPersonalData',
        methods:{
            getPersonalInfo(){
                this.$http.get(this.apis.getInfo+this.$store.getters.getIdToken).then((res)=>{
                    if(res.data.code=="200"){
                        console.log(res.data.data)
                        this.userForms.nickname=res.data.data.nickname;
                        this.userForms.username=res.data.data.username;
                        this.userForms.info=res.data.data.info;
                        this.userForms.age=res.data.data.age;
                        this.userForms.gender=res.data.data.gender;
                        this.userForms.mobile=res.data.data.mobile;
                        this.userForms.email=res.data.data.email;
                        this.beforeEmail=res.data.data.email;

                    }else{
                        this.$message.error("请检查是否有网络并刷新")
                    }
                })
            },

            saveuserForms(){
                this.$refs.userForm.validate((valid)=>{
                    if(valid){
                        if(this.beforeEmail==this.userForms.email){
                            this.$http.post(this.apis.updateInfo+this.$store.getters.getIdToken,this.userForms).then((res)=>{
                                        console.log(res.data)
                                        if(res.data.code=="200"){
                                            this.$message.success("保存成功");
                                            this.$store.commit("updateLoginFormInPersonalData",this.userForms);

                                        }else{
                                            this.$message.error("保存失败,请重试");
                                        }
                                    })
                        }else{
                            this.$http.get(this.apis.isExistEmail + this.userForms.userEmail).then((res) => {
                                if (res.data.code == "200") {
                                if(res.data.data==true){
                                    this.$message.warning("该邮箱已被注册,无法保存");
                                    return;
                                }
                                else{
                                    this.$http.post(this.apis.updateInfo+this.$store.state.userInfos.idToken,this.userForms).then((res)=>{
                                        if(res.data.code=="200"){
                                            this.$message.success("保存成功");
                                            this.$store.commit("updateLoginFormInPersonalData",this.userForms);
                                        }else{
                                            this.$message.error("保存失败,请重试");
                                        }
                                    })
                    }
          
                    }

        
                });
                        }
                    }
                })
                
            },
        }
    }
</script>