<template>
  <div class="box">
    <el-backtop></el-backtop>
    <el-container>
      <el-header style="font-size: 12px; border: 1px solid #eee">
        <headers />
      </el-header>

      <el-main>
        <el-row>
          <el-col :span="15">
            <el-row>
              <div class="box1">
                <el-row>
                  <el-col :span="24" style="font-size: 25px; font-weight: bold">
                    {{ videoInfos.videoTitle }}
                  </el-col>
                </el-row>
                <el-row style="margin-top: 10px">
                  <el-col :span="24" style="font-size: 15px; color: #999"
                    ><span>浏览量:{{ videoInfos.videoViewNum }}</span>
                    <span style="margin-left: 20px"
                      >收藏量:{{ videoInfos.videoStarNum }}</span
                    >
                    <span style="margin-left: 20px">{{
                      videoInfos.videoCreateTime
                    }}</span></el-col
                  >
                </el-row>
                <el-divider />
                <video-player
                  class="video-player vjs-custom-skin"
                  ref="videoPlayer"
                  :playsinline="true"
                  :options="playerOptions"
                ></video-player>
                <el-row class="videoLine">
                  <el-col :span="5" :offset="1" style="margin-top: 15px"
                    >类型：{{ videoInfos.videoType }}</el-col
                  >
                  <el-col
                    :span="2"
                    style="margin-top: 10px; margin-left: 400px"
                  >
                    <el-button
                      size="small"
                      icon="el-icon-star-off"
                      type="primary"
                      :disabled="Disable"
                      @click="addCollectionVideo"
                      >{{add}}</el-button
                    >
                  </el-col>
                  <el-col :span="2" style="margin-top: 10px; margin-left: 25px">
                    <el-button
                      size="small"
                      icon="el-icon-share"
                      type="primary"
                      @click="copyUrl"
                      >分享</el-button
                    >
                  </el-col>
                </el-row>
                <el-row class="videoInfoLine">
                  <el-col style="height: 20px">
                    <!-- 空气 -->
                  </el-col>
                  <el-col>
                    <span
                      style="font-size: 13px; color: #999; margin-left: 10px"
                      >{{ videoInfos.videoInfo }}</span
                    >
                  </el-col>
                </el-row>
              </div>
            </el-row>
            <!-- 评论部分 -->
            <el-row id="comments-part">
              <el-col :span="20" :offset="4">
                <el-card class="detail-content">
                  <el-row>
                    <!-- 评论内容 -->
                    <el-col
                      class="post-item"
                      v-for="(item, index) in commentItem"
                      :key="index"
                    >
                      <el-row>
                        <!-- 头像 -->
                        <el-col :span="4" class="avatar-part">
                          <div style="text-align: center">
                            <img
                              :src="item.from_user_avatar"
                              alt=""
                              width="50px"
                              height="50px"
                              style="border-radius:50%"
                            />
                            <p
                              style="
                                font-size: 10px;
                                margin-top: 10px;
                                line-height: 14px;
                              "
                            >
                              {{ item.from_user_name }}
                            </p>
                          </div>
                        </el-col>
                        <!-- 内容 -->
                        <el-col :span="18" :offset="1">
                          <p style="margin-top: 12px;font-size:10px">
                            {{ item.content }}
                          </p>
                        </el-col>
                        <el-col style="margin-bottom: 5px">
                          <small class="time-info">{{
                            $moment(item.publish_time).utcOffset(0).format('YYYY/MM/DD HH:mm:ss')
                          }}</small>
                          <!-- 回复主贴，评论id和回复id都为评论id，被回复的用户名为楼主名 -->
                          <a
                            class="reply-btn"
                            @click="
                              sendReply(item.id, item.id, item.from_user_name)
                            "
                            >回复</a
                          >
                        </el-col>
                        <!-- 评论下预展示的回复列表 -->
                        <el-col
                          v-for="(reply, index) in item.belows"
                          :key="index"
                          :span="18"
                          :offset="5"
                          class="reply-item"
                        >
                          <el-row style="margin-top: 10px">
                            <!-- 头像区域 -->
                            <el-col :span="2" :offset="1">
                              <img
                                :src="reply.from_user_avatar"
                                alt="#"
                                width="30px"
                                height="30px"
                                style="border-radius:50%"
                              />
                            </el-col>
                            <!-- 回复内容 -->
                            <el-col :span="20">
                              <div>
                                <p
                                  v-if="reply.reply_to_comment_id != item.id"
                                  class="reply-word"
                                >
                                  {{ reply.from_user_name }}&nbsp;回复&nbsp;{{
                                    reply.reply_to_user_name
                                  }}：
                                </p>
                                <p class="reply-word" v-else>
                                  {{ reply.from_user_name }}：
                                </p>
                              </div>
                              <p style="font-size: 10px; margin-top: -11px">
                                {{ reply.content }}
                              </p>
                            </el-col>
                            <!-- 时间，回复按钮 -->
                            <el-col >
                              <small class="item-time">{{
                                $moment(reply.publish_time).utcOffset(0).format('YYYY/MM/DD HH:mm:ss')
                              }}</small>
                              <!-- 回复一条回复，传入被回复的记录id，该评论的id -->
                              <a
                                class="reply-btn"
                                @click="
                                  sendReply(
                                    reply.id,
                                    item.id,
                                    reply.from_user_name
                                  )
                                "
                                >回复</a
                              >
                            </el-col>
                          </el-row>
                          <div
                            style="
                              height: 1px;
                              background: #ddd;
                              margin-top: 10px;
                            "
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
                    <el-col style="text-align: center; margin-top: 10px" v-if="commentsNum > commentItem.length">
                      <el-button size="mini" style="width:730px" type="info" plain id="checkmore" @click="moreComment">查看更多评论</el-button>
                    </el-col>

                    <el-col style="margin-top:15px">
                      <el-row>
                        <el-col :span="16" :offset="4">
                          <h3 style="font-size: 17px; font-weight: 600">
                            发表评论
                          </h3>
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

                          <div v-else style="margin-top: 15px">
                            <a-alert message="未登录" type="warning" show-icon>
                              <p slot="description" style="font-size: 16px">
                                您必须进行<a @click="toLogin()">登录</a
                                >后才能进行回复
                              </p>
                            </a-alert>
                          </div>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-card>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6" :offset="1">
            <div class="box2">
              <el-row>
                <div class="personalLine">
                  <el-col :span="4">
                    <el-popover
                  
                        placement="bottom"
                        title=""
                        width="400"
                        trigger="hover"
                        transition="el-zoom-in-center"
                    >
                    <el-row>
                    <el-col :span="10">
                      <el-image
                        style="width: 80px; height: 80px"
                        :src="videoInfos.videoAuthorImgSrc"
                        fit="fill">
                      </el-image>
                    </el-col>
                    <el-col :span="14">
                      <el-col :span="24">
                        <h2 style="font-weight:bold;font-size:16px">{{videoInfos.videoAuthor}}</h2>
                      </el-col>
                      <el-col :span="18">
                        <h3 style="color: #999;font-size:13px;margin-top:30px;">{{videoInfos.videoAuthorEmail}}</h3>
                      </el-col>
                      <el-col :span="6" >
                        <h3 style="color: #999;font-size:13px;margin-top:30px;">年龄:{{videoInfos.videoAuthorAge}}</h3>
                      </el-col>
                    </el-col>
                  </el-row>
                  <el-divider></el-divider>
                  <el-row>
                    <el-col>
                        <p>{{videoInfos.videoAuthorInfo}}</p>
                    </el-col>
                  </el-row>
                    <div class="avatar" slot="reference" >
                        
                      <el-avatar
                      style="cursor:pointer"
                        shape="circle"
                        :size="60"
                        fit="fill"
                        :src="videoInfos.videoAuthorImgSrc"
                      ></el-avatar>
                    </div>
                    </el-popover>
                  </el-col>
                  
                  <el-col :span="18" :offset="2">
                    <el-row>
                      <el-col>
                        <el-link
                          :href="videoInfos.videoAuthorSrc"
                          :underline="false"
                          target="_blank"
                          style="font-size: 18px; font-weight: bold"
                          >{{ videoInfos.videoAuthor }}</el-link
                        >
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col>
                        <span style="color: #999; font-size: 13px">{{
                          videoInfos.videoAuthorInfo
                        }}</span>
                      </el-col>
                    </el-row>
                  </el-col>
                </div>
              </el-row>
              <el-row>
                <div class="videoSelectedBlock" v-if="videoInfos.isVideos">
                  <el-row>
                    <el-col
                      :span="10"
                      style="margin-top: 5px; margin-left: 10px"
                    >
                      <span style="font-size: 16px; margin-left: 5px"
                        >视频选集</span
                      >
                      <span style="text-align: center; margin-left: 5px"
                        >({{ videoInfos.activeVideoId }}/{{
                          videoInfos.videos.length
                        }})</span
                      >
                    </el-col>
                  </el-row>
                  <el-row style="margin-top: 20px">
                    <el-col
                      style="margin-top: 5px; margin-left: 20px"
                      :span="5"
                      v-for="(item, index) in videoInfos.videos"
                      :key="index"
                    >
                      <el-button size="medium" style="width: 75px" @click="changeVideo(index)"
                        >P{{ item.id }}</el-button
                      >
                    </el-col>
                  </el-row>
                </div>
              </el-row>
              <el-row>
                <el-col
                  v-for="(item, index) in videoInfos.introductVideos"
                  :key="index"
                >
                  <div class="tVideo">
                    <el-col :span="10">
                      <el-col :span="24">
                        <el-link
                          :href="item.Src"
                          :underline="false"
                          target="_blank"
                        >
                          <el-image :src="item.imgSrc" class="imageVideo">
                            <div slot="placeholder" class="image-slot">
                              加载中<span class="dot">...</span>
                            </div>
                          </el-image>
                        </el-link>
                      </el-col>
                    </el-col>
                    <el-col :span="14">
                      <el-row>
                        <el-col style="height: 80px">
                          <el-link
                            :href="item.Src"
                            :underline="false"
                            target="_blank"
                          >
                            <span
                              style="
                                font-weight: bold;
                                margin-left: 10px;
                                margin-right: 10px;
                              "
                              >{{ item.title }}</span
                            >
                          </el-link>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-col :span="12">
                            <el-col :span="2" :offset="1">
                              <i class="el-icon-video-play" />
                            </el-col>
                            <el-col :span="20" :offset="1">
                              <span style="margin-left: 10px" class="time"
                                >{{ item.viewNum }}次播放</span
                              >
                            </el-col>
                          </el-col>
                          <el-col :span="12">
                            <el-col :span="2" :offset="1">
                              <i class="el-icon-time" />
                            </el-col>
                            <el-col :span="20" :offset="1">
                              <span style="margin-left: 10px" class="time">{{
                                item.create_time
                              }}</span>
                            </el-col>
                          </el-col>
                        </el-col>
                      </el-row>
                    </el-col>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <!-- 评论部分 -->
      </el-main>
      <el-footer>
        <footers />
      </el-footer>
    </el-container>
  </div>
