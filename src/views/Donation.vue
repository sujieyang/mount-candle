<template>
  <el-container style="height: auto; border: 1px solid #eee">
    <el-container>
      <el-header style=" font-size: 12px">
        <headers />
      </el-header>

      <el-container>
        <sidebars />

        <el-main>
          <div id="donat-page-content" style="overflow:hidden;">
            <el-row type="flex" justify="center" style="">
              <el-col :span="22" id="module-pic">
                <!-- 板块图片 -->
                <div id="image" style="height:100%;width:100%;">
                  <img src="../assets/donate/131.jpg" style="height:100%;width:100%;" />
                </div>
              </el-col>
            </el-row>
            <br />
            <br />
            <el-row :gutter="22" type="flex" justify="center" style="hight:200px;">
              <el-col :span="22" id="donat-platform">
                <!-- 板块头栏 -->
                <el-row type="flex" justify="space-between" id="header">
                  <el-col :span="4">
                    <div id="title">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-juanzeng" />
                      </svg>
                      <span style="font-size:20px;">&#8194;热门活动</span>
                    </div>
                  </el-col>
                  <el-col :span="2">
                    <!-- <div id="more">更多>></div> -->
                  </el-col>
                </el-row>

                <!-- 平台项目 1*4 -->
                <el-row :gutter="10">
                  <el-col :span="6" id="donat" v-for="list in hotDonat" :key="list.id">
                    <div id="donat-content" @click="goto(list.id)">
                      <div id="donat-pic">
                        <img :src="list.face" />
                      </div>
                      <div id="donat-body">
                        <h2 id="donat_title">{{list.dname}}</h2>
                        <span v-html="$options.filters.ellipsis(list.content)"></span>
                        <!-- <p id="donat_desc" v-html="list.content"></p> -->
                      </div>
                      <div id="donat-foot">
                        <span class="el-icon-time"></span>
                        <span
                          style="width:70%;"
                        >时间{{timestampToTime(list.start_time)|timeEll}}开始&#8194;&#8194;</span>

                        <span class="el-icon-user"></span>

                        参加人数{{list.participantsNumber}}
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              
              <!-- 放捐赠反馈 -->
              
            </el-row>
            <br />
            <!-- 最新项目 -->
            <el-row :gutter="22" type="flex" justify="center">
              <el-col :span="22" id="donat-platform">
                <!-- 板块头栏 -->
                <el-row type="flex" justify="space-between" id="header">
                  <el-col :span="4">
                    <div id="title">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#iconzuixin" />
                      </svg>
                      <span style="font-size:20px;">&#8194;最新活动</span>
                    </div>
                  </el-col>
                  <el-col :span="2">
                    <!-- <div id="more">更多>></div> -->
                  </el-col>
                </el-row>

                <!-- 平台项目 1*4 -->
                <el-row :gutter="10">
                  <el-col :span="6" id="donat" v-for="list in newAct" :key="list.id">
                    <div id="donat-content" @click="goto(list.id)">
                      <div id="donat-pic">
                        <img :src="list.face" />
                      </div>
                      <div id="donat-body">
                        <h2 id="donat_title">{{list.dname}}</h2>
                        <!-- <span v-html="$options.filters.ellipsis(list.content)"></span> -->
                        <p id="donat_desc" v-html="$options.filters.ellipsis(list.content)"></p>
                      </div>
                      <div id="donat-foot">
                        <span class="el-icon-time"></span>
                        <span
                          style="width:70%;"
                        >时间{{timestampToTime(list.start_time)|timeEll}}开始&#8194;&#8194;</span>

                        <span class="el-icon-user"></span>

                        参加人数{{list.participantsNumber}}
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              
            </el-row>
            <!-- 活动推荐 -->
            <el-row :gutter="22">
              <el-col :span="22" :offset="1">
                <!-- 板块头栏 -->
                <el-row type="flex" justify="space-between" id="header">
                  <el-col :span="6">
                    <div id="title">
                      <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icontongzhi1" />
                    </svg>
                      <span style="font-size:20px;">&#8194;活动推荐</span>
                    </div>
                  </el-col>
                  <el-col :span="2">
                    <!-- <div id="more">更多>></div> -->
                  </el-col>
                </el-row>
                
                <el-row :gutter="10" >
                  <!-- 显示活动图片 -->
                  <el-col :span="14"  style="height:300px;" >
                    <img :src="recDonat[showDonat].face" @click="goto(recDonat[showDonat].id)" style="width:80%;height:100%" />
                  </el-col>
                  <el-col :span="10"  style="height:300px;">
                    <el-row
                      v-for="(list,index) in recDonat"
                      style="height:100px;"
                      :key="list.index"
                    >
                      <div
                        id="newDonat-text"
                        class="color"
                        :class="{changeColor:Color==index}"
                        @click="changeText(index),changePic(index)"
                        style="height:100%;width:100%;"
                      >
                        <h2>{{list.dname}}</h2>
                        <p>{{list.content}}</p>
                      </div>
                    </el-row>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <br />
            <br />
            <!--  第三方项目平台-->
            <el-row :gutter="22">
              <el-col :span=22 id="donat-third" :offset="1">
                <!-- 板块头栏 -->
                <el-row type="flex" justify="space-between" id="header">
                  <el-col :span="8">
                    <div id="title">
                      <svg class="icon" aria-hidden="true" style="color:blue;">
                        <use xlink:href="#icontubiao-" />
                      </svg>
                      <span style="font-size:20px;">&#8194;第三方平台活动</span>
                    </div>
                  </el-col>
                  <el-col :span="2">
                    <!-- <div id="more">更多>></div> -->
                  </el-col>
                </el-row>

                <!-- 第三方项目 1*3 -->
                <el-row :gutter="22">
                  <el-col :span="6" id="donat" v-for="list in otherAct" :key="list.id">
                    <div id="donat-content" @click="otherGoto(list.link)">
                      <div id="donat-pic">
                        <img :src="list.pic" style="width:100%;height:100%" />
                      </div>
                      <div id="donat-body">
                        <h2 id="donat_title">{{list.name}}</h2>
                        <p id="donat_desc">&#8194;&#8194;{{list.content|ellipsis}}</p>
                      </div>
                      <div id="donat-foot">
                        <p>{{list.platform}}</p>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-main>
      </el-container>
      <footers />
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
h2 {
  size: 18px large;
}
.icon {
  vertical-align: -0.3em;
  fill: currentColor;
  overflow: hidden;
  width: 35px;
  height: 35px;
}

