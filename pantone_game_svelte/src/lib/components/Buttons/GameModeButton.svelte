<script>
  export let buttonLabel;
  export let mode;
  export let setMode;
</script>

<div class="button-wrapper">
  {#if buttonLabel === "Easy mode"}
    <div class="easy-mode-button-wrapper">
      <p class="mode-descriptor">O Easy colours</p>
      <p class="mode-descriptor">O -1 point on bad guesses</p>
      <button class="game-mode-button-easy" on:click={() => setMode(0)}>
        <p>{buttonLabel}</p>
      </button>
      {#if mode === 0}
        <p class="mode-selector-text">^ Current mode selected</p>
      {/if}
    </div>
  {:else if buttonLabel === "Normal mode"}
    <div class="normal-mode-button-wrapper">
      <p class="mode-descriptor">O Easy colours</p>
      <p class="mode-descriptor">X 1/2 points on bad guesses</p>
      <button class="game-mode-button-normal" on:click={() => setMode(1)}>
        <p>{buttonLabel}</p>
      </button>
      {#if mode === 1}
        <p class="mode-selector-text">^ Current mode selected</p>
      {/if}
    </div>
  {:else}
    <div class="hard-mode-button-wrapper">
      <p class="mode-descriptor">X Hard colours</p>
      <p class="mode-descriptor">X 1/2 points on bad guesses</p>
      <button class="game-mode-button-hard" on:click={() => setMode(2)}>
        <p>{buttonLabel}</p>
      </button>
      {#if mode === 2}
        <p class="mode-selector-text">^ Current mode selected</p>
      {/if}
    </div>
  {/if}
</div>


<style>
  .game-mode-button-easy,
  .game-mode-button-hard,
  .game-mode-button-normal {
    border: solid;
    border-width: 1px;
    border-radius: 10px;
    padding: 5px 10px;
    margin-top: 0;
    font-size: 13px;
    width: 165.6px;
  }

  .easy-mode-button-wrapper,
  .normal-mode-button-wrapper,
  .hard-mode-button-wrapper {
    margin: auto;
  }

  .mode-selector-text {
    font-size: 12px;
    color: orangered;
  }



  @media (min-width: 320px) and (max-width: 999px) {
    .mode-descriptor {
      padding: 0px;
      width: auto;
    }
    
    .mode-descriptor {
    font-size: 10px;
    color: grey;
    max-width: 100px;
    }

    .mode-selector-text {
      max-width: 100px;
    }
  }

  .game-mode-button-easy,
  .game-mode-button-hard,
  .game-mode-button-normal {
    padding: 0px;
    width: 100px;
  }

  @media (min-width: 1000px) {
    .game-mode-button-easy,
    .game-mode-button-hard,
    .game-mode-button-normal {
      border: solid;
      border-width: 1px;
      border-radius: 10px;
      padding: 5px 10px;
      margin-top: 0;
      font-size: 13px;
      width: 165.6px;
    }

    .mode-descriptor {
      font-size: 10px;
      color: grey;
    }
      
  }
</style>