</template>


<style scoped>
.peopleInfo{
    background-image: url("../assets/5.png");
}
.box {
  width: auto;
  height: auto;
}
.box1 {
  width: 750px;
  min-height: 600px;
  margin-left: 150px;
}
/* 视频转发，收藏按钮条 */
.videoLine {
  width: 750px;
  height: 50px;
  background-color: rgb(236, 234, 234);
}
.box2 {
  width: 320px;
  height: auto;
}
/* 个人信息条 */
.personalLine {
  width: 300px;
  height: 120px;
}
/* 头像 */
.avatar {
  width: 60px;
  height: 80px;
}
/* 视频选集块 */
.videoSelectedBlock {
  width: 320px;
  height: auto;
  

  min-height: 30px;
  max-height: 350px;
  margin: auto;
  padding: 2.5%;
  overflow-y: auto;
  background-color: rgb(236, 234, 234);
}
/* 主题视频块 */
.tVideo {
  width: 320px;
  height: 100px;
  /* background-color: #f1f4f886; */
  margin-top: 15px;
}
/* 视频封面 */
.imageVideo {
  width: 130px;
  height: 100px;
}
.time {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}
/* 视频简介条 */
.videoInfoLine {
  width: 750px;
  height: 200px;
  background-color: #f1f4f886;
}
/* 评论相关CSS */
p {
  font-size: 13px;
  line-height: 25px;
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
  font-size: 8px;
}
.item-time {
  float: right;
  font-size:5px;
  color: rgb(153, 153, 153);
  margin-right: 20px;
}
.reply-btn {
  float: right;
  font-size: 6px;
  margin-right: 10px;
}
.right-info {
  line-height: 13px;
}
</style>


