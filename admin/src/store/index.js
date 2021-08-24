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
    carousel
  },
  getters
})

export default store
