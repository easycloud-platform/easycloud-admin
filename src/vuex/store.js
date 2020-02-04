import Vue from 'vue'
import vuex from 'vuex'
import * as actions from './action'
import * as getters from './getters'
Vue.use(vuex)

const state = {
    caseNo: null,
    materialId: null,
    testNo: 0,
    testArray: [],
    breadcrumbList: [], // 面包屑导航
    currentMenu: 'overview', // 当前激活菜单
    currentProcedure: 'Procedure1Table', // 当前进入的案件流程（4种）
    editDocuments: new Set(),
    searchMenu2Show: {
    showCaseName: true,
    showCaseNo: true,
    showClueTitle: true,
    showCaseType: true,
//  showUndertaker: true,
    showInvolved: false,
    showAdministration: false
    },
    seachCaseParams: {
    	  caseName: '',
          caseNo: '',
          caseStutus: '1000',
      	  caseType: '',
      	  clueTitle: ''
    },
    caseOtherParams: {
    	  caseName: '',
          caseNo: '',
//      	caseStatus: '',
      	  caseType: '',
      	  subject: '',
      	  supervision: ''
    },
    breadcrumbTitle: [],
    breadcrumbPathName: [],
    breadcrumbFlag: 0, // 面包屑状态，用于应对特殊的面包屑    0：普通面包屑  1：添加线索-系统检索-线索详情的情况的面包屑
    retrievalClass: {
    	currentTime : -1,
    	currentSource: '',
    	tableData: [],
    	pageNum: 1,
    	keyWord: '',
    	beginDate: '',
        endDate: '',
        total: 10
    }
}

const mutations = {
   SET_retrievalClass (state, retrievalClass) {
   	 state.retrievalClass = retrievalClass
   },
   SET_CURRENT_MENU (state, currentMenu) {
	  state.currentMenu = currentMenu
  },
//	SET_USERID(state, currentUserId) {
//		sessionStorage.setItem('userId', currentUserId)
//	},
  SET_CURRENT_PROCEDURE (state, currentProcedure) {
    state.currentProcedure = currentProcedure
  },
  SET_SEARCH_MENU2SHOW (state, searchMenu2Show) {
    state.searchMenu2Show = searchMenu2Show
  },
  SET_SEARCH_CASE_PARAMS (state, params) {
  	state.seachCaseParams = params
  },
  SET_CASE_OTHER_PARAMS (state, params) {
  	state.caseOtherParams = params
  },
  SET_BREADCRUMB_TITLE (state, BcTitle) {
  	state.breadcrumbTitle = BcTitle
  },
  SET_BREADCRUMB_PATHNAME (state, BcPathName) {
  	state.breadcrumbPathName = BcPathName
  },
  SET_BREADCRUMB_FLAG (state, BcFlag) {
  	state.breadcrumbFlag = BcFlag
  },
  SET_CASE_NO (state, caseNo) {
    state.caseNo = caseNo
  },
  SET_MATERIAL_ID (state, materialId) {
    state.materialId = materialId
  },
  SET_EDIT_DOCUMENTS (sate, editDocuments) {
    state.editDocuments = editDocuments
  }
}

export default new vuex.Store({
  state,
  mutations,
  actions,
  getters
})
