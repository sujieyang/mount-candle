<template>
  <div id="talkings-main">
    <el-row>
      <!-- 封面图片显示 -->
      <el-col>
        <img src="../../assets/talk_bg.png" alt="#" class="main-img" />
      </el-col>
      <!-- 列表主体 -->
      <el-col :span="22" :offset="1">
        <el-card class="main-card">
          <!-- 分类 -->
          <el-row class="header-tabs">
            <el-col :span="22" :offset="1">
              <!-- 讨论列表内容 -->
              <el-row>
                <!-- 分类框以及过滤器 -->
                <el-col class="tab-pane-header" :span="24">
                  <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="分类：">
                      <el-select
                        v-model="currentTypeKey"
                        size="mini"
                        style="width: 100px"
                        @change="handleChange()"
                      >
                        <el-option
                          v-for="cate in allCates"
                          :key="cate.typeKey"
                          :label="cate.typeName"
                          :value="cate.typeKey"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="排序规则：" style="margin-left: 20px">
                      <el-select
                        v-model="currentSortKey"
                        placeholder=""
                        size="mini"
                        style="width: 100px"
                        @change="handleChange()"
                      >
                        <el-option
                          v-for="option in sortOptions"
                          :key="option.value"
                          :label="option.label"
                          :value="option.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </el-col>
                <!-- 讨论列表 -->
                <el-col>
                  <el-row>
                    <el-col
                      style="
                        height: 2px;
                        background-color: #ddd;
                        margin-bottom: 40px;
                      "
                    >
                    </el-col>
                    <!-- 讨论列表项 -->
                    <el-col v-for="(item, index) in allItems" :key="index">
                      <el-row>
                        <!-- 左部封面 -->
                        <el-col :span="6">
                          <img
                            :src="item.face"
                            alt=""
                            width="205px"
                            height="149px"
                          />
                        </el-col>
                        <!-- 右侧文字 -->
                        <el-col :span="18">
                          <el-row>
                            <!-- 标题和实践 -->
                            <el-col :span="18">
                              <h3
                                :class="'title-info-' + index"
                                style="cursor: pointer; font-weight: 700"
                                @mouseenter="toggleActive(true, index)"
                                @mouseleave="toggleActive(false, index)"
                                @click="toDetail(item.id)"
                              >
                                {{ item.title }}
                              </h3>
                            </el-col>
                            <!-- 显示时间 -->
                            <el-col :span="5" :offset="1">
                              <span class="time-info"
                                ><i
                                  class="el-icon-time"
                                  style="margin-right: 8px"
                                ></i
                                >{{ item.create_time }}</span
                              >
                            </el-col>
                            <!-- 显示内容 -->
                            <el-col style="margin-top: 5px; min-height: 90px">
                              <span class="summary">
                                {{ item.content }}
                              </span>
                            </el-col>
                            <!-- 作者以及评论数，点击量 -->
                            <el-col :span="8" class="auhotr-comment-view">
                              <span class="footer-part"
                                ><i
                                  class="el-icon-s-custom"
                                  style="margin-right: 7px"
                                ></i
                                >{{ item.author }}</span
                              >
                            </el-col>
                            <!-- 评论数以及浏览量 -->
                            <el-col :span="6" :offset="10">
                              <span class="footer-part-right"
                                ><i
                                  class="el-icon-chat-dot-round"
                                  style="margin-right: 5px"
                                ></i
                                >{{ item.commentNum }}</span
                              >
                              <span class="footer-part-right"
                                ><i
                                  class="el-icon-view"
                                  style="margin-right: 5px"
                                ></i
                                >{{ item.view }}</span
                              >
                            </el-col>
                          </el-row>
                        </el-col>
                      </el-row>
                      <el-divider></el-divider>
                    </el-col>
                    <!-- 没有结果，内容为空 -->
                    <el-col
                      v-if="allItems.length == 0"
                      style="margin-bottom: 30px"
                    >
                      <a-empty>
                        <span
                          slot="description"
                          style="color: rgb(153, 153, 153); font-size: 18px"
                        >
                          暂无结果
                        </span>
                      </a-empty>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col
                  :span="10"
                  :offset="7"
                  style="text-align: center; margin-top: 25px"
                  v-if="allItems.length > 0"
                >
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="totalRecords"
                    :page-size="pageSize"
                    :current-page="pageIndex"
                    @current-change="handleIndexChanged"
                  >
                  </el-pagination>
                </el-col>
              </el-row>
            </el-col>
            <el-col
              style="height: 2px; background-color: #ddd; margin-top: 50px"
            >
            </el-col>
            <!-- 发布话题，用户已登录才能显示-->
            <el-col v-if="isLogin" >
              <el-row style="margin-top: 15px">
                <el-col>
                  <h4 style="font-size: 16px; font-weight: 600">发布话题</h4>
                </el-col>
                <!-- 用户头像 -->
                <el-col :span="1" class="send-main" :offset="1">
                  <div style="text-align: center; width: 68px">
                    <img :src="userInfo.avatar" alt="" height="80px" />
                    <p style="margin-top: 10px; font-weight: 600">{{userInfo.userName}}</p>
                  </div>
                </el-col>
                <!-- 标题，内容，分类，等 -->
                <el-col :span="12" class="send-main" style="margin-top: 60px">
                  <el-form
                    :model="postForm"
                    label-width="100px"
                    :rules="postFormRules"
                    ref="postFormRef"
                  >
                    <el-form-item label="标题" prop="title">
                      <el-input
                        v-model="postForm.title"
                        size="mini"
                        placeholder="请输入标题"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="分类" prop="type">
                      <el-select
                        v-model="postForm.type"
                        size="mini"
                        placeholder="请选择分类"
                      >
                        <el-option
                          v-for="(type, index) in allCates.slice(1)"
                          :key="index"
                          :label="type.typeName"
                          :value="type.typeKey"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="内容" prop="content">
                      <el-input
                        v-model="postForm.content"
                        type="textarea"
                        :rows="4"
                        resize="none"
                        placeholder="请输入内容"
                        style="width: 800px"
                      ></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-upload
                        class="upload-demo"
                        :action="fileUploadSrc"
                        list-type="picture"
                        :on-success="handleSucess"
                        :before-upload="beforeUpload"
                        :limit="1"
                      >
                        <el-button size="mini" type="default" plain
                          ><i
                            class="el-icon-upload"
                            style="margin-right: 8px"
                          ></i
                          >上传封面</el-button
                        >
                        <div slot="tip" class="el-upload__tip">
                          只能上传 jpg / png 文件，且不超过1024kb，
                          <small>若未上传封面，则会使用默认封面</small>
                        </div>
                      </el-upload>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" size="small" @click="sendPost"
                        >发布</el-button
                      >
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
            </el-col>
            <!-- 用户未登录，显示无法发布话题 -->
            <el-col
              v-else
              :span="20"
              :offset="2"
              style="
                background-color: #eee;
                border-radius: 5px;
                margin-top: 50px;
                text-align: center;
              "
            >
              <div class="lock-info">
                <span
                  ><i class="el-icon-lock" style="margin-right: 10px"></i
                  >您需要<a @click="toLogin">登录</a>后才能发布讨论</span
                >
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col class="footer" :span="22" :offset="1" style="margin-top: 25px">
        <div style="height: 50px">
          <span>Created by Gorwing Light Program Group</span>
          <a href="#" style="float: right; color: rgb(153, 153, 153)"
            >网站首页</a
          >
          <a
            href="#"
            style="float: right; color: rgb(153, 153, 153); margin-right: 15px"
          >
            关于我们</a
          >
          <a
            href="#"
            style="float: right; color: rgb(153, 153, 153); margin-right: 15px"
          >
            联系我们</a
          >
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      fileUploadSrc:'http://150.158.191.172:8081/talkings/upload',
      apis: {
        allTypesApi: "talkings/types",
        allPostsApi: "talkings/all",
        sendPostApi: "talkings/send",
      },
      // 排序规则
      sortOptions: [
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
      // 当前的搜索参数
      currentQuery: "",
      // 当前的typeKey
      currentTypeKey: "all",
      // 当前的排序规则
      currentSortKey: "title",
      // 分页参数
      pageIndex: 1,
      pageSize: 8,
      titleActive: false,
      totalRecords: 0,
      // 分类列表
      allCates: [],
      // 讨论项列表
      allItems: [],
      // 发表帖子表单
      postForm: {
        from_user: 0,
        title: "",
        content: "",
        type: "",
        face: "",
      },
      init:false,
      // 发表帖子验证规则
      postFormRules: {
        title: [
          { required: true, message: "标题不得为空", trigger: "blur" },
          {
            min: 5,
            max: 50,
            message: "标题在5到50个字符之间",
            trigger: "blur",
          },
        ],
        type: [{ required: true, message: "请选择分类", trigger: "blur" }],
        content: [
          { required: true, message: "内容不得为空", trigger: "blur" },
          { min: 30, message: "内容应至少30个字符", trigger: "blur" },
        ],
      },

      // 用户是否已登录
      isLogin: false,
      userInfo:{
        
      }
    };
  },
  created() {
    
    this.getAllTypes();
    this.getInitData();
  },
  mounted(){
    this.userInfo=this.$store.getters.getUserInfo;
    this.isLogin=this.$store.getters.getIsLogin;
  },
  methods: {
    // 获取所有分类
    getAllTypes() {
      // 先添加全部分类
      this.allCates.push({ typeName: "全部", typeKey: "all" });
      this.$http.get(this.apis.allTypesApi).then((res) => {
        res.data.data.forEach((t) => {
          this.allCates.push({
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
      // 搜索参数 keyword
      this.currentQuery = route.query.keyword;
      if (this.currentQuery == undefined) {
        // 查询为空
        this.currentQuery = "";
      }
      // 分类类型 typeKey  = all study ...
      this.currentTypeKey = route.query.typeKey;
      if (
        this.currentTypeKey == undefined ||
        this.currentTypeKey.trim() == ""
      ) {
        // 默认全部
        this.currentTypeKey = "all";
      }
      // 排序规则
      this.currentSortKey = route.query.sortKey;
      if (
        this.currentSortKey == undefined ||
        this.currentSortKey.trim() == ""
      ) {
        // 默认综合排序
        this.currentSortKey = "title";
      }
      this.pageIndex = route.query.pageIndex ? parseInt(route.query.pageIndex) : 1;

      this.getDefaultResults(
        this.pageIndex,
        this.currentQuery,
        this.currentSortKey,
        this.currentTypeKey
      );
    },

    // 根据条件组合获取结果
    getDefaultResults(pageIndex, query, sort, typeKey) {
      this.$http
        .post(
          `${this.apis.allPostsApi}?pageIndex=${pageIndex}&pageSize=${this.pageSize}`,
          {
            query: query,
            sort: sort,
            typeKey: typeKey,
          }
        )
        .then((res) => {
          this.totalRecords = res.data.data.totalRecords;
          this.pageIndex = res.data.data.currentPage;
          this.allItems = [];
          res.data.data.rows.forEach((item) => {
            // 格式化时间
            var t = this.$moment(item.create_time).utcOffset(8).fromNow();
            var content = item.content;
            var title = item.title;
            // 标题长度不大于30
            if (title.length > 30) {
              title = title.substring(0, 30) + "...";
            }
            // 内容长度不大于130
            if (content.length > 130) {
              content = content.substring(0, 130) + "...";
            }

            this.allItems.push({
              id: item.id,
              // 标题
              title: title,
              // 摘要
              content: content,
              // 发布者
              author: item.from_user,
              // 评论数
              commentNum: item.commentNum,
              // 浏览数
              view: item.view,
              // 创建时间
              create_time: t,
              // 封面
              face: item.face,
            });
          });
        });
    },

    // 标题样式改变事件
    toggleActive(state, index) {
      if (state) {
        $(".title-info-" + index).addClass("active");
      } else {
        $(".title-info-" + index).removeClass("active");
      }
    },

    // 当前页码改变
    handleIndexChanged(index) {
      this.allItems = [];
      this.pageIndex = index;
      this.startNavigate();
      window.scrollTo(0, 0);
    },

    // 选择框改变
    handleChange() {
      this.pageIndex = 1;
        this.startNavigate();
    },

    /**
     * 开始跳转
     */
    startNavigate() {
      this.$router.push({
        path: "/talking",
        query: {
          keyword: this.currentQuery,
          typeKey: this.currentTypeKey,
          sortKey: this.currentSortKey,
          pageIndex: this.pageIndex,
        },
      });
    },

    // 上传成功
    handleSucess(response) {
      let filename = response.data.filename;
      this.postForm.face = filename;
    },

    // 判断文件类型和大小
    beforeUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const isLtSize = file.size / 1024 / 1024 < 1;
      const extension = testmsg === "jpg" || testmsg === "png";
      if (!extension) {
        this.$message.warn("上传文件只能是 .jpg 或 .png 格式!");
        return false;
      }
      if (!isLtSize) {
        this.$message.warn("上传图片大小不能超过1MB!");
        return false;
      }
      return true;
    },

    // 用户点击去登录
    toLogin() {
      this.$router.push({
        path: "/login",
        // 携带当前页面的url，登录后可以直接跳转到当前页面
        query: {
          redirectTo: window.location.href,
        },
      });
    },

    // 发布讨论
    sendPost() {
      // 获取当前已登录的用户id，这里先硬编码
      this.$refs.postFormRef.validate((valid) => {
        if (valid) {
          // TODO 发送讨论
          this.postForm.from_user=this.userInfo.userId;
          this.$http.post(this.apis.sendPostApi, this.postForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success("发布成功!");
              window.scroll(0, 0);
              window.location.reload();
              // console.log(this.$store.state);
            } else {
              this.$message.error("发布失败");
            }
          });
        }
      });
    },

    // 点击标题，进入详情页
    toDetail(id) {
      // 跳转到/detail/id
      this.$router.push({
        path:`/talkDetail/${id}`,
        query: {
          backTo: window.location.href,
          
        },
        
        
        });
    },
  },
  // 监听路由变化，刷新页面
  watch: {
    $route: "getInitData",
  },
  name:"talkings"
};
</script>

<style scoped>
#talkings-main {
  width:auto;
  /* position: absolute;
  left: 11%;
  
  width: 1200px;
  min-height: 300px; */
  /* background-color: rgba(238, 238, 238, 0.534); */
}

.main-img {
  width: 1200px;
  margin-left: 35px;
}

.main-card {
  margin-top: 30px;
}
.tab-pane-header {
  margin: 15px;
}
.time-info {
  color: rgb(153, 153, 153);
  font-size: 14px;
  margin-left: 40px;
}
h3 {
  font-size: 19px;
}
.summary {
  line-height: 30px;
  font-size: 16px;
  color: rgb(153, 153, 153);
}
.footer-part {
  color: rgb(153, 153, 153);
  font-size: 15px;
}
.footer-part-right {
  color: rgb(153, 153, 153);
  font-size: 17px;
  margin-left: 30px;
}

.active {
  color: rgb(153, 153, 153);
}

.footer > div > span {
  color: rgb(153, 153, 153);
  font-size: 17px;
}

.send-main {
  margin-top: 50px;
}

.lock-info {
  font-weight: 500;
  color: rgb(153, 153, 153);
  font-size: 16px;
  padding: 20px;
}
</style>