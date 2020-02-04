import Vue from 'vue'
import ElementUI from 'element-ui'

Vue.use(ElementUI)
let Message = new Vue()

export const responseHandle = function (res) {
  if (res.status === 200 || res.ok) {
    if (res.data.code === '1') {
      return Promise.resolve(res.data.rows)
    } else {
      Message.$Message.error(res.data.message)
      return Promise.reject(res)
    }
  } else {
    Message.$Message.error('后台服务异常！')
    return Promise.reject(res)
  }
// return Promise.reject(res)
}

export const getStaticData = function (url) {
  let ajax = null 
  // 判断ajax对浏览器支持情况
  if (window.XMLHttpRequest) {  
    ajax = new XMLHttpRequest() 
  } else if (window.ActiveXObject) {  
    ajax = new window.ActiveXObject() 
  } else {  
    alert('您的浏览器不支持ajax') 
  }
  if (ajax != null) {  
     ajax.open('GET', url, false) 
     ajax.send(null)  
     ajax.onreadystatechange = function () {  
    }
    return JSON.parse(ajax.responseText)
  }
}

export const formatDate = function (fmt, date) {
  var o = {   
    'M+': date.getMonth() + 1, // 月份   
    'd+': date.getDate(), // 日   
    'h+': date.getHours(), // 小时   
    'm+': date.getMinutes(), // 分   
    's+': date.getSeconds(), // 秒   
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度   
    'S': date.getMilliseconds() // 毫秒   
  }   
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) 
  }
  for (var k in o) {  
    if (new RegExp('(' + k + ')').test(fmt)) {
     fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}


