<template>
  <div class="symbol">
    <span class="symbol-span" :style="spanStyle">{{value}}</span>
  </div>
</template>

<script>
  export default {
    name: 'NumberSymbol',
    props: {
      scale: {
        type: Number,
        default: 1
      },
      size: {
        type: Number,
        default: 40
      },
      value: {
        type: String,
        default: ','
      },
      color: {
        type: String,
        default: '#fff'
      },
      shadowColor: {
        type: String,
        default: '#3665c5'
      }
    },
    data () {
      return {}
    },
    computed: {
      spanStyle(){
        var style = {
          color: this.color,
          fontSize: this.size * this.scale + 'px',
//          'box-shadow':  this.shadowColor ? '0 0 ' + this.size* this.scale + 'px ' + this.shadowColor : 'none',
          'line-height': this.size * this.scale + 'px',
        }
        switch (this.value) {
          case ':':
            style.top = -this.size * this.scale * 0.125 + 'px';
            break;
          case ' ':
            style.width = this.size * this.scale * 0.5 + 'px';
            break;
          case '-':
            style.top = -this.size * this.scale * 0.125 + 'px';
            break;
        }
        return style;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .symbol {
    height: 100%;
  }

  .symbol-span {
    display: inline-block;
    height: 100%;
    position: relative;
  }
</style>
