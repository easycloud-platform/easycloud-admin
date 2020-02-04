<template>
  <div class="digital" :style="digitialStyle">
    <!--第1条横线-->
    <div class="span-container span-container1" v-if="validate([0,2,3,5,6,7,8,9])"
         :style="getContainerStyle('horizontal', 0, 0)">
      <span class="d-before" :style="getSpanBorderStyle(11)"></span>
      <span class="d" :style="getSpanStyle('horizontal')"></span>
      <span class="d-after" :style="getSpanBorderStyle(21)"></span>
    </div>
    <!--第2条横线-->
    <div class="span-container span-container2" v-if="validate([2,3,4,5,6,8,9])"
         :style="getContainerStyle('horizontal', this.sideHeightLength + this.thickness*2, this.thickness/2)">
      <span class="d-before" :style="getSpanBorderStyle(51)"></span>
      <span class="d" :style="getSpanStyle('horizontal')"></span>
      <span class="d-after" :style="getSpanBorderStyle(52)"></span>
    </div>
    <!--第3条横线-->
    <div class="span-container span-container3" v-if="validate([0,2,3,5,6,8,9])"
         :style="getContainerStyle('horizontal', (this.sideHeightLength + this.thickness*2)*2, 0)">
      <span class="d-before" :style="getSpanBorderStyle(32)"></span>
      <span class="d" :style="getSpanStyle('horizontal')"></span>
      <span class="d-after" :style="getSpanBorderStyle(42)"></span>
    </div>
    <!--第1条竖线-->
    <div class="span-container span-container4" v-if="validate([0,4,5,6,8,9])"
         :style="getContainerStyle('vertical', this.thickness/2, 0)">
      <span class="d-before" :style="getSpanBorderStyle(12)"></span>
      <span class="d" :style="getSpanStyle('vertical')"></span>
      <span class="d-after" :style="getSpanBorderStyle(31)"></span>
    </div>
    <!--第2条竖线-->
    <div class="span-container span-container5" v-if="validate([0,2,6,8])"
         :style="getContainerStyle('vertical', this.sideHeightLength + this.thickness*5/2, 0)">
      <span class="d-before" :style="getSpanBorderStyle(12)"></span>
      <span class="d" :style="getSpanStyle('vertical')"></span>
      <span class="d-after" :style="getSpanBorderStyle(31)"></span>
    </div>
    <!--第3条竖线-->
    <div class="span-container span-container6" v-if="validate([0,1,2,3,4,7,8,9])"
         :style="getContainerStyle('vertical', this.thickness/2, this.sideWidthLength + this.thickness)">
      <span class="d-before" :style="getSpanBorderStyle(22)"></span>
      <span class="d" :style="getSpanStyle('vertical')"></span>
      <span class="d-after" :style="getSpanBorderStyle(41)"></span>
    </div>
    <!--第4条竖线-->
    <div class="span-container span-container7" v-if="validate([0,1,3,4,5,6,7,8,9])"
         :style="getContainerStyle('vertical', this.sideHeightLength + this.thickness*5/2, this.sideWidthLength + this.thickness)">
      <span class="d-before" :style="getSpanBorderStyle(22)"></span>
      <span class="d" :style="getSpanStyle('vertical')"></span>
      <span class="d-after" :style="getSpanBorderStyle(41)"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Digital',
    props: {
      scale: {
        type: Number,
        default: 1
      },
      thick: {
        type: Number,
        default: 5
      },
      sideHeight: {
        type: Number,
        default: 6
      },
      sideWidth: {
        type: Number,
        default: 10
      },
      shadowColor: {
        type: String,
        default: '#3665c5'
      },
      background: {
        type: String,
        default: '#fff'
      },
      value: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
      }
    },
    mounted (){
    },
    methods: {
      validate(arr){
        return arr.indexOf(this.value) > -1;
      },
      _getBorderStyle(type, thickness){
        var n = thickness ? thickness : this.thickness;
        switch (type) {
          case "solid":
            return n + 'px  solid ' + this.background;
          case "none":
            return n + 'px  solid transparent';
        }
      },
      getSpanStyle(type){
        var style = {
          background: '#fff',
          height: 0,
          width: 0
        }
        switch (type) {
          case 'horizontal':
            style.height = this.thickness + 'px';
            style.width = this.sideWidthLength + 'px';
            break;
          case 'vertical':
            style.width = this.thickness + 'px';
            style.height = this.sideHeightLength + 'px';
            break;
        }
        return style;
      },
      getSpanBorderStyle(type){
        var style = {};
        switch (type) {
          case 11: // 左上角-上
            style['border-top'] = this._getBorderStyle('solid');
            style['border-left'] = this._getBorderStyle('none');
            break;
          case 12: // 左上角-下
            style['border-top'] = this._getBorderStyle('none');
            style['border-left'] = this._getBorderStyle('solid');
            break;
          case 21: // 右上角-上
            style['border-top'] = this._getBorderStyle('solid');
            style['border-right'] = this._getBorderStyle('none');
            break;
          case 22: // 右上角-下
            style['border-top'] = this._getBorderStyle('none');
            style['border-right'] = this._getBorderStyle('solid');
            break;
          case 31: // 左下角-上
            style['border-left'] = this._getBorderStyle('solid');
            style['border-bottom'] = this._getBorderStyle('none');
            break;
          case 32: // 左下角-下
            style['border-left'] = this._getBorderStyle('none');
            style['border-bottom'] = this._getBorderStyle('solid');
            break;
          case 41: // 右下角-上
            style['border-bottom'] = this._getBorderStyle('none');
            style['border-right'] = this._getBorderStyle('solid');
            break;
          case 42: // 右下角-下
            style['border-bottom'] = this._getBorderStyle('solid');
            style['border-right'] = this._getBorderStyle('none');
            break;
          case 51: // 中-左
            style['border-top'] = this._getBorderStyle('none', this.thickness / 2);
            style['border-bottom'] = this._getBorderStyle('none', this.thickness / 2);
            style['border-right'] = this._getBorderStyle('solid', this.thickness / 2);
            break;
          case 52: // 中-右
            style['border-top'] = this._getBorderStyle('none', this.thickness / 2);
            style['border-bottom'] = this._getBorderStyle('none', this.thickness / 2);
            style['border-left'] = this._getBorderStyle('solid', this.thickness / 2);
            break;
        }
        return style;
      },
      getContainerStyle(type, top, left){
        var style = {};
        switch (type) {
          case 'horizontal':
            style.height = this.thickness + 'px';
            style.width = this.sideWidthLength + this.thickness * 2 + 'px';
            break;
          case 'vertical':
            style.width = this.thickness + 'px';
            style.height = this.sideHeightLength + this.thickness * 2 + 'px';
            break;
        }
        style.top = top + 'px';
        style.left = left + 'px';
        style['box-shadow'] = this.shadowColor ? '0 0 ' + this.sideWidthLength * 2 + 'px ' + this.shadowColor : 'none';
        return style;
      }
    },
    computed: {
      sideWidthLength(){
        return this.sideWidth * this.scale;
      },
      sideHeightLength(){
        return this.sideHeight * this.scale;
      },
      thickness(){
        return this.thick * this.scale;
      },

      digitialStyle(){
        return {
          width: (this.sideWidthLength + this.thickness * 2) + 'px',
          height: (this.sideHeightLength * 2 + this.thickness * 5) + 'px',
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .digital {
    position: relative;
    display: inline-block;
    text-align: left;
  }

  .span-container {
    display: inline-block;
    position: absolute;
  }

  .span-container span {
    float: left;
  }

</style>
