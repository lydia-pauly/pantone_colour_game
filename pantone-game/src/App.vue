<template>
  <div class="game-blocks">
    <div class="colour-block" id="colour-block-1" :style="{ backgroundColor : value }">
      <p class="index-value"> {{ index }}</p>
      <p class="colour-name">{{ name }}</p>
      <p class="colour-value">{{ value }}</p>
    </div>
    <div class="colour-block" id="colour-block-2" :style="{ backgroundColor : value }">
      <p class="index-value"> {{ index }}</p>
      <p class="colour-name">{{ name }}</p>
      <p class="colour-value">{{ value }}</p>
    </div>
    <div class="colour-block" id="colour-block-3" :style="{ backgroundColor : value }">
      <p class="index-value"> {{ index }}</p>
      <p class="colour-name">{{ name }}</p>
      <p class="colour-value">{{ value }}</p>
    </div>
    <div class="colour-block" id="colour-block-4" :style="{ backgroundColor : value }">
      <p class="index-value"> {{ index }}</p>
      <p class="colour-name">{{ name }}</p>
      <p class="colour-value">{{ value }}</p>
    </div>
  </div>


</template>

<script>
  import colors from "./assets/pantone-colors.json";

  export default {
    data() {
      return {
        index : Math.floor(Math.random() * colors['names'].length),
        value : 0,
        name : ""
        }
    },
    methods: {
      getColorValue() {
        this.value = colors['values'][this.index];
        return
      },
      getColorName() {
        this.name = colors['names'][this.index];
        return
      }
    },

    mounted() {
      this.getColorValue();
      this.getColorName();
    }
    }
</script>

<style>
  .colour-block {
    width: 200px;
    height: 200px;
    padding: 10px;
    margin: 10px;
  }

  .game-blocks {
    display: flex;
  }
</style>
