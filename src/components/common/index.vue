<template>
  <div class="div-wrp">
    
    <div style="width: 100%;height: 100%;background: #ecf1f7;overflow: hidden;">
    <div class="menu-warp">
      <LeftMenu></LeftMenu>
    </div>
    <div class="main-warp">
      <AppHead></AppHead>
      <BreadCrumb></BreadCrumb>
      <keep-alive include="home">
        <router-view  v-if="isRouterAlive"/>
      </keep-alive>
    </div>
    </div>
  </div>
</template>

<script>
  import AppHead from './appHead/AppHead'
  import LeftMenu from './LeftMenu'
  import BreadCrumb from './BreadCrumb'
  export default {
    provide () {
      return {
        reload: this.reload
      }
    },
    components: {
      AppHead,
      LeftMenu,
      BreadCrumb,
    
    },
    data () {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      reload () {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      }
    },
    created () {

    },
    mounted () {

    },
    computed: {

    },
    watch: {
    
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .div-wrp {
    margin: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    overflow: hidden;
  }
  .menu-warp{
    width: 2rem;
    height: 100%;
    font-family:PingFangSC;
    background:rgba(255,255,255,1);
    box-shadow:3px 0px 6px 0px rgba(0,0,0,0.42);
    display: inline-block;
    float: left;
  }
  .main-warp {
    height: 100%;
    overflow: hidden;
  }
</style>

