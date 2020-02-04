<template>
  <div class="breadCrumb-wrp" >
    <span class="text-bold">当前位置： </span>
    <el-breadcrumb  class="text-bold" style="display: inline-block; vertical-align: middle;" separator-class="el-icon-arrow-right">
      <!--普通面包屑的处理-->
      <el-breadcrumb-item  v-for="(item,index) in breadcrumbPathName" :key="index" :to="{'name':item}">
      	{{breadcrumbTitle[index]}}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div style="clear: both;width: 0;height: 0;"></div>
  </div>
</template>

<script> 
  import store from '@/vuex/store.js'

  export default {
    components: {
      // module1,
    },
    data () {
      return {
        test2: '',
      }
    },
    methods: {
      test3 () {

      },
    },
    created () {

    },
    mounted () {
    },
    computed: {
       breadcrumbTitle () {
       	 return store.state.breadcrumbTitle
       },
       breadcrumbPathName () {
       	 return store.state.breadcrumbPathName
       },
       breadcrumbFlag () {
       	 return store.state.breadcrumbFlag
       }
    },
    watch: {
      // ['test4'] () {

      // }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*@import url(../assets/css/test.css);*/
  .breadCrumb-wrp {
    font-size: 0.11rem;
    position: relative;
    width: 100%;
    height: 40px;
    padding-top: 0.2rem;
    padding-left: 0.2rem;
    /* z-index: 9999 */
  }

  .text-bold {
    font-size: 0.11rem;
    float: left;
    color: rgb(153,153,153);
    line-height: 1;
  }
  .breadCrumb-wrp >>> .el-breadcrumb__inner{
  	color: rgb(0,87,168);
  }
  .breadCrumb-wrp >>> .el-breadcrumb__item:last-child .el-breadcrumb__inner {
  	color: rgb(153,153,153) !important;
  }
</style>

