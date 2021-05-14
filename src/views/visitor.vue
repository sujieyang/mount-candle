
<template>
<el-container style="height: auto; border: 1px solid #eee">
  <el-container>
    <el-header style=" font-size: 12px">
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
                  <!-- 头像 -->
                  <el-avatar v-if="userInfos.imgSrc" shape="circle" :size="85" fit='fill' :src="userInfos.imgSrc"></el-avatar>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="userInfos" >
                <el-row style="color:white;font-size:20px;margin-top:10px">
                  {{userInfos.userName}}
                </el-row>
                <el-row style="color:white;font-size:15px;margin-top:10px">
                  {{userInfos.userEmail}}
                </el-row>
                <el-row style="color:white;font-size:15px;margin-top:10px">
                  {{userInfos.userInfo}}
                </el-row>
              </div>
            </el-col>
          </div>
        </el-col>
      </el-row>
      
    <div class="tabs">
        <el-row>
            <el-col :span="17">
                <div class="leftfloat">
                    <div style="border:1px solid #E3E3E3;background-color:#ffffff;background-color:#FFFFFF;padding:5px;border-radius: 5px;">
                            <h1 style="margin-top:20px;color:#d13838;font-size:30px;font-weight:bold;text-align:center;">欢迎来到{{userInfos.userName}}的主页</h1>
                            <el-divider></el-divider>
                        </div>

                    <div style="border:1px solid #E3E3E3;background-color:#ffffff;margin-top:20px;border-radius: 5px;">
                        <!-- TA的视频 -->
                        <div style="background-color:#FFFFFF;margin:5px;padding:5px;">
                            <el-row>
                            <el-col :span="4" style="font-size:25px;font-weight:bold;">TA的视频:</el-col>
                            </el-row>
                        </div>
                        <div style="width:95%;margin-left:2.5%;" v-if="myVideos.length!=0">
                            <el-row>
                                <el-col :span="8" v-for="(item, index) in myVideos" :key="index">
                                    <div style="background-color:#FFFFFF;margin:5px;">
                                        <el-card :body-style="{ padding: '0px' }">
                                            <img :src='item.Src' class="image">
                                            <span style="font-weight:bold;">{{item.name}}</span>
                                            <el-row style="margin-top:5px;">
                                                <el-col :span="24" :offset="1">
                                                    <time class="time" >播放量:{{item.playNum}}</time>
                                                </el-col>
                                            </el-row>
                                        </el-card>
                                    </div>
                                </el-col>
                                <el-col :offset="10">
                                    <div class="block" style="margin-top:20px">
                                        <el-pagination
                                            background
                                            layout="prev, pager, next"
                                            :current-page="videoPageIndex"
                                            @current-change="handleVideoCurrentChange"
                                            :page-size="videoPageSize"
                                            :total="totalVideos">
                                        </el-pagination>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-divider></el-divider>
                        </div>
                        <!-- TA的帖子 -->
                        <div style="background-color:#FFFFFF;margin:5px;padding:5px;">
                            <el-row>
                            <el-col :span="4" style="font-size:25px;font-weight:bold;">TA的帖子:</el-col>
                            </el-row>
                        </div>
                        <div style="width:95%;margin-left:2.5%;" v-if="myTalks.length!=0">
                            <el-row>
                                <el-col :span="8" v-for="(item, index) in myTalks" :key="index">
                                    <div style="background-color:#FFFFFF;margin:5px;">
                                        <el-card :body-style="{ padding: '0px' }">
                                            <img :src='item.Src' class="image">
                                            <span style="font-weight:bold;">{{item.title}}</span>
                                            <el-row style="margin-top:5px;">
                                                <el-col :span="9" :offset="1">
                                                    <time class="time" >浏览量:{{item.viewNums}}</time>
                                                </el-col>
                                                <el-col :span="9" :offset="1">
                                                    <time class="time" >评论数:{{item.commentNums}}</time>
                                                </el-col>
                                            </el-row>
                                        </el-card>
                                    </div>
                                </el-col>
                                <el-col :offset="10">
                                    <div class="block" style="margin-top:20px">
                                        <el-pagination
                                            background
                                            layout="prev, pager, next"
                                            :current-page="tolkPageIndex"
                                            @current-change="handleTolkCurrentChange"
                                            :page-size="tolkPageSize"
                                            :total="totalTolks">
                                        </el-pagination>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-divider></el-divider>
                        </div>
                    </div>
                </div>
                
            </el-col>
            <el-col :span="6" >
                <el-row>
                    <div class="rightfloat" style="text-align:center">
                        <div style="width:100%;border:1px solid #E3E3E3;background-color:#ffffff;border-radius: 5px">
                            <img style="margin-top:20px;" src="../assets/waiting2.jpg" alt="欢迎">
                        </div>
                        <div style="margin-top:20px;width:100%;border:1px solid #E3E3E3;background-color:#ffffff;border-radius: 5px;">
                            <div style="padding:25px;">
                                <el-divider></el-divider>
                            </div>
                            <h1 style="margin-top:10px;font-size:25px;font-weight:bold;">公告</h1>
                            <div class="textbox">
                                {{publicText}}
                            </div>
                        </div>
                    </div>
                </el-row>
            </el-col>
        </el-row>
    </div>


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
    background-color: #000;
  }
  /* 头像 */
  .avatar{
    width:85px;
    height:85px;
    margin-left: 50px;
    margin-top: 100px;
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
    width:95%;
    margin-left: 2.5%;
    height:75px;
    background-color: antiquewhite;
  }
  /* 标签 */
  .tabOne{
    width:180px;
    height:55px;
    margin-top: 5px;
  }
