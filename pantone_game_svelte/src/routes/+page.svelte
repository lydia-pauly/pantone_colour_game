<script>
  import ColourSquare from "$lib/ColourSquare.svelte";
  import colourJSON from "$lib/pantone-colors.json";

  let colour_array = [];
  let colour_choice = colourJSON["values"][78];

  function setColours() {
    console.log("Pressed!");
    console.log(colourJSON);
    colour_array = [];
    for (let step = 0; step < 4; step++) {
      let selector = Math.floor(Math.random() * colourJSON["names"].length);
      colour_array = [...colour_array, colourJSON["values"][selector]];
      console.log(colour_array);
      // console.log(selector);
      // console.log(colourJSON["names"][selector]);
      // console.log(colourJSON["values"][selector]);
    }
  }
</script>

<h1>content on main page</h1>
<div class="colour-square-bar">
  <ColourSquare --square-colour={colour_array[0]} />
  <ColourSquare --square-colour={colour_array[1]} />
  <ColourSquare --square-colour={colour_array[2]} />
  <ColourSquare --square-colour={colour_array[3]} />
</div>

<button on:click={setColours}>Set colours</button>

<style>
  .colour-square-bar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
</style>
