  import axios from 'axios'
import router from '@/router/index'
import { setToken, getToken } from '@/axios/util'
import {Message} from 'element-ui'

const service = axios.create({
	baseURL: '',
	timeout: 600000 // TODO 2019.2.27 wxt.liqian 请求超时时间
})
// service.defaults.headers = {
// 	'X-Requested-With': 'XMLHttpRequest',
//   'Content-Type': 'application/json; charset=utf-8'
// }

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  if (config.method.toLocaleUpperCase() === 'POST' || config.method.toLocaleUpperCase() === 'PUT' || config.method.toLocaleUpperCase() === 'DELETE') {
    config.data = JSON.stringify(config.data)
  }   
  if(getToken()){
    config.headers = {
      'Authentication': getToken(),
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json; charset=utf-8'
    }
  }else{
    config.headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json; charset=utf-8'
    }
  }

  config.params = {
    _t: Date.parse(new Date()),
    ...config.params
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  let that = this
  //TODO 正式环境将以下注释打开
  // if (response.statusText || response.status === 200) {
  //       if (response.data.code === '401') {
  //       	router.push(({ name: 'login' }))
  //       	// Message.warning('登录失效，请重新登录')
  //      } else {
  //       return Promise.resolve(response)
  //      }
  // }
  return Promise.resolve(response)
}, function (error) {
  // Message.error("后台服务异常！");
  return Promise.reject(error)
})

// opts参数可覆盖默认值.
const $axios = function (opts) {
  return service(opts)
}

export default $axios
