<template>
    <el-container style="height: auto; border: 1px solid #eee">
  <el-container>
    <el-header >
      <headers/>
      
    </el-header>   
  <el-container>
      <sidebars/>
    
    <el-main>
      <div id="log-main">
    <el-row>
      <el-col>
        <br />
      </el-col>
      <!-- logo -->
      <el-col :span="6" :offset="2">
        <h1 style="margin-left: 30px">
          <i class="el-icon-s-management" style="margin-right: 10px"></i
          >管理员日志
        </h1>
      </el-col>
      <!-- 选择框以及搜索框 -->
      <el-col :span="3">
        <el-select v-model="selected" style="width: 120px; float: right">
          <el-option label="管理员名称" value="name"> </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-input
          type="text"
          placeholder="请输入关键字"
          v-model="query"
          clearable
          @clear="handleClear"
        ></el-input>
      </el-col>
      <el-col :span="2" style="margin-left: 15px">
        <el-button type="primary" @click="toSearch(true)"
          ><i class="el-icon-search" style="margin-right: 5px"></i>搜
          索</el-button>
      </el-col>
      <el-col :span="20" :offset="2">
        <el-divider></el-divider>
      </el-col>
      <!-- 筛选项 -->
      <el-col :offset="2">
        <div>
          <span style="float: left; margin-top: 5px">操作类型：</span>
          <ul style="list-style: none">
            <li
              v-for="(type, index) in typeLsit"
              :key="index"
              @click="changeCondition(type.key)"
              :class="type.key"
              class="op-type-li"
            >
              {{ type.label }}
            </li>
          </ul>
        </div>
      </el-col>
      <!-- 排序方式写死 -->
      <el-col :offset="2" style="margin-top: 15px">
        <div>
          <span style="float: left; margin-top: 5px">排序方式：</span>
          <ul>
            <li class="op-type-li" style="background: #00a1d6; color: #fff">
              最新日志
            </li>
          </ul>
        </div>
      </el-col>
      <!-- 日期范围选择 -->
      <el-col :offset="2">
        <div style="margin-top: 15px">
          <span>时间范围：</span>
          <el-date-picker
            v-model="selectKey.dateResult"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            style="margin-left: 10px"
          >
          </el-date-picker>
        </div>
      </el-col>
      <!-- 表格区域 -->
      <el-col :span="20" :offset="2" style="margin-top: 30px">
        <div>
          <!-- 数据部分 -->
          <el-table :data="tblData" style="width: 100%" border stripe>
            <el-table-column
              prop="date"
              label="操作日期"
              width="170px"
              align="center"
            >
            </el-table-column>
            <el-table-column
            width="150px"
              prop="name"
              label="操作员"
              align="center"
            >
            </el-table-column>
             <el-table-column
              prop="content"
              label="操作内容"
              header-align="center"
            >
            </el-table-column>
             <el-table-column
              prop="type"
              label="操作类型"
              width="100px"
              align="center"
            >
            </el-table-column>
            <!-- 按钮部分 -->
            <el-table-column label="操作" align="center" width="100px">
              <template v-slot="scope">
                <el-popconfirm
                confirm-button-text='确认'
                cancel-button-text='取消'
                    icon="el-icon-question"
                    @confirm="logDel(scope.row)"
                  icon-color="orange"
                  title="您确定删除该条日志记录吗？">
                <el-button type="danger" size="mini" slot="reference">清 除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="20" :offset="2">
        <el-divider></el-divider>
      </el-col>
      <el-col :span="19" :offset="2">
        <!-- 分页部分 -->
        <div class="pagination-part" :span="20" :offset="2">
          <a-pagination
            :current="selectKey.pageIndex"
            :total="total"
            show-less-items
            :page-size="selectKey.pageSize"
            @change="pageIndexListener"
            :show-total="(total) => `共 ${total} 条记录`"
          />
        </div>
      </el-col>
      <footerComponent></footerComponent>
    </el-row>
  </div>
    </el-main>
  </el-container>
  <footers/>
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
  h2{
    size: 18px large;
  }
  ul {
  list-style: none;
  display: inline;
  margin-bottom: 10px;
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
  import $ from "jquery";
  import headers from "../admin_components/Header.vue";
  import sidebars from "../admin_components/Sidebar.vue";
  import footers from "../admin_components/Footer.vue";
  export default {
    data() {
    return {
      // api接口url
      apis: {
        getLogsApi: "admin/logs/all",
        deleteLogApi: "admin/logs/delete",
      },
      // 表格行数据，之后要通过请求获取
      tblData: [],
      // 分类列表
      typeLsit: [
        {
          key: "all",
          label: "全部分类",
        },
        {
          key: "video",
          label: "视频管理",
        },
        {
          key: "comment",
          label: "评论管理",
        },
      ],
      // 下拉框选中
      selected: "name",
      // 筛选参数
      selectKey: {
        type: "all",
        pageIndex: 1,
        pageSize: 5,
        // 日期选择结果
        dateResult: [],
      },
      query: "",
      total: 0,
    };
  },
  components:{
      sidebars,
      footers,
      headers

    },
  created() {
    this.initParams();
  },

  mounted() {
    this.updateSelected();
  },
  methods: {
    initParams() {
      let date = this.$route.query.timeScope;
      this.selectKey.dateResult = date ? JSON.parse(date) : [];
      // 更新选中
      this.selectKey.type = this.$route.query.type
        ? this.$route.query.type
        : "all";
      // 更新搜索关键字
      this.query = this.$route.query.query ? this.$route.query.query : "";
      // 根据筛选条件更新数据
      let searchCondi = Object.assign(this.selectKey, { query: this.query });
      console.log(searchCondi);
      // 这里进行请求调用，更新tblData数据
      this.getLogsData(searchCondi);
    },

    /**
     * 发起请求
     */
    getLogsData(searchCondi) {
      //TODO
      console.log({
            // 参数为分类，搜索参数以及日期范围
            typeKey: searchCondi.type,
            query: searchCondi.query,
            sort:'id'
            // dateResult: (searchCondi.dateResult),
          })
      console.log(`${this.apis.getLogsApi}?pageIndex=${searchCondi.pageIndex}&pageSize=${searchCondi.pageSize}`)
      this.$http
        .post(
          `${this.apis.getLogsApi}?pageIndex=${searchCondi.pageIndex}&pageSize=${searchCondi.pageSize}`,
          {
            // 参数为分类，搜索参数以及日期范围
            typeKey: searchCondi.type,
            query: searchCondi.query,
            dateResult: (searchCondi.dateResult),
          }
        )
        .then((res) => {
          console.log(res.data)
          if (res.data.code === 200) {
            let data = res.data.data.logs;
            this.tblData = [];
            // 日志数据
            data.forEach((d) => {
              this.tblData.push({
                id: d.id,
                type: this.getTypeLabel(d.type),
                date: this.$moment(d.date).format("YYYY-MM-DD HH:mm:ss"),
                name: d.name,
                content: d.content,
              });
              // 数据总数
              this.total = res.data.data.total;
            });
          } else {
            this.$message.error("权限不足!");
          }
        });
    },

    /**
     * 根据typeKey返回类型
     */
    getTypeLabel(typeKey) {
      for (let i = 0; i < this.typeLsit.length; i++) {
        let typeItem = this.typeLsit[i];
        if (typeItem.key === typeKey) {
          return typeItem.label;
        }
      }
    },

    /**
     *  改变选择项样式
     */
    updateSelected() {
      // 样式改变
      $("li").removeClass("active");
      $("." + this.selectKey.type).addClass("active");
    },
    /**
     * 筛选条件改变
     */
    changeCondition(key) {
      this.resetFields(true, true, false);
      this.selectKey.type = key;
      this.toSearch(false);
    },

    /**
     * 发起搜索
     */
    toSearch(isFirstQuery) {
      if (isFirstQuery) {
        // 搜索参数改变时，重置一些其他参数
        this.resetFields(true, true, true);
      }
      this.$router.push({
        path: "/admin/logManager/"+this.$store.getters.getIdToken,
        query: {
          query: this.query,
          pageIndex: this.selectKey.pageIndex,
          type: this.selectKey.type,
          timeScope: JSON.stringify(this.selectKey.dateResult),
        },
      });
    },

    /**
     * 重置一些参数
     */
    resetFields(pageIndexFlag, dateResultFlag, typeFlag) {
      // 重置页码
      if (pageIndexFlag) {
        this.selectKey.pageIndex = 1;
      }
      // 重置日期范围
      if (dateResultFlag) {
        this.selectKey.dateResult = [];
      }
      // 重置分类
      if (typeFlag) {
        this.selectKey.type = "all";
      }
    },

    /**
     * 用户点击清空
     */
    handleClear() {
      this.selectKey.query = "";
      this.toSearch(true);
    },
    /**
     * 监听子组件页码改变
     */
    pageIndexListener(index) {
      this.selectKey.pageIndex = index;
      this.toSearch(false);
    },
    /**
     * 删除某个日志记录
     */
    logDel(row) {
      this.$http.delete(`${this.apis.deleteLogApi}/${row.id}`)
      .then(res => {
        if (res.data.code == 200){
          this.$message.success("操作成功")
          this.initParams();
        }else{
          this.$message.error("操作失败")
        }
      })
    },
  },

  watch: {
    // 每次路由改变，调用updateSelected方法，获取数据
    $route: function () {
      this.initParams();
      this.updateSelected();
    },
    "selectKey.dateResult": function (newVal) {
      if (newVal == null || newVal.length > 0) {
        // 日期改变，重置当前页码
        this.resetFields(true, false, false);
      }

      this.$router.push({
        path: "/log",
        query: {
          query: this.query,
          pageIndex: this.selectKey.pageIndex,
          type: this.selectKey.type,
          timeScope: JSON.stringify(newVal),
        },
      });
    },
  },
  
  };
</script>