<script>
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
import $ from "jquery";
import footers from "../components/Footer.vue";
import headers from "../components/Header.vue";
export default {
  components: {
    footers,
    // searchs,
    headers,
    videoPlayer,
  },
  
  data() {
    return {
      Disable:false,
      add:"收藏",

      videoInfos: {
        videoId: 1,
        isVideos: true,
        activeVideoId: 1,
        introductVideos: [
          {
            id: "1",
            index: 1,
            Src: "http://localhost:8080/#/videoDetail/1",
            imgSrc:
              "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
            title: "这是一份标题s是 sss收拾收拾",
            viewNum: 100,
            create_time: "2021-05-20",
          },
          {
            id: "2",
            index: 2,
            Src: "http://localhost:8080/#/videoDetail/1",
            imgSrc:
              "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
            title: "这是一份标题",
            viewNum: 100,
            create_time: "2021-05-20",
          },
          {
            id: "3",
            index: 3,
            Src: "http://localhost:8080/#/videoDetail/1",
            imgSrc:
              "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
            title: "这是一份标题",
            viewNum: 100,
            create_time: "2021-05-20",
          },
          {
            id: "4",
            index: 4,
            Src: "http://localhost:8080/#/videoDetail/1",
            imgSrc:
              "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
            title: "这是一份标题",
            viewNum: 100,
            create_time: "2021-05-20",
          },
          {
            id: "5",
            index: 5,
            Src: "http://localhost:8080/#/videoDetail/1",
            imgSrc:
              "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
            title: "这是一份标题",
            viewNum: 100,
            create_time: "2021-05-20",
          },
          {
            id: "6",
            index: 6,
            Src: "http://localhost:8080/#/videoDetail/1",
            imgSrc:
              "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
            title: "这是一份标题023232323232",
            viewNum: 100,
            create_time: "2021-05-20",
          },
          {
            id: "7",
            index: 7,
            Src: "http://localhost:8080/#/videoDetail/1",
            imgSrc:
              "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
            title: "这是一份标题023232323232",
            viewNum: 100,
            create_time: "2021-05-20",
          },
        ],
        videos: [
          {
            id: "1",
            href: "http://47.96.231.121/movies/default.mp4",
          },
          {
            id: "2",
            href: "http://47.96.231.121/movies/default.mp4",
          },
          {
            id: "3",
            href: "http://47.96.231.121/movies/default.mp4",
          },
          {
            id: "4",
            href: "http://47.96.231.121/movies/default.mp4",
          },
        ],
        videoAuthor: "",
        videoAuthorAge:15,
        videoAuthorEmail:"",
        videoType: "",
        videoAuthorInfo: "",
        videoAuthorImgSrc: "",
        videoAuthorSrc: "",
        videoTitle: "",
        videoInfo: "",
        videoStarNum: 15,
        videoViewNum: 100,
        videoCreateTime: "",
      },

      //----------------评论相关参数----------------------
      apis: {
        // 添加浏览记录
        addViewHistory:"",
        // 获取某个id的讨论的内容
        getVideoData: "/video/detail/",
        // 添加收藏
        addCollection:"",
        // 获取某个id 的评论的所有回复
        getAllReplies: "/video/replies/",
        // 添加评论
        getMoreComments: "/video/comment/",
        addComment:"/video/comment/add"
      },
      // 视频评论总数
      commentsNum: 0,
      // TODO 当前视频id
      currentVideoId: 0,
      pageIndex:1,
      pageSize: 4,
      // 评论信息列表
      commentItem: [],
      // 回复信息表单
      replyForm: {
        // 回复内容
        content: null,
        // 来自用户
        from_user_id: 0,
        // TODO 来自帖子
        from_course_id: 0,
        // 被回复的id
        reply_id: 0,
        // 所属评论id
        comment_id: 0,
        // 被回复的用户名
        reply_to: "",
      },

      replyPlaceholder: "发表评论：",
      formRule: {
        content: [
          {
            required: true,
            message: "回复内容不得为空",
            trigger: "blur",
          },
        ],
      },

      loginUser: {
        // 用户是否登录
        isLogined: true,
        idToken: "",
        id:0,
        // username: "sjy1424",
        // avatar: "http://localhost:8080/user/faces/avatar2.jpg",
      },

      // 视频模块
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            withCredentials: false,
            type: "video/mp4", // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: "",
          },
        ],
        controls: true,
        hls: true,
        poster:
          "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg", // 你的封面地址
        width: 600, // 播放器宽度
        height: 600,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          progressControl: true,
          currentTimeDisplay: true,
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: true,
          fullscreenToggle: true, // 全屏按钮
        },
        flash: { hls: { withCredentials: false } },
        html5: { hls: { withCredentials: false } },
      },
    };
  },
  created() {
    this.loginUser.isLogined=this.$store.getters.getIsLogin;
    this.loginUser.idToken=this.$store.getters.getIdToken;
    this.loginUser.id=parseInt(this.$store.getters.getId);
    console.log(this.loginUser)
    console.log(this.$store.state)
    console.log(this.$route.query)
    // this.playerOptions.sources[0].src = this.videoInfos.videos[0].href;
    this.currentVideoId = this.$route.params.postId;
    this.videoInfos.id=this.$route.params.postId;
    this.getPostDetail();
    if(this.loginUser.isLogined==true){
      console.log("sssssss")
      this.apis.addViewHistory="/user/"+this.loginUser.idToken+"/viewHistory";
      console.log("视频id:"+this.videoInfos.videoId)
      this.apis.addCollection="/user/"+this.loginUser.idToken+"/addCollection/";
      // this.addUserViewHistory();
    }
  },
  methods: {
    // 添加历史记录
    // addUserViewHistory(){
    //   this.$http.get(this.apis.addUserViewHistory).then((res)=>{
        
    //   })
    // },
    //复制Url
    copyUrl() {
      let url = window.location.href;
      console.log(url);
      let oInput = document.createElement("input");
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      console.log(oInput.value);
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.$message({
        message: "复制成功",
        type: "success",
        showClose: "true",
        duration: "1000",
      });
      oInput.remove();
    },

    // 根据视频id，获取视频评论
    getPostDetail() {
      this.$http
        .get(
          `${this.apis.getVideoData}${this.currentVideoId}?pageSize=${this.pageSize}`
        )
        .then((res) => {
          if(res.data.code=="200"){
            console.log(res.data)
            this.playerOptions.sources[0].src=res.data.data.urlItems[0].url;
            console.log(this.playerOptions.sources[0].src)
            this.commentsNum = res.data.data.commentsNum;
            this.commentItem = res.data.data.below_comments;
            this.videoInfos.videoId=res.data.data.id;
            console.log("视频id::"+this.videoInfos.videoId)
            this.videoInfos.face=res.data.data.face;
            this.playerOptions.poster=res.data.data.face;
            this.videoInfos.videoInfo=res.data.data.info;
            this.videoInfos.videoTitle=res.data.data.title;
            this.videoInfos.videoType=res.data.data.type.type_name;
            this.videoInfos.videoAuthor=res.data.data.upload_user.nickname;
            this.videoInfos.videoAuthorImgSrc=res.data.data.upload_user.avatar;
            this.videoInfos.videoAuthorInfo=res.data.data.upload_user.info
            this.videoInfos.videoAuthorAge=res.data.data.upload_user.age;
            this.videoInfos.videoAuthorEmail=res.data.data.upload_user.email;
            this.videoInfos.videoAuthorSrc='#/visitor/'+res.data.data.upload_user.idToken;
            this.videoInfos.videoStarNum=res.data.data.course_like;
            this.videoInfos.videoViewNum=res.data.data.play;
            
            this.videoInfos.videoCreateTime=this.$moment(res.data.data.upload_time).utcOffset(8).fromNow()
            this.videoInfos.videos=[];
            res.data.data.urlItems.forEach((element)=>{
              this.videoInfos.videos.push({
                id:element.id,
                href:element.url,
              })
            })
            
            this.videoInfos.introductVideos=[];
            res.data.data.relativeItems.forEach((element)=>{
              this.videoInfos.introductVideos.push({
                id:element.id,
                title:element.title,
                viewNum:element.watched,
                create_time:this.$moment(element.upload_time).utcOffset(8).fromNow(),
                imgSrc:element.faceUrl,
                Src:'#/videoDetail/'+element.id,
              })
            })
            console.log("评论总数:"+this.commentsNum);
            console.log("当前评论总数:"+this.commentItem.length);
          }
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
        .get(`${this.apis.getAllReplies}${item.id}?pageIndex=${item.pageIndex}&pageSize=4`)
        .then((res) => {
          item.belows = res.data.data;
        });
    },

    // 回复页码改变
    replyPageChange(index, item) {
      item.pageIndex = index;
      this.$http
        .get(`${this.apis.getAllReplies}${item.id}?pageIndex=${item.pageIndex}&pageSize=4`)
        .then((res) => {
          item.belows = res.data.data;
        });
    },

    // 用户点击更多评论
    moreComment(){
        this.pageIndex += 1;
        console.log(this.pageIndex);
        this.$http.get(`${this.apis.getMoreComments}${this.currentVideoId}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`)
        .then(res => {
          console.log(res);
            res.data.data.forEach(comment => {
              this.commentItem.push(comment)
            })
        })
    },

    // // 评论页码改变
    // commentChange(index) {
    //   this.currentPageIndex = index;
    //   window.scroll(0, 0);
    //   this.resetReply();
    //   this.$router.push({
    //     path: "/videoDetail/" + this.videoInfos.videoId,
    //     query: {
    //       pageIndex: index,
    //     },
    //   });
    // },

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
          this.replyForm.from_course_id = this.currentVideoId;
          this.$http.post(this.apis.addComment, this.replyForm).then((res) => {
            if (res.data.code == 200) {
              this.commentItem.splice(0,0,res.data.data)
              this.$message.success("回复成功！");
              this.resetReply();
              document.getElementById("comments-part").scrollIntoView();
            } else {
              this.$message.error("回复失败，请重试！");
            }
            
          })
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
    addCollectionVideo(){
      console.log(this.apis.addCollection+this.videoInfos.videoId)
      if(this.apis.addCollection==""){
        this.$message.error("你还未登录，请先登录")
      }
      else{
        this.$http.get(this.apis.addCollection+this.videoInfos.videoId).then((res)=>{
          if(res.data.code=="200"){
            this.$message.success("收藏成功");
          }
          else if(res.data.code=="215"){
            this.$message.warning(res.data.message);
          }
          else{
            this.$message.error("收藏失败，请重试");
          }
        })
      }
    },

    // 初始化表单数据
    resetReply() {
      this.setReplyForm(0, 0, "");
      this.$refs.sendFormRef.resetFields();
      this.replyPlaceholder = "评论该视频：";
    },
    changeVideo(index){
      this.playerOptions.sources.src=this.videoInfos.videos[index].href;
    },

    // 跳转登录
    toLogin() {
      this.$router.push({
        path: "/login",
        query: {
          redirectTo: window.location.href,
        },
      });
    },
  },
  watch: {
    $route: "getPostDetail",
  },
};
</script>