import Vue from 'vue'
import axios from './plugins/axios' // axios全局配置
// import '@/common/directive' //自定义指令文件
import App from './App.vue'
import router from './router' //路由配置
import store from './store'  //vuex
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import 'normalize.css' //格式化浏览器样式差异
import '@/permission.js' //router权限配置
import fastClick from 'fastclick' // 解决移动端点击事件300ms延迟
fastClick.attach(document.body);

Vue.prototype.$http = axios
Vue.use(Mint);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