.textbox{
    border-radius: 5px;
    padding:15px;
    margin:20px;
    text-align:left;
    min-height:200px;
    background-color:#ffffff;
    font-size:14px;
    margin-bottom: 30px;
    border:1px solid #409EFF;
    background-color:#ffffff;
}
.tabs{
    width:95%;
    margin-left:2.5%;
    background-color:#f5f4f5;
    box-shadow: 0px 0px 2px #cecdcd;
    border:1px solid #dddddd;
}
.leftfloat
{
    margin-top:18px;
    margin-bottom:8px;
    margin-left:15px;
    width:860px;
    min-height:600px;
    /* border:1px solid #E3E3E3;
    background-color:#ffffff; */
}
.rightfloat
{
    /* padding: 20px; */
    margin-top:18px;
    margin-bottom:8px;
    margin-left:30px;
    width:310px;
    min-height:600px;
    /* border:1px solid #E3E3E3;
    background-color:#ffffff; */
}
.time {
    font-size: 12px;
    color: #999;
    margin-top: 5px;
    width: auto;
  }
  .image {
    width: 250px;
    height:130px;
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>


<script>
import headers from "../components/Header.vue";
  import sidebars from "../components/SideBar.vue";
  import footers from "../components/Footer.vue";
    export default{
        data(){
            return {
                userInfos:{
                    userName:'cold君',
                    userEmail:'1005309071@qq.com',
                    userInfo:'我是潘某的爹爹。',
                    imgSrc:'http://47.96.231.121/avatars/timg.jpg'
                },
                userId:1,
                publicText:"是兄弟就来福大看我，不会吧不会吧，不会真有人连我都看不到吧。啊，阿哲？阿巴阿巴？！我！nbnbnb，，23333/n打我电话123456.风里雨里，东三等你。！什么？你来了，啊，阿哲，我在图书馆，真是对不起。不会真有人不来图书滚啊吧",
                videoPageIndex: 1,
                videoPageSize: 9,
                tolkPageIndex: 1,
                tolkPageSize: 9,
                totalVideos:0,
                totalTolks:0,
                myVideos:[
                    {
                        id:1,
                        name:"1",
                        Src:'',
                        playNum:0,
                        auth:""
                        
                    }],
                    myTalks:[
                    {
                        id:1,
                        title:"",
                        Src:"",
                        viewNums:0,
                        commentNums:0,
                        create_time:"0",
                        content:"",
                        
                    }],
                isVolunteer:false
            }
        },
        name:'mainIndex',
        components:{
            sidebars,
            footers,
            headers 
            },
        methods:{
            handleTolkCurrentChange(currentPage)
            {
                 this.tolkPageIndex = currentPage;
                 console.log(this.tolkPageIndex)
                 this.allPostApi="/user/"+this.$route.params.userId+"/posts?pageIndex="+this.tolkPageIndex+"&pageSize="+9
                 this.getTolks()
            },
            handleVideoCurrentChange(currentPage)
            {
                 this.videoPageIndex = currentPage;
                 console.log(this.videoPageIndex)
                 this.allVideosApi="/user/"+this.$route.params.userId+"/courses?pageIndex="+this.videoPageIndex+"&pageSize="+9
                 this.getVideos()            
            },//处理标题
            matchTitle(title){
                return title.slice(0,14)+'...';
            },
            //处理数
            matchNum(num){
                let tmpNum=parseInt(num);
                if((Math.floor(tmpNum/1000)) >0){
                    let i=Math.floor(tmpNum/1000);
                    return (i+"k")
                }
                else{
                    return tmpNum;
                }
            },
            getVideos(){
                    this.$http.post(this.allVideosApi,{query:"",sort:"id",typeKey:"all"}).then((res)=>{
                                  console.log(res.data)
                                  this.myVideos=[]
                                  if (res.data.code == 200) {
                                      this.totalVideos=res.data.data.totalRecords
                                      for(var i=0;i<res.data.data.rows.length;i++){
                                            var obj=res.data.data.rows[i]
                                         var vedio={
                                            id:obj.id,
                                            name:this.matchTitle(obj.title),
                                            Src:obj.face,
                                            playNum:this.matchNum(obj.play),
                                            auth:obj.formUser
                                          };
                                          if(vedio.auth==""){vedio.auth=="暂无"}
                                          this.myVideos.push(vedio)
                                         }
                                      
                                    } else {
                                    this.$message.error("上传失败");
                                    }
                                    console.log("执行完毕")
                                });
            },
            getTolks(){
                    this.$http.post(this.allPostApi,{query:"",sort:"id",typeKey:"all"}).then((res)=>{
                                  console.log(res.data)
                                  this.myTalks=[]
                                  if (res.data.code == 200) {
                                      this.totalTolks=res.data.data.totalRecords
                                      for(var i=0;i<res.data.data.rows.length;i++){
                                            var obj=res.data.data.rows[i]
                                         var talk={
                                            id:obj.id,
                                            title:this.matchTitle(obj.title),
                                            Src:obj.face,
                                            viewNums:this.matchNum(obj.view),
                                            commentNums:this.matchNum(obj.commentNum),
                                            create_time:obj.create_time,
                                            content:this.matchTitle(obj.content),
                                          };
                                          this.myTalks.push(talk)
                                         }
                                      
                                    } else {
                                    this.$message.error("上传失败");
                                    }
                                    console.log("执行完毕")
                                });
            }
        },
        mounted(){
        },
        created(){
            console.log(this.$route.params.userId)
            console.log("执行create")
            this.allVideosApi="/user/"+this.$route.params.userId+"/courses?pageIndex="+this.videoPageIndex+"&pageSize="+9
            this.allPostApi="/user/"+this.$route.params.userId+"/posts?pageIndex="+this.tolkPageIndex+"&pageSize="+9
            
            //获取视频
            this.getVideos()

            //获取帖子
            this.getTolks()
                                this.$http.get("/user/info/"+this.$route.params.userId).then((res)=>{
                //                       userInfos:{
                //     userName:'cold君',
                //     userEmail:'1005309071@qq.com',
                //     userInfo:'我是潘某的爹爹。',
                //     imgSrc:'http://47.96.231.121/avatars/timg.jpg'
                // }
                                    if(res.data.code==200)
                                    {
                                        this.userInfos.userName=res.data.data.nickname;
                                        this.userInfos.userEmail=res.data.data.email;
                                        this.userInfos.imgSrc=res.data.data.avatar;
                                        this.userInfos.userInfo="";
                                        this.publicText=res.data.data.info;
                                    }
                                    else{
                                        console.log("找不到用户信息")
                                    }
                                })
        }
        
    }
</script>