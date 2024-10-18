<script>
  export let box_colour_name;
  export let hidden;
  export let correct_answer;
  export let checkAnswer;
  export let mode;
  export let square_hex_code = "#00000";
</script>

<div class="colour-name-pair">
  <button
    class="colour-square"
    on:click={() => checkAnswer(correct_answer, box_colour_name, mode)}
  >
  </button>
  <p class="colour-squaure-hex-code">{square_hex_code}</p>
  {#if hidden}
    <p class="colour-name main-text">{box_colour_name.replaceAll("-", " ")}</p>
  {:else}
    <p class="colour-name main-text" style="visibility:hidden">
      {box_colour_name}
    </p>
  {/if}
</div>

<style>
  /* Base CSS */

  /* Mobile and tablet */
  @media (min-width: 320px) and (max-width: 999px) {
    .colour-square {
      height: 8em;
      width: 8em;
      margin: 1em auto;
      background-color: var(--square-colour);
      margin-bottom: 0px;
      border-radius: 10px;
    }

    .colour-name-pair {
      display: flex;
      flex-direction: column;
      margin: 0 auto auto auto;
    }

    .colour-name {
      margin-top: 0.5em;
      margin: auto;
      font-size: 12.5px;
    }
  }

  /* Desktop */
  @media (min-width: 1000px) {
    .colour-square {
      height: 8em;
      width: 8em;
      margin: 2em auto;
      background-color: var(--square-colour);
      margin-bottom: 0px;
      border-radius: 10px;
    }

    .colour-name-pair {
      display: flex;
      flex-direction: column;
      margin: auto;
      pointer-events: var(--disable_clicks);
    }

    .colour-name {
      margin-top: 0.5em;
      margin: auto;
    }
  }
</style>
