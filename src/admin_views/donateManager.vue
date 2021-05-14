<template>
    <el-container style="height: auto; border: 1px solid #eee">
  <el-container>
    <el-header >
      <headers/>
      
    </el-header>  
    
  
  <el-container>
      <sidebars/>
    
    <el-main>
      <!-- logo -->
          <el-col :span="4" >
            <h1 style="margin-left: 30px">
              <i class="el-icon-s-management" style="margin-right: 10px"></i
              >捐赠管理
            </h1>
          </el-col>
          <!--搜索框-->
          <el-row class="find">
                <el-col :span="8" class="grid">
                    <el-input v-model="selectKey.query" placeholder="请输入内容" size="medium" width="200"></el-input>
                </el-col>
                <el-col :span="1" class="searchButton">
                    <el-button @click="findActivity" type="primary" size="medium">
                      <i class="el-icon-search" style="margin-right: 5px" ></i>搜
                    索</el-button>
                </el-col>
            </el-row>
            <br>
            <!--筛选项-->
            <el-col :offset="2">
              <div>
                <span style="float: left; margin-top: 5px">活动类型：</span>
                <ul style="list-style: none">
                  <li
                    v-for="(type, index) in donateTypes"
                    :key="index"
                    :class="type.key"
                    class="op-type-li">
                    {{ type.label }}
                  </li>
                </ul>
              </div>
            </el-col>
            <!--时间筛选-->
            <!--<el-col :offset="2" class="timeForm">
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
            </el-col>-->
            <!--捐赠列表-->
            <el-table :data="donationTable" border style="width: 100%" stripe ref="multipleTable" tooltip-effect="dark">
                <el-table-column label="活动编号" width="150">
                  <template #default="scope">
                  <span style="margin-left: 10px">{{ scope.row.id }}</span>
                  </template>
                </el-table-column>
                <el-table-column  label="活动名称" width="210">
                  <template #default="scope">
                  <span style="margin-left: 10px">{{ scope.row.dname }}</span>
                  </template>
                </el-table-column>
                <el-table-column   label="开始时间" width="210">
                  <template #default="scope">
                  <span style="margin-left: 10px">{{ scope.row.start_time }}</span>
                  </template>
                </el-table-column>
                <el-table-column  label="结束时间" width="210">
                  <template #default="scope">
                  <span style="margin-left: 10px">{{ scope.row.end_time }}</span>
                  </template>
                </el-table-column>
                <el-table-column  label="捐赠类型" width="120">
                  <template #default="scope">
                  <span style="margin-left: 10px">{{ scope.row.donate_type }}</span>
                  </template>
                    
                </el-table-column>
                <el-table-column label="操作" width="120">
                    <template #default="scope">
                        <el-button type="success" icon="el-icon-info" size="mini" @click="activityRecommend(scope.row)" >详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <br>
            <el-col :span="19" :offset="2">
              <!-- 分页部分 -->
              <div class="pagination-part" :span="20" :offset="2">
                <a-pagination
                  :current="pageIndex"
                  :total="total"
                  show-less-items
                  :page-size="pageSize"
                  @change="pageIndexListener"
                  :show-total="(total) => `共 ${total} 条记录`"
                />
              </div>
            </el-col>
            <!--活动详情对话框-->
            <el-dialog title="活动详情" :visible.sync="commentDialog" width="30%">
                <el-form :model="form">
                  <el-form-item label="活动编号:" :label-width="formLabelWidth">{{form.id}} 
                  </el-form-item>
                  <el-form-item label="活动名称:" :label-width="formLabelWidth">{{form.dname}} 
                  </el-form-item>
                  <el-form-item label="发起人:" :label-width="formLabelWidth">{{form.from_user}} 
                  </el-form-item>
                  <el-form-item label="捐赠总数:" :label-width="formLabelWidth">{{form.donate_total}} 
                  </el-form-item>
                  <el-form-item label="参与人数:" :label-width="formLabelWidth">{{form.participantsNumber}} 
                  </el-form-item>
                  <el-form-item label="开始时间:" :label-width="formLabelWidth">{{form.start_time}} 
                  </el-form-item>
                  <el-form-item label="结束时间:" :label-width="formLabelWidth">{{form.end_time}} 
                  </el-form-item>
                  <el-form-item label="捐赠地:" :label-width="formLabelWidth">{{form.location}} 
                  </el-form-item>
                  <el-form-item label="捐赠类型:" :label-width="formLabelWidth">{{form.donate_type}} 
                  </el-form-item>
                  <el-form-item label="活动介绍:" :label-width="formLabelWidth">{{form.content}} 
                  </el-form-item>
                </el-form>
            </el-dialog>

            <!--新增按钮-->
            <el-col :span="1" class="grid">
                <el-button type="success" @click="addActivity" icon="el-icon-circle-plus-outline" size="mini" round>新增</el-button>
            </el-col>
            <el-col :span="1"></el-col>
            <br>
            
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
  .el-main{
    text-align: center;
  }
   .op-type-li:hover,
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
 
  ul {
    list-style: none;
    display: inline;
    margin-bottom: 10px;
  }
  .el-table{
    margin-top: 120px;
    margin-left: 115px;
    text-align: center;
  }
  .timeForm{
    margin-left: -325px;
  }
  .grid{
    margin-left: 115px;
  }
</style>

<script>
  import headers from "../admin_components/Header.vue";
  import sidebars from "../admin_components/Sidebar.vue";
  import footers from "../admin_components/Footer.vue";
  export default {
    data() {
      return {
        userId:1,
        //捐赠活动列表
        donationTable:[],
        //对话框
        commentDialog:false,
        //活动类型
        donateTypes:[{
          value:'type1',
          label:'类型1'},
          {
          value:'type2',
          label:'类型2'},
          ],
        //筛选条件
        total:100,
        pageIndex:1,
        pageSize:5,
        selectKey: {
          //dateResult: [],
          query:'',
          typeKey: 'all',   
          sort: 'id',
        // 日期选择结果
        
      },
        //详情展示
        form: {},
        
        formLabelWidth: '80px',
        //添加活动表单
        addActivityForm:{
          activityId:0,
          activityName:'',
          startTime:'',
          endTime:'',
          address:'',
          userID:'',
          donateTotal:0,
          participantsNumber:0,
          activityType:'',
          activityLogo:'',
          recommend:'',
        },
        //api
        apis:{
          getdonate:'admin/donate/all'

        }
      }
    },
    created(){
      this.getdonates()

    },
    methods:{
      //初始化数据
      getdonates(){
        this.$http.post(`${this.apis.getdonate}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`,
        {
          //dateResult:this.selectKey.dateResult,
          query:this.selectKey.query,
          sort:this.selectKey.sort,
          typeKey:this.selectKey.typeKey,
        }).then((res)=>
        {
          if(res.data.code==200){
            this.total=res.data.data.total;
            this.donationTable=res.data.data.data;
            console.log(this.tableData);
          }
          else{
            console.log('失败');
            this.$message.error("活动获取失败");
          }
        })

      },
      //搜索框搜索
      findActivity(){
        this.getdonates();
      },
      //查看活动详情
      activityRecommend(row){
        this.commentDialog=true;
        this.form=row;
        //console.log(row);
      },
      pageIndexListener(index){
        this.pageIndex=index;
        this.getdonates();

      },
      addActivity(){
        this.$router.push('/admin/addActivity/'+this.userId);
      }
    },
    components:{
      sidebars,
      footers,
      headers
    }
  };
</script>