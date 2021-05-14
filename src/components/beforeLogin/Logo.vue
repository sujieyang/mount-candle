<template>
<div>
    <div v-if="!isLogin" >
        <el-col :span="2" :offset="5">
            <el-button v-model="isLogin" type="info" plain  @click="reDirectToLogin">登录/注册</el-button>
        </el-col>
    </div>
    <div  v-if="isLogin">
        <el-col :span="1" :offset="2" >
            <el-button  type="info" icon="el-icon-user" style="margin-top:8px;font-size:140%;" plain circle  @click="changeDrawer"></el-button>
            <!-- <el-avatar  class="el-icon-user"  style="margin-top:10px;font-size:200%;"  @click="drawer = true"></el-avatar> -->
        </el-col>
        
        <el-col :span="1" :offset="0" style="margin-left:-5px;">
            <el-button  type="info" icon="el-icon-bell" style="margin-top:8px;font-size:140%;" plain circle  @click="changeDrawer"></el-button>
            
        </el-col>
        <el-col :span="1" :offset="0" >
            <el-button  type="info" plain style="margin-top:10px;" @click="logout">退出</el-button>
        </el-col>
        <el-col :span="1" :offset="0" style="margin-left:25px;" v-if="isShow">
            <el-button  type="info" plain style="margin-top:10px;" @click="redirectToBackend">后台</el-button>
        </el-col>
        
       <el-drawer 
            
            title="我是标题"
            size='400px'
            direction="rtl"
            :visible.sync="drawer"
            :with-header="false">
            <div class="allDraw">
            <div class="personalInfos">
                <el-row>
                    <el-col :span="3" :offset="10">
                    <div class="avatar">
                        <el-avatar shape="circle" :size="75" fit='fill' :src="userInfos.imgSrc"></el-avatar>
                    </div>
                    </el-col>
                </el-row>

                <el-row style="color:white;font-size:13px;"> 
                    <el-col :offset="9" style="height:30px;margin-top:10px;">
                        姓名： {{userInfos.userName}}
                    </el-col>

                </el-row>

                <el-row style="color:white;font-size:13px;"> 
                    <el-col :offset="9" style="height:30px;margin-top:10px;">
                        邮箱： {{userInfos.userEmail}}
                    </el-col>

                </el-row>
                <el-row style="color:white;font-size:13px;"> 
                    <el-col :offset="9" style="height:30px;margin-top:10px;">
                        手机： {{userInfos.userPhone}}
                    </el-col>

                </el-row>
                <el-row style="color:white;font-size:13px;"> 
                    <el-col :offset="9" style="height:30px;margin-top:10px;">
                        年龄： {{userInfos.userAddTime}}
                    </el-col>


                </el-row>
            </div>
            </div>
            <!-- 个人信息外的板块 -->

            <a-list item-layout="horizontal" :data-source="data">
                <a-list-item slot="renderItem" slot-scope="item, index">
                    <a-list-item-meta description="">
                        <a slot="title"   class="drawLine"  @click="changeInnerDraw(item.title)" >
                            <FirstIcon :key="index"  v-if="item.title=='历史记录'" :spin="true" :style="{ fontSize: '25px',color:'#1ABC9C'}" />
                        
                            <SecondIcon :key="index" v-if="item.title=='我的收藏'"  :spin="true" :style="{fontSize: '25px',color:'#1ABC9C'}" />
                            <ThirdIcon :key="index" v-if="item.title=='我的视频'"  :spin="true" :style="{fontSize: '25px',color:'#1ABC9C'}" />
                            <FourthIcon :key="index" v-if="item.title=='我的帖子'"  :spin="true" :style="{fontSize: '25px',color:'#1ABC9C'}" />
                            <FivthIcon :key="index" v-if="item.title=='我的捐赠'"  :spin="true" :style="{fontSize: '25px',color:'#1ABC9C'}" />
                            {{ item.title }}
                        </a>
                    
                    </a-list-item-meta>
                </a-list-item>
            </a-list>
            <el-divider></el-divider>
            <div style="margin-top:40px;">
                <el-row>
                <el-col :span="4" :offset="1">
                    <div class="DrawButton">
                        <el-link href="http://localhost:8080/#/personal/1/index" target="_blank">个人中心</el-link>
                    </div>
                </el-col>
                 <el-col :span="2" :offset="6"><el-divider direction="vertical"></el-divider></el-col>
                 <el-col :span="4" :offset="6">
                    <div class="DrawButton">
                        <el-link href="http://localhost:8080/#/setpwd" target="_blank">修改密码</el-link>
                    </div>
                </el-col>
                </el-row>
            </div>

            <!-- 历史记录 -->
            <el-drawer
            
            title="历史记录"
            size="300px"
            :append-to-body="true"
            
            :visible.sync="innerDrawer.innerDrawer1"
            :withHeader="false">
                <div   style="height:1100px;" class="Draw">
                    <el-row>
                        <el-col style="margin-top:10px;font-size:20px;font-weight:bold">
                            我的历史记录
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:20px;">
                        <el-tabs v-model="activeName.activeName1" @tab-click="handleClick" style="padding-left:20px;padding-right:20px;">
                            <el-tab-pane label="视频" name="first">
                                <div v-if="isHistoryVideos">
                                <el-row  class="historyLine"  v-for="(item,index) in historyLines[0]"  :key="index" >
                                    
                                    <el-col :span="8">
                                        <el-link :href="item.videoSrc" :underline="false" target="_blank">
                                        <el-image
                                            style="width: 90px; height: 61px"
                                            :src="item.videoImgSrc"
                                            fit="fill"></el-image></el-link>
                                    </el-col>
                                    
                                    <el-col :span="15" :offset="1">
                                        <el-row>
                                            <el-link :href="item.videoSrc" :underline="false" target="_blank">
                                            <el-col style="font-size:16px;font-weight:bold;height:45px;">
                                                {{item.videoTitle}}
                                            </el-col>
                                            </el-link>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="12" style="font-size:10px;color:grey">
                                                作者：{{item.videoAuthor}}
                                            </el-col>
                                            <el-col :span="12" :offset="0" style="font-size:10px;color:grey">
                                                {{item.videoTime}}
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                    
                                </el-row> 
                                </div>
                                <div v-if="!isHistoryVideos" style="height:1100px;" class="Draw">
                                <el-row>
                                    <el-col style="margin-top:10px;font-size:20px;font-weight:bold">
                                        我的历史记录
                                    </el-col>
                                </el-row>
                                    <div class="noRecord">
                                        好像最近没有看过视频呢

                                    </div>
                                </div>
                                <div style="width:300px;height:60px;"></div>  
                            </el-tab-pane>
                            <el-tab-pane label="帖子" name="second">
                                <div v-if="isHistoryTalks">
                                <el-row  class="historyLine"  v-for="(item,index) in historyLines[1]"  :key="index" >
                                    
                                    <el-col :span="8">
                                        <el-link :href="item.talkSrc" :underline="false" target="_blank">
                                        <el-image
                                            style="width: 90px; height: 61px"
                                            :src="item.talkImgSrc"
                                            fit="fill"></el-image></el-link>
                                    </el-col>
                                    
                                    <el-col :span="15" :offset="1">
                                        <el-row>
                                            <el-link :href="item.talkSrc" :underline="false" target="_blank">
                                            <el-col style="font-size:16px;font-weight:bold;height:45px;">
                                                {{item.talkTitle}}
                                            </el-col>
                                            </el-link>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="12" style="font-size:10px;color:grey">
                                                作者：{{item.talkAuthor}}
                                            </el-col>
                                            <el-col :span="12" :offset="0" style="font-size:10px;color:grey">
                                                {{item.talkTime}}
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                    
                                </el-row> 
                                </div>
                                <div v-if="!isHistoryTalks"  class="Draw">
                                <el-row>
                                    <el-col style="margin-top:10px;font-size:20px;font-weight:bold">
                                        我的历史记录
                                    </el-col>
                                </el-row>
                                    <div class="noRecord">
                                        好像最近没有看过讨论呢

                                    </div>
                                </div>
                                <div style="width:300px;height:60px;"></div> 
                            </el-tab-pane>

                        </el-tabs>
                    </el-row>
                </div>
                
            </el-drawer>
            <!-- 我的收藏 -->
            <el-drawer
            title="我的收藏"
            size="300px"
            :append-to-body="true"
            
            :visible.sync="innerDrawer.innerDrawer2"
            :withHeader="false">
                <div   style="height:1100px;" class="Draw">
                    <el-row>
                        <el-col style="margin-top:10px;font-size:20px;font-weight:bold">
                            我的视频收藏
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:20px;">
                        <el-tabs v-model="activeName.activeName1" @tab-click="handleClick" style="padding-left:20px;padding-right:20px;">
                            <el-tab-pane label="视频" name="first">
                                <div v-if="isStarVideos">
                                <el-row  class="historyLine"  v-for="(item,index) in starVideos"  :key="index" >
                                    
                                    <el-col :span="8">
                                        <el-link :href="item.videoSrc" :underline="false" target="_blank">
                                        <el-image
                                            style="width: 90px; height: 61px"
                                            :src="item.videoImgSrc"
                                            fit="fill"></el-image></el-link>
                                    </el-col>
                                    
                                    <el-col :span="15" :offset="1">
                                        <el-row>
                                            <el-link :href="item.videoSrc" :underline="false" target="_blank">
                                            <el-col style="font-size:16px;font-weight:bold;height:45px;">
                                                {{item.videoTitle}}
                                            </el-col>
                                            </el-link>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="12" style="font-size:10px;color:grey">
                                                作者：{{item.videoAuthor}}
                                            </el-col>
                                            <el-col :span="12" :offset="0" style="font-size:10px;color:grey">
                                                {{item.videoTime}}
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                    
                                </el-row> 
                                </div>
                                <div v-if="!isStarVideos"  class="Draw">
                                <el-row>
                                    <el-col style="margin-top:10px;font-size:20px;font-weight:bold">
                                        我的视频收藏
                                    </el-col>
                                </el-row>
                                    <div class="noRecord">
                                        你还没有收藏过视频哦~

                                    </div>
                                </div>
                                <div style="width:300px;height:60px;"></div>  
                            </el-tab-pane>
                        </el-tabs>
                    </el-row>
                </div>
            </el-drawer>





            <!-- 我的视频 -->
            <el-drawer
            title="我的视频"
            size="300px"
            :append-to-body="true"
            
            :visible.sync="innerDrawer.innerDrawer3"
            :withHeader="false">
                <div   style="height:1100px;" class="Draw">
                    <el-row>
                        <el-col style="margin-top:10px;font-size:20px;font-weight:bold">
                            我的视频发布
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:20px;">
                        <el-tabs v-model="activeName.activeName1" @tab-click="handleClick" style="padding-left:20px;padding-right:20px;">
                            <el-tab-pane label="视频" name="first">
                                <div v-if="isStarVideos">
                                <el-row  class="historyLine"  v-for="(item,index) in releaseVideos"  :key="index" >
                                    
                                    <el-col :span="8">
                                        <el-link :href="item.videoSrc" :underline="false" target="_blank">
                                        <el-image
                                            style="width: 90px; height: 61px"
                                            :src="item.videoImgSrc"
                                            fit="fill"></el-image></el-link>
                                    </el-col>
                                    
                                    <el-col :span="15" :offset="1">
                                        <el-row>
                                            <el-link :href="item.videoSrc" :underline="false" target="_blank">
                                            <el-col style="font-size:16px;font-weight:bold;height:45px;">
                                                {{item.videoTitle}}
                                            </el-col>
                                            </el-link>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="12" style="font-size:10px;color:grey">
                                                浏览量：{{item.videoViewNum}}
                                            </el-col>
                                            <el-col :span="12" :offset="0" style="font-size:10px;color:grey">
                                                {{item.videoTime}}
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                    
                                </el-row> 
                                </div>
                                <div v-if="!isReleaseVideos"  class="Draw">
                                <el-row>
                                    <el-col style="margin-top:10px;font-size:20px;font-weight:bold">
                                        我的视频发布
                                    </el-col>
                                </el-row>
                                    <div class="noRecord">
                                        你还没有发布过视频哦~

                                    </div>
                                </div>
                                <div style="width:300px;height:60px;"></div>  
                            </el-tab-pane>
                        </el-tabs>
                    </el-row>
                </div>
            </el-drawer>
            <!-- 我的帖子 -->
            <el-drawer
            title="我的帖子"
            size="300px"
            :append-to-body="true"
            
            :visible.sync="innerDrawer.innerDrawer4"
            :withHeader="false">
                
                <div   style="height:1100px;" class="Draw">
                    <el-row>
                        <el-col style="margin-top:10px;font-size:20px;font-weight:bold">
                            我的帖子发布
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:20px;">
                        <el-tabs v-model="activeName.activeName1" @tab-click="handleClick" style="padding-left:20px;padding-right:20px;">
                            <el-tab-pane label="帖子" name="first">
                                <div v-if="isReleaseTalks">
                                <el-row  class="historyLine"  v-for="(item,index) in releaseTalks"  :key="index" >
                                    
                                    <el-col :span="8">
                                        <el-link :href="item.talkSrc" :underline="false" target="_blank">
                                        <el-image
                                            style="width: 90px; height: 61px"
                                            :src="item.talkImgSrc"
                                            fit="fill"></el-image></el-link>
                                    </el-col>
                                    
                                    <el-col :span="15" :offset="1">
                                        <el-row>
                                            <el-link :href="item.talkSrc" :underline="false" target="_blank">
                                            <el-col style="font-size:16px;font-weight:bold;height:45px;">
                                                {{item.talkTitle}}
                                            </el-col>
                                            </el-link>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="12" style="font-size:10px;color:grey">
                                                浏览量：{{item.talkViewNum}}
                                            </el-col>
                                            <el-col :span="12" :offset="0" style="font-size:10px;color:grey">
                                                {{item.talkTime}}
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                    
                                </el-row> 
                                </div>
                                <div v-if="!isReleaseVideos"  class="Draw">
                                <el-row>
                                    <el-col style="margin-top:10px;font-size:20px;font-weight:bold">
                                        我的帖子发布
                                    </el-col>
                                </el-row>
                                    <div class="noRecord">
                                        你还没有发布过帖子哦~

                                    </div>
                                </div>
                                <div style="width:300px;height:60px;"></div>  
                            </el-tab-pane>
                        </el-tabs>
                    </el-row>
                </div>

            </el-drawer>

            <!-- 我的捐赠 -->
            <el-drawer
            title="我的捐赠"
            size="300px"
            :append-to-body="true"
            
            :visible.sync="innerDrawer.innerDrawer5"
            :withHeader="false">
                <div   style="height:1100px;" class="Draw">
                    <el-row>
                        <el-col style="margin-top:10px;font-size:20px;font-weight:bold">
                            我的捐赠活动
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:20px;">
                        <el-tabs v-model="activeName.activeName1" @tab-click="handleClick" style="padding-left:20px;padding-right:20px;">
                            <el-tab-pane label="活动" name="first">
                                <div v-if="isReleaseTalks">
                                <el-row  class="historyLine"  v-for="(item,index) in addDonate"  :key="index" >
                                    
                                    <el-col :span="8">
                                        <el-link :href="item.donateSrc" :underline="false" target="_blank">
                                        <el-image
                                            style="width: 90px; height: 61px"
                                            :src="item.donateImgSrc"
                                            fit="fill"></el-image></el-link>
                                    </el-col>
                                    
                                    <el-col :span="15" :offset="1">
                                        <el-row>
                                            <el-link :href="item.donateSrc" :underline="false" target="_blank">
                                            <el-col style="font-size:16px;font-weight:bold;height:45px;">
                                                {{item.donateTitle}}
                                            </el-col>
                                            </el-link>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="12" style="font-size:10px;color:grey">
                                                参与数：{{item.donateAllNum}}
                                            </el-col>
                                            <el-col :span="12" :offset="0" style="font-size:10px;color:grey">
                                                {{item.donateTime}}
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                    
                                </el-row> 
                                </div>
                                <div v-if="!isReleaseVideos"  class="Draw">
                                <el-row>
                                    <el-col style="margin-top:10px;font-size:20px;font-weight:bold">
                                        我的捐赠活动
                                    </el-col>
                                </el-row>
                                    <div class="noRecord">
                                        你还没有参加过活动哦~

                                    </div>
                                </div>
                                <div style="width:300px;height:60px;"></div>  
                            </el-tab-pane>
                        </el-tabs>
                    </el-row>
                </div>
                

            </el-drawer>
            
        </el-drawer>
        
    </div>
    </div>
