<script>
  export let score;
  export let hidden;
  export let max_score;
</script>

<p class="score">{score} / {max_score}</p>

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

  .progress-bar,
  .progress-bar-content {
    height: 30px;
    border-radius: 25px;
  }

  .progress-bar-content {
    width: var(--progress-bar-width);
    background-color: black;
    transition: width 0.25s cubic-bezier(0.42, 0, 0.58, 1);
  }

  .freeze-notice {
    margin: auto;
    color: #707070;
  }

  @media (min-width: 320px) and (max-width: 999px) {
    .score {
      margin: auto;
      margin-bottom: 2.5px;
      margin-top: 10px;
      font-size: 25px;
    }
  }

  @media (min-width: 1000px) {
    .score {
      margin: auto;
      margin-bottom: 10px;
      margin-top: 30px;
      font-size: 30px;
    }
  }
</style>
