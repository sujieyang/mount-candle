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
        <el-tab-pane label="用户管理">
          <!-- logo -->
          <el-col :span="4" >
            <h1 style="margin-left: 30px">
              <i class="el-icon-s-management" style="margin-right: 10px"></i
              >用户管理
            </h1>
          </el-col>
          <!--搜索框-->
          <el-row class="find">
                <el-col :span="8" class="grid">
                  <!--绑定搜索条件的query-->
                    <el-input v-model="selectKey.query" placeholder="请输入内容" size="medium" width="200"></el-input>
                </el-col>
                <el-col :span="1" class="grid">
                  <!--搜索-->
                    <el-button @click="getUsers" type="primary" size="medium">
                      <i class="el-icon-search" style="margin-right: 5px" ></i>搜
                    索</el-button>
                </el-col>
            </el-row>
            <br>
            <!--筛选项-->
            <el-col :offset="2">
              <div>
                <span style="float: left; margin-top: 5px">用户角色：</span>
                <ul style="list-style: none">
                  <li
                    v-for="(type, index) in roleOptions"
                    :key="index"
                    :class="type.key"
                    class="op-type-li">
                    {{ type.label }}
                  </li>
                </ul>
              </div>
            </el-col>
            <!--表格数据及操作-->
            <el-table :data="tableData" border style="width: 100%" stripe ref="multipleTable" tooltip-effect="dark">
                <!--勾选框-->
                <el-table-column type="selection" width="55">
                </el-table-column>
                <!--索引-->
                <el-table-column prop="username" label="用户名" width="150">
                </el-table-column>
                <el-table-column prop="password" label="密码" width="210">
                </el-table-column>
                <el-table-column prop="email" label="邮箱" width="210">
                </el-table-column>
                <el-table-column prop="mobile" label="电话" width="210">
                </el-table-column>
                <!--修改用户角色-->
                <el-table-column prop="role[0]" label="角色" width="180">
                  <template slot-scope="scope">
                      <el-select
                          v-model="scope.row.role"
                          :disabled="setrole"
                          placeholder="请选择类型">
                          <el-option
                              v-for="item in roleOptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                          </el-option>
                      </el-select>
                  </template>

                    
                </el-table-column>
                <el-table-column label="操作" width="100">
                    <!--<template>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click.prevent="userDelete"></el-button>
                    </template>-->
                    <!--修改用户角色-->
                    <template>
                        <el-button type="success" icon="el-icon-setting" size="mini" @click.prevent="setRole"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <br>
            <!--新增按钮-->
            <el-col :span="1" class="grid">
                <el-button type="success" @click="addUser" icon="el-icon-circle-plus-outline" size="mini" round>新增</el-button>
            </el-col>
            <el-col :span="1"></el-col>
            <br>
            
            <!--志愿评审对话框-->

            <!--分页条-->
            <el-col :span="19" :offset="2">
              <!-- 分页部分 -->
              <div class="pagination-part" :span="20" :offset="2">
                <a-pagination
                  :current="pageIndex"
                  :total="total"
                  show-less-items
                  :page-size="pageSize"
                  @change="handleCurrentChange"
                  :show-total="(total) => `共 ${total} 条记录`"
                />
              </div>
            </el-col>
            </el-tab-pane>
        <!--志愿管理-->
        <el-tab-pane label="志愿审核">
          <!-- logo -->
          <el-col :span="4" >
            <h1 style="margin-left: 30px">
              <i class="el-icon-s-management" style="margin-right: 10px"></i>志愿管理
            </h1>
          </el-col>
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
            <el-table :data="volunteerData" border style="width: 100%" stripe ref="multipleTable" tooltip-effect="dark">
                <!--勾选框-->
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="userId" label="用户ID" width="150">
                </el-table-column>
                <!--通过和不通过按钮-->   

                <el-table-column label="操作" width="120">
                  <!--通过成为志愿者-->
                    <template>
                        <el-button type="success" icon="el-icon-check" size="mini" @click.prevent=""></el-button>
                    </template>
                    <!--不通过-->
                    <template>
                        <el-button type="danger" icon="el-icon-close" size="mini" @click.prevent=""></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <br>     
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
  ul {
    list-style: none;
    display: inline;
    margin-bottom: 10px;
  }
  .el-table{
    margin-top: 50px;
  }

</style>

<script>
  import headers from "../admin_components/Header.vue";
  import sidebars from "../admin_components/Sidebar.vue";
  import footers from "../admin_components/Footer.vue";
  export default {
    data() {
      return {
        //表格数据
        tableData: [ ],
        //选项
        roleOptions: [{
          value: 'USER',
          label: '管理员'
        }, {
          value: 'ADMIN',
          label: '普通用户'
        },],
        //筛选参数
        selectKey:{
          query:'',
          sort:'id',
          typeKey:'all'
        },
        //志愿者信息
        volunteerData: [{
            userId: '221801',
        }, {
            userId: '221802',
        },],


        //查询输入框数据
        input: '',
        //分页总数
        total:100,
        //导航条默认选项
        activeIndex: '1',
        activeIndex2: '1',
        //添加用户表单
        addUserForm: false,
        form: {
          nikename: '',
          password: '',
          email: '',
          mobile: '',
          role:'',
        },
        formLabelWidth: '100px',
        //测试用id
        userId:1,
        //api接口
        apis:{
          getUser:'admin/user/all',
          modifyUser:'admin/user/',
          addUser:'admin/user/add',
          auditUser:'admin/user/',
        },
        pageIndex:1,
        pageSize:5,
        //设置按钮
        setrole:true,
        //表单规则
        

      }
    },
    
    components:{
      sidebars,
      footers,
      headers

    },

    created(){
      this.getUsers()

    },

    methods:{
      //获取用户数据
      getUsers(){
        this.$http.post(`${this.apis.getUser}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`,
        {
          query:this.selectKey.query,
          sort:this.selectKey.sort,
          typeKey:this.selectKey.typeKey,
        }
        ).then((res)=>{
          console.log(this.selectKey.query);
          if(res.data.code==200){
            
            this.tableData=res.data.data;
            this.total=res.data.data.length;
            console.log(res.data.data);
          }
          else{
            this.$message.error("用户获取失败");
          }
        })

      },
      //将表单数据添加到用户信息数组中
      addUser(){
        this.form=this.$router.push('/admin/addUser/'+this.userId);
        this.tableData.push(this.form);
      },
      //删除用户并跳出提示框
      /*userDelete(row){
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //加入接口删除用户
          this.tableData.splice(row,1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
      },*/
      //分页处理
      handleCurrentChange(newpage){
        this.pageIndex=newpage;
        this.getUsers();
      },
      //设置角色
      setRole(){
        this.setrole=!this.setrole;
      },
      
    }
  };
</script>