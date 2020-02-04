<template>
	<div class="container">
        <div @click="back" class="back-btn" v-show="flag">
            <el-link icon="el-icon-back">返回上一页</el-link>    
        </div>
         <iframe :src="imgUrl" style="width:100%;height:93%;border:none;" id="show-iframe"></iframe>
        
    </div>
</template>

<script>
import * as api from '@/axios/api.js'
import router from '../../router'
export default {
	data() {
		return {
            imgUrl:'https://720yun.com/t/d2vkiefhO7w',
            flag:false
        };
	},
	mounted(){
        //  const oIframe = document.getElementById('show-iframe');
        //     const deviceWidth = document.documentElement.clientWidth;
        //     const deviceHeight = document.documentElement.clientHeight;
        //     oIframe.style.width = deviceWidth + 'px';
        //     oIframe.style.height = deviceHeight + 'px';
        let overview = this.$route.params.overview
        if(overview!=undefined&&overview!=null&&overview!=''){
            this.imgUrl = overview
            this.flag = true
        }
    },
    methods:{
        back(){
            router.go(-1)
        },
       
    },
};
</script>

<style scoped>

   
</style>
<style>
</style>