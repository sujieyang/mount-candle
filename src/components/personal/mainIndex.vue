
<template>
    <div class="tabs">
        <el-row>
            <el-col :span="17">
                <div class="leftfloat">
                    <!-- 我的视频 -->
                    <div style="background-color:#FFFFFF;margin:5px;padding:5px;">
                        <el-row>
                        <el-col :span="4" style="font-size:25px;font-weight:bold;">我的视频:</el-col>
                            <el-col :span="3" :offset="17">
                                <el-button type="primary" plain style="width:80px;height:40px;" v-if="myVideos.length!=0" @click="toMyVideos">
                                    更多>>
                                </el-button>
                            </el-col>
                        </el-row>
                    </div>
                    <div style="width:95%;margin-left:2.5%;" v-if="myVideos.length!=0">
                        <el-row>
                            <el-col :span="6" v-for="(item, index) in myVideos" :key="index">
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
                        </el-row>
                        <el-divider></el-divider>
                    </div>
                    <div style="width:95%;margin-left:2.5%;" v-if="myVideos.length==0">
                        <div style="width:100%;height:100px;padding:15px;">
                            <h1 style="font-size:30px;text-align:center;font-weight:bold;color:#409EFF">还没有视频哦~</h1>
                        </div>
                        <el-divider></el-divider>
                    </div>
                    <!-- 我的帖子 -->
                    <div style="background-color:#FFFFFF;margin:5px;padding:5px;">
                        <el-row>
                        <el-col :span="4" style="font-size:25px;font-weight:bold;">我的帖子:</el-col>
                            <el-col :span="3" :offset="17">
                                
                                    <el-button type="primary" plain style="width:80px;height:40px;" v-if="myTalks.length!=0" @click="toMyTalks">
                                        更多>>
                                    </el-button>
                                
                            </el-col>
                        </el-row>
                    </div>
                    <div style="width:95%;margin-left:2.5%;" v-if="myTalks.length!=0">
                        <el-row>
                            <el-col :span="6" v-for="(item, index) in myTalks" :key="index">
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
                        </el-row>
                        <el-divider></el-divider>
                    </div>
                    <div style="width:95%;margin-left:2.5%;" v-if="myTalks.length==0">
                        <div style="width:100%;height:100px;padding:15px;">
                            <h1 style="font-size:30px;text-align:center;font-weight:bold;color:#409EFF">还没有讨论哦~</h1>
                        </div>
                        <el-divider></el-divider>
                    </div>
                    <!-- 我的收藏 -->
                    <div style="background-color:#FFFFFF;margin:5px;padding:5px;">
                        <el-row>
                        <el-col :span="4" style="font-size:25px;font-weight:bold;">我的收藏:</el-col>
                            <el-col :span="3" :offset="17">
                                
                                    <el-button type="primary" plain style="width:80px;height:40px;" v-if="collectionVideos.length!=0" @click="toMyTalks">
                                        更多>>
                                    </el-button>
                                
                            </el-col>
                        </el-row>
                    </div>
                    <div style="width:95%;margin-left:2.5%;" v-if="collectionVideos.length!=0">
                        <el-row>
                            <el-col :span="6" v-for="(item, index) in collectionVideos" :key="index">
                                <div style="background-color:#FFFFFF;margin:5px;">
                                    <el-card :body-style="{ padding: '0px' }">
                                        <img :src='item.Src' class="image">
                                        <span style="font-weight:bold;">{{item.name}}</span>
                                        <el-row style="margin-top:5px;">
                                            <el-col :span="24" :offset="1">
                                                <time class="time" >作者:{{item.auth}}</time>
                                            </el-col>
                                        </el-row>
                                        <el-row style="margin-top:5px;">
                                            <el-col :span="24" :offset="1">
                                                <time class="time" >播放量:{{item.playNum}}</time>
                                            </el-col>
                                        </el-row>
                                    </el-card>
                                </div>
                            </el-col>
                        </el-row>
                        <el-divider></el-divider>
                    </div>
                    <div style="width:95%;margin-left:2.5%;" v-if="collectionVideos.length==0">
                        <div style="width:100%;height:100px;padding:15px;">
                            <h1 style="font-size:30px;text-align:center;font-weight:bold;color:#409EFF">还没有收藏哦~</h1>
                        </div>
                        <el-divider></el-divider>
                    </div>
                </div>
                
            </el-col>
            <el-col :span="6" >
                <el-row>
                    <div class="rightfloat" style="text-align:center">
                        <div style="width:100%;border:1px solid #E3E3E3;background-color:#ffffff;border-radius: 5px">
                            <img style="margin-top:20px;" src="../../assets/waiting.jpg" alt="欢迎">
                            <div v-if="isVolunteer"  style="margin-top:40px;min-height:75px;font-size:25px;font-weight:bold;color:#00D4FF;">
                                山烛优秀志愿者
                            </div>
                            <div v-if="!isVolunteer&&!isExamining"  style="margin-top:40px;min-height:75px;font-size:25px;font-weight:bold;color:#00D4FF">
                                <router-link :to="'/personal/'+this.$store.getters.getIdToken+'/authentication'">
                                    <el-button type="primary" size="mini" style="font-size:16px;">点击志愿认证</el-button>
                                </router-link>
                            </div>
                            <div v-if="!isVolunteer&&isExamining"  style="margin-top:40px;min-height:75px;font-size:25px;font-weight:bold;color:#00D4FF">
                                等待志愿者审核中...
                            </div>
                        </div>
                        <div style="margin-top:20px;width:100%;border:1px solid #E3E3E3;background-color:#ffffff;border-radius: 5px;">
                            <div style="margin-top:20px;width:100%;border:1px solid #E3E3E3;background-color:#ffffff;border-radius: 5px;">
                            <div style="padding:25px;">
                                <el-divider></el-divider>
                            </div>
                            <h1 style="margin-top:10px;font-size:25px;font-weight:bold;">个人简介</h1>
                            <div class="textbox">
                                {{publicText}}
                            </div>
                        </div>
                        </div>
                    </div>

                </el-row>
            </el-col>
        </el-row>
    </div>
