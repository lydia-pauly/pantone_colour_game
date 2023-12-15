<template>
  <div class="colour-block">
    <p>{{ color.colorName }}</p>
  </div>

</template>

<script>
  import colors from "./assets/pantone-colors.json";
  console.log(colors);

  export default {
    data() {
      return {
        color : {
          index : Math.floor(Math.random() * colors['names'].length),
          colorName : colors['names'][this.index],
          valueHex : colors['values'][this.index]
        }
      }
    },
    computed : {
      
    }
    }
</script>

<style>
  .colour-block {
    width: 100px;
    height: 100px;
    background-color: v-bind(valueHex);
  }
</style>
