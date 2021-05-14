<template>
  <el-container style="height: auto; border: 1px solid #eee">
    <el-container>
      <el-header style=" font-size: 12px">
        <headers />
      </el-header>

      <el-container>
        <sidebars />

        <el-main>
          <div id="donat-page-cotent" style="overflow:hidden;">
            <!-- 面包屑 -->
            <el-row>
              <el-col :offset="1">
                <el-col :span="2">
                  <el-col style="font-size: 20px; margin-top: 20px">
                    <el-page-header @back="goBack()"></el-page-header>
                  </el-col>
                </el-col>
                <el-breadcrumb style="font-size: 18px; margin-top: 20px;float:left;">
                  <el-breadcrumb-item>捐赠</el-breadcrumb-item>
                  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                </el-breadcrumb>
              </el-col>
            </el-row>

            <br />
            <el-row type="flex">
              <!-- 捐赠活动介绍 -->
              <el-col :span="16" id="introd" :offset="1">
                <div id="pic">
                  <img :src="donat_act.face" />
                </div>
                <div id="content">
                  <div id="cont">
                    <!-- 活动名，活动目前收到的捐赠总数，参加人数，活动时间， -->
                    <p
                      style="font:bold;position: relative;top:20%;left:5%;font-size:25px"
                    >{{donat_act.dname}}</p>
                    <p style="position: relative;top:15%;left:5%;font-size:16px">
                      活动已募捐
                      <span style="color:red;font-size:22px;"> {{donat_act.donate_total|zero}}</span>  件物品
                    </p>
                    <p
                      style="position: relative;top:10%;left:5%;font-size:16px"
                    >捐赠类型: {{donat_act.donate_type}}</p>
                    <p
                      style="position: relative;top:8%;left:5%;font-size:16px"
                    >参与人数：{{donat_act.participantsNumber}}人参与</p>

                    <p
                      style="position: relative;top:5%;left:5%;font-size:16px"
                    >活动时间：{{timestampToTime(donat_act.start_time)|timeEll}}~~{{timestampToTime(donat_act.end_time)|timeEll}}</p>
                  </div>
                  <div id="btn">
                    <el-button @click="goto">我要捐助</el-button>
                  </div>
                </div>
              </el-col>
              <!-- 相关活动推荐 -->
              <el-col :span="4" id="recommend" :offset="2">
                <div>
                  <div>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icontongzhi1" />
                    </svg>
                    <span style="font-size:20px;">&#8194;推荐活动</span>
                    <el-divider></el-divider>
                  </div>
                  <div v-for="list in hotAct" :key="list.index">
                    <h3
                      @click="goto2(list.id)"
                      @mouseover="Mouseover"
                      @mouseleave="Mouseleave"
                    >{{list.dname}}</h3>
                    <span style="color:green;">[{{list.donate_type}}]</span>

                    <span style="float:right;">{{list.start_time_str|timeEll}}</span>
                    <el-divider></el-divider>
                  </div>
                </div>
              </el-col>
            </el-row>
            <br />
            <el-row>
              <!-- 活动详情，反馈 -->
              <el-col :span="16" id="paging" :offset="1">
                <el-tabs type="border-card" style="height:600px;">
                  <el-tab-pane label="详情">
                    <div style="width:100%;padding:5% 5%;" v-html="donat_act.content"></div>
                  </el-tab-pane>
                  <!-- <el-tab-pane label="捐赠去向">
                    <el-timeline>
                      <el-timeline-item
                        v-for="list in this.donat_act.mileStones"
                        :key="list"
                        :timestamp="stampToTime(list.time)"
                        placement="top"
                      >
                        <el-card>
                          <h4>{{list.content}}</h4>
                        </el-card>
                      </el-timeline-item>
                    </el-timeline> 
                  </el-tab-pane>-->
                </el-tabs>
              </el-col>
              <!-- <el-col :span="4" :offset="2">
                <div>
                  <span>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-juanzeng" />
                    </svg>
                    <span style="font-size:20px;padding: 10px 10px;">捐赠记录</span>
                  </span>

                  <el-divider></el-divider>

                  <div id="box1">
                    <div
                      id="con1"
                      ref="con1"
                      :class="{anim:animate==true}"
                      @mouseenter="mEnter"
                      @mouseleave="mLeave"
                    >
                      
                    </div>
                  </div>
                </div>
              </el-col> -->
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
#test {
  font: bold;
  position: relative;
  top: 10%;
  left: 10%;
}
.icon {
  vertical-align: -0.3em;
  fill: currentColor;
  overflow: hidden;
  width: 35px;
  height: 35px;
}
#introd {
  height: 300px;
  background-color: #f3f7e6;
}
#paging {
  height: 800px;
}

