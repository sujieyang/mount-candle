
<template>
    <div class="tabs">
        <el-tabs type="border-card">
        <el-tab-pane>
            <span slot="label"><i class="el-icon-ice-cream-round" style="margin-right:8px;"></i>我的视频收藏</span>
            
                <div class="videoBlock" v-if="collectionVideos.length!=0" >
                    <el-row>
                        <el-col :span="5" :offset="0">
                            <h2 style="font-weight:bold;font-size:25px;" >我的视频收藏</h2>
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
                    
                    
                    <el-row>
                        <el-col :span="7" v-for="(item, index) in collectionVideos" :key="index" :offset="1"   >
                            <el-card shadow="hover" :body-style="{ padding: '0px' }" style="width:250px;margin-top:15px;">
                                <img :src='item.Src' class="image" @click="gotoVideo(item.id)">
                                <div style="padding: 14px;">
                                <span style="font-weight:bold;">{{item.name}}</span>
                                <el-row style="margin-top:5px;">
                                <el-col :span="8">
                                <time class="time">浏览量:{{item.playNum}}</time>
                                </el-col>
                                <el-col :span="6" :offset="2">
                                    <time class="time" >收藏量:{{item.auth}}</time>
                                </el-col>
                                <el-col :span="3" :offset="3">
                                    <el-button type="primary" icon="el-icon-delete" size="mini"  @click="DialogVisible1 = true;currentVideoId=item.id"></el-button>
                                </el-col>
                                </el-row>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                    <el-divider/>
                    <el-row>
                        <el-col :span="14" :offset="10">
                            <span style="font-size:25px;color: #999;" v-if="loading">加载中</span> 
                            
                        </el-col>
                    </el-row>
                    <el-row>
                                
                                <el-col :span="7" :offset="17">
                                <div class="block">
                                
                                <el-pagination
                                    :hide-on-single-page="isOnlyOnePage"
                                    :page-size="videoPageSize"
                                    layout="prev, pager, next"
                                    :total="totalRecords"
                                    @current-change="handleVideoCurrentChange1"
                                    :current-page.sync="currentVideoPage1">
                                </el-pagination>
                                </div>
                                </el-col>
                            </el-row>
                </div>
                <div class="videoBlock" v-if="collectionVideos.length==0">
                            <el-row>
                                <el-col :offset="9">
                                    <div style="margin-top:20px">
                                        <img src="../../assets/hi.jpg" height="200px" width="200px" style="margin:left:500px" />
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <div>
                                    <el-col :span="10" :offset="8" style="margin-top:30px;">
                                        <h1 style="font-size:30px;">你还未收藏视频哦~~</h1>
                                    </el-col>
                                </div>
                            </el-row>
                </div>
        </el-tab-pane>

        </el-tabs>
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
/* 视频块 */
.videoBlock{
    width:80%;
    margin-left: 10%;
    
    
}


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
    export default{
        data(){
            return {
                currentVideoId:0,
                DialogVisible1: false,
                loading: false,
                videoApis: {
                    allTypesApi: "courses/types",
                    allPostsApi: "user/",
                    sendPostApi: "courses/send",
                },
                isOnlyOnePage:true,
                videoInputs:"",
                isEmptyVideo:true,
                isNotVolunteer:true,
                
                // 视频分类列表
                videoAllCates:[],

                // 当前的搜索参数
                videoCurrentQuery: "",
                // 当前的typeKey
                videoCurrentTypeKey: "all",
                // 当前的排序规则
                videoCurrentSortKey: "id",
                // 分页参数
                videoPageIndex: 1,
                videoPageSize: 9,
                videoAllNums:10,
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




                collectionVideos:[
                    
                ]
            }
                
        },
        created() {
            this.videoApis.allPostsApi="user/"+this.$store.getters.getIdToken+"/myCollections";
            console.log(this.videoApis.allPostsApi)
            this.getVideoAllTypes();
            this.getInitData();
        },
        methods:{
            gotoVideo(id){
                const {href}=this.$router.resolve({
                    path:`/videoDetail/${id}`,
                })
                window.open(href, '_blank');
            },
             // 删除用户收藏
            deleteCollection(videoId){
                this.$http.delete("/user/"+this.$store.getters.getIdToken+"/collection/"+videoId+"/delete").then((res)=>{
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
            
            //改变页码
            handleCurrentChange(val) {
                this.getDefaultResults(val,this.talkCurrentQuery,this.talkCurrentSortKey,this.talkCurrentTypeKey)
            },
            getVideoAllTypes() {
                // 先添加全部分类
                this.videoAllCates.push({ typeName: "全部", typeKey: "all" });
                this.videoAllCates.push({ typeName: "启蒙", typeKey: "Kindergarten" });
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
            
            // 初始化数据
            getInitData() {
                // 获取路由参数
                let route = this.$route;
                
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
              
            },

            // 根据条件组合获取结果
    getDefaultResults(pageIndex, query, sort, typeKey) {
        //视频
        console.log(`${this.videoApis.allPostsApi}?pageIndex=${pageIndex}&pageSize=${this.videoPageSize}`);
        this.$http
        .post(
          `${this.videoApis.allPostsApi}?pageIndex=${pageIndex}&pageSize=${this.videoPageSize}`,
          {
            query: query,
            sort: sort,
            typeKey: typeKey,
          }
        )
        .then((res) => {
            console.log(res.data)
          this.currentVideoPage1=res.data.data.currentPage;
          this.totalRecords = res.data.data.totalRecords;
          this.videoPageIndex = res.data.data.currentPage;
          this.collectionVideos = [];
          if(res.data.code=="200"){
              console.log(res.data.data)
              res.data.data.rows.forEach((item)=>{
                                var t=this.$moment(item.upload_time).utcOffset(8).fromNow();
                                
                                this.collectionVideos.push({
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
          }
        });
        //讨论
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
            handleVideoCurrentChange1(val){
                this.getDefaultResults(val,this.videoCurrentQuery,this.videoCurrentSortKey,this.videoCurrentTypeKey)
            },
            videoSearch(){
                this.videoCurrentQuery=this.videoInputs;
                this.videoInputs="";
                this.startVideoNavigate();
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
                    path: "/personal/"+this.$store.getters.getIdToken+"/collections",
                    query: {
                        keyword: this.videoCurrentQuery,
                        typeKey: this.videoCurrentTypeKey,
                        sortKey: this.videoCurrentSortKey,
                        pageIndex: this.videoPageIndex,
                        },
                    });
                
                },



                isEmpty(o){
                    for(var key in o) {
                        return false;
                    }
                    return true;
                },
                
                
            },
            watch: {
        $route: "getInitData",
    },
            
        name:'mainCollections'
    }
</script>