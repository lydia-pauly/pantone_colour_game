<template>
  <div class="game-body">
    <div class="game-blocks">
      <div class="colour-block" id="colour-block-0" :style="{ backgroundColor : values[0] }" @click ="checkAnswer($event)"></div>
      <div class="colour-block" id="colour-block-1" :style="{ backgroundColor : values[1] }" @click ="checkAnswer($event)"></div>
      <div class="colour-block" id="colour-block-2" :style="{ backgroundColor : values[2] }" @click ="checkAnswer($event)"></div>
      <div class="colour-block" id="colour-block-3" :style="{ backgroundColor : values[3] }" @click ="checkAnswer($event)"></div>
    </div>
    <p id="guessing-name"> {{ guessingName }}</p>
    <p id="verdict">{{ verdict }}</p>
  </div>
</template>

<script>
  import colors from "./assets/pantone-colors.json";

  export default {
    data() {
      return {
        names : [],
        values : [],
        choice : 0,
        guessingName : "",
        verdict : ""
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
        this.choice = Math.floor(Math.random() * 4);
        this.guessingName = this.names[this.choice].replace("-", " ");
        this.guessingName = this.guessingName.charAt(0).toUpperCase() + this.guessingName.slice(1);
        return
      },

      checkAnswer(e) {
        let id = e["srcElement"]["id"];
        if ((this.choice).toString() === id.charAt(id.length - 1)) {
          this.verdict = "Correct!";
        } else {
          let actualChoice = this.names[(id.charAt(id.length -1))];
          actualChoice = actualChoice.replace("-", " ");
          actualChoice = actualChoice.charAt(0).toUpperCase() + actualChoice.slice(1);
          this.verdict = "Wrong! That was " + actualChoice;
        }
        setTimeout("location.reload()", 1500);
        return
      }
    },

    mounted() {
      this.setNamesAndValues();
    }
    }
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cute+Font&family=Oswald:wght@500&family=Roboto+Condensed:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cute+Font&family=Zilla+Slab:wght@500&display=swap');

  .colour-block {
    width: 200px;
    height: 200px;
    padding: 10px;
    margin: 10px;
  }

  .game-blocks {
    display: flex;
    width: 100%;
  }

  #guessing-name {
    display: flex;
    justify-content: center;
    width: 100%;
    font-family: 'Zilla Slab', serif;
    font-size: 80px;
    color: white;

  }

  .game-body {
    display: flex;
    flex-direction: column;
  }
</style>
