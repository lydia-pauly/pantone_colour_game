<script setup>
  import ConfettiExplosion from "vue-confetti-explosion";
</script>

<template>
  <div class="game-body">
    <div class="game-blocks">
      <ConfettiExplosion v-if="showConfetti"/>
      <div class="colour-and-name">
        <div class="correct-block" :class = "{ hidden: !correctnessArray[0]}">🟩</div>
        <div
        class="colour-block"
        id="colour-block-0"
        :style="{ backgroundColor : values[0]}"
        @click.once ="enableClick && checkAnswer($event)">
        </div>

        <p
        class="colour-name"
        id="cn-0"
        :class = "{ hidden: !showNames[0]}">
        {{ names[0] }}
        </p>

      </div>
      <div class="colour-and-name">
        <div class="correct-block" :class = "{ hidden: !correctnessArray[1]}">🟩</div>
        <div
        class="colour-block"
        id="colour-block-1"
        :style="{ backgroundColor : values[1] }"
        @click.once ="enableClick && checkAnswer($event)">
        </div>

        <p class="colour-name"
        id="cn-1"
        :class = "{ hidden: !showNames[1]}">
        {{ names[1] }}
        </p>

      </div>
      <div class="colour-and-name">
        <div class="correct-block" :class = "{ hidden: !correctnessArray[2]}">🟩</div>
        <div
        class="colour-block"
        id="colour-block-2"
        :style="{ backgroundColor : values[2] }"
        @click.once ="enableClick && checkAnswer($event)">
        </div>

        <p class="colour-name"
        id="cn-2"
        :class = "{ hidden: !showNames[2]}">
        {{ names[2] }}
        </p>

      </div>
      <div class="colour-and-name">
        <div class="correct-block" :class = "{ hidden: !correctnessArray[3]}">🟩</div>
        <div class="colour-block"
        id="colour-block-3"
        :style="{ backgroundColor : values[3]}"
        @click.once ="enableClick && checkAnswer($event)">
        </div>

        <p class="colour-name"
        id="cn-3"
        :class = "{ hidden: !showNames[3]}">
        {{ names[3] }}
        </p>

      </div>
    </div>
    <div class="progress-bar">
        <div class="progress-bar__value" :style="{width : progressWidth+'%'}"></div>
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
            this.showConfetti = true;
            this.guessingName = "Congratulations!"
          } else {
            setTimeout("location.reload()", 2000);
          }
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
    background-color: black;
    justify-content: center;
  }

  .progress-bar__value {
    height: 3em;
    border-radius: 10em;
    background-color: #A5CA77;
  }
</style>
