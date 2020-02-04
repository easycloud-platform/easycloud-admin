<template>
  <div class="menu-list-container">
    <div class="object">
       <img v-lazy="icon" class="lazy-img-fadein"  >
    </div>
    
    <ul class="menu-list-wrap">
         <li v-for="(item) in menuList" class="item-tag" :key="item.id">
        <div class="item-container"  :style="item.id == selectItem.pid ? checkItemStyle : ''" @click="tagSelect($event, item)">
          <!--<i :class="item.id == selectItem.pid ? item.style2 : item.style1"></i>-->
          <span :class="item.id == selectItem.pid ? 'span-blue2' : 'span-white'">{{item.name}}</span>
          <i v-if="item.children.length > 0" class="down-item"></i>
        </div>
        <ul v-if="item.children.length > 0" :id="item.id">
          <li v-for="(child) in item.children" :style="child.id == selectItem.id ? selectItemBg : ''" :key="child.id" @click="tagSelect($event, child)">
            <span class="icon-child" :class="child.id == selectItem.id ? 'span-blue' : 'span-white'">&nbsp;&nbsp;&nbsp;&nbsp;{{child.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  import router from '../../router/index'
  import {mapActions, mapGetters} from 'vuex'
  import * as api from '../../axios/api'
  import icon from '@/assets/icon/icon.png'
  import loading from '@/assets/img/common/loading.svg'
  import error from '@/assets/img/common/404.jpg'
  export default {
    name: 'left-menu',
    data () {
      return {
        icon: icon,
        selectItemBg: 'background: #0057a8;',
        checkItemStyle: '2px solid rgb(0, 87, 168);',
        uncheckItemStyle: '',
        selectItem: {
          pid: 'home',
          id: 'home'
        },
        menuList: [ 
          {
            id: 'home',
            pid: 'home',
            name: '主页',
            children: []
          }, 
          {
            id: 'cat',
            name: '猫咪中心',
            children: [
              {
                id: 'catInfo',
                pid: 'cat',
                style: 'icon-child',
                name: '猫信息'
              },
              {
                id: 'catSale',
                pid: 'cat',
                style: 'icon-child',
                name: '在售猫咪'
              }, 
            ]
          }, 
          {
            id: 'app',
            name: '知识库',
            children: [
               {
                id: 'type',
                pid: 'app',
                name: '品种分类',
                children: []
              }, 
              {
                id: 'question',
                pid: 'app',
                name: '常见问题',
                children: []
              }, 
               {
                id: 'health',
                pid: 'app',
                name: '健康疾病',
                children: []
              }, 
              {
                id: 'knowledge',
                pid: 'app',
                name: '养猫科普',
                children: []
              }, 
            ]
          },
          {
            id: 'store',
            name: '商家管理',
            children: [
               {
                id: 'storeVertify',
                pid: 'store',
                name: '商家审核',
                children: []
              }, 
              {
                id: 'storeManager',
                pid: 'store',
                name: '入驻管理',
                children: []
              }, 
            ]
          },
         {
            id: 'system',
            name: '系统监控',
            children: [
              {
                id: 'log',
                pid: 'system',
                name: '日志中心',
                children: []
              }, 
              {
                id: 'service',
                pid: 'system',
                name: '服务状态',
                children: []
              }, 
            ]
          }, 
          {
            id: 'compannt',
            name: '组件库',
            children: [
              {
                id: 'page',
                pid: 'compannt',
                name: '分页',
                children: []
              }, 
              {
                id: 'table',
                pid: 'compannt',
                name: '表格',
                children: []
              }, 
              {
                id: 'button',
                pid: 'compannt',
                name: '按钮',
                children: []
              },
              {
                id: 'draw',
                pid: 'compannt',
                name: '抽屉',
                children: []
              },  
               {
                id: 'tab',
                pid: 'compannt',
                name: 'Tab',
                children: []
              },  {
                id: 'notify',
                pid: 'compannt',
                name: '消息提醒',
                children: []
              }, 
              {
                id: 'breadcrumb',
                pid: 'compannt',
                name: '面包屑',
                children: []
              }, 
            ]
          }, 

        ]
      }
    },
    methods: {
      ...mapActions(['setCurrentProcedure']),
      tagSelect (e, item) {
        // 对标签的显示进行处理
        if (item.children && item.children.length > 0) {
          let display = e.currentTarget.parentNode.querySelector('ul').style.display
          if (this.selectItem.pid === item.id) {
            if (display === 'none' || display === '') {
              e.currentTarget.parentNode.querySelector('ul').style.display = 'block'
            } else {
              e.currentTarget.parentNode.querySelector('ul').style.display = 'none'
            }
          } else {
            this.selectItem.pid = item.id
            this.selectItem.id = ''
            if (display === 'none' || display === '') {
              e.currentTarget.parentNode.querySelector('ul').style.display = 'block'
            } else {
              e.currentTarget.parentNode.querySelector('ul').style.display = 'none'
            }
          }
          // 对下拉标签或上收标签进行处理
          if (e.currentTarget.parentNode.querySelector('.down-item')) {
            e.currentTarget.parentNode.querySelector('.down-item').className = 'up-item'
          } else if (e.currentTarget.parentNode.querySelector('.up-item')) {
            e.currentTarget.parentNode.querySelector('.up-item').className = 'down-item'
          }
        } else {
          if (item.children) {
            this.selectItem.pid = item.id
            this.selectItem.id = ''
            if (!item.id.endsWith('none')) {
              router.push({name: item.id})
            } else {
              this.$notify({
                title: '警告',
                message: '该功能暂未开放，敬请期待',
                type: 'warning'
              });
            }
          } else {
            this.selectItem.pid = item.pid
            this.selectItem.id = item.id
            if (!item.id.endsWith('none')) {
                router.push({name: item.id})
            } else {
              this.$message({
                type: 'info',
                message: '该功能暂未开放，敬请期待'
              })
            }
          }
        }
      },
     
    },
    created () {


    },
    mounted () {
    },
    beforeMount() {
        this.$Lazyload.config({
            loading: loading,
            error:error
        })
    },
  }
</script>


<style scoped>
  @media only screen and (max-width: 1450px) {

    .item-container span{
      left: 0.4rem !important;
    }
    .down-item {
      right: 0.12rem !important;
    }
    .up-item {
      right: 0.12rem !important;
    }

    .icon-child{
      left: 0.4rem !important;
    }
  }
   .item-container{
    width: 100%;
    height: 0.5rem;
    background: #fff;
    border-bottom: 1px solid rgba(198, 200, 202, 0.445);
    /*color: #87aef8;*/
  }
  .menu-list-container{
    width: 100%;
    height: 100%;
    overflow-y:scroll;
    overflow-x: hidden;
  }
  .object{
    width: 100%;
    height: 18%;
    text-align: center;
    border-bottom: 1px solid rgba(198, 200, 202, 0.445);
  }
  .object img {
    width: 30%;
    padding-top: 10%;
    margin: 0 auto;
    display: block;
  } 

  ul {
    list-style-type: none;
    padding:0 !important;
  }
  .menu-list-wrap{
    width: 100%;
    margin-top: 0px;
  }
  .menu-list-wrap li{
    width: 100%;
    height: auto;
    position: relative;
    cursor: pointer;
    display: inline-block;
    float: left;
  }

  .item-container span{
    display: inline-block;
    font-size: 0.16rem;
    font-weight:600;
    line-height:28px;
    letter-spacing:1px;
    position: absolute;
    height: 0.25rem;
    top: 0.13rem;
    left: 0.35rem;
    line-height: 0.25rem;
  }
  .span-blue2{
    color: #0057a8;
  }
  .span-blue{
    color: white;
  }
  .span-white{
    color: #464c5b;
  }
  .select-item{

  }
  .item-tag ul{
    display: none;
  }
  .item-tag li{
    height: 0.5rem;
    width: 100%;
    border-bottom: 1px solid rgba(198, 200, 202, 0.445);
  }
  .down-item {
    display: inline-block;
    width: 6px;
    height: 12px;
    position: absolute;
    top: calc((.5rem - 12px)/2);
    right: .6rem;
    background: url("../../assets/img/leftMenu/down-icon.png") no-repeat;
  }
  .up-item {
    display: inline-block;
    width: 12px;
    height: 6px;
    position: absolute;
    top: calc((.5rem - 6px)/2);
    right: .6rem;
    background: url("../../assets/img/leftMenu/up-icon.png") no-repeat;
  }
  .icon-child{
    display: inline-block;
    font-size: 0.16rem;
    font-weight:600;
    line-height:28px;
    letter-spacing:1px;
    position: absolute;
    height: 0.25rem;
    top: 0.13rem;
    left: 0.35rem;
    line-height: 0.25rem;
  }
  /*滚动条样式*/
  ::-webkit-scrollbar {
    width: 5px;
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #EFF4F8;
  } 
  ::-webkit-scrollbar {
    background-color: #003E8F;
  }
  ::-webkit-scrollbar-thumb:horizontal{
    background-color:#fff !important;
    border-radius:0px;
    border: 1px solid #aaa
  }
</style>