</template>


<style scoped>
.textbox{
    padding:10px;
    margin:10px;
    text-align:left;
    min-height:200px;
    background-color:#ffffff;
    font-size:15px;
    margin-bottom: 30px;
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
    border-radius: 5px;
    margin-top:8px;
    margin-bottom:8px;
    margin-left:15px;
    width:860px;
    min-height:600px;
    border:1px solid #E3E3E3;
    background-color:#ffffff;
}
.rightfloat
{
    /* padding: 20px; */
    margin-top:8px;
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
</style>


<script>
    export default{
        data(){
            return {
                isVolunteer:false,
                isExamining:false,
                allVideosApi:"",
                allPostApi:"",
                allCollectionApi:"",
                editPublicApi:"",
                publicText:"是兄弟就来福大看我，不会吧不会吧，不会真有人连我都看不到吧。啊，阿哲？阿巴阿巴？！我！nbnbnb，，23333/n打我电话123456.风里雨里，东三等你。！什么？你来了，啊，阿哲，我在图书馆，真是对不起。不会真有人不来图书滚啊吧",
                myVideos:[],
                collectionVideos:[],
                myTalks:[],
                
            }
        },
        name:'mainIndex',
        methods:{
            toMyVideos(){
                this.$router.push({
                    path: "/personal/"+this.$store.getters.getIdToken+"/myAdd",
                    query: {
                        keyword: "",
                        typeKey: "all",
                        sortKey: "id",
                        pageIndex: 1,
                        activeName:"first",
                    },
                
                });
            },
            toMyTalks(){
                this.$router.push({
                    path: "/personal/"+this.$store.getters.getIdToken+"/myAdd",
                    query: {
                        keyword: "",
                        typeKey: "all",
                        sortKey: "title",
                        pageIndex: 1,
                        activeName:"second",
                    },
                
                });
            },
            //处理标题
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
        },
        mounted(){

        },
        created(){
            this.isVolunteer=this.$store.getters.getIsVolunteer
            this.isExamining=this.$store.getters.getIsExamining
            console.log("执行create")
            this.allVideosApi="/user/"+this.$store.getters.getIdToken+"/courses?pageIndex="+1+"&pageSize="+4
            this.allPostApi="/user/"+this.$store.getters.getIdToken+"/posts?pageIndex="+1+"&pageSize="+4
            this.allCollectionApi="/user/"+this.$store.getters.getIdToken+"/myCollections?pageIndex="+1+"&pageSize="+4
            this.editPublicApi="/user/info/"+this.$store.getters.getIdToken
            console.log(this.$store.getters.getUserInfo)
            this.publicText=this.$store.getters.getUserInfo.info;
            this.curPublicText=this.publicText;
            //获取视频
            this.$http.post(this.allVideosApi,{query:"",sort:"id",typeKey:"all"}).then((res)=>{
                                  console.log(res.data)
                                  this.myVideos=[]
                                  if (res.data.code == 200) {
                                      for(var i=0;i<res.data.data.rows.length;i++){
                                            console.log("进入循环")
                                            console.log(res.data.data.rows[i])
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

            //获取帖子
            this.$http.post(this.allPostApi,{query:"",sort:"id",typeKey:"all"}).then((res)=>{
                                  console.log(res.data)
                                  this.myTalks=[]
                                  if (res.data.code == 200) {
                                      for(var i=0;i<res.data.data.rows.length;i++){
                                            console.log("进入循环")
                                            console.log(res.data.data.rows[i])
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

            //获取收藏
            this.$http.post(this.allCollectionApi,{query:"",sort:"id",typeKey:"all"}).then((res)=>{
                                  console.log(res.data)
                                  this.collectionVideos=[]
                                  if (res.data.code == 200) {
                                      for(var i=0;i<res.data.data.rows.length;i++){
                                            console.log("进入循环")
                                            console.log(res.data.data.rows[i])
                                            var obj=res.data.data.rows[i]
                                         var vedio={
                                            id:obj.id,
                                            name:this.matchTitle(obj.title),
                                            Src:obj.face,
                                            playNum:this.matchNum(obj.play),
                                            auth:obj.formUser,
                                            star_time:obj.publishDate 
                                          };
                                          if(vedio.auth==""){vedio.auth="暂无"}
                                          this.collectionVideos.push(vedio)
                                         }


                                    } else {
                                    this.$message.error("上传失败");
                                    }
                                    console.log("执行完毕")
                                });
        }
    }
</script>