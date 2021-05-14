
<template>
    <div class="tabs">
        <el-tabs type="border-card">
            <el-row>
                <el-col :span="4" :offset="10">
                    <div style="width:200px;margin:auto;">
                        <h1 style="font-size:30px;font-weight:bold">志愿认证</h1>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="9" :offset="2">
                    <div style="width:auto;">
                        <el-form ref="volunteerForms" :model="volunteerForms"  label-width="100px" :rules="rules">
                            <el-form-item label="真实姓名:"  label-position="right"  style="margin-left:75px;"  prop="real_name">
                                <el-input v-model="volunteerForms.real_name" :clearable="true" style="width:200px;"></el-input>
                            </el-form-item>
                            <el-form-item label="身份证号:"  label-position="right"  style="margin-left:75px;"  prop="id_card">
                                <el-input v-model="volunteerForms.id_card"  :clearable="true" style="width:200px;"></el-input>
                            </el-form-item>
                            <el-form-item label="验证邮箱:" label-position="right"  style="margin-left:75px;"  prop="email">
                                <el-input v-model="volunteerForms.email" :clearable="true" :disabled="false" style="width: 200px;" @blur="blurHandle"></el-input>
                            </el-form-item>
                            <el-form-item label="验证码:"  label-position="right"  style="margin-left:75px;"  prop="inputCode">
                                <el-input v-model="volunteerForms.inputCode" :clearable="true" :disabled="false" style="width: 103px;"></el-input>
                            </el-form-item>
                            <el-button type="primary" style="margin-left:175px;width: 120px;" :disabled="disabled" @click="inputButtonClick">
                                {{btntxt}}
                                </el-button>
                            <el-form-item label="学历证明:"  label-position="right"  style="margin-left:75px;margin-top:20px"  prop="prove">
                            <el-upload
                                class="avatar-uploader"
                                action="http://150.158.191.172:8081/user/upload"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                                >
                                <img v-if="picUrl" :src="picUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            </el-form-item>
                        </el-form>
                        <el-divider></el-divider>
                        <el-button type="primary" style="margin-left:350px;"  @click="dialogVisible = true">
                            确认认证
                        </el-button>
                        <el-dialog
                            title="提示"
                            :visible.sync="dialogVisible"
                            width="30%"
                            >
                            <span>确认提交？</span>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="submitForms">确 定</el-button>
                            </span>
                        </el-dialog>
                    </div>
                </el-col>
                <el-col :span="8" :offset="2">
                    <div style="border:1px solid #E3E3E3;width:auto;text-align:center;padding:15px">
                        <h3 style="font-size:25px;font-weight:bold">注意事项</h3><br/>
                        <div style="text-align:left">
                            <li>志愿认证成功后即可上传视频，成为志愿者</li><br/>
                            <li>请填写您的真实姓名和身份证号</li><br/>
                            <li>验证邮箱为注册邮箱</li><br/>
                            <li>每个邮箱只能用于认证一个账户</li><br/>
                            <li>请上传学历证明图片，让我们知道您是否可以够成为志愿者</li><br/>
                            <li>图片格式为jpg / png格式，大小不超过500kb</li><br/>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-tabs>
    </div>
</template>


<style scoped>
.tabs{
    width:95%;
    margin-left:2.5%;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>


<script>
    export default{
        data(){
            return {
                sendEmailApi:"common/email?email=",
                btntxt:"发送验证码",
                time:0,
                disabled:true,
                submitApi:"/user/idToken{}/apply",
                correctCode:"",
                picUrl:"",
                volunteerForms:{
                    real_name:'',
                    id_card:'',
                    email:"",
                    inputCode:"",
                    prove: ''
                },
                dialogVisible:false,
                rules: {
                    real_name: [
                        { required: true, message: '真实姓名不能为空', trigger: 'blur' },
                    ],
                    id_card: [
                        { required: true, message: '身份证号不能为空', trigger: 'change' },
                        { min: 18, max: 18, message: '请输入正确的18位身份证号码', trigger: 'blur' }
                    ],
                    email: [
                        {required: true, message: '邮箱不能为空', trigger: 'blur' }
                    ],
                    inputCode: [
                        {required: true, message: '验证码不能为空', trigger: 'blur' }
                    ],
                    prove: [
                        {required: true, message: '请上传学历证明图片', trigger: 'blur' }
                    ]
                }
            }
        },
        name:'mainAuthentication',
        methods:{
            inputButtonClick(){
                this.time=60;
                this.timer(); 
                 this.$http.get(this.sendEmailApi+this.volunteerForms.email).then((res)=>{
                if(res.data.code=="200"){
                    this.$message.success("发送验证码成功");
                    this.correctCode=res.data.data;
                    console.log(res.data.data)
                    }
                })
            },
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
            blurHandle(){
                console.log("执行函数")
                if(this.volunteerForms.email!=""){
                    if(this.volunteerForms.email!=this.$store.getters.getUserInfo.email)
                    {
                        this.$message({
                                showClose:true,
                                message:'所写邮箱和注册邮箱不相同',
                                type:'error'
                            })
                    }
                    else{
                        this.$message({
                                showClose:true,
                                message:'验证成功，可以发送验证码',
                                type:'success'
                            })
                            this.disabled=false;
                    }
                }
            },
            submitForms(){
                this.dialogVisible=false
                this.$refs.volunteerForms.validate((valid) => {
                    if (valid) {
                        if(this.volunteerForms.inputCode==this.correctCode)
                        {
                            console.log(this.volunteerForms)
                            this.$http.post(this.submitApi,{
                                real_name:this.volunteerForms.real_name,
                                id_card:this.volunteerForms.id_card,
                                email:this.volunteerForms.email,
                                inputCode:this.volunteerForms.inputCode,
                                prove:this.volunteerForms.prove
                            }).then((res)=>{
                                console.log(res.data)
                            if(res.data.code=="200"){
                                this.$message.success("提交成功");
                                this.correctCode=res.data.data;
                                console.log(res.data.data)
                                this.$store.commit("setExamining")
                                this.$router.push('/personal/'+this.$store.getters.getIdToken+'/myAdd');
                                }
                            })
                        }
                        else{
                        this.$message({
                            showClose:true,
                            message:'验证码错误',
                            type:'error'
                        })
                        }
                       
                    } 
                    else {
                        console.log('error submit!!');
                        return false;
                    }
                    });
             
            },
            handleAvatarSuccess(res, file) {
                this.$message.success('成功');
                this.volunteerForms.prove=URL.createObjectURL(file.raw);
                this.picUrl=res.data.url;
                this.volunteerForms.prove=res.data.filename;
            },
            
            beforeAvatarUpload(file) {
                const isJPG = (file.type === 'image/jpeg'||'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                this.$message.error('上传图片只能是 JPG或者PNG 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        },
        created(){
            this.submitApi="/user/"+this.$store.getters.getIdToken+"/apply"
        }
    }
</script>