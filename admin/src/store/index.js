/*
 * @Author: your name
 * @Date: 2021-06-12 22:07:19
 * @LastEditTime: 2021-08-25 02:18:50
 * @LastEditors: your name
 * @Description: In User Settings Editm
 * @FilePath: \TB-app\admin\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import tagView from './modules/tagsView'
import suuply from './modules/suuply'
import caigou from './modules/caigou'
import upload from './modules/upload'
import carousel from './modules/carousel'
import platform from './modules/platform'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    tagView,
    suuply,
    caigou,
    upload,
    carousel,
    platform
  },
  getters
})

export default store
