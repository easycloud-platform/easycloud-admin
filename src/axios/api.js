import $axios from '@/axios/index'
import CONFIG from '@/axios/config'
import axios from 'axios'

// 登陆接口
export function login (params) {
  return $axios({
		url: CONFIG.COMMON.LOGIN,
		method: 'post',
		data: params
	})
}
/**获取用户信息 */
export function getUserInfo () {
	return $axios({
		  url: CONFIG.COMMON.GET_USER_INFO,
		  method: 'post'
	  })
  }
/**银杉树列表 */
  export const treeList = () => { 
	return $axios({
	  url: CONFIG.TREE.LIST,
	  method: 'get'
	})
  }

  export const treeUpdatePhoto = (params) => { 
    return $axios({
      url: CONFIG.TREE.UPDATE_PHOTO,
      method: 'put',
      data:params
    })
  }

  /**事件列表 */
  export const eventList = (params) => { 
    return $axios({
      url: CONFIG.EVENT.LIST+'?pageNum=' + params.pageNum + '&pageSize=' + params.pageSize+'&title='+params.title+'&tree.id='+params.tree.id,
      method: 'get',
      data:params
    })
  }
   /**新增事件 */
   export const eventAdd = (params) => { 
    return $axios({
      url: CONFIG.EVENT.ADD,
      method: 'post',
      data:params
    })
  }
  /**根据银杉查看事件信息 */
  export const eventListByTree = (params) => { 
	return $axios({
	  url: CONFIG.EVENT.LIST_BY_TREE+params,
	  method: 'get'
	})
  }

/**巡检库列表 */
export const warehouseList = (params) => { 
	return $axios({
		url: CONFIG.WAREHOUSE.LIST+'?pageNum=' + params.pageNum + '&pageSize=' + params.pageSize+'&name='+params.name+'&uploadDate='+params.uploadDate,
		method: 'get',
		data:params
	})
}
	
export const getConfigByCode = (id) => {
    return $axios({
      url:  CONFIG.SYSTEM_CONFIG.GET_BY_CODE+id,
      method: 'get'
    })
  }
  export const changeConfig = (data) => {
    return $axios({
	  url:  CONFIG.SYSTEM_CONFIG.CHANGE,
	  method: 'post',
      data
    })
  }

  export const getDataTreeById = (id) => {
    return $axios({
      url:  CONFIG.DATA.GET_TREE_BY_ID+id,
      method: 'get'
    })
  }

  export const treeOrderBy = (value) => {
    return $axios({
      url:  CONFIG.DATA.TREE_ORDER_BY+value,
      method: 'get'
    })
  }

  
  export const wind = () => {
    return $axios({
      url:  CONFIG.DATA.WIND,
      method: 'get'
    })
  }

  export const water = () => {
    return $axios({
      url:  CONFIG.DATA.WATER,
      method: 'get'
    })
  }

  export const dbh = () => {
    return $axios({
      url:  CONFIG.DATA.DBH,
      method: 'get'
    })
  }

  export const crown = () => {
    return $axios({
      url:  CONFIG.DATA.CROWN,
      method: 'get'
    })
  }