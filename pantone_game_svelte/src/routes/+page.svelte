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
  let chosen_colour = "";
  let hidden = false;

  //Set up initial game state upon mount by selecting colours to guess and their respective names
  onMount(() => {
    setGame(true);
  });

  function setGame(no_reload) {
    hex_value_array = [];
    colour_name_array = [];
    for (let step = 0; step < 4; step++) {
      let selector = Math.floor(Math.random() * colourJSON["names"].length);
      hex_value_array = [...hex_value_array, colourJSON["values"][selector]];
      colour_name_array = [...colour_name_array, colourJSON["names"][selector]];
    }
    chosen_colour = colour_name_array[Math.floor(Math.random() * 4)];
    if (!no_reload) {
      //location.reload();
    }
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
    />
  {/each}
</div>

<div class="colour-guess main-text">
  <ColourNameGuess {chosen_colour} />
</div>

<button on:click={changeHiddenProperty}>Change hidden</button>
<button on:click={setGame()}>Reload game</button>

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
