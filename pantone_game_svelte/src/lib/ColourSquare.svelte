<script>
  export let colour_name;
  export let hidden;
  export let correct_answer;
  export let checkAnswer;
</script>

<div class="colour-name-pair">
  <button
    class="colour-square"
    on:click={() => checkAnswer(correct_answer, colour_name)}
  >
  </button>
  {#if hidden}
    <p class="colour-name main-text">{colour_name.replaceAll("-", " ")}</p>
  {:else}
    <p class="colour-name main-text" style="visibility:hidden">
      {colour_name}
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
      margin: 2em auto;
      background-color: var(--square-colour);
      margin-bottom: 0px;
    }

    .colour-name-pair {
      display: flex;
      flex-direction: column;
      margin: auto;
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
    }

    .colour-name-pair {
      display: flex;
      flex-direction: column;
      margin: auto;
    }

    .colour-name {
      margin-top: 0.5em;
      margin: auto;
    }
  }
</style>
