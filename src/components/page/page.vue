<template>
  <div class="container">
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="reqData.pageSize"
        @current-change="handleCurrentChange"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
  import router from '../../router/index'
  import * as api from '../../axios/api'
  export default {
    name: 'page',
    data () {
      return {
       list: [],
            treeList: [],
            reqData: {
              pageNum: 1,
              pageSize: 4,
              title: "",
            },
            total: 100
       }
    },
    methods: {

    },
    created () {

    },
    mounted () {

    }
  }
</script>

<style scoped>

</style>
