<script>
  //Import components from /lib
  import ColourSquare from "$lib/ColourSquare.svelte";
  import ColourNameGuess from "$lib/ColourNameGuess.svelte";

  //Import methods
  import { onMount } from "svelte";

  //Import data
  import colourJSON from "$lib/pantone-colors.json";

  //Initialise variables
  let hex_value_array = [];
  let colour_name_array = [];
  let correct_answer = "";
  let hidden = false;

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
    console.log("Correct answer is", correct_answer);
  }

  function changeHiddenProperty() {
    hidden = !hidden;
  }
</script>

<div class="colour-square-bar">
  {#each { length: 4 } as _, i}
    <ColourSquare
      --square-colour={hex_value_array[i]}
      colour_name={colour_name_array[i]}
      {hidden}
      {correct_answer}
    />
  {/each}
</div>

<div class="colour-guess main-text">
  <ColourNameGuess {correct_answer} />
</div>

<button on:click={changeHiddenProperty}>Change hidden</button>
<button on:click={() => setGame()}>Reload game</button>

<style>
  .colour-square-bar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: auto;
  }

  .colour-guess {
    display: flex;
    margin: auto;
  }
</style>