#back {
  height: 50px;
  /*background-color: rgb(133, 214, 133);*/
}
#content {
  width: 50%;
  height: 100%;
  float: left;
}
#pic {
  width: 50%;
  height: 100%;
  float: left;
}
#pic img {
  padding: 10% 9%;
  width: 100%;
  height: 100%;
}
#cont {
  width: 100%;
  height: 70%;
}
#btn {
  height: 30%;
  top: 10%;
  position: relative;
}
.el-button {
  position: relative;
  left: 30%;
  top: 10%;
  border: none;
  background-color: orange;
  color: white;
  font-weight: bold;
}

#box1 {
  margin: 0;
  height: 0;
  width: 200px;
  height: 100px;
  line-height: 30px;
  overflow: hidden;
  padding-left: 30px;

  transition: all 0.5s;
}
.anim {
  transition: all 0.5s;
}
#con1 li {
  list-style: none;
  line-height: 30px;
  height: 20px;
}
</style>

<script>
import headers from "../components/Header.vue";
import sidebars from "../components/SideBar.vue";
import footers from "../components/Footer.vue";
import axios from "axios";
import "../assets/donate/iconfont";
export default {
  data() {
    return {
      id: "",
      donat_act: {},
      test: {},
      location_item: [],
      item: [],
      donat_item: {},
      hotAct: [],

      sortNum: {
        query: "",
        typeKey: "all",
        sort: "participants_number"
      },
      //滚动条
      animate: false,
      avtivecolor: "color:black",

    };
  },
  created() {
    this.id = this.$route.query.ID;
    //this.id = 1;
    this.getAct(this.id);
    this.getHotact();
    this.getRecord(this.id);
    //console.log(id);
  },

  mounted() {
    // //滚动条
    // this.timer1 = setInterval(this.scroll, 1000);
    //拆分捐赠去向表
    console.log(this.donat_act.location);
    //this.donat_act.location.split("\\#");
    this.item = this.donat_act.location.split("#");
    for (var i = 0; ; i += 2) {
      var time, content;
      time = this.item[i];
      content = this.item[i + 1];
      this.location_item.push({ time: time, content: content });
      if (this.item[i + 2] == "") break;
    }
    console.log(this.location_item);
  },
  filters: {
    //简介
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 85) {
        return value.slice(0, 85) + "...";
      }
      return value;
    },
    feedbackEll(value) {
      if (!value) return "";
      if (value.length > 30) {
        return value.slice(0, 30) + "...";
      }
      return value;
    },
    timeEll(value) {
      if (!value) return "";
      if (value.length > 10) {
        return value.slice(0, 10);
      }
      return value;
    },
    zero(value){
      if(value==null) return "0";
      else return value;
    }
  },
  methods: {
    goto() {
      //console.log(this.id);
      this.$router.push({ path: "/donatForm", query: { ID: this.id } });
    },
    goto2(id) {
      console.log(id);
      this.$router.go({ path: "/donatDetail", query: { ID: id } });
      /* this.$router.push({ path: "/donatForm", query: { ID: id } }); */
    },
    goBack() {
      this.$router.push({ path: "/donation" });
    },
    //获取某个活动详情
    getAct() {
      axios
        .get(`http://150.158.191.172:8081/donate/detail/${this.id}`)
        .then(res => {
          this.donat_act = res.data.data;
          console.log(this.donat_act);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取活动捐赠记录
    getRecord() {
      axios
        .get(`http://150.158.191.172:8081/donate/records/${this.id}`)
        .then(res => {
          this.donat_item = res.data.data;
          //console.log(this.donat_item);
        })
        .catch(error => {
          console.log(error);
        });
    },
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
    //获取推荐活动
    getHotact() {
      axios
        .post(
          "http://150.158.191.172:8081/donate/all?pageIndex=1&pageSize=2",
          this.sortNum
        )
        .then(res => {
          this.hotAct = res.data.data.data;
          //console.log(this.hotDonat);
          //console.log(this.hotDonat[0].content);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // scroll() {
    //   let con1 = this.$refs.con1;
    //   //向前滚动大小
    //   con1.style.marginTop = "-42px";
    //   this.animate = !this.animate;
    //   var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向

    //   setTimeout(function() {
    //     that.items.push(that.items[0]);
    //     that.items.shift();
    //     con1.style.marginTop = "0px";
    //     that.animate = !that.animate; // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
    //   }, 500);
    // },

    mEnter() {
      clearInterval(this.timer1);
    },
    // mLeave() {
    //   this.timer1 = setInterval(this.scroll, 1000);
    // },
    Mouseover() {
      this.avtivecolor = "color:red";
    },
    Mouseleave() {
      this.avtivecolor = "color:black";
    }
  },
  components: {
    sidebars,
    footers,
    headers
  }
};
</script>