.title {
  color: #f98064;
  background-color: #000;
  position: relative;
  left: 5%;
  top: 25%;
}

#header {
  height: 50px;
}
#module-pic {
  height: 180px;
  padding-top: 0;
}
#donat-platform {
  /* background-color: green; */
  height: 250px;
  border-radius: 10px;
}
#donat-third {
  height: 320px;
  /* background-color: green; */
  border-radius: 10px;
}
#donat-msg {
  height: 600px;
  border-radius: 10px;
}
#donat {
  height: 180px;
}
#donat-content {
  height: 180px;
  position: relative;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  -webkit-transition: box-shadow 0.5s;
  transition: box-shadow 0.5s;
}

#more {
  font-size: 18px;
  font-family: "微软雅黑";
}
#title {
  font-size: 20px;
  font-family: "微软雅黑";
}

#donat-content:hover {
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.3);
}

#donat-pic {
  z-index: 1;
  width: 100%;
  height: 76%;
  background-color: #000;
  -webkit-transition: height 0.5s;
  transition: height 0.5s;
}

#donat-pic img {
  width: 100%;
  height: 100%;
  display: block;
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
  -webkit-transition: opacity 0.5s, -webkit-transform 0.5s;
  transition: opacity 0.5s, -webkit-transform 0.5s;
  transition: opacity 0.5s, transform 0.5s;
  transition: opacity 0.5s, transform 0.5s, -webkit-transform 0.5s;
}

