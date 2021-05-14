import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'
import Antd from 'ant-design-vue';
import VideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css'
import moment from 'moment'
Vue.prototype.$moment = moment;
moment.locale('zh-cn');
axios.defaults.baseURL="http://150.158.191.172:8081/";
axios.defaults.withCredentials = true;
Vue.use(VideoPlayer)
Vue.use(Antd)


Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$http = axios
new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
