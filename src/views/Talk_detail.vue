<template>
  <el-container style="height: auto; border: 1px solid #eee">
  <el-container>
    <el-header >
      <headers />
      
    </el-header>  
    
  <el-container>
      <sidebars/>
    <el-main>
      <div id="detail-main">
    <el-row>
      <!-- 上侧面包屑 -->
      
      <el-col :offset="1">
        <el-col :span="2">
          <el-col style="font-size: 20px; margin-top: 20px">
        <el-page-header @back="goBack" content="">
        </el-page-header>
      </el-col>
        </el-col>
        <el-breadcrumb style="font-size: 20px; margin-top: 20px">
          <el-breadcrumb-item>讨论</el-breadcrumb-item>
          <el-breadcrumb-item>话题</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <!-- 左侧内容 -->
      <el-col :span="17" :offset="1">
        <el-card class="detail-content">
          <el-row>
            <!-- 标题，分类 -->
            <el-col class="title-info">
              <h3>{{ detail.title }}</h3>
              <div style="margin-top: 20px">
                <p>
                  分类：<el-tag type="info" size="small">{{
                    detail.type
                  }}</el-tag>
                </p>
              </div>
            </el-col>
            <el-col>
              <el-divider></el-divider>
            </el-col>
            <!-- 帖子内容 -->
            <el-col
              class="post-item"
              v-for="(item, index) in commentItem"
              :key="index"
            >
              <el-row>
                <!-- 头像 -->
                <el-col :span="4" class="avatar-part">
                  <div style="text-align: center">
                    <img :src="item.from_user_avatar" alt="" width="92px" />
                    <p
                      style="
                        font-size: 16px;
                        margin-top: 10px;
                        line-height: 14px;
                      "
                    >
                      {{ item.from_user_name }}
                    </p>
                    <el-tag
                      type="primary"
                      size="mini"
                      v-if="item.from_user_id == detail.author_id"
                      >楼主</el-tag
                    >
                  </div>
                </el-col>
                <!-- 内容 -->
                <el-col :span="18" :offset="1">
                  <p style="margin-top: 15px">
                    {{ item.content }}
                  </p>
                </el-col>
                <el-col style="margin-bottom: 30px">
                  <small class="time-info">{{
                    $moment(item.publish_time).fromNow()
                  }}</small>
                  <!-- 回复主贴，评论id和回复id都为评论id，被回复的用户名为楼主名 -->
                  <a
                    v-if="!(currentPageIndex == 1 && index == 0)"
                    class="reply-btn"
                    @click="sendReply(item.id, item.id, item.from_user_name)"
                    >回复</a
                  >
                </el-col>
                <!-- 评论下预展示的回复列表 -->
                <el-col
                  v-for="(reply, index) in item.replies"
                  :key="index"
                  :span="18"
                  :offset="5"
                  class="reply-item"
                >
                  <el-row style="margin-top: 10px">
                    <!-- 头像区域 -->
                    <el-col :span="2" :offset="1">
                      <img :src="reply.from_user_avatar" alt="#" width="40px" />
                    </el-col>
                    <!-- 回复内容 -->
                    <el-col :span="20">
                      <div>
                        <p
                          v-if="reply.reply_to_id != item.id"
                          class="reply-word"
                        >
                          {{ reply.from_user_name }}&nbsp;回复&nbsp;{{
                            reply.reply_to
                          }}：
                        </p>
                        <p class="reply-word" v-else>
                          {{ reply.from_user_name }}：
                        </p>
                      </div>
                      <p style="font-size: 13px; margin-top: -20px">
                        {{ reply.content }}
                      </p>
                    </el-col>
                    <!-- 时间，回复按钮 -->
                    <el-col style="margin-top: -20px">
                      <small class="item-time">{{
                        $moment(reply.publish_time).fromNow()
                      }}</small>
                      <!-- 回复一条回复，传入被回复的记录id，该评论的id -->
                      <a
                        class="reply-btn"
                        @click="
                          sendReply(reply.id, item.id, reply.from_user_name)
                        "
                        >回复</a
                      >
                    </el-col>
                  </el-row>
                  <div
                    style="height: 1px; background: #ddd; margin-top: 10px"
                  ></div>
                </el-col>
                <el-col>
                  <el-col :offset="5" class="check-all-btn">
                    <!-- 更多回复 -->
                    <el-pagination
                      :total="item.pageTotal"
                      :page-size="5"
                      v-if="item.showPagination == true"
                      :current-page="item.pageIndex"
                      @current-change="replyPageChange($event, item)"
                      style="margin-top: 20px"
                    >
                    </el-pagination>
                    <el-button
                      type="default"
                      size="mini"
                      style="margin-top: 20px"
                      v-if="item.replyTotal > 3"
                      @click="checkReplies(item)"
                      plain
                      >查看共{{ item.replyTotal }}条回复</el-button
                    >
                  </el-col>
                  <el-col>
                    <el-divider></el-divider>
                  </el-col>
                </el-col>
              </el-row>
            </el-col>
            <el-col style="text-align: center; margin-top: 10px">
              <el-pagination
                :total="detail.commentsNum"
                :page-size="pageSize"
                background
                layout="prev, pager, next"
                @current-change="commentChange($event)"
                :current-page="currentPageIndex"
              >
              </el-pagination>
            </el-col>

            <el-col>
              <el-divider></el-divider>
              <el-row>
                <el-col :span="16" :offset="4">
                  <h3 style="font-size: 17px; font-weight: 600">回复话题</h3>
                  <el-form
                    :model="replyForm"
                    :rules="formRule"
                    ref="sendFormRef"
                    style="margin-top: 15px"
                    v-if="loginUser.isLogined"
                  >
                    <el-form-item prop="content">
                      <el-input
                        type="textarea"
                        :placeholder="replyPlaceholder"
                        resize="none"
                        :rows="6"
                        v-model="replyForm.content"
                      >
                      </el-input>
                    </el-form-item>
                    <el-form-item>
                      <div style="float: right; margin-top: -20px">
                        <el-button
                          style="margin-right: 5px"
                          type="default"
                          size="mini"
                          @click="resetReply()"
                          >重置</el-button
                        >
                        <el-button
                          type="primary"
                          size="mini"
                          @click="sendCommit()"
                          >发送</el-button
                        >
                      </div>
                    </el-form-item>
                  </el-form>

                  <div v-else style="margin-top:15px">
                    <a-alert message="未登录" type="warning" show-icon>
                      <p slot="description" style="font-size:16px">
                        您必须进行<a @click="toLogin()">登录</a>后才能进行回复
                      </p>
                    </a-alert>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <!-- 右侧内容 -->
      <el-col :span="5" :offset="1">
        <el-card class="detail-publisher">
          <el-row style="margin-top: 10px">
            <el-col style="text-align: center">
              <img :src="detail.avatar" alt="" width="100px" />
              <p class="right-info">
                <el-tag
                  type="info"
                  size="mini"
                  style="margin-right: 10px; margin-top: 20px"
                  >话题发起人</el-tag
                >{{ detail.authorName }}
              </p>
              <p class="right-info">
                <el-tag
                  type="info"
                  size="mini"
                  style="margin-right: 10px; margin-right: 40px"
                  >发起话题</el-tag
                >{{ detail.postTotal }}
              </p>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
    </el-main>
  </el-container>
  <footers/>
