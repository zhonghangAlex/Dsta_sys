// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import axios from 'axios'
import VideoPlayer from 'vue-video-player'
import VueCookies from 'vue-cookies'
import store from './store/store.js'
import JsEncrypt from 'jsencrypt'


Vue.prototype.$jsEncrypt = JsEncrypt
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
Vue.use(VueCookies)

let bigInt = require("big-integer")
Vue.use(bigInt)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
