<script>
  export let score;
  export let hidden;
</script>

<p class="score">{score} / 10</p>

{#if hidden}
  <p class="freeze-notice">*^* I freeze on training mode *^*</p>
{:else}
  <p class="freeze-notice" style="visibility:hidden">
    *^* I freeze on training mode *^*
  </p>
{/if}

<div class="progress-bar">
  <div class="progress-bar-content"></div>
</div>

<style>
  .progress-bar {
    width: 90%;
    background-color: #e1e1e1;
    margin: auto;
  }

  .progress-bar-content {
    width: var(--progress-bar-width);
    background-color: black;
    transition: width 0.25s cubic-bezier(0.42, 0, 0.58, 1);
  }

  .progress-bar,
  .progress-bar-content {
    height: 30px;
    border-radius: 25px;
  }

  .score {
    margin: auto;
    margin-bottom: 10px;
    font-size: 30px;
    font-family: "Courier New", Courier, monospace;
  }

  .freeze-notice {
    margin: auto;
    color: #707070;
  }
</style>
