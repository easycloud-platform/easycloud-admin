<template>
	<div class="myContainer">
        <div style="width:300px;height:300px">
            <img v-lazy="test" class="lazy-img-fadein" style="width:400px;">
        </div>
        <div style="width:300px;height:300px;margin:10px">
            <img v-lazy="test" class="lazy-img-fadein" style="width:400px;">
        </div>
        <div style="width:300px;height:300px;margin:10px">
            <img v-lazy="test" class="lazy-img-fadein" style="width:400px;">
        </div>
          <div style="width:300px;height:300px;margin:10px">
            <img v-lazy="test" class="lazy-img-fadein" style="width:400px;">
        </div>
          <div style="width:300px;height:300px;margin:10px">
            <img v-lazy="test" class="lazy-img-fadein" style="width:400px;">
        </div>
          <div style="width:300px;height:300px;margin:10px">
            <img v-lazy="test" class="lazy-img-fadein" style="width:400px;">
        </div>
          <div style="width:300px;height:300px;margin:10px">
            <img v-lazy="test" class="lazy-img-fadein" style="width:400px;">
        </div>
          <div style="width:300px;height:300px;margin:10px">
            <img v-lazy="test" class="lazy-img-fadein" style="width:400px;">
        </div>
    </div>
</template>

<script>


import loading from '@/assets/img/common/loading.svg'
import error from '@/assets/img/common/404.jpg'
export default {
	data() {
		return {
            test:'https://img.yzcdn.cn/vant/apple-3.jpg'
        };
	},
	mounted(){
       
	},
	methods:{
      
        
    },
    beforeMount() {
        this.$Lazyload.config({
            loading: loading,
            error:error
        })
    },
    
};
</script>

<style scoped>
  .myContainer{
      background: black;
     
  }
  
   
</style>
