<script>
  export let colour;
  export let hex_value = "#000";
</script>

<div class="colour-square"></div>
<p>{colour}</p>

<style>
  .colour-square {
    height: 5em;
    width: 5em;
    margin: 2em auto;
    background-color: var(--square-colour);
  }
</style>
