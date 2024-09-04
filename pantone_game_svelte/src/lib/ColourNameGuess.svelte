<script>
  export let chosen_colour = "";
</script>

<p class="colour main-text">{chosen_colour.replaceAll("-", " ")}</p>

<style>
  p {
    margin: 2em auto;
    font-size: 2em;
  }
</style>
