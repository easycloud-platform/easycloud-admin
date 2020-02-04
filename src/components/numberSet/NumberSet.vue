<template>
  <div class="NumberSet">
    <div class="number-container" v-for="item in numbers">
      <digital class="number-item" v-if="validateNumber(item)" :value="parseInt(item)" :scale="scale" :shadowColor="shadowColor"></digital>
      <number-symbol class="number-item number-item-symbol" v-if="validateSymbol(item)" :value="item" :scale="scale" :shadowColor="shadowColor"></number-symbol>
    </div>

  </div>
</template>

<script>
  import Digital from './Digital'
  import NumberSymbol from './NumberSymbol'
  export default {
    components: {
      NumberSymbol,
      Digital
    },
    name: 'NumberSet',
    props: {
      scale: {
        type: Number,
        default: 1
      },
      shadowColor: {
        type: String,
        default: '#3665c5'
      },
      numbers: {
        type: String,
        default: '0'
      }
    },
    data () {
      return {
      }
    },
    mounted () {

    },
    methods: {
      initialValue(numbers, scale, shadowColor){
        this.scale = scale;
        this.shadowColor = shadowColor;
        this.numbers = numbers;
      },
      validateNumber(value){
        var reg = new RegExp(/^[0-9]$/);
        return reg.test(value);
      },
      validateSymbol(value){
        var reg = new RegExp(/^[,:\s-]$/);
        return reg.test(value);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .number-container {
    display: inline-block;
  }

  .number-item {
    margin-left: 5px;
  }
  .number-item-symbol{
    margin-left: 3px;
    margin-right: -3px;
  }
</style>
