import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import tagView from './modules/tagsView'
import suuply from './modules/suuply'
import buyers from './modules/buyers'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    tagView,
    suuply,
    buyers
  },
  getters
})

export default store
