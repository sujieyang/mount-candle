<template>
  <el-container style="height: auto; border: 1px solid #eee">
  <el-container>
    <el-header style="font-size: 12px">
      <headers />
    </el-header>  
  <el-container>
      <sidebars/>
    <el-main>
      <el-row>
        <el-col >
          <div class="box1">
            <el-col :span="3">
              <div class="avatar">
                  <el-upload
                    slot="reference"
                    class="avatar-uploader"
                    action="http://150.158.191.172:8081/user/upload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <el-avatar v-if="userInfos.avatar" shape="circle" :size="85" fit='fill' :src="userInfos.avatar"></el-avatar>
                    <el-avatar v-else shape="circle" :size="85" fit='fill' :src="'http://47.96.231.121/avatars/timg.jpg'"></el-avatar>
                  </el-upload>
                
              </div>
              
            </el-col>
            <el-col :span="10">
              <div class="userInfos" >
                <el-row style="color:white;font-size:20px;margin-top:10px">
                  {{userInfos.userName}}
                </el-row>
                <el-row style="color:white;font-size:15px;margin-top:10px">
                  {{userInfos.email}}
                </el-row>
                <el-row style="color:white;font-size:15px;margin-top:10px">
                  {{userInfos.info}}
                </el-row>
              </div>
            </el-col>
          </div>
        </el-col>
      </el-row>
      <!-- 标签页 -->
      <el-row>
        <div class="tabsTo">
          <!-- 主页 -->
          <el-col :span="3">
            <div class="tabOne">
              <el-col :span="10">
                <a-icon type="home" theme="filled" style="fontSize:25px;color:#FF4040;margin-top:15px;margin-left:25px;"/>
              </el-col>
              <el-col :span="12" :offset="0">
                <h2 style="margin-top:15px;"><router-link class="tabOneFont" :to="'/personal/'+this.userInfos.idToken+'/index'">主页</router-link></h2>
              </el-col>
            </div>
          </el-col>
          
          <!-- 收藏 -->
          <el-col :span="3">
            <div class="tabOne">
              <el-col :span="10">
              <a-icon type="star" theme="filled" style="fontSize:25px;color:#F8EE2C;margin-top:15px;margin-left:15px;"/>
              </el-col>
              <el-col :span="12" :offset="0">
                <h2 style="margin-left:-10px;margin-top:15px;"><router-link class="tabOneFont" :to="'/personal/'+this.userInfos.idToken+'/collections'">收藏</router-link></h2>
              </el-col>
              
            </div>
          </el-col>
          <el-col :span="3">
            <div class="tabOne">
              <el-col :span="10">
              <a-icon type="message" theme="filled"  style="fontSize:25px;color:#25EE22;margin-top:15px;margin-left:10px;"/>
              </el-col>
              <el-col :span="12" :offset="0">
                <h2 style="margin-left:-15px;margin-top:15px;"><router-link class="tabOneFont" :to="'/personal/'+this.userInfos.idToken+'/myAdd'">我的发布</router-link></h2>
              </el-col>
              
            </div>
          </el-col>
          <!-- 个人信息 -->
          <el-col :span="3">
            <div class="tabOne">
              <el-col :span="10">
              <a-icon type="smile" style="fontSize:25px;color:#696969;margin-top:15px;margin-left:35px;"/>
              </el-col>
              <el-col :span="12" :offset="0">
                <h2 style="margin-left:5px;margin-top:15px;"><router-link class="tabOneFont" :to="'/personal/'+this.userInfos.idToken+'/personalData'">个人信息</router-link></h2>
              </el-col>
              
            </div>
          </el-col>
        </div>
      </el-row>
      <router-view/>
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
  /* 头像签名模块 */
  .box1{
    height:200px;
    width:95%;
    margin-left:2.5%;
    background-image:url("../assets/5.png");
  }
  /* 头像 */
  .avatar{
    width:85px;
    height:85px;
    margin-left: 50px;
    margin-top: 100px;
    cursor: pointer;
    opacity: 1;
    transition: opacity 1s;
    -webkit-transition: opacity 1s;
  }
  .avatar:hover {
    opacity: 0.5;
}
  /* 头像外的个人信息 */
  .userInfos{
    width:200px;
    height:110px;
    margin-left: 10px;
    margin-top: 90px;
  }
  /* 标签页 */
  .tabsTo{
    box-shadow: 0px 0px 2px #cecdcd;
    border:1px solid #dddddd;
    width:95%;
    margin-left: 2.5%;
    height:65px;
    background-color:#f1f4f8;
  }
  /* 标签 */
  .tabOne{
    width:180px;
    height:55px;
    margin-top: 5px;
    font-size: 12px;
    
  }
  .tabOneFont{
    color:#000;
  }
  .tabOneFont:hover{
    color:#409EFF;
  }
</style>

<script>
  import headers from "../components/Header.vue";
  import sidebars from "../components/SideBar.vue";
  import footers from "../components/Footer.vue";
  export default {
    data() {
      return {
        pictureApi:'',
        userInfos:{
          
          
        },
        userId:1,
        
      }
    },
    created(){
      this.getuserInfo();
      console.log(this.$store.getters.getUserInfo)
      this.userInfos=this.$store.getters.getUserInfo;
      this.userInfos.info=this.matchTitle(this.userInfos.info);
      this.pictureApi="/user/"+this.$store.getters.getIdToken+"/updateAvatar";
      // this.$router.replace('/personal/'+this.userInfos.idToken+'/index')
    },
    mounted(){
      // console.log(this.$store.state.userInfos)
      // this.userInfos=this.$store.state.userInfos;
      // this.userInfos.info=this.matchTitle(this.userInfos.info);
    },
    components:{
      sidebars,
      footers,
      headers 

    },
    methods:{
      getuserInfo(){
        console.log(this.$store.getters.getIdToken)
        this.$http.get("user/info/"+this.$store.getters.getIdToken).then((res)=>{
          console.log(res.data)
          if(res.data.code=="200"){
            console.log(res.data.data)
            this.$store.commit("updateLoginForm",res.data.data)
          }
        })
      },

      matchTitle(title){
        console.log(title)
        if(title>14){
                return title.slice(0,14)+'...';
        }
            },
      handleAvatarSuccess(ress, file) {
        console.log(URL.createObjectURL(file.raw));
        console.log("上传执行")
        console.log(ress.data)
        var avatartemp=ress.data.url;
        
        var avatartemp2=ress.data.filename;
        this.userInfos.imgSrc=avatartemp;
        console.log(avatartemp)
        console.log(this.pictureApi)
        this.$http.post(this.pictureApi,{avatar:avatartemp2}).then((res)=>{
                                  console.log(res.data)
                                  if (res.data.code == 200) {
                                    this.$message.success("上传成功!");
                                    this.userInfos.imgSrc =avatartemp;
                                    this.$store.commit("updateAvatar",avatartemp);
                                    } else {
                                    this.$message.error("上传失败");
                                    }
                                });
      },
      beforeAvatarUpload(file) {
        const isJPG = (file.type === 'image/jpeg'||'image/png');
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    }
  };
</script>