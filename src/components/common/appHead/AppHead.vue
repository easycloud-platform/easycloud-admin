<template>
  <div class="header">
   <span class="title" >{{this.$global.appName}}</span>
     <!-- <span class="now-time"><number-set :numbers="nowTime" :scale="0.5"></number-set></span> -->
    <img :src="userPhoto" id="userAvatar" @click="logout" class="photo" />
     <span class="userName" @click="logout" :title="userName">{{userName}}</span>
  </div>
</template>

<script>
  import * as api from '@/axios/api.js'
  import * as Util from '@/utils/util.js'
  import router from '@/router/index'
  import Cookies from 'js-cookie'
  import NumberSet from '@/components/numberSet/NumberSet'
  import loading from '@/assets/img/common/loading.svg'
  import error from '@/assets/img/common/404.jpg'
  import UserImg from '@/assets/img/appHeader/user.png'
  export default {
    components: {NumberSet},
    data () {
      return {
        loginState:false,
        userName: '您还没有登录',
        userPhoto: UserImg,
        nowTime: ''
      }
    },
    methods: {
    	logout () {
          let that = this
          if(that.loginState){
            that.$confirm('确定要退出当前账号吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                localStorage.removeItem('user')
                that.$router.push('login')
              }).catch(() => {     
            })
          }else{
            router.push('login')
          }
      }
    },
    computed: {

    },
    mounted () {
      var that = this
      if(localStorage.getItem('user')==null||localStorage.getItem('user')==undefined){
        that.$notify({
            title: '警告',
            message: '您还没有进行登录哟',
            type: 'warning'
        });
      }else{
        let user = JSON.parse(localStorage.getItem('user'))
        that.userName = user.name
        that.userPhoto = user.photo
        that.loginState = true
      }
     
      setInterval(function () {
        that.nowTime = Util.formatDate('yyyy-MM-dd hh:mm:ss', new Date())
      }, 1000)
    } ,
      beforeMount() {
        this.$Lazyload.config({
            loading: loading,
            error:error
        })
    },
  }
</script>
<style scoped>
  .header {
    position: relative;
    width: 100%;
    height: 0.6rem;
    margin: 0;
    background-color: #003E8F;
    box-shadow:0px 1px 4px 0px rgba(0,0,0,0.24);
  }


  .header .logo {
    width: 0.5rem;
    padding: 0.05rem 0.1rem;
    cursor: pointer;
    float: left;
  } 

  .header .title{
    line-height: 0.6rem;
    color: #fff;
    font-weight: bold;
    font-size: 0.25rem;
    float:left;
    margin-left: 2%;
    cursor: pointer;
  }

  ul {
    width: auto;
    display: inline-block;
    padding: 0rem;
    margin-left: 1.5rem;
  }

  ul li {
    float: left;
    height: 0.5rem;
    line-height: 0.5rem;
    width: 1.8rem;
    text-align: center;
    font-size: 0.2rem;
    list-style-type:none;
    color:#ACCCED;
    cursor:pointer;
  }

  .active {
    background-color: #FFFFFF;
    color:#4A88BB;
  }
  .dashboard{
    width: 1.2rem;
    height: 0.35rem;
    position: absolute;
    top: 0.16rem;
    right: 2.0rem;
    cursor: pointer;
  }
  .photo {
    width: 0.35rem;
    height: 0.35rem;
    position: absolute;
    top: 0.14rem;
    right: 12%;
    border-radius: 0.175rem;
    cursor: pointer;
  }
 
  .userName{
    font-size: 0.12rem;
    display: block;
    top: 0.23rem;
    color: white;
    position: absolute;
    right: 1%;
    cursor: pointer;
    width: 1.2rem;
    height: 0.35rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .userName:hover { /* 使用伪状态好像冒号两边都不能有空格 */
  	 text-decoration:underline;
  }

  .now-time {
    position: relative;
    display: block;
    left: 7.2rem;
    top: -0.67rem;
    
  }

  .screen-img {
    width: 0.35rem;
    height: 0.35rem;
     display: block;
    position: absolute;
    top: 0.14rem;
    right: 0.1rem;
    cursor: pointer;
  }

  .help {
    height: 0.2rem;
    position: absolute;
    top: 0.25rem;
    right: 0.4rem;
    cursor: pointer;
  }
	

</style>

