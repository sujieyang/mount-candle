import Vue from 'vue';
import Vuex from 'vuex';
import createVuexAlong from 'vuex-along';
Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    isLogin:false,
    isExamining:false,
    isVolunteer:false,
    // 是否显示后台按钮
    isShow:false,
    userInfos:{
      userId:"",
      idToken:"",
      userName:"",
      nickName:"",
      avatar:"",
      age:"",
      gender:"",
      mobile:"",
      email:"",
      roles:[],
      info:"",

    }
  },
  getters:{
    getIsExamining:state =>{
      return state.isExamining;
    },
    getIsVolunteer:state =>{
      return state.isVolunteer;
    },
    getUserInfo: state => {
      return state.userInfos;
    },
    getId: state =>{
      return state.userInfos.userId;
    },
    getIsShow: state => {
      return state.isShow;
    },
    getIdToken: state =>{
      return state.userInfos.idToken;
    },
    getUserId: state =>{
      return state.userInfos.userId;
    },
    getIsLogin: state =>{
      return state.isLogin;
    }
  },
  mutations: {
    setVolunteer(state){
      state.isVolunteer=true
    },
    setExamining(state){
      state.isExamining=true
    },
    changeIsLogin(state){
      state.isLogin=!state.isLogin
    },
    updateAvatar(state,avatar){
      state.userInfos.avatar=avatar;
    },
    // window.btoa() Window.atob()
    saveLoginForm(state,loginForm){
      state.isLogin=true;
      
      state.userInfos.idToken=loginForm.idToken;
      state.userInfos.userId=window.atob(loginForm.idToken);
      state.userInfos.userName=loginForm.username;
      state.userInfos.nickName=loginForm.nickname;
      state.userInfos.avatar=loginForm.avatar;
      state.userInfos.age=loginForm.age;
      state.userInfos.gender=loginForm.gender;
      state.userInfos.mobile=loginForm.mobile;
      state.userInfos.email=loginForm.email;
      state.userInfos.roles=loginForm.roles;
      state.userInfos.info=loginForm.info;
      
      state.userInfos.roles.forEach(element => {
        console.log(element)
        if(element=="ADMIN"){
          state.isShow=true;
        }
      });
        
      console.log(state.isShow);
      console.log(state.userInfos);
    },
    updateLoginForm(state,loginForm){
      state.userInfos.userName=loginForm.username;
      state.userInfos.nickName=loginForm.nickname;
      state.userInfos.avatar=loginForm.avatar;
      state.userInfos.age=loginForm.age;
      state.userInfos.gender=loginForm.gender;
      state.userInfos.mobile=loginForm.mobile;
      state.userInfos.email=loginForm.email;
      state.userInfos.info=loginForm.info;
      
      
    },
    updateLoginFormInPersonalData(state,loginForm){
      state.userInfos.userName=loginForm.username;
      state.userInfos.nickName=loginForm.nickname;

      state.userInfos.age=loginForm.age;
      state.userInfos.gender=loginForm.gender;
      state.userInfos.mobile=loginForm.mobile;
      state.userInfos.email=loginForm.email;
      state.userInfos.info=loginForm.info;
      
      
    },
    deleteUserInfos(state){
      state.isLogin=false;
      state.isShow=false;
      state.userInfos={
        userId:'',
        idToken:'',
        userName:'',
        nickName:'',
        avatar:'',
        age:'',
        gender:'',
        mobile:'',
        email:'',
        roles:[],
        info:''
  
      }
    }
  },
  actions: {
  },
  modules: {
  },
  plugins:[createVuexAlong],
})
