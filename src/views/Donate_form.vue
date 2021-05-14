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
            <el-row>
              <!-- 返回+平台标题 -->
              <el-col :offset="1">
                <el-col :span="2">
                  <el-col style="font-size: 20px; margin-top: 20px">
                    <el-page-header @back="goBack()"></el-page-header>
                  </el-col>
                </el-col>
                <el-breadcrumb style="font-size: 18px; margin-top: 20px;float:left;">
                  <el-breadcrumb-item>捐赠</el-breadcrumb-item>
                  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                  <el-breadcrumb-item>捐赠表单</el-breadcrumb-item>
                </el-breadcrumb>
              </el-col>
            </el-row>
            <br />
            <el-row type="flex" style="height:50px;">
              <el-col :span="12" offset="2">
                <p style="color:#4b8e01;font-size:25px;font:bold;">山烛 | 感谢您的爱心捐赠</p>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <!-- 活动介绍 -->
              <el-card>
                <el-col :span="10" id="content">
                  <img
                    :src="donat_act.face"
                    style="height:60%;width: 80%;position: relative;top:10%;left:10%;"
                  />
                </el-col>
                <!-- 用户填写的表单 -->
                <el-col :span="10" id="form">
                  <div id="donat-form">
                    <el-form :model="donatForm" :rules="rules" ref="donatForm" label-width="100px">
                      <p
                        style="font:bold;position: relative;top:15%;left:10%;font-size:25px"
                      >{{donat_act.dname}}</p>
                      <p style="font:bold;position: relative;top:8%;left:10%;font-size:16px">
                        活动已经募捐
                        <span
                          style="color:red;font-size: 22px;"
                        >&#8194;{{donat_act.donate_total|zero}}&#8194;</span>件物品
                      </p>
                      <el-form-item label="捐赠数量" prop="donate_num">
                        <el-input-number size="small" v-model="donatForm.donate_num"></el-input-number>
                      </el-form-item>
                      <el-form-item label="物品清单" prop="remark">
                        <el-input
                          type="textarea"
                          v-model="donatForm.remark"
                          placeholder="可备注物品内容，eg.一副羽毛球拍"
                          style="width:300px;"
                          rows="4"
                        ></el-input>
                      </el-form-item>

                      <el-form-item id="btn">
                        <el-button type="primary" @click="submit()">提交</el-button>
                        <el-button @click="resetForm()">重置</el-button>
                      </el-form-item>
                    </el-form>
                    <!-- <el-dialog title="" :visible.sync="centerDialogVisible" width="30%" center>
                      <div :visible.sync="submtFlase">提交失败</div>
                      <div :visible.sync="submtTrue"></div>
                      <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="define()">确 定</el-button>
                      </span>
                    </el-dialog>-->
                    <el-dialog title="" :visible.sync="DialogVisible1" width="30%" center>
                      <span style="font-size:17px;"><i class="el-icon-circle-check" style="color:green;"></i>提交成功，感谢您的捐赠</span>
                      <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="define()">确 定</el-button>
                      </span>
                    </el-dialog>
                    <el-dialog title="" :visible.sync="DialogVisible2" width="30%" center>
                      <span style="font-size:17px;" ><i class="el-icon-warning-outline" style="color:red;"></i>提交失败，捐赠数不能小于0</span>
                      <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="define()">确 定</el-button>
                      </span>
                    </el-dialog>
                  </div>
                </el-col>
              </el-card>
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
#content {
  height: 400px;
}
#form {
  height: 400px;
}
#back {
  height: 60px;
}
.el-input {
  width: 200px;
}
.slide-verify {
  position: relative;
  left: 18%;
}

#btn {
  position: relative;
  left: 15%;
}
#donat-form {
  width: 80%;
  height: 80%;
  position: relative;
  top: 10%;
  left: 10%;
}
</style>

<script>
import headers from "../components/Header.vue";
import sidebars from "../components/SideBar.vue";
import footers from "../components/Footer.vue";
import axios from "axios";
export default {
  data: () => {
    return {
      centerDialogVisible: false,
      DialogVisible1: false,
      DialogVisible2: false,
      submtFlase: false,
      submtTrue: false,
      donat_act: {},
      donatForm: {
        user_id: 1,
        donate_num: "1",
        remark: ""
      },

      /* 验证登录结果 */
      msg: "",
      /* 活动id */
      id: ""
    };
  },
  filters: {
    zero(value) {
      if (value == null) return "0";
      else return value;
    }
  },
  created() {
    this.donatForm.user_id=this.$store.getters.getId;
    this.id = this.$route.query.ID;
    //this.id=1;
    this.getAct(this.id);
  },
  components: {
    sidebars,
    footers,
    headers
  },
  methods: {
    click() {
      this.isShow = !this.isShow;
    },
    goBack() {
      this.$router.push({ path: "/donatDetail", query: { ID: this.id } });
    },
    //重置表单
    resetForm() {
      this.donatForm.donate_num = 0;
      this.donatForm.remark = "";
    },
    //获取某个活动详情
    getAct() {
      axios
        .get(`http://150.158.191.172:8081/donate/detail/${this.id}`)
        .then(res => {
          this.donat_act = res.data.data;
          console.log(res.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    goto(id) {
      this.$router.push({ path: "/donat_act", query: { ID: id } });
    },

    submit() {
      if (this.donatForm.donate_num > 0) {
        this.DialogVisible1 = true;
        //console.log(this.id);
        this.postDonat(this.id);
      } else {
        this.DialogVisible2 = true;
      }
    },
    define() {
      this.DialogVisible1 = false;
      this.DialogVisible2=false;
      location. reload()
      
    },

    onSuccess() {
      this.msg = "login success";
      /* 添加成功动画 */
    },
    onFail() {
      this.msg = "";
    },
    onRefresh() {
      this.msg = "";
    },
    postDonat(id) {
      axios
        .post(`http://150.158.191.172:8081/donate/update/${id}`, this.donatForm)
        .then(res => {
          //this.newAct=res.data.data.data;
          console.log(res);
          //console.log(this.newAct[0].content);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>