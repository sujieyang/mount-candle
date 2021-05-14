
import Vue from 'vue'
import VueRouter from 'vue-router'
import ResetComponent from "../views/setpwd.vue";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/about'
  },
  {
    path: '/about',
    name: 'About',
    meta:{
      title:"首页"
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/talking',
    name: 'Talk',
    meta:{
      title:"讨论区"
    },
    component:()=>import('../views/Talk.vue')
  },
  {
    path: '/donation',
    name: 'Donation',
    meta: {
      title: "捐赠区"
    },
    component: () => import('../views/Donation.vue')
  },


 //捐赠活动页，捐赠表单
  {
    path: '/donatDetail',
    name: 'Donat_detail',
    meta:{
      title:"捐赠详情"
    },
    component: () => import('../views/Donate_detail')
  },
  {
    path: '/donatForm',
    name: 'Donat_form',
    meta:{
      title:"捐赠表单"
    },
    component: () => import('../views/Donate_form')
  },
  {
    path: '/personal',
    name: 'Personal',
    
    meta:{
      title:"主页"
    },
    component:()=>import('../views/Personal.vue'),
    children: [
      {
        path:':userId/index',
        meta:{
          title:"主页"
        },
        component:()=>import('../components/personal/mainIndex.vue')
      },
      {
        path:':userId/myAdd',
        meta:{
          title:"我的发布"
        },
        component:()=>import('../components/personal/myAdd.vue')
      },
      {
        path:':userId/collections',
        meta:{
          title:"我的收藏"
        },
        component:()=>import('../components/personal/mainCollections.vue')
      },
      {
        path:':userId/personalData',
        meta:{
          title:"个人信息"
        },
        component:()=>import('../components/personal/mainPersonalData.vue')
      },
      {
        path:':userId/authentication',
        meta:{
          title:"认证"
        },
        component:()=>import('../components/personal/mainAuthentication.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta:{
      title:"登录"
    },
    component:()=>import('../views/Login.vue')
  },
  {
    path: '/setpwd',
    name: 'setpwd',
    meta:{
      title:"修改密码"
    },
    component:ResetComponent
  },
  {
    path:'/register',
    name:'Register',
    meta:{
      title:"注册"
    },
    component:()=>import('../views/Register.vue')
  },
  {
    path:"/talkDetail/:postId",
    meta:{
      title:"讨论详情"
    },
    component:()=>import('../views/Talk_detail.vue')
},

  {
    path:'/videoDetail/:postId',
    meta:{
      title:"视频详情"
    },
    component:()=>import('../views/Video_detail.vue')
  },
  // 他人访问主页
  {
    path:'/visitor/:userId',
    meta:{
      title:"他人主页"
    },
    component:()=>import('../views/visitor.vue')
  },

// 后台部分
{
  path:'/admin/addActivity/:userId',
  component:()=>import('../admin_views/addActivity.vue'),
  meta:{
    title:"添加活动"
  }
},
{
  path:'/admin/addUser/:userId',
  component:()=>import('../admin_views/addUser.vue'),
  meta:{
    title:"添加用户"
  }
},

  {
    path:'/admin/donateManager/:userId',
    component:()=>import('../admin_views/donateManager.vue'),
    meta:{
      title:"捐赠管理"
    }
  },
  {
    path:'/admin/logManager/:userId',
    component:()=>import('../admin_views/logManager.vue'),
    meta:{
      title:"日志管理"
    }
  },
  {
    path:'/admin/talkManager/:userId',
    component:()=>import('../admin_views/talkManager.vue'),
    meta:{
      title:"讨论管理"
    }
  },
  {
    path:'/admin/userManager/:userId',
    component:()=>import('../admin_views/userManager.vue'),
    meta:{
      title:"用户管理"
    }
  },
  {
    path:'/admin/videoManager/:userId',
    component:()=>import('../admin_views/videoManager.vue'),
    meta:{
      title:"视频管理"
    }
  }
  
]


const router = new VueRouter({
  routes
})
router.beforeEach((to,from,next) => {

  document.title = to.matched[0].meta.title;
  console.log(to.name)
  const nextRoute=["Personal","Donat_form"]
  const store=(JSON.parse(localStorage.getItem("state")))
  console.log(store)
  // console.log(to.name==nextRoute[0])
  if(to.name==nextRoute[0] ||to.name==nextRoute[1]){
    
    // console.log(store)
    if(store==null||store==undefined){
      console.log("ssss")
      localStorage.setItem("showNeedLoginInfo","yes")
      next('/login')
    }
    else{
      if(to.name==nextRoute[0]){
        console.log(store)
        next('/personal/'+store.userInfos.idToken+'/index')
      }
      else{
        next()
      }
      
    }
  }
  else if(to.name=="Login"){
    if(localStorage.getItem("state")!=null){
      alert("你已经登录")
      next(from)
      
    }
    else{
      next()
    }
  }
  else{
    next()
    
  }  
})

export default router
