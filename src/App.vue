<template>
  <div id="app">
    
    <router-view v-if="isRouterAlive"></router-view> 

    
  </div>
  
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 1518px;
  color: #2c3e50;
  margin:auto;
  padding: 0%;
  background-color: #f1f4f886;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
export default {
  name: 'App',
  provide() { // 注册一个方法
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  created(){
    if(localStorage.getItem("state")!=null ||localStorage.getItem("state")!=undefined){
      this.$store.replaceState(JSON.parse(localStorage.getItem("state")));
      console.log(this.$store);
    }
    
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state));
      

    });
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
    ,saveState () {
      sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    }
  }
}
</script>