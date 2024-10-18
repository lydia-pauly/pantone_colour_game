<script>
  export let buttonLabel;
  export let changeHiddenProperty;
  export let training_mode_toggle;
</script>

<div class="training-button-warning-wrapper">
  <button class="training-mode-button" on:click={changeHiddenProperty}>
    <p class="training-mode-button-text">
      {buttonLabel}: <strong>{training_mode_toggle}</strong>
    </p>
  </button>
  <p class="training-mode-button-add-text">^ Warning: resets score!</p>
</div>

<style>
  .training-button-warning-wrapper {
    margin: auto;
  }

  .training-mode-button {
    padding: 5px 10px;
    border: solid;
    border-width: 1px;
    border-radius: 5px;
    width: 100%;
    
  }

  .training-mode-button-text {
    margin: auto;
    margin-bottom: 0;
    padding-bottom: 0;
    text-align: left;
  }

  .training-mode-button-add-text {
    margin-top: 0;
    padding-top: 0;
    font-size: 13px;
    color: orangered;
  }

  @media (min-width: 320px) and (max-width: 999px) {
    .training-mode-button-text {
      font-size: 5px;
    }
  }

  @media (min-width: 1000px) {
    .training-mode-button-text {
      font-size: 13px;
    }
  }
</style>
