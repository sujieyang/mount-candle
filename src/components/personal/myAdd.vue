<template>
    <div class="tabs">
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="first">
            <span slot="label" ><i class="el-icon-magic-stick" style="margin-right:8px;" ></i> 我的视频</span>
                <div class="box1">
                        <div v-if="!isEmptyVideo && auditStatus=='hadAuthenticated'">
                        <el-row>
                            <el-col :span="5" :offset="0">
                                <div style="font-weight:bold;font-size:25px;">我发布的视频</div>
                            </el-col>
                            <el-col :span="3" :offset="16">
                                <el-button type="primary" @click="dialogVisible = true;isAddDialog=true">上传视频<i class="el-icon-upload el-icon--right"></i></el-button>
                            </el-col>
                        </el-row>
                            <el-row>
                                <el-col class="tab-pane-header" :span="24">
                                    <el-form :inline="true" class="demo-form-inline" style="margin-left:130px;">
                                        <el-form-item label="分类：">
                                            <el-select
                                                v-model="videoCurrentTypeKey"
                                                size="mini"
                                                style="width: 100px"
                                                @change="videoHandleChange()"
                                            >
                                                <el-option
                                                v-for="cate in videoAllCates"
                                                :key="cate.typeKey"
                                                :label="cate.typeName"
                                                :value="cate.typeKey"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="排序规则：" style="margin-left: 20px">
                                            <el-select
                                                v-model="videoCurrentSortKey"
                                                placeholder=""
                                                size="mini"
                                                style="width: 100px"
                                                @change="videoHandleChange()"
                                            >
                                                <el-option
                                                v-for="option in videoSortOptions"
                                                :key="option.value"
                                                :label="option.label"
                                                :value="option.value"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="搜索：" style="margin-left:20px" >
                                            <el-input placeholder="请输入内容" size="mini" v-model="videoInputs" class="input-with-select" style="width:200px;margin-top:6px;">
                                            <el-button slot="append" size="mini" icon="el-icon-search" @click="videoSearch()"></el-button>
                                            </el-input>
                                        </el-form-item>
                                    </el-form>
                                </el-col>
                            </el-row>
                            <el-divider></el-divider>
                        </div>
                        <el-row>
                        <!-- 还未是志愿者 -->
                        <div v-if="auditStatus=='noAuthenticate'">
                            <el-row>
                                <el-col :offset="9">
                                    <div style="margin-top:20px">
                                        <img src="../../assets/waiting2.jpg" height="200px" width="200px" style="margin:left:500px" />
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <div>
                                    <el-col :span="10" :offset="7" style="margin-top:30px;">
                                        <h1 style="font-size:30px;">你还未成为志愿者哦~~</h1>
                                    </el-col>
                                    <el-col :span="4" style="margin-top:37px;margin-left:-70px;" >
                                        <router-link :to="'/personal/'+'1'+'/authentication'">
                                            <el-button type="primary" size="mini" style="font-size:16px;" @click="auditStatus='authenticating'">点击志愿认证</el-button>
                                        </router-link>
                                    </el-col>
                                </div>
                            </el-row>
                        </div>
                        <!-- 志愿者认证中 -->
                        <div v-if="auditStatus=='authenticating'">
                            <div style="margin:200px;">
                                <el-steps :active=2 finish-status="success">
                                    <el-step title="提交审核"></el-step>
                                    <el-step title="审核中"></el-step>
                                    <el-step title="完成审核"></el-step>
                                </el-steps>
                            </div>
                        </div>
                        <!-- 是志愿者身份但还未上传视频 -->
                        <div v-if="isEmptyVideo && auditStatus=='hadAuthenticated'">
                            <el-row>
                                <el-col :offset="9">
                                    <div style="margin-top:20px">
                                        <img src="../../assets/hi.jpg" height="200px" width="200px" style="margin:left:500px" />
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <div>
                                    <el-col :span="10" :offset="7" style="margin-top:30px;">
                                        <h1 style="font-size:30px;">你还未发布过视频哦~~</h1>
                                    </el-col>
                                    <el-col :span="4" style="margin-top:37px;margin-left:-70px;" >
                                        <el-button type="primary" size="mini" style="font-size:16px;" plain @click="dialogVisible = true">上传视频</el-button>
                                    </el-col>
                                </div>
                            </el-row>
                        </div>
                        <!-- 是志愿者身份且有上传视频 -->
                        <div v-if="!isEmptyVideo && auditStatus=='hadAuthenticated'">
                            <el-row>
                                <div class="videoBlock" v-if="myVideos.length!=0"  >
                                    <el-row>
                                        <el-col :span="7" v-for="(item, index) in myVideos" :key="index" :offset="1"   >
                                            <el-card shadow="hover" :body-style="{ padding: '0px' }" style="width:250px;margin-top:15px;">
                                            <img :src='item.Src' class="image" @click="gotoVideo(item.id)">
                                            <div style="padding: 14px;">
                                                <span style="font-weight:bold;">{{item.name}}</span>
                                                <el-row style="margin-top:5px;">
                                                    <el-col :span="9">
                                                        <time class="time" >浏览量:{{item.playNum}}</time>
                                                        
                                                    </el-col>
                                                <el-col :span="6" :offset="1">
                                                    <time class="time">收藏量:{{item.auth}}</time>
                                                </el-col>
                                                <el-col :span="2" :offset="2">
                                                    <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="dialogVisible=true;isAddDialog=false"></el-button>
                                                </el-col>
                                                <el-col :span="2" :offset="2">
                                                    <el-button type="primary" icon="el-icon-delete" size="mini" circle @click="DialogVisible1 = true;currentVideoId=item.id"></el-button>
                                                </el-col>
                                                </el-row>
                                            </div>
                                            </el-card>
                                        </el-col>
                                    </el-row>
                                    <el-divider/>
                                </div>
                                
                            </el-row>
                            <el-row>
                                
                                <el-col :span="7" :offset="17">
                                <div class="block">
                                
                                <el-pagination
                                    :hide-on-single-page="isOnlyOnePage"
                                    :page-size="videoPageSize"
                                    layout="prev, pager, next"
                                    :total="videoAllNums"
                                    @current-change="handleVideoCurrentChange"
                                    :current-page.sync="currentVideoPage">
                                </el-pagination>
                                </div>
                                </el-col>
                            </el-row>
                        </div>
                        <!-- 上传视频对话框 -->
                        <el-dialog
                            :visible.sync="dialogVisible"
                            width="1200px"
                            >
                                <div style="width:100%;text-align:center">
                                    <h1 v-if="isAddDialog" style="font-size:25px;font-weight:bold;">
                                        上传视频
                                    </h1>
                                    <h1 v-if="!isAddDialog" style="font-size:25px;font-weight:bold;">
                                        编辑或继续上传视频
                                    </h1>
                                </div>
                                <el-form ref="videoForm" :rules="videoRules" :model="videoForm"  label-width="100px" style="margin-left:350px;">
                                    
                                    <el-form-item prop="name" label="视频标题:"  label-position="right"  style="margin-left:75px;" >
                                        <el-input v-model="videoForm.name" :clearable="true" style="width:200px;"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="videoMessage" label="视频简介:"  label-position="right"  style="margin-left:75px;" >
                                        <el-input v-model="videoForm.videoMessage"  :clearable="true" style="width:200px;"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="type" label="视频类型:"  label-position="right"  style="margin-left:75px;" >
                                        <el-select v-model="videoForm.type" placeholder="请选择"  style="width:200px;" >
                                            <el-option label="启蒙" value="Kindergarten"></el-option>
                                            <el-option label="小学" value="primary"></el-option>
                                            <el-option label="中学" value="junior"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item prop="tag" label="视频标签:"  label-position="right"  style="margin-left:75px;" >
                                        <el-select v-model="videoForm.tag" placeholder="请选择"  style="width:200px;" >
                                            <el-option label="语文" value="1"></el-option>
                                            <el-option label="数学" value="2"></el-option>
                                            <el-option label="英语" value="4"></el-option>
                                            <el-option label="政治" value="3"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="视频封面:"  label-position="right"  style="margin-left:75px;" >
                                        <el-upload
                                            class="avatar-uploader"
                                            action="http://150.158.191.172:8081/user/upload"
                                            :show-file-list="false"
                                            :on-success="handleAvatarSuccess"
                                            :before-remove="handleAvatarRemove"
                                            :before-upload="beforeAvatarUpload">
                                            <img v-if="videoForm.Src" :src="videoForm.Src" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                    </el-form-item>
                                    <el-form-item label="视频上传:"  label-position="right"  style="margin-left:75px;" >
                                        <el-upload
                                            class="upload-demo"
                                            action="http://150.158.191.172:8081/course/upload"
                                            :before-upload="beforeVideoUpload"
                                            :on-success="handleVideoSuccess"
                                            :on-preview="handlePreview"
                                            :on-remove="handleRemove"
                                            :before-remove="beforeRemove"
                                            :limit="99"
                                            :on-exceed="handleExceed"
                                            :file-list="videoForm.videoUrl">
                                            <el-button size="small" type="primary">点击上传</el-button>
                                            <div slot="tip" class="el-upload__tip">最多上传九十九个视频</div>
                                        </el-upload>
                                    </el-form-item>
                                    <el-form-item label-position="right"  style="margin-left:75px;"  v-if="isAddDialog" >
                                        <el-button type="primary" @click="postVideosInfos">
                                            提交上传
                                        </el-button>
                                    </el-form-item>
                                    <el-form-item label-position="right"  style="margin-left:75px;"  v-if="!isAddDialog" >
                                        <el-button type="primary">
                                            修改上传
                                        </el-button>
                                    </el-form-item>
                                </el-form>
                        </el-dialog>
                    </el-row>
                </div>
        </el-tab-pane>

        <!-- 讨论区 -->

        <el-tab-pane name="second">
            <span slot="label"><i class="el-icon-chat-line-square" style="margin-right:8px;"></i> 我的讨论</span>
                <div class="box1">
                    
                    <div v-if="isEmptyTalk">
                      <el-row>
                                <el-col :offset="9">
                                    <div style="margin-top:20px">
                                        <img src="../../assets/waiting.jpg" height="200px" width="200px" style="margin:left:500px" />
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <div>
                                    <el-col :span="11" :offset="6" style="margin-top:30px;">
                                        <h1 style="font-size:30px;">你还未发表过任何帖子哦~</h1>
                                    </el-col>
                                    <el-col :span="4" style="margin-top:37px;margin-left:-70px;" >
                                        <el-button type="primary" size="mini" style="font-size:16px;"  @click="toTalking()">点击进入讨论区</el-button>
                                    </el-col>
                                </div>
                            </el-row>
                    </div>
                    <div v-if="!isEmptyTalk">
                        <el-row>
                            <el-col :span="5" :offset="0">
                                    <div style="font-weight:bold;font-size:25px;">我发布的话题</div>
                                </el-col>
                                <el-col :span="3" :offset="16">
                                    <el-button type="primary" @click="postTalk">发布帖子<i class="el-icon-chat-line-round el-icon--right"></i></el-button>
                            </el-col>
                        </el-row>
                        <el-row >
                        <el-col class="tab-pane-header" :span="24" >
                    <el-form :inline="true" class="demo-form-inline" style="margin-left:130px;">
                    <el-form-item label="分类：">
                      <el-select
                        v-model="talkCurrentTypeKey"
                        size="mini"
                        style="width: 100px"
                        @change="talkHandleChange()"
                      >
                        <el-option
                          v-for="cate in talkAllCates"
                          :key="cate.typeKey"
                          :label="cate.typeName"
                          :value="cate.typeKey"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="排序规则：" style="margin-left: 20px">
                      <el-select
                        v-model="talkCurrentSortKey"
                        placeholder=""
                        size="mini"
                        style="width: 100px"
                        @change="talkHandleChange()"
                      >
                        <el-option
                          v-for="option in talkSortOptions"
                          :key="option.value"
                          :label="option.label"
                          :value="option.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="搜索：" style="margin-left:20px" >
                        <el-input placeholder="请输入内容" size="mini" v-model="talkInputs" class="input-with-select" style="width:200px;margin-top:6px;">
    
                        <el-button slot="append" size="mini" icon="el-icon-search" @click="talkSearch()"></el-button>
                        </el-input>
                    </el-form-item>
                  </el-form>
                </el-col>
                    </el-row>
                    <el-divider></el-divider>
                        <el-row>
                                <div class="videoBlock" v-if="myTalks.length!=0"  >
                                    <el-row>
                                        <el-col :span="7" v-for="(item, index) in myTalks" :key="index" :offset="1"   >
                                            <el-card shadow="hover" :body-style="{ padding: '0px' }" style="width:250px;margin-top:15px;">
                                            <img :src='item.Src' class="image" @click="gototalk(item.id)">
                                            <div style="padding: 14px;">
                                                <span style="font-weight:bold;">{{item.title}}</span>
                                                <el-row style="margin-top:5px;">
                                                    <el-col :span="7">
                                                        <time class="time">浏览量:{{item.viewNums}}</time>
                                                    </el-col>
                                                <el-col :span="7" :offset="0">
                                                    <time class="time" >评论数:{{item.commentNums}}</time>
                                                </el-col>
                                                <el-col :span="3" :offset="7">
                                                    <el-button type="primary" icon="el-icon-delete" size="mini" circle @click="DialogVisible = true;currentTalkId=item.id"></el-button>
                                                    
                                                </el-col>
                                                </el-row>
                                            </div>
                                            </el-card>
                                        </el-col>
                                    </el-row>
                                    <el-divider/>
                                </div>
                            </el-row>
                            
                            <el-row>
                                <el-col :span="7" :offset="17">
                                    <div class="block">
                                        <el-pagination
                                            :hide-on-single-page="isOnlyOnePage"
                                            :page-size="talkPageSize"
                                            layout="prev, pager, next"
                                            :total="talkAllNums"
                                            @current-change="handleCurrentChange"
                                            :current-page.sync="currentTalkPage">
                                        </el-pagination>
                                    </div>
                                </el-col>
                            </el-row>
                    </div>
                </div>
        </el-tab-pane>
        </el-tabs>
        <el-dialog
                                                        title="提示"
                                                        :visible.sync="DialogVisible"
                                                        width="30%"
                                                        >
                                                        <span>确定要删除吗？</span>
                                                        <span slot="footer" class="dialog-footer">
                                                        <el-button @click="DialogVisible = false">取 消</el-button>
                                                        <el-button type="primary" @click="deleteTitle(currentTalkId)">确 定</el-button>
                                                        </span>
                                                    </el-dialog>
        <el-dialog
                                                        title="提示"
                                                        :visible.sync="DialogVisible1"
                                                        width="30%"
                                                        >
                                                        <span>确定要删除吗？</span>
                                                        <span slot="footer" class="dialog-footer">
                                                        <el-button @click="DialogVisible1 = false">取 消</el-button>
                                                        <el-button type="primary" @click="deleteCollection(currentVideoId)">确 定</el-button>
                                                        </span>
                                                    </el-dialog>
    </div>
