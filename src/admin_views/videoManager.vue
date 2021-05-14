<template>
    <el-container style="height: auto; border: 1px solid #eee">
  <el-container>
    <el-header >
      <headers/>
      
    </el-header>  
    
  
  <el-container>
      <sidebars/>
    
    <el-main>
      <!--标签页-->
      <el-tabs type="border-card">
        <el-tab-pane label="视频管理">
            <!--搜索框-->
          <el-row class="find">
                <el-col :span="8" class="grid">
                    <el-input v-model="input" placeholder="请输入内容" size="medium" width="200"></el-input>
                </el-col>
                <el-col :span="1" class="grid">
                    <el-button type="primary" size="medium">
                      <i class="el-icon-search" style="margin-right: 5px" ></i>搜
                    索</el-button>
                </el-col>
            </el-row>

            <br>
            

            <!--筛选项-->
            <el-col :offset="2">
              <div>
                <span style="float: left; margin-top: 5px">视频类型：</span>
                <ul style="list-style: none">
                  <li
                    v-for="(type, index) in videoTypes"
                    :key="index"
                    :class="type.key"
                    class="op-type-li">
                    {{ type.label }}
                  </li>
                </ul>
              </div>
            </el-col>
            <!--表格数据及操作-->
            <el-table :data="tableData" border style="width: 100%" stripe ref="multipleTable" tooltip-effect="dark" :default-sort="{prop: 'upload_time', order: 'descending'}">
        
                <!--索引-->
                <el-table-column type="index" :index="indexMethod" width="40">
                </el-table-column>
                <el-table-column prop="id" label="id"  sortable width="80">
                </el-table-column>
                <el-table-column prop="upload_time" label="发布时间"  width="190">
                </el-table-column>
                <el-table-column prop="title" label="标题" width="250">
                </el-table-column>
                <!-- <el-table-column prop="info" label="资料" width="180">
                </el-table-column> -->
                <el-table-column prop="upload_user_id" label="发布者id" width="140">
                </el-table-column>
                
                <el-table-column prop="url" label="url" width="200">
                </el-table-column>
                
                <el-table-column  prop="course_status" label="审核" width="210">
                  <template>
                    <el-radio-group v-model="radio">
                      <el-radio :label="1">通过</el-radio>
                      <el-radio :label="2">不通过</el-radio>
                    </el-radio-group>
                  </template>

                </el-table-column>

                <el-table-column label="操作" width="90">
                    <template>
                        <el-button type="danger" icon="el-icon-close" size="mini" @click.prevent="cellclick"></el-button>
                    </template>
                    
                </el-table-column>
            </el-table>
            <br>
           

            <!--分页条-->
            <el-pagination background layout="prev, pager, next" :total="total">
            </el-pagination>
            </el-tab-pane>
        
      </el-tabs>
      
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
  .el-main {
    text-align: center;
  }
  .find{
    margin-left: 300px;
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
  import headers from "../admin_components/Header.vue";
  import sidebars from "../admin_components/Sidebar.vue";
  import footers from "../admin_components/Footer.vue";
  export default {
    data() {
      return {
        radio:'1',
        //表格数据
        tableData: [{
            id:'001',
            title:'pzy教你怎么养母猪',
            info:'暂无',
            upload_user_id:'123',
            upload_time:'2008-8-8',
            url:'pornhub.com',
            played_num:'6666',
            course_status:'',
            liked_num:'6666',
            face_url:'face.pornhub.com',
            type:'学习'
        }, {
            id:'100',
            title:'pzy教你怎么养母猪',
            info:'暂无',
            upload_user_id:'123',
            upload_time:'1970-1-1',
            url:'pornhub.com',
            played_num:'6666',
            course_status:'',
            liked_num:'6666',
            face_url:'face.pornhub.com',
            type:'学习'
        }, {
            id:'123',
            title:'pzy教你怎么养母猪',
            info:'暂无',
            upload_user_id:'123',
            upload_time:'2021-5-12',
            url:'pornhub.com',
            played_num:'6666',
            course_status:'',
            liked_num:'6666',
            face_url:'face.pornhub.com',
            type:'学习'
        }, {
            id:'133',
            title:'pzy教你怎么养母猪',
            info:'暂无',
            upload_user_id:'123',
            upload_time:'2021-5-11',
            url:'pornhub.com',
            played_num:'6666',
            course_status:'',
            liked_num:'6666',
            face_url:'face.pornhub.com',
            type:'学习'
        }],
        


        //查询输入框数据
        input: '',
        //分页总数
        total:100,
        //导航条默认选项
        activeIndex: '1',
        activeIndex2: '1',
        videoTypes: [{
          value: 'type0',
          label: '全部'
        },{
          value: 'type1',
          label: '小学'
        }, {
          value: 'type2',
          label: '中学'
        },{
          value: 'type2',
          label: '启蒙'
        },],
        //角色默认值
        value:'',

        formLabelWidth: '80px'
      }
    },
    components:{
      sidebars,
      footers,
      headers

    },
    methods:{
      //将表单数据添加到用户信息数组中
      addUser(){
        this.tableData.push(this.form)
      },
      cellclick(row){
        this.tableData.splice(row,1)
      },
      handleClear() {
      this.selectKey.query = "";
      this.toSearch(true);
      },
      formatter(row) {
        return row.title;
      }
    }
    
  };
  
</script>