</template>

<script>
// 历史
const FirstSvg = {
  template: `
    <svg t="1620609601482" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2962" width="32" height="32"><path d="M411.733333 885.333333H192c-6.4 0-10.666667-4.266667-10.666667-10.666666V149.333333c0-6.4 4.266667-10.666667 10.666667-10.666666h576c6.4 0 10.666667 4.266667 10.666667 10.666666v219.733334c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V149.333333c0-40.533333-34.133333-74.666667-74.666667-74.666666H192C151.466667 74.666667 117.333333 108.8 117.333333 149.333333v725.333334c0 40.533333 34.133333 74.666667 74.666667 74.666666h219.733333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z" p-id="2963"></path><path d="M704 458.666667c-134.4 0-245.333333 110.933333-245.333333 245.333333S569.6 949.333333 704 949.333333 949.333333 838.4 949.333333 704 838.4 458.666667 704 458.666667z m0 426.666666c-100.266667 0-181.333333-81.066667-181.333333-181.333333s81.066667-181.333333 181.333333-181.333333 181.333333 81.066667 181.333333 181.333333-81.066667 181.333333-181.333333 181.333333z" p-id="2964"></path><path d="M802.133333 716.8l-66.133333-29.866667V597.333333c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v110.933334c0 12.8 8.533333 23.466667 19.2 29.866666l85.333333 38.4c4.266667 2.133333 8.533333 2.133333 12.8 2.133334 12.8 0 23.466667-6.4 29.866667-19.2 6.4-17.066667 0-34.133333-17.066667-42.666667zM693.333333 298.666667c0-17.066667-14.933333-32-32-32H298.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h362.666666c17.066667 0 32-14.933333 32-32zM298.666667 437.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h106.666666c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32h-106.666666z" p-id="2965"></path></svg>`,
};
const FirstIcon = {
  template: `
    <a-icon :component="FirstSvg" />
  `,
  data() {
    return {
      FirstSvg,
    };
  },
};
// 视频收藏
const SecondSvg = {
    template:`<svg t="1620609631984" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5059" width="32" height="32"><path d="M934.4 356.266667c-8.533333-10.666667-21.333333-19.2-34.133333-21.333334l-234.666667-34.133333-104.533333-213.333333c-6.4-8.533333-14.933333-17.066667-25.6-23.466667-12.8-6.4-27.733333-6.4-40.533334-2.133333-12.8 4.266667-23.466667 14.933333-29.866666 27.733333l-104.533334 213.333333-234.666666 34.133334c-10.666667 2.133333-21.333333 6.4-29.866667 14.933333-21.333333 21.333333-19.2 55.466667 0 74.666667l170.666667 166.4-40.533334 234.666666c-2.133333 10.666667 0 23.466667 6.4 34.133334 12.8 25.6 46.933333 36.266667 72.533334 21.333333l211.2-110.933333 211.2 110.933333c8.533333 4.266667 17.066667 6.4 25.6 6.4h8.533333c14.933333-2.133333 25.6-10.666667 34.133333-21.333333 8.533333-10.666667 10.666667-25.6 8.533334-40.533334l-40.533334-234.666666 170.666667-166.4c8.533333-8.533333 14.933333-19.2 14.933333-29.866667-2.133333-14.933333-6.4-27.733333-14.933333-40.533333z m-224 194.133333c-12.8 12.8-19.2 29.866667-14.933333 46.933333l38.4 217.6L512 699.733333l-221.866667 115.2L328.533333 597.333333c2.133333-17.066667-2.133333-34.133333-14.933333-46.933333l-157.866667-153.6 219.733334-32c17.066667-2.133333 32-12.8 40.533333-29.866667L512 136.533333l98.133333 198.4c8.533333 14.933333 23.466667 27.733333 40.533334 29.866667l219.733333 32-160 153.6z" p-id="5060"></path></svg>`

};
const SecondIcon = {
    template: `
    <a-icon :component="SecondSvg" />
  `,
  data() {
    return {
      SecondSvg,
    };
  },
};
// 视频
const ThirdSvg = {
    template:`<svg t="1620610358779" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2667" width="32" height="32"><path d="M827 201H197c-50.729 0-92 41.271-92 92v350c0 50.729 41.271 92 92 92h630c50.729 0 92-41.271 92-92V293c0-50.729-41.271-92-92-92z m36 442c0 19.851-16.149 36-36 36H197c-19.851 0-36-16.149-36-36V293c0-19.851 16.149-36 36-36h630c19.851 0 36 16.149 36 36v350z" p-id="2668"></path><path d="M597.979 438.605l-137.886-79.667c-10.483-6.058-23.512-6.063-34-0.013-10.489 6.051-17.007 17.332-17.011 29.44l-0.051 159.246v0.003c-0.004 12.108 6.506 23.393 16.991 29.451a34.001 34.001 0 0 0 17.01 4.546c5.875 0 11.75-1.513 16.99-4.536l137.938-79.58c10.489-6.051 17.007-17.332 17.011-29.441 0.002-12.109-6.509-23.394-16.992-29.449z m-132.936 70.921l0.026-83.038 71.899 41.542-71.925 41.496zM889 801H129c-15.464 0-28 12.536-28 28s12.536 28 28 28h760c15.464 0 28-12.536 28-28s-12.536-28-28-28z" p-id="2669"></path></svg>`

};
const ThirdIcon = {
    template: `
    <a-icon :component="ThirdSvg" />
  `,
  data() {
    return {
      ThirdSvg,
    };
  },
};
// 帖子
const FourthSvg = {
    template:`<svg t="1620578290310" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3346" width="32" height="32"><path d="M293.168 357.349h437.665c18.668 0 33.773-15.106 33.773-33.773 0-18.668-15.106-33.773-33.773-33.773h-437.665c-18.668 0-33.772 15.106-33.772 33.773-0.001 18.668 15.105 33.773 33.772 33.773z" p-id="3347"></path><path d="M293.168 545.773h437.665c18.668 0 33.773-15.106 33.773-33.773s-15.106-33.773-33.773-33.773h-437.665c-18.668 0-33.772 15.106-33.772 33.773s15.105 33.773 33.772 33.773z" p-id="3348"></path><path d="M293.168 734.163h274.439c18.668 0 33.773-15.106 33.773-33.772 0-18.668-15.106-33.773-33.773-33.773h-274.439c-18.668 0-33.772 15.106-33.772 33.773-0.001 18.668 15.105 33.772 33.772 33.772z" p-id="3349"></path><path d="M733.9 92.837h-485.225c-18.668 0-33.772 15.106-33.772 33.772s15.106 33.773 33.772 33.773h485.225c71.537 0 129.716 58.179 129.716 129.716v443.8c0 71.537-58.179 129.716-129.716 129.716h-443.8c-71.537 0-129.716-58.179-129.716-129.716v-437.303c0-18.668-15.106-33.772-33.772-33.772s-33.773 15.106-33.773 33.773v437.303c0 108.773 88.49 197.262 197.262 197.262h443.8c108.773 0 197.262-88.49 197.262-197.262v-443.8c0-108.773-88.49-197.262-197.262-197.262z" p-id="3350"></path></svg>`

};
const FourthIcon = {
    template: `
    <a-icon :component="FourthSvg" />
  `,
  data() {
    return {
      FourthSvg,
    };
  },
};
// 捐赠
const FivthSvg = {
    template:`<svg t="1620610597069" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3825" width="32" height="32"><path d="M502.538 793.068L810.045 485.58a176.476 176.476 0 1 0-249.569-249.57l-57.938 57.918-57.917-57.917A176.476 176.476 0 0 0 195.05 485.58l307.487 307.487z m28.98 86.896a40.96 40.96 0 0 1-57.938 0L137.114 543.498C36.209 442.593 36.209 279 137.114 178.074c100.925-100.905 264.52-100.905 365.424 0 100.926-100.905 264.52-100.905 365.425 0 100.925 100.925 100.925 264.52 0 365.424L531.517 879.985z" p-id="3826"></path></svg>`

};
const FivthIcon = {
    template: `
    <a-icon :component="FivthSvg" />
  `,
  data() {
    return {
      FivthSvg,
    };
  },
};

    export default{
        
        name:'beforeLogin',
        components:{
            FirstIcon,
            SecondIcon,
            ThirdIcon,
            FourthIcon,
            FivthIcon
        },
        
        data(){
            return {
                apis:{
                    logout:'auth/logout'
                },

                // 历史记录
                isHistoryVideos:true,
                isHistoryTalks:true,
                historyLines:[
                  [
                      {
                          videoId:1,
                          videoSrc:'https://www.baidu.com/',
                          videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                          videoTitle:'这是标题',
                          videoAuthor:'cold',
                          videoTime:'2021-05-21'
                      },
                      {
                          videoId:2,
                          videoSrc:'https://www.baidu.com/',
                          videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                          videoTitle:'这是标题',
                          videoAuthor:'cold',
                          videoTime:'2021-05-21'
                      }
                      ,
                      {
                          videoId:3,
                          videoSrc:'https://www.baidu.com/',
                          videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                          videoTitle:'这是标题',
                          videoAuthor:'cold',
                          videoTime:'2021-05-21'
                      },
                      {
                          videoId:4,
                          videoSrc:'https://www.baidu.com/',
                          videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                          videoTitle:'这是标题',
                          videoAuthor:'cold',
                          videoTime:'2021-05-21'
                      },
                      {
                          videoId:5,
                          videoSrc:'https://www.baidu.com/',
                          videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                          videoTitle:'这是标题',
                          videoAuthor:'cold',
                          videoTime:'2021-05-21'
                      },
                      {
                          videoId:6,
                          videoSrc:'https://www.baidu.com/',
                          videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                          videoTitle:'这是标题',
                          videoAuthor:'cold',
                          videoTime:'2021-05-21'
                      },
                      {
                          videoId:7,
                          videoSrc:'https://www.baidu.com/',
                          videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                          videoTitle:'这是标题',
                          videoAuthor:'cold',
                          videoTime:'2021-05-21'
                      },
                      {
                          videoId:8,
                          videoSrc:'https://www.baidu.com/',
                          videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                          videoTitle:'这是标题',
                          videoAuthor:'cold',
                          videoTime:'2021-05-21'
                      },
                      {
                          videoId:9,
                          videoSrc:'https://www.baidu.com/',
                          videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                          videoTitle:'这是标题',
                          videoAuthor:'cold',
                          videoTime:'2021-05-21'
                      },
                      {
                          videoId:10,
                          videoSrc:'https://www.baidu.com/',
                          videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                          videoTitle:'这是标题',
                          videoAuthor:'cold',
                          videoTime:'2021-05-21'
                      },
                      {
                          videoId:11,
                          videoSrc:'https://www.baidu.com/',
                          videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                          videoTitle:'这是标题',
                          videoAuthor:'cold',
                          videoTime:'2021-05-21'
                      }
                      
                  ],
                  [
                      {
                          talkId:1,
                          talkSrc:'https://www.baidu.com/',
                          talkImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                          talkTitle:'这是讨论标题',
                          talkAuthor:'cold',
                          talkTime:'2021-05-21'
                      },
                      {
                          talkId:2,
                          talkSrc:'https://www.baidu.com/',
                          talkImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                          talkTitle:'这是讨论标题',
                          talkAuthor:'cold',
                          talkTime:'2021-05-21'
                      }
                      ,
                      {
                          talkId:3,
                          talkSrc:'https://www.baidu.com/',
                          talkImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                          talkTitle:'这是讨论标题',
                          talkAuthor:'cold',
                          talkTime:'2021-05-21'
                      },
                      {
                          talkId:4,
                          talkSrc:'https://www.baidu.com/',
                          talkImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                          talkTitle:'这是讨论标题',
                          talkAuthor:'cold',
                          talkTime:'2021-05-21'
                      },
                      {
                          talkId:5,
                          talkSrc:'https://www.baidu.com/',
                          talkImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                          talkTitle:'这是讨论标题',
                          talkAuthor:'cold',
                          talkTime:'2021-05-21'
                      },
                      {
                          talkId:6,
                          talkSrc:'https://www.baidu.com/',
                          talkImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                          talkTitle:'这是讨论标题',
                          talkAuthor:'cold',
                          talkTime:'2021-05-21'
                      },
                      {
                          talkId:7,
                          talkSrc:'https://www.baidu.com/',
                          talkImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                          talkTitle:'这是讨论标题',
                          talkAuthor:'cold',
                          talkTime:'2021-05-21'
                      },
                      {
                          talkId:8,
                          talkSrc:'https://www.baidu.com/',
                          talkImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                          talkTitle:'这是讨论标题',
                          talkAuthor:'cold',
                          talkTime:'2021-05-21'
                      },
                      {
                          talkId:9,
                          talkSrc:'https://www.baidu.com/',
                          talkImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                          talkTitle:'这是讨论标题',
                          talkAuthor:'cold',
                          talkTime:'2021-05-21'
                      },
                      {
                          talkId:10,
                          talkSrc:'https://www.baidu.com/',
                          talkImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                          talkTitle:'这是讨论标题',
                          talkAuthor:'cold',
                          talkTime:'2021-05-21'
                      },
                      {
                          talkId:11,
                          talkSrc:'https://www.baidu.com/',
                          talkImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                          talkTitle:'这是讨论标题',
                          talkAuthor:'cold',
                          talkTime:'2021-05-21'
                      }
                      
                  ],
                ],
                // 收藏视频
                isStarVideos:true,
                starVideos:[
                    {
                        videoId:1,
                        videoSrc:'https://www.baidu.com/',
                        videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        videoTitle:'这是收藏标题',
                        videoAuthor:'cold',
                        videoTime:'2021-05-21'
                    },
                    {
                        videoId:2,
                        videoSrc:'https://www.baidu.com/',
                        videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        videoTitle:'这是标题',
                        videoAuthor:'cold',
                        videoTime:'2021-05-21'
                    },
                    {
                        videoId:3,
                        videoSrc:'https://www.baidu.com/',
                        videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        videoTitle:'这是标题',
                        videoAuthor:'cold',
                        videoTime:'2021-05-21'
                    },
                    {
                        videoId:4,
                        videoSrc:'https://www.baidu.com/',
                        videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        videoTitle:'这是标题',
                        videoAuthor:'cold',
                        videoTime:'2021-05-21'
                    },
                    {
                        videoId:5,
                        videoSrc:'https://www.baidu.com/',
                        videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        videoTitle:'这是标题',
                        videoAuthor:'cold',
                        videoTime:'2021-05-21'
                    },
                    {
                        videoId:6,
                        videoSrc:'https://www.baidu.com/',
                        videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        videoTitle:'这是标题',
                        videoAuthor:'cold',
                        videoTime:'2021-05-21'
                    },
                    {
                        videoId:7,
                        videoSrc:'https://www.baidu.com/',
                        videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        videoTitle:'这是标题',
                        videoAuthor:'cold',
                        videoTime:'2021-05-21'
                    },
                    {
                        videoId:8,
                        videoSrc:'https://www.baidu.com/',
                        videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        videoTitle:'这是标题',
                        videoAuthor:'cold',
                        videoTime:'2021-05-21'
                    },
                    {
                        videoId:9,
                        videoSrc:'https://www.baidu.com/',
                        videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        videoTitle:'这是标题',
                        videoAuthor:'cold',
                        videoTime:'2021-05-21'
                    },
                    {
                        videoId:10,
                        videoSrc:'https://www.baidu.com/',
                        videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        videoTitle:'这是标题',
                        videoAuthor:'cold',
                        videoTime:'2021-05-21'
                    },
                    {
                        videoId:11,
                        videoSrc:'https://www.baidu.com/',
                        videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        videoTitle:'这是标题',
                        videoAuthor:'cold',
                        videoTime:'2021-05-21'
                    },
                ],

                // 我的视频
                isReleaseVideos:true,
                releaseVideos:[
                    {
                        videoId:1,
                        videoSrc:'https://www.baidu.com/',
                        videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        videoTitle:'这是标题',
                        videoViewNum:10,
                        videoTime:'2021-05-21'
                    },
                    {
                        videoId:2,
                        videoSrc:'https://www.baidu.com/',
                        videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        videoTitle:'这是标题',
                        videoViewNum:10,
                        videoTime:'2021-05-21'
                    },
                    {
                        videoId:3,
                        videoSrc:'https://www.baidu.com/',
                        videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        videoTitle:'这是标题',
                        videoViewNum:10,
                        videoTime:'2021-05-21'
                    },
                    {
                        videoId:4,
                        videoSrc:'https://www.baidu.com/',
                        videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        videoTitle:'这是标题',
                        videoViewNum:10,
                        videoTime:'2021-05-21'
                    },
                    {
                        videoId:5,
                        videoSrc:'https://www.baidu.com/',
                        videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        videoTitle:'这是标题',
                        videoViewNum:10,
                        videoTime:'2021-05-21'
                    },
                    {
                        videoId:6,
                        videoSrc:'https://www.baidu.com/',
                        videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        videoTitle:'这是标题',
                        videoViewNum:10,
                        videoTime:'2021-05-21'
                    },
                    {
                        videoId:7,
                        videoSrc:'https://www.baidu.com/',
                        videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        videoTitle:'这是标题',
                        videoViewNum:10,
                        videoTime:'2021-05-21'
                    },
                    {
                        videoId:8,
                        videoSrc:'https://www.baidu.com/',
                        videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        videoTitle:'这是标题',
                        videoViewNum:10,
                        videoTime:'2021-05-21'
                    },
                    {
                        videoId:9,
                        videoSrc:'https://www.baidu.com/',
                        videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        videoTitle:'这是标题',
                        videoViewNum:10,
                        videoTime:'2021-05-21'
                    },
                    {
                        videoId:10,
                        videoSrc:'https://www.baidu.com/',
                        videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        videoTitle:'这是标题',
                        videoViewNum:10,
                        videoTime:'2021-05-21'
                    },
                    {
                        videoId:11,
                        videoSrc:'https://www.baidu.com/',
                        videoImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        videoTitle:'这是标题',
                        videoViewNum:10,
                        videoTime:'2021-05-21'
                    },
                ],
                // 我的帖子
                isReleaseTalks:true,
                releaseTalks:[
                    {
                        talkId:1,
                        talkSrc:'https://www.baidu.com/',
                        talkImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        talkTitle:'这是个人讨论标题',
                        talkViewNum:10,
                        talkTime:'2021-05-21'
                    },
                    {
                        talkId:2,
                        talkSrc:'https://www.baidu.com/',
                        talkImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        talkTitle:'这是个人讨论标题',
                        talkViewNum:10,
                        talkTime:'2021-05-21'
                    },
                    {
                        talkId:3,
                        talkSrc:'https://www.baidu.com/',
                        talkImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        talkTitle:'这是个人讨论标题',
                        talkViewNum:10,
                        talkTime:'2021-05-21'
                    },
                    {
                        talkId:4,
                        talkSrc:'https://www.baidu.com/',
                        talkImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        talkTitle:'这是个人讨论标题',
                        talkViewNum:10,
                        talkTime:'2021-05-21'
                    },
                    {
                        talkId:5,
                        talkSrc:'https://www.baidu.com/',
                        talkImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        talkTitle:'这是个人讨论标题',
                        talkViewNum:10,
                        talkTime:'2021-05-21'
                    },
                    {
                        talkId:6,
                        talkSrc:'https://www.baidu.com/',
                        talkImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        talkTitle:'这是个人讨论标题',
                        talkViewNum:10,
                        talkTime:'2021-05-21'
                    },
                    {
                        talkId:7,
                        talkSrc:'https://www.baidu.com/',
                        talkImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        talkTitle:'这是个人讨论标题',
                        talkViewNum:10,
                        talkTime:'2021-05-21'
                    },
                    {
                        talkId:8,
                        talkSrc:'https://www.baidu.com/',
                        talkImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        talkTitle:'这是个人讨论标题',
                        talkViewNum:10,
                        talkTime:'2021-05-21'
                    },
                    {
                        talkId:9,
                        talkSrc:'https://www.baidu.com/',
                        talkImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        talkTitle:'这是个人讨论标题',
                        talkViewNum:10,
                        talkTime:'2021-05-21'
                    },
                    {
                        talkId:10,
                        talkSrc:'https://www.baidu.com/',
                        talkImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        talkTitle:'这是个人讨论标题',
                        talkViewNum:10,
                        talkTime:'2021-05-21'
                    },
                    {
                        talkId:11,
                        talkSrc:'https://www.baidu.com/',
                        talkImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        talkTitle:'这是个人讨论标题',
                        talkViewNum:10,
                        talkTime:'2021-05-21'
                    },

                ],
                // 我的捐赠
                isAddDonate:true,
                addDonate:[
                    {
                        donateId:1,
                        donateSrc:'https://www.baidu.com/',
                        donateImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        donateTitle:'这是个人讨论标题',
                        donateTime:'2021-05-21',
                        donateAllNum:15,
                    },
                    {
                        donateId:2,
                        donateSrc:'https://www.baidu.com/',
                        donateImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        donateTitle:'这是个人讨论标题',
                        donateTime:'2021-05-21',
                        donateAllNum:15,
                    },
                    {
                        donateId:3,
                        donateSrc:'https://www.baidu.com/',
                        donateImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        donateTitle:'这是个人讨论标题',
                        donateTime:'2021-05-21',
                        donateAllNum:15,
                    },
                    {
                        donateId:4,
                        donateSrc:'https://www.baidu.com/',
                        donateImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        donateTitle:'这是个人讨论标题',
                        donateTime:'2021-05-21',
                        donateAllNum:15,
                    },
                    {
                        donateId:5,
                        donateSrc:'https://www.baidu.com/',
                        donateImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        donateTitle:'这是个人讨论标题',
                        donateTime:'2021-05-21',
                        donateAllNum:15,
                    },
                    {
                        donateId:6,
                        donateSrc:'https://www.baidu.com/',
                        donateImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        donateTitle:'这是个人讨论标题',
                        donateTime:'2021-05-21',
                        donateAllNum:15,
                    },
                    {
                        donateId:7,
                        donateSrc:'https://www.baidu.com/',
                        donateImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        donateTitle:'这是个人讨论标题',
                        donateTime:'2021-05-21',
                        donateAllNum:15,
                    },
                    {
                        donateId:8,
                        donateSrc:'https://www.baidu.com/',
                        donateImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        donateTitle:'这是个人讨论标题',
                        donateTime:'2021-05-21',
                        donateAllNum:15,
                    },
                    {
                        donateId:9,
                        donateSrc:'https://www.baidu.com/',
                        donateImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        donateTitle:'这是个人讨论标题',
                        donateTime:'2021-05-21',
                        donateAllNum:15,
                    },
                    {
                        donateId:10,
                        donateSrc:'https://www.baidu.com/',
                        donateImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        donateTitle:'这是个人讨论标题',
                        donateTime:'2021-05-21',
                        donateAllNum:15,
                    },
                    {
                        donateId:11,
                        donateSrc:'https://www.baidu.com/',
                        donateImgSrc:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        donateTitle:'这是个人讨论标题',
                        donateTime:'2021-05-21',
                        donateAllNum:15,
                    },

                ],


                activeName:{
                    activeName1:"first",
                },

                data:[
                {
                    title: '历史记录',
                    img:'compass',
                },
                {
                    title: '我的收藏',
                    img:'compass',
                },
                {
                    title: '我的视频',
                    img:'compass',
                },
                {
                    title: '我的帖子',
                    img:'compass',
                },
                {
                    title: '我的捐赠',
                    img:'compass',
                },
                
                ],
                isShow:false,
                isLogin:false,
                drawer:false,
                innerDrawer:{
                    innerDrawer1:false,
                    innerDrawer2:false,
                    innerDrawer3:false,
                    innerDrawer4:false,
                    innerDrawer5:false,

                },
                userInfos:{
                    userId:"5",
                    userAddTime:"1个月",
                    userName:'Cold君',
                    userEmail:'1005309071@qq.com',
                    userPhone:'13067113871',
                    userInfo:'我是潘某的爹爹。',
                    imgSrc:'http://47.96.231.121/avatars/timg.jpg'
          
                },
            }
        },
        created(){
            if(localStorage.getItem("state")!=null ||localStorage.getItem("state")!=undefined){
                let state=JSON.parse(localStorage.getItem("state"))
                this.isShow=state.isShow;
                this.isLogin=state.isLogin;
            }
            else{
                this.isShow=this.$store.getters.getIsShow;
                this.isLogin=this.$store.getters.getIsLogin;
            }
            
        },
        inject:['reload'],
        methods:{
            reDirect(){
                this.$message({
                    showClose:true,
                    message:'测试跳转',
                    type:'success'
                })
            },
            reDirectToLogin(){
                this.$router.push("/login")
            },
            redirectToBackend(){
                this.$router.push("/admin/logManager/"+this.$store.getters.getIdToken)
            },
            logout(){
                this.$http.delete(this.apis.logout).then((res)=>{

                    if(res.data.code=="200"){
                        console.log(res.data)
                        
                        this.$store.commit("deleteUserInfos")
                        this.$message.success("登出成功")
                        localStorage.removeItem("idToken");
                        localStorage.removeItem("state");
                        sessionStorage.removeItem("store");
                        this.reload()
                        
                    }else{
                        this.$message.error("登出失败");
                    }
                })
                
                
            },
            changeDrawer(){
                this.drawer = true;
                console.log(this.drawer+"sss")
            },
            changeInnerDraw(title){
                if(title=="历史记录"){
                    this.innerDrawer.innerDrawer1=true;
                }
                else if(title=="我的收藏"){
                    this.innerDrawer.innerDrawer2=true;
                }
                else if(title=="我的视频"){
                    this.innerDrawer.innerDrawer3=true;
                }
                else if(title=="我的帖子"){
                    this.innerDrawer.innerDrawer4=true;
                }
                else if(title=="我的捐赠"){
                    this.innerDrawer.innerDrawer5=true;
                }
            },
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }

    }
</script>

<style scoped>
    /* 个人信息框 */
    .personalInfos{
        height:300px;
        background-image: url("../../assets/Draw1.png");
        /* background-color: black; */
    }
     /* 头像 */
  .avatar{
    width:75px;
    height:75px;
    margin-top: 20px;

  }
  /* 个人信息具体 */
  .detailInfo{
      width:200px;
      height:30px;
  }
  /* 抽屉列表条 */
  .drawLine{
      display: block;
      height:30px;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
  }
  /* 历史记录条 */
  .historyLine{
      display: block;
      height:80px;
      

  }
  .Draw{
        margin:auto;
        padding: 0%;
        overflow-y:auto;
        overflow-x:auto;
        min-width:200px; 
        max-height:800px;
  }
  /* 修改密码和个人种习惯 */
  .DrawButton{
      width:60px;
      height:50px;
      
      text-align: center;
      font-size: 25px;
      font-weight: bold;

      border-radius: 0px;
  }
  .noRecord{
      text-align: center;
      margin-top: 80%;

  }
  .allDraw{
      background-image: url('../../assets/Draw4.png');
  }


</style>