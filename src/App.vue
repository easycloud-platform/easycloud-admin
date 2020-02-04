<template>
  <div id="app">
    
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

  <style>
  @import 'assets/font/font.css';
  html, body {
          width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden;
  }
  #app {
    font-family:PingFangSC;
    width: 100%;
    height: 100%;
  }


  </style>