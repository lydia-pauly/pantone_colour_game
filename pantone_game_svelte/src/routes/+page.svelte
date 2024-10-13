<script>
  //Import components from /lib
  import ColourSquare from "$lib/components/ColourSquare.svelte";
  import ColourNameGuess from "$lib/components/ColourNameGuess.svelte";
  import Score from "$lib/components/Score.svelte";
  import GameModeButton from "$lib/components/Buttons/GameModeButton.svelte";
  import ReloadGamebutton from "$lib/components/Buttons/ReloadGamebutton.svelte";
  import TrainingModeButton from "$lib/components/Buttons/TrainingModeButton.svelte";

  //Import methods
  import { onMount } from "svelte";

  //Import data
  import colourJSON from "$lib/pantone-colors.json";

  //Initialise variables
  let hex_value_array = [];
  let colour_name_array = [];
  $: correct_answer = "";
  $: hidden = false;
  $: score = 0;
  $: guessing = true;
  $: correct = false;
  $: square_sizes = [8, 8, 8, 8];
  $: mode = 1;

  const max_score = 10;
  $: training_mode_toggle = "off";

  //Set up initial game state upon mount by selecting colours to guess and their respective names
  onMount(() => {
    setGame();
  });

  function setGame() {
    //Reset the arrays - don't remove these just for refactoring, you plantpot -- and don't put them in the loop!!!
    hex_value_array = [];
    colour_name_array = [];
    for (let step = 0; step < 4; step++) {
      let selector = Math.floor(Math.random() * colourJSON["names"].length);
      hex_value_array = [...hex_value_array, colourJSON["values"][selector]];
      colour_name_array = [...colour_name_array, colourJSON["names"][selector]];
    }
    console.log(colour_name_array);
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

  function adjustScoreUp(score) {
    return ++score;
  }

  function adjustScoreDown(score, mode) {
    if (mode < 1) {
      return --score;
    } else {
      return (score = Math.floor(score / 2));
    }
  }

  function checkAnswer(correct_answer, box_colour_name, mode) {
    guessing = false;
    correct = box_colour_name === correct_answer;
    if (!(score === max_score) && !hidden) {
      if (correct) {
        score = adjustScoreUp(score);
      } else {
        score = adjustScoreDown(score, mode);
      }
    }
    setTimeout(setGame, 1500);
  }

  function setMode(modeValue) {
    mode = modeValue;
    console.log("triggered");
    score = 0;
    setGame();
  }
</script>

<!-- TO DO: -->
<!-- 1. Refactor CSS classes into IDs where necessary - overclassing -->
<!-- 2. Accessibility review (aliases etc)-->

<div class="game-mode-button-wrapper">
  <GameModeButton buttonLabel={"Easy mode"} {mode} {setMode} />
  <GameModeButton buttonLabel={"Normal mode"} {mode} {setMode} />
  <GameModeButton buttonLabel={"Hard mode"} {mode} {setMode} />
</div>

<!-- {checkAnswer} allows me to pass the function down as a prop - I can call back with arguments from the child -->
<!-- --square-colour={variable} allows me to pass down a prop as a CSS variable which I reference in <style> -->
<div class="colour-square-bar">
  {#each { length: 4 } as _, i}
    <ColourSquare
      {checkAnswer}
      --square-colour={hex_value_array[i]}
      --square-size={square_sizes[i] + "em"}
      box_colour_name={colour_name_array[i]}
      {hidden}
      {correct_answer}
      {mode}
    />
  {/each}
</div>

<div class="colour-guess main-text">
  <ColourNameGuess
    {correct_answer}
    {guessing}
    {correct}
    {score}
    {max_score}
    {randomiser}
    {setGame}
  />
</div>

<div class="score">
  <Score
    {score}
    {max_score}
    {hidden}
    --progress-bar-width={(score / max_score) * 100 + "%"}
  />
</div>

<div class="button-wrapper">
  <TrainingModeButton
    buttonLabel={"Training mode"}
    {changeHiddenProperty}
    {training_mode_toggle}
  />
  <ReloadGamebutton
    buttonLabel={"Reload game"}
    additionalText={"^ You can restart the game here!"}
    endGameMarker={score === max_score}
  />
</div>

<style>
  .colour-square-bar {
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

  .game-mode-button-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
  }

  @media (min-width: 1000px) {
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
  }

  @media (min-width: 320px) and (max-width: 999px) {
    .colour-square-bar {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin: auto 20px;
    }

    .colour-guess,
    .score {
      display: flex;
      margin: auto;
    }
  }
</style>
