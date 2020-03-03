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
const Index = () => import('@/components/common/index') // 容器页面
const Login = () =>  import('@/views/login/login') //登录页
const Home =() => import('@/views/home/home')
const Page =() => import('@/components/page/page')
const Table =() => import('@/components/table/table')
Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect: '/index'
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/app',
      name: 'app',
      component: Index,
      children: [
        {
            path: '/index',
            name: 'index',
            component: Home,
            meta: { keepAlive: true }
        },
          {
              path: 'catInfo',
              name: 'catInfo',
              component: Page
          },
          {
              path: 'page',
              name: 'page',
              component: Page
          },
          {
              path: 'table',
              name: 'table',
              component: Table
          },
        {
            path: '*',
            redirect: '/login'
        },

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
     	 /*组件库*/
         case 'page': {
             breadcrumbTitle = ['主页','组件','分页']
             breadcrumbPathName = ['home','compant','page']
             currentMenu = 'page'
             break
         }
         case 'table': {
             breadcrumbTitle = ['主页','组件','表格']
             breadcrumbPathName = ['home','compant','table']
             currentMenu = 'table'
             break
         }
         /*组件库*/
     	default:
     		break
     }
     store.commit('SET_CURRENT_MENU', currentMenu)
     store.commit('SET_BREADCRUMB_TITLE', breadcrumbTitle)
     store.commit('SET_BREADCRUMB_PATHNAME', breadcrumbPathName)
     next()
   })

export default router
