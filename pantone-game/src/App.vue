<script setup>
  import ConfettiExplosion from "vue-confetti-explosion";
</script>

<template>
  <div class="game-body">
    <h1 id="title">Pantone Pandamonium</h1>
    <div id="explainer">
      <p>Match the Pantone(tm) colour to the colour block and earn a point. 10 points wins!</p>
      <p>Current game mode: {{ gameModeMap.get(gameMode) }}</p>
    </div>
    <div id="button-control">
      <button class="game-button" @click = "setEasyMode()" id="easy-mode">Easy mode</button>
      <button class="game-button" @click = "reset()" id="reset">Reset</button>
      <button class="game-button" @click = "setHardMode()" id="hard-mode">Hard mode</button>
    </div>
    <div class="game-blocks">
      <ConfettiExplosion v-if="showConfetti"/>
      <div class="colour-and-name" v-for="(value, index) in values" :key="index">
          <div class="correct-block" :class = "{ hidden: !correctnessArray[index]}">🟩</div>
          <div
          class="colour-block"
          :id="'colour-block-' + index"
          :style="{ backgroundColor : values[index]}"
          @click.once ="enableClick && checkAnswer($event)">
          </div>

          <p
          class="colour-name"
          :id="'cn-' + index"
          :class = "{ hidden: !showNames[index]}">
          {{ names[index] }}
          </p>
      </div>
      <ConfettiExplosion v-if="showConfetti"/>
    </div>
    <div class="progress-bar">
        <div class="progress-bar__value" :style="{width : progressWidth + '%'}"></div>
    </div>
    <p id="current-streak"> {{ currentStreak }} / 10 </p>
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
        showNames : [false, false, false, false],
        totalCorrect: 0,
        largestStreak: 0,
        currentStreak: 0,
        streakUnbroken : true,
        progressWidth : 0,
        goodEmojis : ["😀", "😊", "🙂", "😸", "🐮"],
        badEmojis : ["😠", "😔", "😡", "😟", "😥"],
        enableClick: true,
        showConfetti : false,
        gameModeMap : new Map([
          ["Normal", "Correct guesses get +1. Bad guesses cut your score in half"],
          ["Easy", "Correct guesses get +1. Bad guesses get -1."],
          ["Hard", "Correct guesses get +1. Bad guesses cut your score in half. Colours are always similar."]
        ]),
        gameMode: ""
        }
    },
    methods: {
      setEasyMode() {
        this.gameMode = "Easy";
        localStorage.setItem("gameMode", "Easy");
        location.reload();
        return;
      },

      setHardMode() {
        this.gameMode = "Hard";
        localStorage.setItem("gameMode", "Hard");
        this.currentStreak = 0;
        localStorage.setItem("currentStreak", this.currentStreak);
        this.progressWidth = 0;
        localStorage.setItem("progressWidth", this.progressWidth);
        location.reload();
        return;
      },
      reset() {
        this.currentStreak = 0;
        localStorage.setItem("currentStreak", this.currentStreak);
        this.progressWidth = 0;
        localStorage.setItem("progressWidth", this.progressWidth);
        this.gameMode = "Normal";
        localStorage.setItem("gameMode", "Normal");
        location.reload();
      },

      setNamesAndValues() {
        console.log("the game mode is:");
        console.log(localStorage.getItem("gameMode"));
        console.log(this.gameMode);
        if (this.gameMode == "Hard") {
          this.setNamesAndValues_HardMode()
        } else {
          let index = 0;
          for (let i = 0; i < 4; i++) {
            index = Math.floor(Math.random() * colors['names'].length);
            this.names.push(colors['names'][index]);
            this.values.push(colors['values'][index]);
          }
          this.choice = Math.floor(Math.random() * 4);
          this.guessingName = this.names[this.choice].replace("-", " ");
          this.guessingName = this.guessingName.charAt(0).toUpperCase() + this.guessingName.slice(1);
        }
        return
      },

      setNamesAndValues_HardMode() {
        let index = Math.floor(Math.random() * colors['names'].length);
        if (index < 2) {
          index =+ 2;
        }
        if (index > colors['names'].length) {
          index =- 1;
        }
        for (let i = 0; i < 4; i++) {
          this.names.push(colors['names'][(index - 2) + i]);
          this.values.push(colors['values'][(index - 2) + i]);
        }
        this.choice = Math.floor(Math.random() * 4);
        this.guessingName = this.names[this.choice].replace("-", " ");
        this.guessingName = this.guessingName.charAt(0).toUpperCase() + this.guessingName.slice(1);
        return
      },

      checkAnswer(e) {
        let id = e["srcElement"]["id"];
        console.log(id);
        this.enableClick = false;

        if ((this.choice).toString() === id.charAt(id.length - 1)) {
          this.guessingName = this.goodEmojis[Math.floor(Math.random() * 5)];
          this.totalCorrect++;
          localStorage.setItem("totalCorrect", this.totalCorrect);
          this.currentStreak++;
          localStorage.setItem("currentStreak", this.currentStreak);
          this.progressWidth = (this.currentStreak / 10) * 100;
          localStorage.setItem("progressWidth", this.progressWidth);
          if (this.currentStreak > this.largestStreak) {
            this.largestStreak = this.currentStreak;
            localStorage.setItem("largestStreak", this.currentStreak);
          }
        } else {
          this.guessingName = this.badEmojis[Math.floor(Math.random() * 5)];
          if (this.currentStreak > 0) {
            this.currentStreak = Math.floor(this.currentStreak / 2);
            localStorage.setItem("currentStreak", this.currentStreak);
            this.progressWidth = (this.currentStreak / 10) * 100;
            localStorage.setItem("progressWidth", this.progressWidth);
          }

        }
        for (let i = 0; i < 4; i++) {
          if (i.toString() === id.charAt(id.length - 1)) {
            this.showNames[i] = true;
          }
        }
        this.correctnessArray[this.choice] = true;

        if (this.currentStreak == 10) {
            this.guessingName = "Congratulations!"
            this.showConfetti = true;
          } else {
            setTimeout("location.reload()", 2000);
            window.scrollTo(0, document.body.scrollHeight);
          }

        console.log(this.progressWidth);

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

        if (localStorage.getItem("gameMode")) {
          this.gameMode = localStorage.getItem("gameMode");
        } else {
          this.gameMode = "Normal";
          localStorage.setItem("gameMode", "Normal");
        }

        }
      },

    mounted() {
      this.setLocalStorage();
      this.setNamesAndValues();
      window.scrollTo(0, document.body.scrollHeight);
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

  .correct-block {
    text-align: center;
    font-size: 40px;
  }

  #current-streak {
    text-align: center;
    font-size: 20px;
    font-family: 'Courier New', Courier, monospace;
    margin-top: 20px;
  }

  #explainer {
    margin-bottom: 20px;
  }

  #guessing-name {
    display: flex;
    justify-content: center;
    width: 100%;
    font-family: 'Zilla Slab', serif;
    font-size: 80px;
    color: white;

  }

  .hidden {
    visibility: hidden;
  }

  .game-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }

  .correct-guess {
    border-color: #6ed475;
    border-width: 10px;
    border-style: solid;
  }

  .progress-bar {
    width: 100%;
    height: 3em;
    margin-top: 40px;
    border-radius: 10em;
    background-color: var(--color-background-soft);
    justify-content: center;
    overflow: hidden;
  }

  .progress-bar__value {
    height: 3em;
    border-radius: 10em;
    background-color: #A5CA77;
    transition: width 0.3s ease-in-out;
  }

  #button-control {
    display: flex;
    width: 100%;
    justify-content: space-around;
    margin-bottom: 20px;
  }

  .game-button {
    font-family: 'Courier New', Courier, monospace;
    background-color: var(--color-background);
    border-radius: 3px;
    border: solid var(--vt-c-divider-light-1);
    color: #6ed475;
    padding: 10px;
  }

  .game-button:hover {
    background-color: var(--color-background-soft);
    transition: background-color 0.2s ease-in-out;
  }

  #title {
    font-family: 'Zilla Slab', serif;
    color: whitesmoke;
    font-size: 60px;
  }
</style>
