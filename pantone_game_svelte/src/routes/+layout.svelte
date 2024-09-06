<script>
  import "../app.pcss";
</script>

<div class="main-heading">
  <h1 id="main-heading">Pantone Pandamonium</h1>
</div>

<slot></slot>

<style>
  .main-heading {
    display: flex;
    align-items: center;
    align-content: center;
  }

  #main-heading {
    margin: 10px auto;
    font-size: 3em;
  }
</style>
