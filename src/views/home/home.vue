<template>
  <div class="container">
     
  </div>
</template>
<script>
import * as api from '@/axios/api.js'
import router from '../../router';
import * as Util from '@/utils/util.js'
import drawer from '@/components/drawer/drawer'
  export default {
      name:'home',
    data () {
      return {
      }
    },
    components: {
        drawer
    },
    created(){
        console.log('页面开始进行缓存')
    },
    mounted() {
      
    },
    methods: {
        
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .container{
    width:100%;
    height:100%;
  }

</style>
<style>
  
</style>