<template>
  <div class="game-blocks">
    <div class="colour-block" id="colour-block-1" :style="{ backgroundColor : values[0] }">
      <p class="colour-name">{{ names[0] }}</p>
      <p class="colour-value">{{ values[0] }}</p>
    </div>
    <div class="colour-block" id="colour-block-2" :style="{ backgroundColor : values[1] }">
      <p class="colour-name">{{ names[1] }}</p>
      <p class="colour-value">{{ values[1] }}</p>
    </div>
    <div class="colour-block" id="colour-block-3" :style="{ backgroundColor : values[2] }">
      <p class="colour-name">{{ names[2] }}</p>
      <p class="colour-value">{{ values[2] }}</p>
    </div>
    <div class="colour-block" id="colour-block-4" :style="{ backgroundColor : values[3] }">
      <p class="colour-name">{{ names[3] }}</p>
      <p class="colour-value">{{ values[3] }}</p>
    </div>
  </div>


</template>

<script>
  import colors from "./assets/pantone-colors.json";

  export default {
    data() {
      return {
        names : [],
        values : []
        }
    },
    methods: {
      setNamesAndValues() {
        let index = 0;
        for (let i = 0; i < 4; i++) {
          index = Math.floor(Math.random() * colors['names'].length);
          this.names.push(colors['names'][index]);
          this.values.push(colors['values'][index]);
        }
        return
      }
    },

    mounted() {
      this.setNamesAndValues();
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
