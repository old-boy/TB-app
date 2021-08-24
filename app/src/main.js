/*
 * @Author: your name
 * @Date: 2021-08-06 08:55:32
 * @LastEditTime: 2021-08-06 09:35:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \TB-app\app\src\main.js
 */
import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'

import store from './store'

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.use(uView)

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
