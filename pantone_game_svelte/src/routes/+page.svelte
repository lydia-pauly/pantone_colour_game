<script>
  //Import components from /lib
  import ColourSquare from "$lib/ColourSquare.svelte";
  import ColourNameGuess from "$lib/ColourNameGuess.svelte";
  import Score from "$lib/Score.svelte";

  //Import methods
  import { onMount } from "svelte";

  //Import data
  import colourJSON from "$lib/pantone-colors.json";

  //Initialise variables
  let hex_value_array = [];
  $: colour_name_array = [];
  let correct_answer = "";
  $: hidden = false;
  $: score = 0;
  $: guessing = true;
  $: correct = false;
  $: training_mode_toggle = "off";

  //Set up initial game state upon mount by selecting colours to guess and their respective names
  onMount(() => {
    setGame();
  });

  function setGame() {
    hex_value_array = [];
    colour_name_array = [];
    for (let step = 0; step < 4; step++) {
      let selector = Math.floor(Math.random() * colourJSON["names"].length);
      hex_value_array = [...hex_value_array, colourJSON["values"][selector]];
      colour_name_array = [...colour_name_array, colourJSON["names"][selector]];
    }
    correct_answer = colour_name_array[Math.floor(Math.random() * 4)];
    guessing = true;
  }

  function randomiser(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function changeHiddenProperty() {
    if (hidden) {
      training_mode_toggle = "off";
      setGame();
    } else {
      training_mode_toggle = "on";
      score = 0;
    }
    hidden = !hidden;
  }

  function checkAnswer(correct_answer, colour_name) {
    guessing = false;
    if (correct_answer === colour_name) {
      correct = true;
      if (!hidden) {
        score++;
      }
    } else {
      correct = false;
    }
    setTimeout(setGame, 1500);
  }
</script>

<!-- {checkAnswer} allows me to pass the function down as a prop - I can call back with arguments from the child -->
<!-- --square-colour={variable} allows me to pass down a prop as a CSS variable which I reference in <style> -->
<div class="colour-square-bar">
  {#each { length: 4 } as _, i}
    <ColourSquare
      {checkAnswer}
      --square-colour={hex_value_array[i]}
      colour_name={colour_name_array[i]}
      {hidden}
      {correct_answer}
    />
  {/each}
</div>

<div class="colour-guess main-text">
  <ColourNameGuess {correct_answer} {guessing} {correct} {randomiser} />
</div>

<div class="score">
  <Score {score} --progress-bar-width={score * 10 + "%"} {hidden} />
</div>

<div class="button-wrapper">
  <div class="training-mode">
    <button class="training-mode-button" on:click={changeHiddenProperty}
      >Training mode: {training_mode_toggle}</button
    >
    <p class="training-mode-warning">Warning: resets score!</p>
  </div>
  <button class="reload-game" on:click={() => location.reload()}
    >Reload game</button
  >
</div>

<style>
  .colour-square-bar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: auto;
  }

  .colour-guess,
  .score {
    display: flex;
    margin: auto;
  }

  .score {
    flex-direction: column;
  }

  .button-wrapper {
    width: 100%;
    display: flex;
    margin-top: 15px;
  }

  .training-mode,
  .reload-game {
    margin: auto;
  }

  .training-mode-button {
    margin-bottom: 0;
    padding-bottom: 0;
  }
  .training-mode-warning {
    margin-top: 0;
    padding-top: 0;
    font-size: 13px;
  }
</style>
