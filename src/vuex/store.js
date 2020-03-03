import Vue from 'vue'
import vuex from 'vuex'
import * as actions from './action'
import * as getters from './getters'
Vue.use(vuex)

const state = {
    currentMenu: 'home', // 当前激活菜单
    breadcrumbTitle: [],
    breadcrumbPathName: [],
}

const mutations = {
    SET_CURRENT_MENU (state, currentMenu) {
	  state.currentMenu = currentMenu
  },
  SET_BREADCRUMB_TITLE (state, BcTitle) {
  	state.breadcrumbTitle = BcTitle
  },
  SET_BREADCRUMB_PATHNAME (state, BcPathName) {
  	state.breadcrumbPathName = BcPathName
  }
}

export default new vuex.Store({
  state,
  mutations,
  actions,
  getters
})
