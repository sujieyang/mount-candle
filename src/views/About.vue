<template>
    <div class="box">
        <el-backtop></el-backtop>
        <el-container style="height: auto; border: 1px solid #eee">
            <el-container>
                <el-header style="font-size: 12px">
                    <headers/>
                </el-header>
                <el-container>
                    <sidebars/>
                    <el-main>
                        <!-- 视频推荐以及走马灯 -->
                        <div class="carousel">
                            <el-row>
                                <el-col :span="23" :offset="1">
                                    <el-col :span="10">
                                        <div class="block">
                                            <el-carousel height="240px">
                                                <el-carousel-item v-for="item in Imgs" :key="item.index">
                                                    <img :src='item.Src' style="width:400px;height: 300px;"/>
                                                </el-carousel-item>
                                            </el-carousel>
                                        </div>
                                    </el-col>
                                    <el-col :span="14">
                                        <el-row>
                                            <el-col :span="6" :offset="0">
                                                <img src="../assets/carousel2.png" class="Video"/>
                                            </el-col>
                                            <el-col :span="5" :offset="2">
                                                <img src="../assets/carousel3.png" class="Video"/>
                                            </el-col>
                                            <el-col :span="5" :offset="3">
                                                <img src="../assets/carousel4.png" class="Video"/>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="6" :offset="0">
                                                <img src="../assets/carousel4.png" class="Video"/>
                                            </el-col>
                                            <el-col :span="5" :offset="2">
                                                <img src="../assets/carousel3.png" class="Video"/>
                                            </el-col>
                                            <el-col :span="5" :offset="3">
                                                <img src="../assets/carousel2.png" class="Video"/>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-col>
                            </el-row>
                        </div>
                        <el-divider/>
                        <el-row>
                            <el-col :span="15">
                                <!-- 启蒙类视频区 -->
                                <div class="topicVideo">
                                    <el-col :span="2" :offset="1">
                                        <a-icon type="bank"
                                                style="fontSize:40px;color:#1296db;margin-top:5px;color:rgb(26, 188, 156);"/>
                                    </el-col>
                                    <el-col :span="2">
                                        <h1 style="fontSize:25px;margin-top:8px;font-weight:bold;color:rgb(26, 188, 156);">
                                            启蒙</h1>
                                    </el-col>
                                    <el-col :span="2" :offset="16">
                                        <el-button type="primary" size="small" round plain
                                                   style="width:60px;margin-top:10px;">更多》
                                        </el-button>
                                    </el-col>
                                    <!-- 循环 -->
                                    <el-row v-for="(item,index) in allVideos.videoMiniSchool" :v-if="allVideos.videoMiniSchool[0].length!=0" :key="index">
                                        <el-col :span="24" :offset="0">
                                            <el-col :span="7" :offset="0">
                                                <div class="tVideo" style="margin-top:10px;margin-left:15px">
                                                    <el-col :span="24">
                                                        <el-link :href="item[0].href" :underline="false" target="_blank">
                                                            <el-image :src="item[0].imgSrc" class="imageVideo">
                                                                <div slot="placeholder" class="image-slot">
                                                                    加载中<span class="dot">...</span>
                                                                </div>
                                                            </el-image>
                                                        </el-link>
                                                    </el-col>
                                                    <el-col :span="24">
                                                        <el-link :href="item[0].href" :underline="false" target="_blank">
                                                            <p style="font-weight:bold;margin-left:10px;margin-right:10px;">
                                                                {{item[0].title}}</p>
                                                        </el-link>
                                                    </el-col>
                                                    <el-col :span="24">
                                                        <el-col :span="12">
                                                            <el-col :span="2" :offset="1">
                                                                <i class="el-icon-view"/>
                                                            </el-col>
                                                            <el-col :span="20" :offset="1">
                                                                <p style="font-weight:bold;margin-left:10px;margin-right:10px;">
                                                                    {{item[0].playNum}}次浏览</p>
                                                            </el-col>
                                                        </el-col>
                                                        <el-col :span="12">
                                                            <el-col :span="2" :offset="1">
                                                                <i class="el-icon-time"/>
                                                            </el-col>
                                                            <el-col :span="20" :offset="1">
                                                                <p style="font-weight:bold;margin-left:10px;margin-right:10px;">
                                                                    {{item[0].create_time}}</p>
                                                            </el-col>
                                                        </el-col>
                                                    </el-col>
                                                </div>
                                            </el-col>
                                            <el-col :span="7" :offset="0">
                                                <div class="tVideo" style="margin-top:10px;margin-left:40px;">
                                                    <el-col :span="24">
                                                        <el-link :href="item[1].href" :underline="false" target="_blank">
                                                            <el-image :src="item[1].imgSrc" class="imageVideo">
                                                                <div slot="placeholder" class="image-slot">
                                                                    加载中<span class="dot">...</span>
                                                                </div>
                                                            </el-image>
                                                        </el-link>
                                                    </el-col>
                                                    <el-col :span="24">
                                                        <el-link :href="item[1].href" :underline="false" target="_blank">
                                                            <p style="font-weight:bold;margin-left:10px;margin-right:10px;">
                                                                {{item[1].title}}</p>
                                                        </el-link>
                                                    </el-col>
                                                    <el-col :span="24">
                                                        <el-col :span="12">
                                                            <el-col :span="2" :offset="1">
                                                                <i class="el-icon-view"/>
                                                            </el-col>
                                                            <el-col :span="20" :offset="1">
                                                                <p style="font-weight:bold;margin-left:10px;margin-right:10px;">
                                                                    {{item[1].playNum}}次浏览</p>
                                                            </el-col>
                                                        </el-col>
                                                        <el-col :span="12">
                                                            <el-col :span="2" :offset="1">
                                                                <i class="el-icon-time"/>
                                                            </el-col>
                                                            <el-col :span="20" :offset="1">
                                                                <p style="font-weight:bold;margin-left:10px;margin-right:10px;">
                                                                    {{item[1].create_time}}</p>
                                                            </el-col>
                                                        </el-col>
                                                    </el-col>
                                                </div>
                                            </el-col>
                                            <el-col :span="7" :offset="1">
                                                <div class="tVideo" style="margin-top:10px;margin-left:32px;">
                                                    <el-col :span="24">
                                                        <el-link :href="item[2].href" :underline="false" target="_blank">
                                                            <el-image :src="item[2].imgSrc" class="imageVideo">
                                                                <div slot="placeholder" class="image-slot">
                                                                    加载中<span class="dot">...</span>
                                                                </div>
                                                            </el-image>
                                                        </el-link>
                                                    </el-col>
                                                    <el-col :span="24">
                                                        <el-link :href="item[2].href" :underline="false" target="_blank">
                                                            <p style="font-weight:bold;margin-left:10px;margin-right:10px;">
                                                                {{item[2].title}}</p>
                                                        </el-link>
                                                    </el-col>
                                                    <el-col :span="24">
                                                        <el-col :span="12">
                                                            <el-col :span="2" :offset="1">
                                                                <i class="el-icon-view"/>
                                                            </el-col>
                                                            <el-col :span="20" :offset="1">
                                                                <p style="font-weight:bold;margin-left:10px;margin-right:10px;">
                                                                    {{item[2].playNum}}次浏览</p>
                                                            </el-col>
                                                        </el-col>
                                                        <el-col :span="12">
                                                            <el-col :span="2" :offset="1">
                                                                <i class="el-icon-time"/>
                                                            </el-col>
                                                            <el-col :span="20" :offset="1">
                                                                <p style="font-weight:bold;margin-left:10px;margin-right:10px;">
                                                                    {{item[2].create_time}}</p>
                                                            </el-col>
                                                        </el-col>
                                                    </el-col>
                                                </div>
                                            </el-col>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                            <!-- 排行榜 -->
                            <el-col :span=7 :offset="0">
                                <div class="rankVideo">
                                    <el-row>
                                        <el-col :span="5" :offset="1">
                                            <a-icon type="rocket"
                                                    style="fontSize:40px;color:rgb(26, 188, 156);margin-top:5px;margin-left:0px;"/>
                                        </el-col>
                                        <el-col :span="10" :offset="3">
                                            <h1 style="fontSize:25px;margin-top:8px;font-weight:bold;color:rgb(26, 188, 156);">
                                                排行榜</h1>
                                        </el-col>
                                    </el-row>
                                    <div v-for="item in allRanks.rankMiniSchool" :key="item.index"  :v-if="allRanks.rankMiniSchool.length!=0" >
                                        <el-row v-if="item.index<=3">
                                            <el-col :span="2">
                                                <div class="rankDetails" style="background-color:#00a1d6;">
                                                    {{item.index}}
                                                </div>
                                            </el-col>
                                            <el-col :span="15" :offset="2">
                                                <el-popover
                                                        placement="left-end"
                                                        title=""
                                                        width="400"
                                                        trigger="hover"
                                                        transition="el-zoom-in-center"
                                                >
                                                    <el-row>
                                                        <el-col :span="10">
                                                            <el-image
                                                                    style="width: 80px; height: 80px"
                                                                    :src="item.img"
                                                                    fit="fill">
                                                            </el-image>
                                                        </el-col>
                                                        <el-col :span="14">
                                                            <el-col :span="24">
                                                                <h2 style="font-weight:bold;font-size:16px">
                                                                    {{item.title}}</h2>
                                                            </el-col>
                                                            <el-col :span="12">
                                                                <h3 style="color: #999;font-size:13px;margin-top:30px;">
                                                                    作者:{{item.auth}}</h3>
                                                            </el-col>
                                                            <el-col :span="12">
                                                                <h3 style="color: #999;font-size:13px;margin-top:30px;">
                                                                    日期:{{item.create_time}}</h3>
                                                            </el-col>
                                                        </el-col>
                                                    </el-row>
                                                    <el-divider></el-divider>
                                                    <el-row>
                                                        <el-col :span="4" :offset="0">
                                                            <i class="el-icon-view"><span style="margin-left:10px;">{{item.viewNum}}</span></i>
                                                        </el-col>
                                                        <el-col :span=4 :offset="2">
                                                            <i class="el-icon-tickets"><span style="margin-left:10px;">{{item.commentNum}}</span></i>
                                                        </el-col>
                                                        <el-col :span=4 :offset="2">
                                                            <i class="el-icon-star-off"><span style="margin-left:10px;">{{item.starNum}}</span></i>
                                                        </el-col>
                                                        <el-col :span="6" :offset="2">
                                                            <i class="el-icon-share"><span
                                                                    style="cursor:pointer;margin-left:10px;"
                                                                    @click="copyUrl(item.vid)">复制链接</span></i>
                                                        </el-col>
                                                    </el-row>
                                                    <el-link slot="reference" :href="item.href" :underline="false"
                                                             target="_blank"
                                                             style="cursor:pointer;margin-top:15px;margin-left:10px">
                                                        {{item.title}}
                                                    </el-link>
                                                </el-popover>
                                            </el-col>
                                        </el-row>
                                        <el-row v-else-if="item.index>3">
                                            <el-col :span="2">
                                                <div class="rankDetails" style="color:#7F7F7F">
                                                    {{item.index}}
                                                </div>
                                            </el-col>
                                            <el-col :span="15" :offset="2">
                                                <el-popover
                                                        placement="left-end"
                                                        title=""
                                                        width="400"
                                                        trigger="hover"
                                                        transition="el-zoom-in-center"
                                                >
                                                    <el-row>
                                                        <el-col :span="10">
                                                            <el-image
                                                                    style="width: 80px; height: 80px"
                                                                    :src="item.img"
                                                                    fit="fill">
                                                            </el-image>
                                                        </el-col>
                                                        <el-col :span="14">
                                                            <el-col :span="24">
                                                                <h2 style="font-weight:bold;font-size:16px">
                                                                    {{item.title}}</h2>
                                                            </el-col>
                                                            <el-col :span="12">
                                                                <h3 style="color: #999;font-size:13px;margin-top:30px;">
                                                                    作者:{{item.auth}}</h3>
                                                            </el-col>
                                                            <el-col :span="12">
                                                                <h3 style="color: #999;font-size:13px;margin-top:30px;">
                                                                    日期:{{item.create_time}}</h3>
                                                            </el-col>
                                                        </el-col>
                                                    </el-row>
                                                    <el-divider></el-divider>
                                                    <el-row>
                                                        <el-col :span="4" :offset="0">
                                                            <i class="el-icon-view"><span style="margin-left:10px;">{{item.viewNum}}</span></i>
                                                        </el-col>
                                                        <el-col :span=4 :offset="2">
                                                            <i class="el-icon-tickets"><span style="margin-left:10px;">{{item.commentNum}}</span></i>
                                                        </el-col>
                                                        <el-col :span=4 :offset="2">
                                                            <i class="el-icon-star-off"><span style="margin-left:10px;">{{item.starNum}}</span></i>

                                                        </el-col>
                                                        <el-col :span="6" :offset="2">
                                                            <i class="el-icon-share"><span
                                                                    style="cursor:pointer;margin-left:10px;"
                                                                    @click="copyUrl(item.vid)">复制链接</span></i>
                                                        </el-col>
                                                    </el-row>
                                                    <el-link slot="reference" :underline="false" :href="item.href"
                                                             target="_blank"
                                                             style="cursor:pointer;margin-top:15px;margin-left:10px">
                                                        {{item.title}}
                                                    </el-link>
                                                </el-popover>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                        <el-divider/>
                        <el-row>
                            <el-col :span="15">
                                <!-- 小学类视频区 -->
                                <div class="topicVideo">
                                    <el-col :span="2" :offset="1">
                                        <a-icon type="bank"
                                                style="fontSize:40px;color:#1296db;margin-top:5px;color:rgb(26, 188, 156);"/>
                                    </el-col>
                                    <el-col :span="2">
                                        <h1 style="fontSize:25px;margin-top:8px;font-weight:bold;color:rgb(26, 188, 156);">
                                            小学</h1>
                                    </el-col>
                                    <el-col :span="2" :offset="16">
                                        <el-button type="primary" size="small" round plain
                                                   style="width:60px;margin-top:10px;color:rgb(26, 188, 156);">更多
                                        </el-button>
                                    </el-col>
                                    <el-row v-for="(item,index) in allVideos.videoSmallSchool"  :v-if="allVideos.videoSmallSchool[0].length!=0"  :key="index">
                                        <el-col :span="24" :offset="0">
                                            <el-col :span="7" :offset="0">
                                                <div class="tVideo" style="margin-top:10px;margin-left:15px;">
                                                    <el-col :span="24">
                                                        <el-link :href="item[0].href" :underline="false" target="_blank">
                                                            <el-image :src="item[0].imgSrc" class="imageVideo">
                                                                <div slot="placeholder" class="image-slot">
                                                                    加载中<span class="dot">...</span>
                                                                </div>
                                                            </el-image>
                                                        </el-link>
                                                    </el-col>
                                                    <el-col :span="24">
                                                        <el-link :href="item[0].href" :underline="false" target="_blank">
                                                            <p style="font-weight:bold;margin-left:10px;margin-right:10px;">
                                                                {{item[0].title}}</p>
                                                        </el-link>
                                                    </el-col>
                                                    <el-col :span="24">
                                                        <el-col :span="12">
                                                            <el-col :span="2" :offset="1">
                                                                <i class="el-icon-view"/>
                                                            </el-col>
                                                            <el-col :span="20" :offset="1">
                                                                <p style="font-weight:bold;margin-left:10px;margin-right:10px;">
                                                                    {{item[0].playNum}}次浏览</p>
                                                            </el-col>
                                                        </el-col>
                                                        <el-col :span="12">
                                                            <el-col :span="2" :offset="1">
                                                                <i class="el-icon-time"/>
                                                            </el-col>
                                                            <el-col :span="20" :offset="1">
                                                                <p style="font-weight:bold;margin-left:10px;margin-right:10px;">
                                                                    {{item[0].create_time}}</p>
                                                            </el-col>
                                                        </el-col>
                                                    </el-col>
                                                </div>
                                            </el-col>
                                            <el-col :span="7" :offset="0">
                                                <div class="tVideo" style="margin-top:10px;margin-left:40px;">
                                                    <el-col :span="24">
                                                        <el-link :href="item[1].href" :underline="false" target="_blank">
                                                            <el-image :src="item[1].imgSrc" class="imageVideo">
                                                                <div slot="placeholder" class="image-slot">
                                                                    加载中<span class="dot">...</span>
                                                                </div>
                                                            </el-image>
                                                        </el-link>
                                                    </el-col>
                                                    <el-col :span="24">
                                                        <el-link :href="item[1].href" :underline="false" target="_blank">
                                                            <p style="font-weight:bold;margin-left:10px;margin-right:10px;">
                                                                {{item[1].title}}</p>
                                                        </el-link>
                                                    </el-col>
                                                    <el-col :span="24">
                                                        <el-col :span="12">
                                                            <el-col :span="2" :offset="1">
                                                                <i class="el-icon-view"/>
                                                            </el-col>
                                                            <el-col :span="20" :offset="1">
                                                                <p style="font-weight:bold;margin-left:10px;margin-right:10px;">
                                                                    {{item[1].playNum}}次浏览</p>
                                                            </el-col>
                                                        </el-col>
                                                        <el-col :span="12">
                                                            <el-col :span="2" :offset="1">
                                                                <i class="el-icon-time"/>
                                                            </el-col>
                                                            <el-col :span="20" :offset="1">
                                                                <p style="font-weight:bold;margin-left:10px;margin-right:10px;">
                                                                    {{item[1].create_time}}</p>
                                                            </el-col>
                                                        </el-col>
                                                    </el-col>
                                                </div>
                                            </el-col>
                                            <el-col :span="7" :offset="1">
                                                <div class="tVideo" style="margin-top:10px;margin-left:32px;">
                                                    <el-col :span="24">
                                                        <el-link :href="item[2].href" :underline="false" target="_blank">
                                                            <el-image :src="item[2].imgSrc" class="imageVideo">
                                                                <div slot="placeholder" class="image-slot">
                                                                    加载中<span class="dot">...</span>
                                                                </div>
                                                            </el-image>
                                                        </el-link>
                                                    </el-col>
                                                    <el-col :span="24">
                                                        <el-link :href="item[2].href" :underline="false" target="_blank">
                                                            <p style="font-weight:bold;margin-left:10px;margin-right:10px;">
                                                                {{item[2].title}}</p>
                                                        </el-link>
                                                    </el-col>
                                                    <el-col :span="24">
                                                        <el-col :span="12">
                                                            <el-col :span="2" :offset="1">
                                                                <i class="el-icon-view"/>
                                                            </el-col>
                                                            <el-col :span="20" :offset="1">
                                                                <p style="font-weight:bold;margin-left:10px;margin-right:10px;">
                                                                    {{item[2].playNum}}次浏览</p>
                                                            </el-col>
                                                        </el-col>
                                                        <el-col :span="12">
                                                            <el-col :span="2" :offset="1">
                                                                <i class="el-icon-time"/>
                                                            </el-col>
                                                            <el-col :span="20" :offset="1">
                                                                <p style="font-weight:bold;margin-left:10px;margin-right:10px;">
                                                                    {{item[2].create_time}}</p>
                                                            </el-col>
                                                        </el-col>
                                                    </el-col>
                                                </div>
                                            </el-col>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                            <el-col :span=7 :offset="0">
                                <div class="rankVideo">
                                    <el-row>
                                        <el-col :span="5" :offset="1">
                                            <a-icon type="rocket"
                                                    style="fontSize:40px;color:#1296db;margin-top:5px;margin-left:0px;color:rgb(26, 188, 156);"/>
                                        </el-col>
                                        <el-col :span="10" :offset="3">
                                            <h1 style="fontSize:25px;margin-top:8px;font-weight:bold;color:rgb(26, 188, 156);">
                                                排行榜</h1>
                                        </el-col>
                                    </el-row>
                                    <div v-for="item in allRanks.rankMiniSchool" :key="item.index"  :v-if="allRanks.rankSmallSchool.length!=0" >
                                        <el-row v-if="item.index<=3">
                                            <el-col :span="2">
                                                <div class="rankDetails" style="background-color:#00a1d6;">
                                                    {{item.index}}
                                                </div>
                                            </el-col>
                                            <el-col :span="15" :offset="2">
                                                <el-popover

                                                        placement="left-end"
                                                        title=""
                                                        width="400"
                                                        trigger="hover"
                                                        transition="el-zoom-in-center"
                                                >
                                                    <el-row>
                                                        <el-col :span="10">
                                                            <el-image
                                                                    style="width: 80px; height: 80px"
                                                                    :src="item.img"
                                                                    fit="fill">
                                                            </el-image>
                                                        </el-col>
                                                        <el-col :span="14">
                                                            <el-col :span="24">
                                                                <h2 style="font-weight:bold;font-size:16px">
                                                                    {{item.title}}</h2>
                                                            </el-col>
                                                            <el-col :span="12">
                                                                <h3 style="color: #999;font-size:13px;margin-top:30px;">
                                                                    作者:{{item.auth}}</h3>
                                                            </el-col>
                                                            <el-col :span="12">
                                                                <h3 style="color: #999;font-size:13px;margin-top:30px;">
                                                                    日期:{{item.create_time}}</h3>
                                                            </el-col>
                                                        </el-col>
                                                    </el-row>
                                                    <el-divider></el-divider>
                                                    <el-row>
                                                        <el-col :span="4" :offset="0">
                                                            <i class="el-icon-view"><span style="margin-left:10px;">{{item.viewNum}}</span></i>
                                                        </el-col>
                                                        <el-col :span=4 :offset="2">
                                                            <i class="el-icon-tickets"><span style="margin-left:10px;">{{item.commentNum}}</span></i>
                                                        </el-col>
                                                        <el-col :span=4 :offset="2">
                                                            <i class="el-icon-star-off"><span style="margin-left:10px;">{{item.starNum}}</span></i>

                                                        </el-col>
                                                        <el-col :span="6" :offset="2">
                                                            <i class="el-icon-share"><span
                                                                    style="cursor:pointer;margin-left:10px;"
                                                                    @click="copyUrl(item.vid)">复制链接</span></i>
                                                        </el-col>
                                                    </el-row>
                                                    <el-link slot="reference" :underline="false" :href="item.href"
                                                             target="_blank"
                                                             style="cursor:pointer;margin-top:15px;margin-left:10px">
                                                        {{item.title}}
                                                    </el-link>
                                                </el-popover>
                                            </el-col>
                                        </el-row>
                                        <el-row v-else-if="item.index>3">
                                            <el-col :span="2">
                                                <div class="rankDetails" style="color:#7F7F7F">
                                                    {{item.index}}
                                                </div>
                                            </el-col>
                                            <el-col :span="15" :offset="2">
                                                <el-popover
                                                        placement="left-end"
                                                        title=""
                                                        width="400"
                                                        trigger="hover"
                                                        transition="el-zoom-in-center"
                                                >
                                                    <el-row>
                                                        <el-col :span="10">
                                                            <el-image
                                                                    style="width: 80px; height: 80px"
                                                                    :src="item.img"
                                                                    fit="fill">
                                                            </el-image>
                                                        </el-col>
                                                        <el-col :span="14">
                                                            <el-col :span="24">
                                                                <h2 style="font-weight:bold;font-size:16px">
                                                                    {{item.title}}</h2>
                                                            </el-col>
                                                            <el-col :span="12">
                                                                <h3 style="color: #999;font-size:13px;margin-top:30px;">
                                                                    作者:{{item.auth}}</h3>
                                                            </el-col>
                                                            <el-col :span="12">
                                                                <h3 style="color: #999;font-size:13px;margin-top:30px;">
                                                                    日期:{{item.create_time}}</h3>
                                                            </el-col>
                                                        </el-col>
                                                    </el-row>
                                                    <el-divider></el-divider>
                                                    <el-row>
                                                        <el-col :span="4" :offset="0">
                                                            <i class="el-icon-view"><span style="margin-left:10px;">{{item.viewNum}}</span></i>
                                                        </el-col>
                                                        <el-col :span=4 :offset="2">
                                                            <i class="el-icon-tickets"><span style="margin-left:10px;">{{item.commentNum}}</span></i>
                                                        </el-col>
                                                        <el-col :span=4 :offset="2">
                                                            <i class="el-icon-star-off"><span style="margin-left:10px;">{{item.starNum}}</span></i>
                                                        </el-col>
                                                        <el-col :span="6" :offset="2">
                                                            <i class="el-icon-share"><span
                                                                    style="cursor:pointer;margin-left:10px;"
                                                                    @click="copyUrl(item.vid)">复制链接</span></i>
                                                        </el-col>
                                                    </el-row>

                                                    <el-link slot="reference" :underline="false" :href="item.href"
                                                             target="_blank"
                                                             style="cursor:pointer;margin-top:15px;margin-left:10px">
                                                        {{item.title}}
                                                    </el-link>
                                                </el-popover>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                        <el-divider/>
                        <el-row>
                            <el-col :span="15">
                                <!-- 初中类视频区 -->
                                <div class="topicVideo">
                                    <el-col :span="2" :offset="1">
                                        <a-icon type="bank"
                                                style="fontSize:40px;color:#1296db;margin-top:5px;color:rgb(26, 188, 156);"/>
                                    </el-col>
                                    <el-col :span="2">
                                        <h1 style="fontSize:25px;margin-top:8px;font-weight:bold;color:rgb(26, 188, 156);">
                                            初中</h1>
                                    </el-col>
                                    <el-col :span="2" :offset="16">
                                        <el-button type="primary" size="small" round plain
                                                   style="width:60px;margin-top:10px;color:rgb(26, 188, 156);">更多
                                        </el-button>
                                    </el-col>
                                    <el-row v-for="(item,index) in allVideos.videoMidSchool" :key="index"  :v-if="allVideos.videoMidSchool[0].length!=0" >
                                        <el-col :span="24" :offset="0">
                                            <el-col :span="7" :offset="0">
                                                <div class="tVideo" style="margin-top:10px;margin-left:15px;">
                                                    <el-col :span="24">
                                                        <el-link :href="item[0].href" :underline="false" target="_blank">
                                                            <el-image :src="item[0].imgSrc" class="imageVideo">
                                                                <div slot="placeholder" class="image-slot">
                                                                    加载中<span class="dot">...</span>
                                                                </div>
                                                            </el-image>
                                                        </el-link>
                                                    </el-col>
                                                    <el-col :span="24">
                                                        <el-link :href="item[0].href" :underline="false" target="_blank">
                                                            <p style="font-weight:bold;margin-left:10px;margin-right:10px;">
                                                                {{item[0].title}}</p>
                                                        </el-link>
                                                    </el-col>
                                                    <el-col :span="24">
                                                        <el-col :span="12">
                                                            <el-col :span="2" :offset="1">
                                                                <i class="el-icon-view"/>
                                                            </el-col>
                                                            <el-col :span="20" :offset="1">
                                                                <p style="font-weight:bold;margin-left:10px;margin-right:10px;">
                                                                    {{item[0].playNum}}次浏览</p>
                                                            </el-col>
                                                        </el-col>
                                                        <el-col :span="12">
                                                            <el-col :span="2" :offset="1">
                                                                <i class="el-icon-time"/>
                                                            </el-col>
                                                            <el-col :span="20" :offset="1">
                                                                <p style="font-weight:bold;margin-left:10px;margin-right:10px;">
                                                                    {{item[0].create_time}}</p>
                                                            </el-col>
                                                        </el-col>
                                                    </el-col>
                                                </div>
                                            </el-col>
                                            <el-col :span="7" :offset="0">
                                                <div class="tVideo" style="margin-top:10px;margin-left:40px;">
                                                    <el-col :span="24">
                                                        <el-link :href="item[1].href" :underline="false" target="_blank">
                                                            <el-image :src="item[1].imgSrc" class="imageVideo">
                                                                <div slot="placeholder" class="image-slot">
                                                                    加载中<span class="dot">...</span>
                                                                </div>
                                                            </el-image>
                                                        </el-link>
                                                    </el-col>
                                                    <el-col :span="24">
                                                        <el-link :href="item[1].href" :underline="false" target="_blank">
                                                            <p style="font-weight:bold;margin-left:10px;margin-right:10px;">
                                                                {{item[1].title}}</p>
                                                        </el-link>
                                                    </el-col>
                                                    <el-col :span="24">
                                                        <el-col :span="12">
                                                            <el-col :span="2" :offset="1">
                                                                <i class="el-icon-view"/>
                                                            </el-col>
                                                            <el-col :span="20" :offset="1">
                                                                <p style="font-weight:bold;margin-left:10px;margin-right:10px;">
                                                                    {{item[1].playNum}}次浏览</p>
                                                            </el-col>
                                                        </el-col>
                                                        <el-col :span="12">
                                                            <el-col :span="2" :offset="1">
                                                                <i class="el-icon-time"/>
                                                            </el-col>
                                                            <el-col :span="20" :offset="1">
                                                                <p style="font-weight:bold;margin-left:10px;margin-right:10px;">
                                                                    {{item[1].create_time}}</p>
                                                            </el-col>
                                                        </el-col>
                                                    </el-col>
                                                </div>
                                            </el-col>
                                            <el-col :span="7" :offset="1">
                                                <div class="tVideo" style="margin-top:10px;margin-left:32px;">
                                                    <el-col :span="24">
                                                        <el-link :href="item[2].href" :underline="false" target="_blank">
                                                            <el-image :src="item[2].imgSrc" class="imageVideo">
                                                                <div slot="placeholder" class="image-slot">
                                                                    加载中<span class="dot">...</span>
                                                                </div>
                                                            </el-image>
                                                        </el-link>
                                                    </el-col>
                                                    <el-col :span="24">
                                                        <el-link :href="item[2].href" :underline="false" target="_blank">
                                                            <p style="font-weight:bold;margin-left:10px;margin-right:10px;">
                                                                {{item[2].title}}</p>
                                                        </el-link>
                                                    </el-col>
                                                    <el-col :span="24">
                                                        <el-col :span="10">
                                                            <el-col :span="2" :offset="1">
                                                                <i class="el-icon-view"/>
                                                            </el-col>
                                                            <el-col :span="20" :offset="1">
                                                                <p style="font-weight:bold;margin-left:10px;margin-right:10px;">
                                                                    {{item[2].playNum}}次浏览</p>
                                                            </el-col>
                                                        </el-col>
                                                        <el-col :span="14">
                                                            <el-col :span="2" :offset="1">
                                                                <i class="el-icon-time"/>
                                                            </el-col>
                                                            <el-col :span="20" :offset="1">
                                                                <p style="font-weight:bold;margin-left:10px;margin-right:10px;">
                                                                    {{item[2].create_time}}</p>
                                                            </el-col>

                                                        </el-col>
                                                    </el-col>
                                                </div>
                                            </el-col>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                            <el-col :span=7 :offset="0">
                                <div class="rankVideo">
                                    <el-row>
                                        <el-col :span="5" :offset="1">
                                            <a-icon type="rocket"
                                                    style="fontSize:40px;color:#1296db;margin-top:5px;margin-left:0px;color:rgb(26, 188, 156);"/>
                                        </el-col>
                                        <el-col :span="10" :offset="3">
                                            <h1 style="fontSize:25px;margin-top:8px;font-weight:bold;color:rgb(26, 188, 156);">
                                                排行榜</h1>
                                        </el-col>
                                    </el-row>
                                    <div v-for="item in allRanks.rankMidSchool" :key="item.index" :v-if="allRanks.rankMidSchool.length!=0" >
                                        <el-row v-if="item.index<=3">
                                            <el-col :span="2">
                                                <div class="rankDetails" style="background-color:#00a1d6;">
                                                    {{item.index}}
                                                </div>
                                            </el-col>
                                            <el-col :span="15" :offset="2">
                                                <el-popover
                                                        placement="left-end"
                                                        title=""
                                                        width="400"
                                                        trigger="hover"
                                                        transition="el-zoom-in-center"
                                                >
                                                    <el-row>
                                                        <el-col :span="10">
                                                            <el-image
                                                                    style="width: 80px; height: 80px"
                                                                    :src="item.img"
                                                                    fit="fill">
                                                            </el-image>
                                                        </el-col>
                                                        <el-col :span="14">
                                                            <el-col :span="24">
                                                                <h2 style="font-weight:bold;font-size:16px">
                                                                    {{item.title}}</h2>
                                                            </el-col>
                                                            <el-col :span="12">
                                                                <h3 style="color: #999;font-size:13px;margin-top:30px;">
                                                                    作者:{{item.auth}}</h3>
                                                            </el-col>
                                                            <el-col :span="12">
                                                                <h3 style="color: #999;font-size:13px;margin-top:30px;">
                                                                    日期:{{item.create_time}}</h3>
                                                            </el-col>
                                                        </el-col>
                                                    </el-row>
                                                    <el-divider></el-divider>
                                                    <el-row>
                                                        <el-col :span="4" :offset="0">
                                                            <i class="el-icon-view"><span style="margin-left:10px;">{{item.viewNum}}</span></i>
                                                        </el-col>
                                                        <el-col :span=4 :offset="2">
                                                            <i class="el-icon-tickets"><span style="margin-left:10px;">{{item.commentNum}}</span></i>
                                                        </el-col>
                                                        <el-col :span=4 :offset="2">
                                                            <i class="el-icon-star-off"><span style="margin-left:10px;">{{item.starNum}}</span></i>
                                                        </el-col>
                                                        <el-col :span="6" :offset="2">
                                                            <i class="el-icon-share"><span
                                                                    style="cursor:pointer;margin-left:10px;"
                                                                    @click="copyUrl(item.vid)">复制链接</span></i>
                                                        </el-col>
                                                    </el-row>
                                                    <el-link slot="reference" :underline="false" :href="item.href"
                                                             target="_blank"
                                                             style="cursor:pointer;margin-top:15px;margin-left:10px">
                                                        {{item.title}}
                                                    </el-link>
                                                </el-popover>
                                            </el-col>
                                        </el-row>
                                        <el-row v-else-if="item.index>3">
                                            <el-col :span="2">
                                                <div class="rankDetails" style="color:#7F7F7F">
                                                    {{item.index}}
                                                </div>
                                            </el-col>
                                            <el-col :span="15" :offset="2">
                                                <el-popover
                                                        placement="left-end"
                                                        title=""
                                                        width="400"
                                                        trigger="hover"
                                                        transition="el-zoom-in-center"
                                                >
                                                    <el-row>
                                                        <el-col :span="10">
                                                            <el-image
                                                                    style="width: 80px; height: 80px"
                                                                    :src="item.img"
                                                                    fit="fill">
                                                            </el-image>
                                                        </el-col>
                                                        <el-col :span="14">
                                                            <el-col :span="24">
                                                                <h2 style="font-weight:bold;font-size:16px">
                                                                    {{item.title}}</h2>
                                                            </el-col>
                                                            <el-col :span="12">
                                                                <h3 style="color: #999;font-size:13px;margin-top:30px;">
                                                                    作者:{{item.auth}}</h3>
                                                            </el-col>
                                                            <el-col :span="12">
                                                                <h3 style="color: #999;font-size:13px;margin-top:30px;">
                                                                    日期:{{item.create_time}}</h3>
                                                            </el-col>
                                                        </el-col>
                                                    </el-row>
                                                    <el-divider></el-divider>
                                                    <el-row>
                                                        <el-col :span="4" :offset="0">
                                                            <i class="el-icon-view"><span style="margin-left:10px;">{{item.viewNum}}</span></i>
                                                        </el-col>
                                                        <el-col :span=4 :offset="2">
                                                            <i class="el-icon-tickets"><span style="margin-left:10px;">{{item.commentNum}}</span></i>
                                                        </el-col>
                                                        <el-col :span=4 :offset="2">
                                                            <i class="el-icon-star-off"><span style="margin-left:10px;">{{item.starNum}}</span></i>
                                                        </el-col>
                                                        <el-col :span="6" :offset="2">
                                                            <i class="el-icon-share"><span
                                                                    style="cursor:pointer;margin-left:10px;"
                                                                    @click="copyUrl(item.vid)">复制链接</span></i>
                                                        </el-col>
                                                    </el-row>

                                                    <el-link slot="reference" :underline="false" :href="item.href"
                                                             target="_blank"
                                                             style="cursor:pointer;margin-top:15px;margin-left:10px">
                                                        {{item.title}}
                                                    </el-link>
                                                </el-popover>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </el-main>
                </el-container>
                <footers/>
            </el-container>
        </el-container>
    </div>
