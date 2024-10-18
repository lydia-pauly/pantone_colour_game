<script>
  export let buttonLabel;
  export let additionalText;
  export let endGameMarker;
</script>

<div class="reload-game-button-wrapper">
  <button class="reload-game-button" on:click={() => location.reload()}>
    <p class="reload-game-button-text">{buttonLabel}</p>
  </button>
  {#if endGameMarker}
    <p class="reload-game-button-add-text">{additionalText}</p>
  {/if}
</div>

<style>

  .reload-game-button-wrapper {
    margin: auto;
    margin-top: 0;
  }

  .reload-game-button {
    padding: 5px 10px;
    border: solid;
    border-width: 1px;
    border-radius: 5px;
  }

  .reload-game-button-text {
    margin: auto;
    margin-bottom: 0;
    padding-bottom: 0;
    text-align: left;
  }

  .reload-game-button-add-text {
    margin-top: 0;
    padding-top: 0;
    font-size: 13px;
    color: orangered;
  }

  @media (min-width: 320px) and (max-width: 999px) {
    .reload-game-button-text{
      font-size: 13px;
    }
  }
</style>