#donat-content:hover #donat-pic img {
  opacity: 0.6;
  -webkit-transform: scale(1.2);
  transform: scale(1.2);
}

#donat-body {
  position: absolute;
  bottom: 10%;
  z-index: 2;
  width: 100%;
  height: 14%;
  background-color: white;
  -webkit-transition: height 0.5s;
  transition: height 0.5s;
}

#donat-content:hover #donat-body {
  height: 45%;
}

#donat_desc {
  color: #666c74;
  opacity: 0;
  -webkit-transform: translateY(45px);
  transform: translateY(45px);
  -webkit-transition: opacity 0.3s, -webkit-transform 0.3s;
  transition: opacity 0.3s, -webkit-transform 0.3s;
  transition: opacity 0.3s, transform 0.3s;
  transition: opacity 0.3s, transform 0.3s, -webkit-transform 0.3s;
  -webkit-transition-delay: 0s;
  transition-delay: 0s;
}

#donat-foot {
  bottom: 0px;
  width: 100%;
  height: 10%;
  position: absolute;
  font-size: 11px;
  z-index: 4;
  color: #a3a9a2;
}

#donat-content:hover #donat_desc {
  opacity: 1;
  -webkit-transform: translateY(0);
  transform: translateY(0);
  -webkit-transition-delay: 0.2s;
  transition-delay: 0.2s;
}

#donat-total {
  height: 30%;
}
#donat-user {
  height: 70%;
}

#msg-text {
  width: 100%;
  height: 100%;
  line-height: 30px;
  overflow: hidden;
  padding-left: 30px;
  transition: all 0.5s;
}

.anim {
  transition: all 0.5s;
}
#con1 p {
  list-style: none;
  line-height: 30px;
  height: 20px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

#newDonat-text h2 {
  padding-left: 5%;
  padding-top: 2%;
}

#newDonat-text p {
  font-size: 15px;
  padding-left: 5%;
}

#newDonat-text {
  border-radius: 15px;
  float:left;
}

.changeColor {
  color: white;
  font: bold;
  background-color: #f98064;
}
.color {
  cursor: pointer;
}
</style>