</template>



<style scoped>
  .box{
    width:auto;
    height: auto;
    
  }
  /* #推荐框 */
  .carousel{
    width: 1150px;
    height: 300px;
    background-color: #f1f4f886;
    margin-left:50px;
  }
  /* 推荐视频 */
  .Video{
    width:200px;
    height:140px;
    margin-top: 10px;
    margin-right:20px;
  }
  /* 走马灯大小 */
  .block{
    width:400px;
    height: 300px;
    margin-top: 30px;
    margin-left:10px;
  }
  /* 主题视频容器 */
  .topicVideo{
    width:800px;
    height:500px;
    background-color: #f1f4f886;
    margin-left:50px;
  }
  /* 主题视频块 */
  .tVideo{
    width:250px;
    height:200px;
    background-color: #f1f4f886;

  }
  /* 视频封面 */
  .imageVideo{
    width:250px;
    height:130px;
  }

  /* 排行榜 */
  .rankVideo{
    width:300px;
    height:500px;
    background-color: #f1f4f886;
    margin-left:100px;
    
  }
  /* 排名样式 */
  .rankDetails{
    width:20px;
    height:20px;
    margin-top: 15px;
    margin-left: 20px;
    text-align:center;
    color:#eee;
  }

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

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>

<script>
  // import searchs from "../components/Search.vue";
  import sidebars from "../components/SideBar.vue";
  import footers from "../components/Footer.vue";
  import headers from "../components/Header.vue";
  import img1 from "../assets/carousel1.png";
  import img2 from "../assets/carousel2.png";
  import img3 from "../assets/carousel3.png";
  import img4 from "../assets/carousel4.png";
  //引入复制
 
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        userId:'',
        smallSchool:"https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
        tableData: Array(20).fill(item),
        Imgs:[
          {
            index:0,
            Src:img1
          },
          {
            index:1,
            Src:img2
          },
          {
            index:2,
            Src:img3
          },
          {
            index:3,
            Src:img4
          }
        ],


        allVideos:{
          //启蒙
          videoMiniSchool:[
          [{
            index:0,
            Src:"",
            imgSrc:"",
            title:"",
            playNum:0,
            create_time:'0'
          },{
            index:0,
            Src:"",
            imgSrc:"",
            title:"",
            playNum:0,
            create_time:'0'
          },{
            index:0,
            Src:"",
            imgSrc:"",
            title:"",
            playNum:0,
            create_time:'0'
          }],[{
            index:0,
            Src:"",
            imgSrc:"",
            title:"",
            playNum:0,
            create_time:'0'
          },{
            index:0,
            Src:"",
            imgSrc:"",
            title:"",
            playNum:0,
            create_time:'0'
          },{
            index:0,
            Src:"",
            imgSrc:"",
            title:"",
            playNum:0,
            create_time:'0'
          }]],
          //小学
          videoSmallSchool:[
          [{
            index:0,
            Src:"",
            imgSrc:"",
            title:"",
            playNum:0,
            create_time:''
          },{
            index:0,
            Src:"",
            imgSrc:"",
            title:"",
            playNum:0,
            create_time:''
          },{
            index:0,
            Src:"",
            imgSrc:"",
            title:"",
            playNum:0,
            create_time:''
          }]
          ,[{
            index:0,
            Src:"",
            imgSrc:"",
            title:"",
            playNum:0,
            create_time:''
          },{
            index:0,
            Src:"",
            imgSrc:"",
            title:"",
            playNum:0,
            create_time:''
          },{
            index:0,
            Src:"",
            imgSrc:"",
            title:"",
            playNum:0,
            create_time:''
          }
          ]],
          //中学
          videoMidSchool:[
          [{
            index:0,
            Src:"",
            imgSrc:"",
            title:"",
            playNum:0,
            create_time:''
          },{
            index:0,
            Src:"",
            imgSrc:"",
            title:"",
            playNum:0,
            create_time:''
          },{
            index:0,
            Src:"",
            imgSrc:"",
            title:"",
            playNum:0,
            create_time:''
          }]
          ,[{
            index:0,
            Src:"",
            imgSrc:"",
            title:"",
            playNum:0,
            create_time:''
          },{
            index:0,
            Src:"",
            imgSrc:"",
            title:"",
            playNum:0,
            create_time:''
          },{
            index:0,
            Src:"",
            imgSrc:"",
            title:"",
            playNum:0,
            create_time:''
          }
          ]],
        },
        //最多15字标题
        allRanks:{ 
          rankMiniSchool:[
           {
            index:0,
            id:0,
            img:"",
            commentNum:0,
            viewNum:0,
            starNum:0,
            auth:"",
            create_time:"",
            Src:"",
            title:""
           }
          ],
          rankSmallSchool:[
           {
            index:0,
            id:0,
            img:"",
            commentNum:0,
            viewNum:0,
            starNum:0,
            auth:"",
            create_time:"",
            Src:"",
            title:""
           }
          ],
          rankMidSchool:[
           {
            index:0,
            id:0,
            img:"",
            commentNum:0,
            viewNum:0,
            starNum:0,
            auth:"",
            create_time:"",
            Src:"",
            title:""
           }
          ]
        },
        site:"http://colder.ltd#",



      }
    },
    components:{
      sidebars,
      footers,
      // searchs,
      headers,

    },
    methods:{
      //处理标题
            matchTitle(title){
                return title.slice(0,14)+'...';
            },
      saveState () {
      sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    },
    getHref(vid){
      return this.site+"/videoDetail/"+vid+"?vid="+vid;
    },
      //复制Url
      copyUrl(data) {
      let url = data;
        let oInput = document.createElement('input');
        oInput.value = this.site+"/videoDetail/"+url;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象;
        console.log(oInput.value)
        document.execCommand("Copy"); // 执行浏览器复制命令
        this.$message({
          message: '复制成功',
          type: 'success',
          showClose:'true',
          duration:'1000'
        });
        oInput.remove()
      },
    },
    created(){
      
      if(this.$store.getters.getIdToken!=""||this.$store.getters.getIdToken!=undefined){
        this.userId=this.$store.getters.getIdToken;
      }
      this.$http.get("/course/carousel").then((res)=>{
          console.log(res.data)
          if(res.data.code=="200"){
            console.log("请求轮播图成功")
            //等有数据
            // this.Imgs=[]
            // for(var i=0;i<4;i++)
            // {
            //   var obj={
            //     index:i,
            //     Src:res.data.data[i]
            //   }
            //   this.Imgs.push(obj)
            // }
          }
        })
      this.$http.get("/course/data").then((res)=>{
          var allData=res.data.data
          console.log(allData)
          if(res.data.code=="200"){
            console.log("请求视频资源成功")
            this.allRanks.rankMiniSchool=allData.allRanks.rankMiniSchoolList
            this.allRanks.rankMiniSchool.forEach((element)=>{
              element.create_time=this.$moment(element.create_time).utcOffset(8).fromNow()
              element.title=this.matchTitle(element.title);
              element.href=this.getHref(element.vid);
              if(element.auth==""||element.auth==undefined){element.auth="我也不清楚"}
            });
            this.allRanks.rankSmallSchool=allData.allRanks.rankSmallSchoolList;
            this.allRanks.rankSmallSchool.forEach((element)=>{
              element.create_time=this.$moment(element.create_time).utcOffset(8).fromNow()
              element.title=this.matchTitle(element.title);
              element.href=this.getHref(element.vid);
              if(element.auth==""||element.auth==undefined){element.auth="我也不清楚"}
            });
            this.allRanks.rankMidSchool=allData.allRanks.rankMidSchoolList;
            this.allRanks.rankMidSchool.forEach((element)=>{
              element.create_time=this.$moment(element.create_time).utcOffset(8).fromNow()
              element.title=this.matchTitle(element.title);
              element.href=this.getHref(element.vid);
              if(element.auth==""||element.auth==undefined){element.auth="我也不清楚"}
            });

            console.log(this.allRanks);
            var i;
            var j;
            var temp;
            for(j=0;j<2;j++)
            {
              this.allVideos.videoMiniSchool[j]=[];
              for(i=0;i<3;i++)
              {
                var t1=this.$moment(allData.allVideos.videoSmallSchool[j][i].upload_time).utcOffset(8).fromNow();
                console.log(t1)
                temp={
                  Src:allData.allVideos.videoMiniSchool[j][i].url,
                  imgSrc:allData.allVideos.videoMiniSchool[j][i].face,
                  title:this.matchTitle(allData.allVideos.videoMiniSchool[j][i].title),
                  playNum:allData.allVideos.videoMiniSchool[j][i].play,
                  create_time:t1,
                  id:allData.allVideos.videoMiniSchool[j][i].id,
                  href:this.site+"/videoDetail/"+allData.allVideos.videoMiniSchool[j][i].id+"?vid="+allData.allVideos.videoMiniSchool[j][i].id,
                }
                this.allVideos.videoMiniSchool[j].push(temp)
              }
            }
            for(j=0;j<2;j++)
            {
              this.allVideos.videoMidSchool[j]=[];
              for(i=0;i<3;i++)
              {
                
                temp={
                  Src:allData.allVideos.videoMidSchool[j][i].url,
                  imgSrc:allData.allVideos.videoMidSchool[j][i].face,
                  title:this.matchTitle(allData.allVideos.videoMidSchool[j][i].title),
                  playNum:allData.allVideos.videoMidSchool[j][i].play,
                  create_time:this.$moment(allData.allVideos.videoSmallSchool[j][i].upload_time).utcOffset(8).fromNow(),
                  id:allData.allVideos.videoMidSchool[j][i].id,
                  href:this.site+"/videoDetail/"+allData.allVideos.videoMiniSchool[j][i].id+"?vid="+allData.allVideos.videoMiniSchool[j][i].id,
                }
                this.allVideos.videoMidSchool[j].push(temp)
              }
            }
            for(j=0;j<2;j++)
            {
              this.allVideos.videoSmallSchool[j]=[];
              for(i=0;i<3;i++)
              {
                var t3=this.$moment(allData.allVideos.videoSmallSchool[j][i].upload_time).utcOffset(8).fromNow();
                console.log(t3)
                temp={
                  Src:allData.allVideos.videoSmallSchool[j][i].url,
                  imgSrc:allData.allVideos.videoSmallSchool[j][i].face,
                  title:this.matchTitle(allData.allVideos.videoSmallSchool[j][i].title),
                  playNum:allData.allVideos.videoSmallSchool[j][i].play,
                  create_time:t3,
                  id:allData.allVideos.videoSmallSchool[j][i].id,
                  href:this.site+"/videoDetail/"+allData.allVideos.videoMiniSchool[j][i].id+"?vid="+allData.allVideos.videoMiniSchool[j][i].id,
                }
                this.allVideos.videoSmallSchool[j].push(temp)
              }
            }
          }
        })
    }
    
  };
</script>