</el-container>
  </el-container>
</template>

<script>
// import { MessageBox } from "element-ui";
import $ from "jquery";
import headers from "../components/Header.vue";
  import sidebars from "../components/SideBar.vue";
  import footers from "../components/Footer.vue";
export default {
  data() {
    return {
      //个人中心的activeName
      activeName:'',
      // 返回href
      backUrl:'',
      apis: {
        // 获取某个id的讨论的内容
        getSingleDetail: "/detail/",
        // 获取某个id 的评论的所有回复
        getAllReplies: "/detail/replies/",
        // 添加评论
        addComment: "/detail/comment/add",
      },
      // 当前讨论主题
      detail: {
        title: "",
        type: "",
        author_id: 0,
        authorName: "",
        avatar: "",
        postTotal: 0,
        commentsNum: 0,
      },
      // 当前登录的用户信息
      loginUser: {
        // 用户是否登录
        isLogined: false,
        id: 2,
        username: "sjy1424",
        avatar: "http://localhost:8080/user/faces/avatar2.jpg",
      },
      currentPostId: 0,
      currentPageIndex: 0,
      pageSize: 8,
      // 评论信息列表
      commentItem: [],
      // 回复信息表单
      replyForm: {
        // 回复内容
        content: null,
        // 来自用户
        from_user_id: 0,
        // 来自帖子
        from_post_id: 0,
        // 被回复的id
        reply_id: 0,
        // 所属评论id
        comment_id: 0,
        // 被回复的用户名
        reply_to: "",
      },

      replyPlaceholder: "回复话题：",
      formRule: {
        content: [
          {
            required: true,
            message: "回复内容不得为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components:{
      sidebars,
      footers,
      headers 

    },

  created() {
    this.activeName=this.$route.query.activeName;
    this.backUrl=this.$route.query.backTo;
    console.log(this.backUrl)
    this.getPostDetail();
    this.getUserInfo();
  },
  mounted() {
  },
  
  methods: {

    //获取用户信息
    getUserInfo(){
      this.loginUser.isLogined=this.$store.state.isLogin;
      if(this.loginUser.isLogined==true){
        this.loginUser.username=this.$store.state.userName;
        this.loginUser.id=parseInt(this.$store.state.userInfos.userId);
        console.log(this.loginUser.id)
        this.loginUser.avatar=this.$store.state.avatar;
      }
    },


    // 初始化路由参数
    initRouterParams() {
      // 保存讨论id
      this.currentPostId = this.$route.params.postId;
      // 保存当前页码，默认为1
      this.currentPageIndex = new Number(this.$route.query.pageIndex);
      if (
        this.$route.query.pageIndex == undefined ||
        this.$route.query.pageIndex.trim() == ""
      ) {
        this.currentPageIndex = 1;
      }
    },

    // 根据讨论id，获取讨论内容
    getPostDetail() {
      this.initRouterParams();
      this.$http
        .get(
          `${this.apis.getSingleDetail}${this.currentPostId}?pageIndex=${this.currentPageIndex}&pageSize=${this.pageSize}`
        )
        .then((res) => {
          let responseData = res.data.data;
          // 设置标题和分类，作者id
          this.detail.title = responseData.title;
          this.detail.type = responseData.type;
          this.detail.author_id = responseData.authorId;
          this.detail.authorName = responseData.authorName;
          this.detail.avatar = responseData.avatar;
          this.detail.postTotal = responseData.postTotal;
          this.detail.commentsNum = responseData.commentsNum;
          // 保存讨论信息
          this.commentItem = responseData.data;
          console.log(this.commentItem);
        });
    },
    // 获取更多的回复
    checkReplies(item) {
      // 回复当前页码
      item.pageIndex = 1;
      item.pageTotal = item.replyTotal;
      item.showPagination = true;
      item.replyTotal = 0;
      this.$http
        .get(`${this.apis.getAllReplies}${item.id}?pageIndex=${item.pageIndex}`)
        .then((res) => {
          item.replies = res.data.data;
        });
    },

    // 回复页码改变
    replyPageChange(index, item) {
      item.pageIndex = index;
      this.$http
        .get(`${this.apis.getAllReplies}${item.id}?pageIndex=${item.pageIndex}`)
        .then((res) => {
          item.replies = res.data.data;
        });
    },

    // 评论页码改变
    commentChange(index) {
      this.currentPageIndex = index;
      window.scroll(0, 0);
      this.resetReply();
      this.$router.push({
        path: "/detail/" + this.currentPostId,
        query: {
          pageIndex: index,
        },
      });
    },

    // 发送回复
    sendReply(reply_id, comment_id, reply_to) {
      // 用户已登录
      if (this.loginUser.isLogined) {
        this.setReplyForm(reply_id, comment_id, reply_to);
        // 重置对话框表单
        this.$refs.sendFormRef.resetFields();
        this.replyPlaceholder = `回复 ${reply_to} ：`;
      }
      // 跳转到底部回复区域
      this.scrollBottom();
    },

    // 关闭对话框
    onDialogClose() {
      this.setReplyForm(0, 0, "", "", false);
    },
    // 确定发送
    sendCommit() {
      this.$refs.sendFormRef.validate((valid) => {
        if (valid) {
          this.replyForm.from_user_id = this.loginUser.id;
          this.replyForm.from_post_id = this.currentPostId;
          console.log(this.replyForm)
          this.$http.post(this.apis.addComment, this.replyForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success("回复成功！");
              window.location.reload();
            }else{
                this.$message.error("回复失败，请重试！");
            }
          });
        }
      });
    },

    // 设置发送表单
    setReplyForm(reply_id, comment_id, reply_to) {
      this.replyForm.reply_id = reply_id;
      this.replyForm.comment_id = comment_id;
      this.replyForm.reply_to = reply_to;
    },

    // 滑到页面底部
    scrollBottom() {
      $("html, body").animate(
        {
          scrollTop: $("html, body").get(0).scrollHeight,
        },
        1000
      );
    },

    // 初始化表单数据
    resetReply() {
      this.setReplyForm(0, 0, "");
      this.$refs.sendFormRef.resetFields();
      this.replyPlaceholder = "回复话题：";
    },

    // 跳转登录
    toLogin(){
      this.$router.push({
        path:"/login",
        query:{
          redirectTo:window.location.href,
          
        }
      })
    },

    // 返回
    goBack(){
      console.log(this.activeName)
      if(this.activeName==undefined||this.activeName==""){
        window.location.href=this.backUrl;
      }
      else{
        console.log("hello")
        this.$router.push(
          {
            path:'/personal/'+this.$store.state.userInfos.idToken+'/myAdd',
            query:{
              activeName:this.activeName
            }
          }
        )
      }
    }
  },

  watch: {
    $route: "getPostDetail",
  },
};
</script>

<style scoped>
/* 主体位置 */
#detail-main {
  /* position: absolute;
  left: 10%;
  top: 10%;
  background-color: #eee; */
  width: 1200px;
  min-height: 300px;
}

/* 左侧内容布局 */
.detail-content {
  padding: 15px;
  margin-top: 20px;
}
/* 右侧内容 */
.detail-publisher {
  margin-top: 20px;
}
/* 标题样式 */
.title-info > h3 {
  font-size: 21px;
  font-weight: 550;
}
.title-info > p {
  font-size: 14px;
  font-weight: 500;
}
p {
  font-size: 16px;
  line-height: 35px;
}
.time-info {
  color: rgb(153, 153, 153);
  float: right;
  margin-right: 35px;
}
.reply-item {
  background-color: rgba(238, 238, 238, 0.521);
}
.reply-word {
  font-size: 10px;
}
.item-time {
  float: right;
  color: rgb(153, 153, 153);
  margin-right: 20px;
}
.reply-btn {
  float: right;
  font-size: 12px;
  margin-right: 10px;
}
.right-info {
  line-height: 13px;
}
/* .check-all-btn{
  margin-top: 20px;
} */
</style>