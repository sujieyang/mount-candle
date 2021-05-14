<template>
  <el-container style="height: auto; border: 1px solid #eee">
    <el-container>
      <el-header>
        <headers />
      </el-header>

      <el-container>
        <sidebars />

        <el-main>
          <!--标签页-->
          <el-tabs type="border-card">
            <el-tab-pane label="帖子管理">
              <!--搜索框-->
              <el-row class="find">
                <el-col :span="8" class="grid">
                  <el-input v-model="input" placeholder="请输入内容" size="medium" width="200"></el-input>
                </el-col>
                <el-col :span="1" class="grid">
                  <el-button type="primary" size="medium">
                    <i class="el-icon-search" style="margin-right: 5px"></i>搜
                    索
                  </el-button>
                </el-col>
              </el-row>

              <!--筛选项-->
              <el-col :offset="2">
                <div>
                  <span style="float: left; margin-top: 5px">帖子类型：</span>
                  <ul style="list-style: none">
                    <li
                      v-for="(type, index) in talkTypes"
                      :key="index"
                      :class="type.key"
                      class="op-type-li"
                    >{{ type.label }}</li>
                  </ul>
                </div>
              </el-col>
              <br />
              <!--表格数据及操作-->
              <el-table
                :data="tableData"
                border
                style="width: auto"
                stripe
                ref="multipleTable"
                tooltip-effect="dark"
                :default-sort="{prop: 'create_time', order: 'descending'}"
              >
                <!--索引-->
                <!-- <el-table-column type="index" :index="indexMethod" width="40">
                </el-table-column>-->
                <el-table-column prop="id" label="id" sortable width="60"></el-table-column>
                <el-table-column prop="title" label="标题" width="210"></el-table-column>
                <el-table-column prop="content" label="内容" width="210" show-overflow-tooltip>
                  
                </el-table-column>
                <el-table-column
                  prop="create_time"
                  label="发布时间"
                  
                  sortable
                  width="130"
                >
                <template slot-scope="scope">
                    <span>{{timestampToTime(scope.row.create_time)}}</span>
                  </template></el-table-column>
                <el-table-column prop="from_user" label="发布者" width="80">
                  
                </el-table-column>
                <el-table-column label="类型名" width="180">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.type_name" placeholder="请选择类型">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="view" label="查看" width="55"></el-table-column>
                <el-table-column prop="commentNum" label="评论" width="55"></el-table-column>
                <el-table-column prop="face" label="封面" width="150">
                  <template slot-scope="scope">  
                  <img :src="scope.row.face" style="width:50px;height:50px;" />
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="73">
                  <template>
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      size="mini"
                      @click.prevent="cellclick"
                    ></el-button>
                  </template>
                </el-table-column>
              </el-table>
              <br />
              <!--新增按钮-->
              <el-col :span="1" class="grid">
                <el-button
                  type="success"
                  @click="addUserForm = true"
                  icon="el-icon-circle-plus-outline"
                  size="mini"
                  round
                >新增</el-button>
              </el-col>
              <el-col :span="1"></el-col>
              <br />
              <!--新增帖子对话框-->
              <el-dialog title="新增帖子" :visible.sync="addUserForm">
                <el-form :model="form">
                  <el-form-item label="标题" :label-width="formLabelWidth">
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="内容" :label-width="formLabelWidth">
                    <el-input v-model="form.content" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="类型名" :label-width="formLabelWidth">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.type_name" placeholder="请选择类型">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </template>
                    <!-- <el-input v-model="form.type.type_name" autocomplete="off"></el-input> -->
                  </el-form-item>
                  <el-form-item label="发布者" :label-width="formLabelWidth">
                    <el-input v-model="form.from_user" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="封面" :label-width="formLabelWidth">
                    <el-input v-model="form.face" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="addUserForm = false">取 消</el-button>
                  <el-button
                    type="primary"
                    @click="addUserForm = false"
                    @click.prevent="addUser"
                  >确 定</el-button>
                </div>
              </el-dialog>

              <!--分页条-->
              <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page="pageIndex"
                :page-size="pagesize"
                layout="prev, pager, next"
                :total="total"
              ></el-pagination>
            </el-tab-pane>
          </el-tabs>
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
.el-main {
  text-align: center;
}
.find {
  margin-left: 300px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.op-type-li {
  float: left;
  background-color: #eee;
  margin-left: 15px;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 10px;
  border: 1px #ddd solid;
  cursor: pointer;
}
.op-type-li:hover,
.active {
  background: #00a1d6;
  color: #fff;
}
.pagination-part {
  margin-top: 5px;
  float: right;
}
</style>

<script>
import headers from "../admin_components/Header.vue";
import sidebars from "../admin_components/Sidebar.vue";
import footers from "../admin_components/Footer.vue";
import axios from "axios";
export default {
  data() {
    return {
      //帖子数据
      tableData: {},
      pageIndex: "1",
      pagesize: 4,

      options: [
        {
          value: "1",
          label: "学习"
        },
        {
          value: "2",
          label: "生活"
        },
        {
          value: "3",
          label: "志愿活动"
        },
        {
          value: "4",
          label: "精品"
        }
      ],
      talkTypes: [
        {
          value: "type1",
          label: "全部"
        },
        {
          value: "type2",
          label: "学习"
        },
        {
          value: "type3",
          label: "生活"
        },
        {
          value: "type4",
          label: "志愿活动"
        },
        {
          value: "type5",
          label: "精品"
        }
      ],
      value: "",
      //评论数据
      c_tableData: [
        {
          c_id: "666",
          c_from_user_id: "66",
          from_post_or_video: "666",
          publicationtime: "2021/5/10/17:45:45",
          to_comment: "评论1",
          replyTotal: "66666"
        }
      ],
      //查询输入框数据
      input: "",
      //分页总数
      total: "",
      //导航条默认选项
      activeIndex: "1",
      activeIndex2: "1",
      //请求体
      discussion: {
        query: "",
        typeKey: "all",
        sort: "id"
      },
      //

      //角色默认值
      //value:'',
      //添加用户表单
      addUserForm: false,
      c_addUserForm: false,
      form: {
        title: "",
        content: "",
        type: "",
        from_user_id: "",
        face: ""
      },
      c_form: {
        c_from_user_id: "",
        from_post_or_video: "",
        to_comment: ""
      },
      formLabelWidth: "80px"
    };
  },
  components: {
    sidebars,
    footers,
    headers
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 40) {
        return value.slice(0, 40) + "...";
      }
      return value;
    }
  },
  created() {
    this.getDis(this.pageIndex);
  },
  methods: {
    dateFormat(row) {
      var date = new Date(row.cjsj); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
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
    getDis(page) {
      axios
        .post(
          `http://150.158.191.172:8081/admin/discussion/all?pageIndex=${page}&pageSize=4`,
          this.discussion
        )
        .then(res => {
          this.tableData = res.data.data.rows;
          this.total = res.data.data.totalRecords;
          console.log(this.tableData);
          //console.log(this.newAct.content);
        });
    },
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex;
      //console.log(this.pageIndex);
      this.getDis(this.pageIndex);
    },
    //将表单数据添加到用户信息数组中
    addUser() {
      this.tableData.push(this.form);
    },
    cellclick(row) {
      this.tableData.splice(row, 1);
    },
    handleClear() {
      this.selectKey.query = "";
      this.toSearch(true);
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
    }
  },
  c_methods: {
    //将表单数据添加到用户信息数组中
    c_addUser() {
      this.c_tableData.push(this.c_form);
    },
    c_cellclick(row) {
      this.c_tableData.splice(row, 1);
    },
    handleClear() {
      this.selectKey.query = "";
      this.toSearch(true);
    }
  }
};
</script>