</template>

<style scoped>
.tabs{
    width:95%;
    margin-left:2.5%;
}
.box1{
    min-height:500px;
    width:80%;
    margin-left:10%
}
/* 视频块 */

.time {
    font-size: 12px;
    color: #999;
    margin-top: 5px;
  }
  
  .bottom {
    margin-top: 10px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    
    width: 250px;
    height:130px;
    display: block;
    cursor: pointer;
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
                currentVideoId:0,
                DialogVisible1: false,
                currentTalkId:0,
                DialogVisible: false,
                userId:'',
                isOnlyOnePage:true,
                activeName:"first",
                videoApis: {
                    allTypesApi: "courses/types",
                    allPostsApi: "user/",
                    sendPostApi: "courses/send",
                },
                talkApis: {
                    allTypesApi: "talkings/types",
                    allPostsApi: "user/",
                    sendPostApi: "talkings/send",
                },
                videoForm:{
                        id:"",//视频id,只有编辑的时候有显示
                        name:"",//标题
                        imgname:"",//封面名称
                        Src:'',//封面
                        root:'',//目录
                        videoUrl: [],//视频地址
                        tag:'',
                        type:'',
                        videoMessage:''
                },
                videoRules:{
                    name:[{required:true,message:"标题不得为空",trigger:"blur"},
                        {min:3,max:20,message:'标题长度在3到20之间',trigger:"blur"}],
                    videoMessage:[{required:true,message:"简介不得为空",trigger:"blur"},
                        {min:15,max:50,message:'简介长度在15到50之间',trigger:"blur"}],
                    tag:[{required:true,message:"视频标签不得为空",trigger:"blur"}],
                    type:[{required:true,message:"视频类型不得为空",trigger:"blur"}],
                },


                // 讨论实际页码
                currentTalkPage:1,
                // 讨论分类列表
                talkAllCates:[],
                // 当前的搜索参数
                talkCurrentQuery: "",
                // 当前的typeKey
                talkCurrentTypeKey: "all",
                // 当前的排序规则
                talkCurrentSortKey: "title",
                isEmptyTalk:false,
                talkPageIndex: 1,
                talkPageSize: 9,
                talkAllNums:10,
                talkInputs:"",
                
                //分隔

                videoInputs:"",
                isEmptyVideo:true,
                auditStatus:'hadAuthenticated',//noAuthenticate未认证,hadAuthenticated已经认证,authenticating审核中
                dialogVisible:false,
                isAddDialog:true,
                // 视频分类列表
                videoAllCates:[],

                // 当前的搜索参数
                videoCurrentQuery: "",
                // 当前的typeKey
                videoCurrentTypeKey: "all",
                // 当前的排序规则
                videoCurrentSortKey: "title",
                // 分页参数
                videoPageIndex: 1,
                videoPageSize: 9,
                videoAllNums:10,
                myVideos:[
                    
                ],
                myTalks:[
            
                ],


      // 排序规则
      talkSortOptions: [
        {
          label: "综合排序",
          value: "title",
        },
        {
          label: "最新讨论",
          value: "create_time",
        },
        {
          label: "热度最高",
          value: "view",
        },
      ],
      //视频排序规则
      videoSortOptions: [
        {
          label: "综合排序",
          value: "id",
        },
        {
          label: "最新视频",
          value: "upload_time",
        },
        {
          label: "播放量",
          value: "play",
        },
      ],

            }
        },
        
        created() {
            this.talkInputs="";
            this.videoInputs="";
            if(this.$store.getters.getIsLogin){
                this.userId=this.$store.getters.getUserId;
            }
            this.auditStatus="hadAuthenticated"
            // var isex=this.$store.getters.getIsExamining;
            // var isvo=this.$store.getters.getIsVolunteer;
            
            // console.log(isex)
            // console.log(isvo)
            // //Authenticate未认证,hadAuthenticated已经认证,authenticating审核中
            // if(isvo){
            //     this.auditStatus="hadAuthenticated"
            // }
            // else if(isex){
            //     this.auditStatus="authenticating"
            // }
            // else{
            //     this.auditStatus="noAuthenticate"
            // }
            console.log(this.auditStatus)
            //初始化志愿者状态
            console.log(this.activeName)
            console.log(this.$route.query)
            if(this.$route.query.activeName !== undefined){
                this.activeName=this.$route.query.activeName
                console.log(this.activeName)
            }else{
                this.activeName="first"
            }  
            console.log(this.activeName)
            this.talkApis.allPostsApi="user/"+this.$store.getters.getIdToken+"/posts";
            this.videoApis.allPostsApi="user/"+this.$store.getters.getIdToken+"/courses";
            
            console.log(this.talkApis.allPostsApi);
            this.getVideoAllTypes();
            this.getTalkAllTypes();
            this.getInitData();
            
            this.isEmptyVideo=this.isEmpty(this.myVideos);
            this.isEmptyTalk=this.isEmpty(this.myTalks);
        },
        methods: {
            // 删除我的发布
            deleteCollection(videoId){
                this.$http.delete("/user/"+this.$store.getters.getIdToken+"/course/"+videoId+"/delete").then((res)=>{
                    if(res.data.code=="200"){
                        this.$message.success("删除成功")
                        this.DialogVisible1=false;
                        location.reload();
                    }
                    else{
                        this.$message.error("删除失败")
                        this.DialogVisible1=false;
                    }
                })                
            },

            
            deleteTitle(titleId){
                console.log(titleId)
                this.$http.delete("/talkings/"+titleId+"/delete/"+this.$store.getters.getIdToken).then((res)=>{
                    console.log(res.data)
                    if(res.data.code=="200"){
                        this.$message.success("删除成功")
                        this.DialogVisible=false;
                        location.reload();
                    }
                    else{
                        this.$message.error("删除失败")
                        this.DialogVisible=false;
                    }
                })
            },

            getVideoAllTypes() {
                // 先添加全部分类
                this.videoAllCates.push({ typeName: "全部", typeKey: "all" });
                this.videoAllCates.push({ typeName: "启蒙", typeKey: "kindergarten" });
                this.videoAllCates.push({typeName: "小学", typeKey: "primary"});
                this.videoAllCates.push({typeName: "中学", typeKey: "junior"})
                // this.$http.get(this.videoApis.allTypesApi).then((res) => {
                //     res.data.data.forEach((t) => {
                //         this.videoAllCates.push({
                //             typeName: t.type_name,
                //             typeKey: t.type_key,
                //         });
                //     });
                // });
            },
            getTalkAllTypes() {
                // 先添加全部分类
                this.talkAllCates.push({ typeName: "全部", typeKey: "all" });
                this.$http.get(this.talkApis.allTypesApi).then((res) => {
                    res.data.data.forEach((t) => {
                        this.talkAllCates.push({
                            typeName: t.type_name,
                            typeKey: t.type_key,
                        });
                    });
                });
            },
            // 初始化数据
            getInitData() {
                // 获取路由参数
                let route = this.$route;
                
                if(this.activeName=='second'){
                    // 搜索参数 keyword
                    this.talkCurrentQuery = route.query.keyword;
                    if (this.talkCurrentQuery == undefined) {
                        // 查询为空
                        this.talkCurrentQuery = "";
                    }
                    // 分类类型 typeKey  = all study ...
                    this.talkCurrentTypeKey = route.query.typeKey;
                    if (
                        this.talkCurrentTypeKey == undefined ||
                        this.talkCurrentTypeKey.trim() == ""
                    ) {
                    // 默认全部
                    this.talkCurrentTypeKey = "all";
                    
                    }
                    console.log("讨论分区初始化")

                    // 排序规则
                this.talkCurrentSortKey = route.query.sortKey;
                if (
                        this.talkCurrentSortKey == undefined ||
                        this.talkCurrentSortKey.trim() == ""
                    ) {
                    // 默认综合排序
                    this.talkCurrentSortKey = "title";
                    }
                this.talkPageIndex = route.query.talkPageIndex ? parseInt(route.query.talkPageIndex) : 1;

                this.getDefaultResults(
                    this.talkPageIndex,
                    this.talkCurrentQuery,
                    this.talkCurrentSortKey,
                    this.talkCurrentTypeKey
                );
                }
                
                else{
                    console.log("视频分区初始化")
                    // 视频
                    // 搜索参数 keyword
                    this.videoCurrentQuery = route.query.keyword;
                if (this.videoCurrentQuery == undefined) {
                    // 查询为空
                    this.videoCurrentQuery = "";
                }
                // 分类类型 typeKey  = all study ...
                this.videoCurrentTypeKey = route.query.typeKey;
                if (
                    this.videoCurrentTypeKey == undefined ||
                    this.videoCurrentTypeKey.trim() == ""
                ) {
                // 默认全部
                this.videoCurrentTypeKey = "all";
                }

                // 排序规则
                this.videoCurrentSortKey = route.query.sortKey;
                if (
                        this.videoCurrentSortKey == undefined ||
                        this.videoCurrentSortKey.trim() == ""
                    ) {
                    // 默认综合排序
                    this.videoCurrentSortKey = "id";
                    }
                this.videoPageIndex = route.query.videoPageIndex ? parseInt(route.query.videoPageIndex) : 1;

                this.getDefaultResults(
                    this.videoPageIndex,
                    this.videoCurrentQuery,
                    this.videoCurrentSortKey,
                    this.videoCurrentTypeKey
                );
            
                
                
                }
            },
      


    // 根据条件组合获取结果
            getDefaultResults(pageIndex, query, sort, typeKey)
            {
                console.log(`${this.videoApis.allPostsApi}?pageIndex=${pageIndex}&pageSize=${this.videoPageSize}`)
                    //视频
                if(this.activeName=="first")
                {
                    this.$http
                    .post(
                    `${this.videoApis.allPostsApi}?pageIndex=${pageIndex}&pageSize=${this.videoPageSize}`,
                    {
                        query: query,
                        sort: sort,
                        typeKey: typeKey,
                    }
                    )
                    .then((res) => 
                    {
                        console.log(res.data.data)
                        if(res.data.code=="200"){
                            if(!this.isEmpty(res.data.data.rows)){
                            this.isEmptyVideo=false;
                        }
                            this.currentVideoPage=res.data.data.currentPage;
                            this.videoAllNums=res.data.data.totalRecords;
                            this.myVideos=[]
                            res.data.data.rows.forEach((item)=>{
                                var t=this.$moment(item.upload_time).utcOffset(8).fromNow();
                                
                                this.myVideos.push({
                                    id:item.id,
                                    Src:item.face,
                                    auth:this.matchNum(item.course_like),
                                    course_status:item.course_status,
                                    playNum:this.matchNum(item.play),
                                    type:item.type,
                                    upload_user:item.upload_user,
                                    name:this.matchTitle(item.title),
                                    create_time:t
                                })
                            })
                        }else{
                            console.log(res.data)
                            this.$message.error("请求错误,请刷新重试");
                            this.isEmptyTalk=true;
                        }
                        // this.totalRecords = res.data.data.totalRecords;
                        // this.videoPageIndex = res.data.data.currentPage;
                        // this.allItems = [];
                        // res.data.data.forEach((item) => 
                        // {
                        //     // 格式化时间
                        //     var t = this.$moment(item.create_time).utcOffset(8).fromNow();
                        //     var content = item.content;
                        //     var title = item.title;
                        //     // 标题长度不大于30
                        //     if (title.length > 30) 
                        //     {
                        //         title = title.substring(0, 30) + "...";
                        //     }
                        //     // 内容长度不大于130
                        //     if (content.length > 130) 
                        //     {
                        //         content = content.substring(0, 130) + "...";
                        //     }

                        //     this.allItems.push(
                        //     {
                        //         id: item.id,
                        //         // 标题
                        //         title: title,
                        //         // 摘要
                        //         content: content,
                        //         // 发布者
                        //         author: item.from_user,
                        //         // 评论数
                        //         commentNum: item.commentNum,
                        //         // 浏览数
                        //         view: item.view,
                        //         // 创建时间
                        //         create_time: t,
                        //         // 封面
                        //         face: item.face,
                        //     });
                        // });
                    });
                    //讨论
                }
                else
                {
                    this.$http
                    .post(
                    `${this.talkApis.allPostsApi}?pageIndex=${pageIndex}&pageSize=${this.talkPageSize}`,
                    {
                        query: query,
                        sort: sort,
                        typeKey: typeKey,
                    })
                    .then((res) => 
                    {
                    if(res.data.code=="200"){
                        if(!this.isEmpty(res.data.data.rows)){
                            this.isEmptyTalk=false;
                        }
                        this.currentTalkPage=res.data.data.currentPage;
                        this.talkAllNums=res.data.data.totalRecords;
                        console.log(res.data.data)
                        this.myTalks = [];
                    res.data.data.rows.forEach((item) => 
                        {
                            // 格式化时间
                            var t = this.$moment(item.create_time).utcOffset(8).fromNow();
                            var content = item.content;
                            var title = item.title;
                            // 标题长度不大于30
                            if (title.length > 30) 
                            {
                                title = title.substring(0, 30) + "...";
                            }
                            // 内容长度不大于130
                            if (content.length > 130) 
                            {
                                content = content.substring(0, 130) + "...";
                            }
                            this.myTalks.push(
                            {
                                id: item.id,
                                // 标题
                                title: this.matchTitle(title),
                                // 摘要
                                content: content,
                                // 发布者
                                author: item.from_user,
                                // 评论数
                                commentNums: this.matchNum(item.commentNum),
                                // 浏览数
                                viewNums: this.matchNum(item.view),
                                // 创建时间
                                create_time: t,
                                // 封面
                                Src: item.face,
                            });
                        });
                    }
                    else{
                        console.log(res.data)
                        this.$message.error("请求错误,请刷新重试");
                        this.isEmptyTalk=true;
                        
                    }
                    
                    });
                }
            },
            //讨论页码改变
            getCurrentPageTalks(){
                this.getDefaultResults(1,this.talkCurrentQuery,this.talkCurrentSortKey,this.talkCurrentTypeKey)
            },
            //改变页码
            handleCurrentChange(val) {
                this.getDefaultResults(val,this.talkCurrentQuery,this.talkCurrentSortKey,this.talkCurrentTypeKey)
            },
            handleVideoCurrentChange(val){
                this.getDefaultResults(val,this.videoCurrentQuery,this.videoCurrentSortKey,this.videoCurrentTypeKey)
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
            handleClick() {
                if(this.activeName=="second"){
                    this.getDefaultResults("1",this.talkCurrentQuery,this.talkCurrentSortKey,this.talkCurrentTypeKey)
                }
                else{
                    this.getDefaultResults("1",this.videoCurrentQuery,this.videoCurrentSortKey,this.videoCurrentTypeKey)
                }
            },
            gotoVideo(id){
                const {href}=this.$router.resolve({
                    path:`/videoDetail/${id}`,
                })
                window.open(href, '_blank');
            },
            gototalk(id){
                this.$router.push({
                    path:`/talkDetail/${id}`,
                    query: {
                        backTo: window.location.href,
                        activeName:this.activeName,
                    },
                });
            },
            postTalk(){
                this.$message.success("前往讨论区发帖...")
                this.$router.push("/talking")
            },
            Search(){
            this.$message({
                showClose: true,
                message: '测试搜索',
                type: 'success'
                });
            },
        // 获取所有发布视频
            getAllVideos(){
                this.isEmptyVideo=true;
            },
            //志愿者认证
            getVolunteer(){
                this.auditStatus='hadAuthenticated';
            },
            uploadVideos(){
                this.isEmptyVideo=false;
            },
            // 讨论选择框改变
            talkHandleChange() {
            console.log("讨论选择框")
            this.talkPageIndex=1;
            this.startTalkNavigate();
            },

            /**
            * 开始跳转
            */
            startTalkNavigate() {
                this.$router.push({
                    path: "/personal/"+this.$store.getters.getIdToken+"/myAdd",
                    query: {
                        keyword: this.talkCurrentQuery,
                        typeKey: this.talkCurrentTypeKey,
                        sortKey: this.talkCurrentSortKey,
                        pageIndex: this.talkPageIndex,
                        activeName:this.activeName,
                    },
                
                });
                
            },
            // 视频选择框改变
            videoHandleChange() {
            this.VideoPageIndex = 1;
            this.startVideoNavigate();
            },

            /**
            * 开始跳转
            */
            startVideoNavigate() {
                this.$router.push({
                    path: "/personal/"+this.$store.getters.getIdToken+"/myAdd",
                    query: {
                        keyword: this.videoCurrentQuery,
                        typeKey: this.videoCurrentTypeKey,
                        sortKey: this.videoCurrentSortKey,
                        pageIndex: this.videoPageIndex,
                    },
                });
                },

            videoSearch(){
                this.videoCurrentQuery=this.videoInputs;
                this.videoInputs="";
                this.startVideoNavigate();
            },
            talkSearch(){
                this.talkCurrentQuery=this.talkInputs;
                this.talkInputs="";
                this.startTalkNavigate();
            },
            
            // 跳转到讨论区
            toTalking(){
              this.$router.push("/talking")
            },
            isEmpty(o){
                for(var key in o) {
                    return false;
                }
                return true;
            },
            // 上传视频
            postVideosInfos(){
                this.$refs.videoForm.validate((valid)=>{
                    if(valid){
                        let urlList=[];
                        this.videoForm.videoUrl.forEach((element)=>{
                            urlList.push(element.savename);
                        })
                        let videoInfos={
                                face:this.videoForm.imgname,
                                info:this.videoForm.videoMessage,
                                title:this.videoForm.name,
                                type_key:this.videoForm.type,
                                upload_user_id:parseInt(this.userId),
                                tag:parseInt(this.videoForm.tag),
                                urlList:urlList
                            };
                            console.log(videoInfos)
                        this.$http.post("course/add",videoInfos).then((res)=>{
                            console.log(res.data)
                            if(res.data.code=="200"){
                                this.$message.success("提交成功");
                                this.videoForm={
                        id:"",//视频id,只有编辑的时候有显示
                        name:"",//标题
                        Src:'',//封面
                        root:'',//目录
                        videoUrl: [],//视频地址
                        tag:'',
                        type:'',
                        videoMessage:''
                }           
                            location.reload()
                            this.startVideoNavigate();

                            }else{
                                this.$message.error("提交失败");
                            }
                        })
                    }
                })
            },

    handleRemove(file, fileList) {
        console.log(file,fileList);
        let index=0;
        let index1=0;
        this.videoForm.videoUrl.forEach((element)=>{
            if(element.uid==file.uid){
                index=index1;    
            }
            index1=index1+1;
        })
        console.log(index)
        this.videoForm.videoUrl.splice(index,1);
        console.log(this.videoForm.videoUrl)
        // fileList.forEach(element => {
        //     this.videoForm.videoUrl.push({urlList: element.response.data.filename})
        // });
        // console.log(this.videoForm.videoUrl)
        

      },

      beforeRemove(file){
        console.log(file);
    },
      handlePreview(file) {
          console.log(file)
        // 预览视频，打开新的窗口
        window.open(file.url, '_blank', 'toolbar=yes, width=700, height=700')
    },
      handleVideoSuccess(file,fileList){
        
        console.log(file,fileList);
            this.videoForm.videoUrl.push({name:fileList.name,url: file.data.url,savename:file.data.filename})
        console.log(this.videoForm.videoUrl)
        
        this.$message.success("视频上传成功");
      },
      beforeVideoUpload(file){
            const isProperType = (file.type === 'video/avi'||file.type === 'video/mp4');
            const isLt300M = file.size / 1024 / 1024 < 300;

            if (!isProperType) {
            this.$message.error('上传视频只能是 AVI或MP4 格式!');
            }
            if (!isLt300M) {
            this.$message.error('上传视频大小不能超过 300MB!');
            }
        return isProperType && isLt300M;
      },
      
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 99 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      handleAvatarRemove(file){
          console.log(file)
      },
      handleAvatarSuccess(res) {
         console.log(res)
        this.videoForm.imgname=res.data.filename;
        this.videoForm.Src = res.data.url;
        console.log(this.videoForm.imgname);
        this.$message.success("图片上传成功");
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
        },
    // 监听路由变化，刷新页面
    watch: {
        $route: "getInitData",
    },
    };
    
</script>