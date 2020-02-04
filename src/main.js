// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import '@/assets/styles/base.css'
import '@/assets/styles/core.css'
import '@/utils/rem'
import store from './vuex/store'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI);
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import global from '@/utils/global.js'   //注意文件路径，实际路径以项目目录结构为准
Vue.prototype.$global = global;
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.2,
  error: 'assets/img/common/error.png',
  loading: 'assets/img/common/loading.svg',
  attempt: 1
})
Vue.use(Viewer)
Viewer.setDefaults({
  zIndexInline: 9999
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")