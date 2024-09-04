<script>
  export let colour_name = "not yet set";
  export let hex_value = "#000";
</script>

<div class="colour-name-pair">
  <div class="colour-square"></div>
  <p class="colour-name">{colour_name}</p>
</div>

<style>
  .colour-square {
    height: 5em;
    width: 5em;
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
  }
</style>
