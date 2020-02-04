import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/vuex/store.js'
/**
 * 重写路由的push方法
 */
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

const Login = () =>  import('@/views/login/login') //登录页
const Index = () => import('@/components/common/index') //组件
const home =() => import('@/views/home/home')
const Event = () => import('@/views/event/event') //事件页
const Map = () => import('@/views/map/map') //高德地图
const Live = () => import('@/views/live/live') //直播
const Charts = () => import('@/views/charts/charts') //图表
const Overview = () => import('@/views/overview/overview') //全景图
const treeData = () => import('@/views/treedata/treedata') //树木图表
const Warehouse = () => import('@/views/warehouse/warehouse') //巡检库
const forestryMap =() =>import('@/views/forestryMap/forestryMap') //林业专业地图
Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect: '/index'
    }, {
      path: '/login',
      name: 'login',
      component: Login
    },
		{
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/home',
          name: 'home',
          component: home,
          meta: { keepAlive: true } 
        },
       
        
        {
          path: '/live',
          name: 'live',
          component: Live
        },
        {
          path: 'catInfo',
          name: 'catInfo',
          component: Warehouse
        },
        {
          path: '/overview',
          name: 'overview',
          component: Overview
        },
        {
          path: '/warehouse',
          name: 'warehouse',
          component: Warehouse
        },
        {
          path: '/data',
          name: 'data',
          component: Charts
        },
        {
          path: '/treeData',
          name: 'treeData',
          component: treeData
        },
        {
          path: '/forestryMap',
          name: 'forestryMap',
          component: forestryMap
        },
        {
        path: '*',
        redirect: '/login'
      }
      ]
    }
  ]
 
  const router = new VueRouter({ routes })

   router.beforeEach((to, from, next) => {
     let breadcrumbPathName = ''
     let breadcrumbTitle = []
     let currentMenu = ''
     switch (to.name){
     	 // 线索模块的面包线
     	 case 'home': {
     	   breadcrumbTitle = ['主页']
     	   breadcrumbPathName = ['home']
         currentMenu = 'home'
     		 break
     	 }
     	 case 'catInfo': {
     	   breadcrumbTitle = ['主页', '猫信息']
     	   breadcrumbPathName = ['home', 'catInfo']
         currentMenu = 'catInfo'
     		 break
     	 }
     	 case 'ClueLibraryDetails': {
     	 	 let breadCrumbKind = localStorage.getItem('breadCrumbKind')
     	 	 if (breadCrumbKind === 'internetClue') {
     	      breadcrumbTitle = ['线索管理', '互联网线索', '互联网线索详情']
     	      breadcrumbPathName = ['clueManage', 'internetClue', 'ClueLibraryDetails']
         } else if (breadCrumbKind === 'addClue') {
         	  breadcrumbTitle = ['线索管理', '互联网线索'] 
     	      breadcrumbPathName = ['clueManage', 'internetClue'] 
         }
         currentMenu = 'clueManage'
     		 break
     	 }
     	 case 'SecondClueLibraryDetails': {
     	   breadcrumbTitle = ['线索管理', '互联网线索', '互联网线索详情']
     	   breadcrumbPathName = ['clueManage', 'internetClue', 'ClueLibraryDetails']
         currentMenu = 'clueManage'
     		 break
     	 }
     	 case 'addClue': {
     	   breadcrumbTitle = ['线索管理', '互联网线索', '添加线索']
     	   breadcrumbPathName = ['clueManage', 'internetClue','addClue']
         currentMenu = 'clueManage'
     		 break
     	 }
     	 case 'SystemSetting': {
     	   breadcrumbTitle = ['线索管理', '互联网线索', '系统推荐设置']
     	   breadcrumbPathName = ['clueManage', 'internetClue','SystemSetting']
         currentMenu = 'clueManage'
     		 break
     	 }
     	 case 'environmentClue': {
     	   breadcrumbTitle = ['线索管理', '环境监控线索']
     	   breadcrumbPathName = ['clueManage', 'environmentClue']
         currentMenu = 'clueManage'
     		 break
     	 }
     	 case 'reportClue': {
     	   breadcrumbTitle = ['线索管理', '举报线索']
     	   breadcrumbPathName = ['clueManage', 'reportClue']
         currentMenu = 'clueManage'
     		 break
     	 }
     	 case 'reportClueDetail': {
     	   breadcrumbTitle = ['线索管理', '举报线索', '举报线索详情']
     	   breadcrumbPathName = ['clueManage', 'reportClue', 'reportClueDetail']
         currentMenu = 'clueManage'
     		 break
     	 }
     	 case 'selfDiscoverClue': {
     	   breadcrumbTitle = ['线索管理', '自行发现线索']
     	   breadcrumbPathName = ['clueManage', 'selfDiscoverClue']
         currentMenu = 'clueManage'
     		 break
     	 }
     	 case 'selfDiscoverClueDetail': {
     	   breadcrumbTitle = ['线索管理', '自行发现线索', '自行发现线索详情']
     	   breadcrumbPathName = ['clueManage', 'selfDiscoverClue', 'selfDiscoverClueDetail']
         currentMenu = 'clueManage'
     		 break
     	 }
     	 // 案件模块的面包线
     	 case 'myCase': {
     	   breadcrumbTitle = ['我的案件']
     	   breadcrumbPathName = ['myCase']
//   	   store.commit('SET_CURRENT_PROCEDURE', 'Procedure1Table')
         currentMenu = 'myCase'
     		 break
     	 }
     	 case 'infoOverview': {
     	 	 let tempMsg = sessionStorage.getItem('caseName')
     	   breadcrumbTitle = ['我的案件', tempMsg]
     	   breadcrumbPathName = ['myCase', 'infoOverview']
     	   currentMenu = 'myCase'
         currentMenu = 'myCase'
     		 break
				}
       /* wxt.liqian 2019.2.15 重写信息概况 start */
       case 'clueOverview': {
         let tempMsg = sessionStorage.getItem('caseName')
         breadcrumbTitle = ['我的案件', tempMsg]
         breadcrumbPathName = ['myCase', 'clueOverview']
         currentMenu = 'myCase'
         currentMenu = 'myCase'
         break
       }
       /* wxt.liqian 2019.2.15 重写信息概况 end */
     	 // 知识索引模块面包线
     	 case 'knowledgeIndex': {
     	   breadcrumbTitle = ['知识索引']
     	   breadcrumbPathName = ['knowledgeIndex']
         currentMenu = 'knowledgeIndex'
     		 break
     	 }
       case 'lawsRulesList': {
         breadcrumbTitle = ['知识索引', '法律法规']
         breadcrumbPathName = ['knowledgeIndex', 'lawsRulesList']
         currentMenu = 'knowledgeIndex'
         break
       }
       case 'threeFixedPlanList': {
         breadcrumbTitle = ['知识索引', '三定方案']
         breadcrumbPathName = ['knowledgeIndex', 'threeFixedPlanList']
         currentMenu = 'knowledgeIndex'
         break
       }
       case 'threeFixedPlanDetail': {
         breadcrumbTitle = ['知识索引', '三定方案', '三定方案详情']
         breadcrumbPathName = ['knowledgeIndex', 'threeFixedPlanList', 'threeFixedPlanDetail']
         currentMenu = 'knowledgeIndex'
         break
       }
       case 'lawsRulesDetail': {
         breadcrumbTitle = ['知识索引', '法律法规', '法律法规详情']
         breadcrumbPathName = ['knowledgeIndex', 'lawsRulesList', 'lawsRulesDetail']
         currentMenu = 'knowledgeIndex'
         break
       }
     	 case 'powerList': {
     	   breadcrumbTitle = ['知识索引', '权力清单']
     	   breadcrumbPathName = ['knowledgeIndex', 'powerList']
         currentMenu = 'knowledgeIndex'
     		 break
     	 }
     	 case 'dutyList': {
     	   breadcrumbTitle = ['知识索引', '责任清单']
     	   breadcrumbPathName = ['knowledgeIndex', 'dutyList']
         currentMenu = 'knowledgeIndex'
     		 break
     	 }
     	 case 'dutyDetail': {
     	   breadcrumbTitle = ['知识索引', '责任清单', '责任清单详情']
     	   breadcrumbPathName = ['knowledgeIndex', 'dutyList', 'dutyDetail']
         currentMenu = 'knowledgeIndex'
     		 break
     	 }
     	 case 'caseLibrary': {
     	   breadcrumbTitle = ['知识索引', '案例库']
     	   breadcrumbPathName = ['knowledgeIndex', 'caseLibrary']
         currentMenu = 'knowledgeIndex'
     		 break
     	 }
     	 case 'Overview': {	
				 let tempMsg = sessionStorage.getItem('caseName')		
				 breadcrumbTitle = ['知识索引', '案例库', tempMsg]
				 breadcrumbPathName = ['knowledgeIndex', 'caseLibrary', 'Overview']
				 currentMenu = 'knowledgeIndex'
				 break
       }
       /* wxt.liqian 2019.2.15 重写信息概况 start */
       case 'CaseOverview': {
         let tempMsg = sessionStorage.getItem('caseName')
         breadcrumbTitle = ['知识索引', '案例库', tempMsg]
         breadcrumbPathName = ['knowledgeIndex', 'caseLibrary', 'CaseOverview']
         currentMenu = 'knowledgeIndex'
         break
       }
       /* wxt.liqian 2019.2.15 重写信息概况 end */
     	 // 统计分析模块面包线
     	 case 'statisticAnalysis': {
     	   breadcrumbTitle = ['统计分析']
     	   breadcrumbPathName = ['statisticAnalysis']
         currentMenu = 'statisticAnalysis'
     		 break
     	 }
       // 标注平台模块面包线
       case 'markPlatform': {
         breadcrumbTitle = ['标注平台']
         breadcrumbPathName = ['markPlatform']
         currentMenu = 'markPlatform'
         break
       }
       case 'waitForMark': {
         breadcrumbTitle = ['标注平台', '工作台—待标注']
         breadcrumbPathName = ['markPlatform', 'waitForMark']
         currentMenu = 'markPlatform'
         break
       }
     	default:
     		break
     }
     store.commit('SET_CURRENT_MENU', currentMenu)
     store.commit('SET_BREADCRUMB_TITLE', breadcrumbTitle)
     store.commit('SET_BREADCRUMB_PATHNAME', breadcrumbPathName)
     next()
   })

export default router
