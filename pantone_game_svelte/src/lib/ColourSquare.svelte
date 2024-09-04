<script>
  export let colour_name = "";
  export let hidden;
  let placeholder = " ";
</script>

<div class="colour-name-pair">
  <div class="colour-square"></div>
  {#if hidden}
    <p class="colour-name main-text">{colour_name.replaceAll("-", " ")}</p>
  {:else}
    <p class="colour-name main-text" style="visibility:hidden">
      {colour_name.replaceAll("-", " ")}
    </p>
  {/if}
</div>

<style>
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
</style>