<script>
import headers from "../components/Header.vue";
import sidebars from "../components/SideBar.vue";
import footers from "../components/Footer.vue";
import "../assets/donate/iconfont";
import axios from "axios"
export default {
  data() {
    return {
      /* 平台活动信息 */
      hotDonat: [],

      /* 最新活动 */
      showDonat: "0",
      Color: -1,

      recDonat: [
        {
          id: "23",
          face: require("../assets/donate/130.jpg"),
          //url: require(".jpg"),
          dname: "桂花小学学习用具捐赠计划",
          content: "该活动旨在帮助孩子改善学习环境，捐赠书包等学习工具。"
        },
        {
          id: "11",
          dname: "晓阳小学足球用具捐赠计划",
          face: require("../assets/donate/113.jpg"),
          //url: require("../../assets/donat/28.jpg"),
          content: "该活动旨在为热爱足球的孩子们捐赠足球，护膝等各种运动用品及设施。"
        },
        {
          id: "31",
          dname: "肖营小学学习用具捐赠计划",
          face: require("../assets/donate/128.jpg"),
          content: "该活动旨在帮助孩子改善学习环境，捐赠书包等学习工具。"
        }
      ],

      newAct: [],

      //第三方平台项目
      otherAct: [
        {
          pic: require("../assets/donate/111.jpg"),
          name: "免费午餐",
          link:
            "https://love.alipay.com/donate/itemDetail.htm?name=2014010616214122130",
          content:
            "免费午餐坚持“师生同食、就地取材、透明公开、村校联合”学校执行的四项基本原则，保障为孩子们提供安全、营养的免费午餐。",
          platform: "中国社会福利基金会"
        },

        {
          pic: require("../assets/donate/28.jpg"),
          name: "种下希望树",
          link:
            "https://love.alipay.com/donate/itemDetail.htm?name=2014111411123258728",
          content:
            "  一株枸杞树，一双扇动希望的翅膀一株枸杞树，能让生活在宁夏的农户过上幸福的日子，也能切实改善当地的环境，让看见蓝天的日子慢慢变多。一株枸杞树，链接城市中的我们和宁夏当地的他们，像无数双扇动希望的蝴蝶翅膀——一个微小的改变，就能产生巨大的连锁反应。",
          platform: "中国绿化基金会"
        },
        {
          pic: require("../assets/donate/112.jpg"),
          name: "给流浪狗狗一顿饱饭",
          link:
            "https://love.alipay.com/donate/itemDetail.htm?name=2017082413435248543",
          content:
            "我们希望能够跟有爱的人一起，帮助城市中的流浪动物解决最基本的口粮问题。让那些生活在流浪动物救助站的狗狗们能够吃饱饭，能够更加安稳的活着，有更多的机会等待一个家的到来。让救助站的工作人员能够有更多的精力为它们创造更好的医疗和生活条件。",
          platform: "爱德基金会"
        },
        {
          pic: require("../assets/donate/125.jpg"),
          name: "给流浪狗狗一顿饱饭",
          link:
            "https://love.alipay.com/donate/itemDetail.htm?name=2014110617274060491",
          content:
            "在农村，经常可以看到，头发花白的老人守望在家门，在村口，等待着子女能够为他们带去一声问候。随着大量农村青壮年劳动力外出务工，农村中出现了规模庞大的空巢老人群体。70%的农村空巢老人担忧未来，生活孤独。除了饱受病痛折磨之外，无人问津的寂寞和“被遗弃”的孤独感才是对老人们最大的伤害。",
          platform: "老龄事业发展基金会"
        },
        
      ],
      sortTime: {
        query: "",
        typeKey: "all",
        sort: "start_time"
      },
      sortNum: {
        query: "",
        typeKey: "all",
        sort: "participants_number"
      }
    };
  },

  created() {
    this.getNewact();
    this.getHotact();
  },
  mounted() {
    //滚动条
    this.timer1 = setInterval(this.scroll, 1000);
  },
  //过滤器,截取部分内容
  filters: {
    //简介
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 40) {
        return value.slice(0, 40) + "...";
      }
      return value;
    },
    feedbackEll(value) {
      if (!value) return "";
      if (value.length > 60) {
        return value.slice(0, 60) + "...";
      }
      return value;
    },
    timeEll(value) {
      if (!value) return "";
      if (value.length > 10) {
        return value.slice(0, 10);
      }
      return value;
    }
  },
  components: {
    sidebars,
    footers,
    headers
  },
  methods: {
    //跳转到捐赠活动详情界面
    goto(id) {
      console.log(id);
      this.$router.push({ path: "/donatDetail", query: { ID: id } });
    },
    otherGoto(link) {
      window.open(link);
    },
    //点击切换最新活动板块的图片
    changePic(id) {
      //console.log(id);
      this.showDonat = id;
    },
    //切换最新板块文字的显示样式
    changeText(index) {
      this.Color = index;
    },
    //时间戳转换器，使用{{timestampToTime(this.time)}}
    timestampToTime(cjsj) {
      var date = new Date(cjsj); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    //链接

    
    //最新活动
    
    getNewact(){
       axios.post("http://150.158.191.172:8081/donate/all?pageIndex=1&pageSize=4",this.sortTime).then((res)=>{
        this.newAct=res.data.data.data;
        console.log(this.newAct);
        //console.log(this.newAct.content);
      })
    },
    //最火活动
    getHotact(){
       axios.post("http://150.158.191.172:8081/donate/all?pageIndex=1&pageSize=4",this.sortNum).then((res)=>{
        this.hotDonat=res.data.data.data;
        //console.log(this.hotDonat);
        //console.log(this.hotDonat[0].content);
      })
    },
 
  }
};
</script>