<template>
  <div class="game-body">
    <p>Total correct: {{ totalCorrect }}</p>
    <p>Highest streak: {{ largestStreak }}</p>
    <p>Current streak: {{ currentStreak }}</p>
    <div class="progress-bar">
        <div class="progress-bar__value" :style="{width : progressWidth+'px'}"></div>
    </div>
    <div class="game-blocks">
      <div class="colour-and-name">
        <div class="colour-block" :class="{'correct-guess': correctnessArray[0]}" id="colour-block-0" :style="{ backgroundColor : values[0] }" @click ="checkAnswer($event)"></div>
        <p class="colour-name" id="cn-0">{{ colourName[0] }}</p>
      </div>
      <div class="colour-and-name">
        <div class="colour-block" :class="{'correct-guess': correctnessArray[1]}" id="colour-block-1" :style="{ backgroundColor : values[1] }" @click ="checkAnswer($event)"></div>
        <p class="colour-name" id="cn-1">{{ colourName[1] }}</p>
      </div>
      <div class="colour-and-name">
        <div class="colour-block" :class="{'correct-guess': correctnessArray[2]}" id="colour-block-2" :style="{ backgroundColor : values[2] }" @click ="checkAnswer($event)"></div>
        <p class="colour-name" id="cn-2">{{ colourName[2] }}</p>
      </div>
      <div class="colour-and-name">
        <div class="colour-block" :class="{'correct-guess': correctnessArray[3]}" id="colour-block-3" :style="{ backgroundColor : values[3] }" @click ="checkAnswer($event)"></div>
        <p class="colour-name" id="cn-3">{{ colourName[3] }}</p>
      </div>

    </div>
    <p id="guessing-name"> {{ guessingName }}</p>
    <p id="verdict"> {{ verdict }} </p>
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
        verdict : "",
        correctnessArray : [false, false, false, false],
        colourName : ["", "", "", ""],
        totalCorrect: 0,
        largestStreak: 0,
        currentStreak: 0,
        streakUnbroken : true,
        progressWidth : 0,
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
          this.guessingName = "Correct!";
          this.totalCorrect++;
          localStorage.setItem("totalCorrect", this.totalCorrect);
          this.currentStreak++;
          localStorage.setItem("currentStreak", this.currentStreak);
          this.progressWidth = (this.currentStreak / 30) * 500;
          localStorage.setItem("progressWidth", this.progressWidth);
          if (this.currentStreak > this.largestStreak) {
            this.largestStreak = this.currentStreak;
            localStorage.setItem("largestStreak", this.currentStreak);
          }
        } else {
          // let actualChoice = this.names[(id.charAt(id.length -1))];
          // actualChoice = actualChoice.replace("-", " ");
          // actualChoice = actualChoice.charAt(0).toUpperCase() + actualChoice.slice(1);
          this.guessingName = "Incorrect!";
          this.currentStreak = 0;
          localStorage.setItem("currentStreak", 0);
          this.progressWidth = 0;
          localStorage.setItem("progressWidth", 0);
        }
        for (let i = 0; i < 4; i++) {
          // if (i === this.choice) {
          //   this.correctnessArray[i] = true;
          // }
          if (i.toString() === id.charAt(id.length - 1)) {
            this.colourName[i] = this.names[i];
          }
        }
        setTimeout("location.reload()", 2000);
        return
      },

      setLocalStorage() {
        if (localStorage.getItem("totalCorrect")) {
          this.totalCorrect = localStorage.getItem("totalCorrect");
        } else {
          this.totalCorrect = 0;
          localStorage.setItem("totalCorrect", 0);
        }
        if (localStorage.getItem("largestStreak")) {
          this.largestStreak = localStorage.getItem("largestStreak");
        } else {
          this.largestStreak = 0;
          localStorage.setItem("largestStreak", 0);
        }

        if (localStorage.getItem("currentStreak")) {
          this.currentStreak = localStorage.getItem("currentStreak");
        } else {
          this.currentStreak = 0;
          localStorage.setItem("currentStreak", 0);
        }

        if (localStorage.getItem("progressWidth")) {
          this.progressWidth = localStorage.getItem("progressWidth");
        } else {
          this.progressWidth = 0;
          localStorage.setItem("progressWidth", 0);
        }
      }
    },

    mounted() {
      this.setNamesAndValues();
      this.setLocalStorage();
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

  .colour-and-name {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .colour-name {
    text-align: center;
    font-family: 'Courier New', Courier, monospace;
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
    justify-content: center;
  }

  .correct-guess {
    border-color: #6ed475;
    border-width: 10px;
    border-style: solid;
  }

  .progress-bar {
    width: 500px;
    height: 3em;
    border-radius: 10em;
    background-color: black;
  }

  .progress-bar__value {
    height: 3em;
    border-radius: 10em;
    background-color: red;
  }
</style>
