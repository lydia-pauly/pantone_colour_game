<script>
  import ColourSquare from "$lib/ColourSquare.svelte";
  import colourJSON from "$lib/pantone-colors.json";
  import ColourNameGuess from "$lib/ColourNameGuess.svelte";
  import { onMount } from "svelte";

  onMount(() => {
    hex_value_array = [];
    colour_name_array = [];
    for (let step = 0; step < 4; step++) {
      let selector = Math.floor(Math.random() * colourJSON["names"].length);
      hex_value_array = [...hex_value_array, colourJSON["values"][selector]];
      colour_name_array = [...colour_name_array, colourJSON["names"][selector]];
    }
    chosen_colour = colour_name_array[Math.floor(Math.random() * 4)];
  });

  let hex_value_array = [];
  let colour_name_array = [];
  let chosen_colour = "not yet defined";
</script>

<div class="colour-square-bar">
  {#each { length: 4 } as _, i}
    <ColourSquare
      --square-colour={hex_value_array[i]}
      colour_name={colour_name_array[i]}
    />
  {/each}
</div>

<ColourNameGuess {chosen_colour} />

<!-- <button on:click={setColours}>Set colours</button> -->

<style>
  .colour-square-bar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: auto;
  }
</style>
