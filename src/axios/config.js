const CONTEXTPATH = 'http://106.12.179.192:8181/v1/api' // 正式环境
//const CONTEXTPATH = 'http://192.168.2.145:8181/v1/api' // 开发环境
export default {
  COMMON: {
    LOGIN: CONTEXTPATH + '/login', // 用户登录
    GET_USER_INFO: CONTEXTPATH +'/getUserInfo', //获取用户信息
    FILE_UPLOAD: CONTEXTPATH + '/fileUpload' //文件上传
  },
  TREE:{
    LIST:CONTEXTPATH+'/app/tree/', // 银杉树列表
    UPDATE_PHOTO:CONTEXTPATH +'/app/tree/photo', //更新银杉树巡检库照片
  },
  EVENT:{
    LIST:CONTEXTPATH+'/app/event/', //事件列表
    ADD:CONTEXTPATH +'/app/event/', //新增事件
    LIST_BY_TREE: CONTEXTPATH +'/app/event/tree/', //根据银杉查看事件
  },
  WAREHOUSE:{
    LIST:CONTEXTPATH+'/app/warehouse/' //巡检库列表
  },
  SYSTEM_CONFIG:{
    GET_BY_CODE:CONTEXTPATH +'/sys/config/code/',
    CHANGE:CONTEXTPATH+'/sys/config/'
  },
  DATA:{
    GET_TREE_BY_ID:CONTEXTPATH +'/app/data/tree/', //根据id获取银杉树的变化信息
    WIND:CONTEXTPATH +'/app/data/wind', // 风速相关
    WATER:CONTEXTPATH +'/app/data/water', // 温度 降水量
    DBH:CONTEXTPATH+'/app/data/tree/dbh',//胸径占比
    CROWN:CONTEXTPATH+'/app/data/tree/crown',//树冠占比
    TREE_ORDER_BY:CONTEXTPATH+'/app/data/tree/orderBy/',//银杉按照什么排列
  }
 
}
