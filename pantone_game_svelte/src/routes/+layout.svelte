<script>
  import "../app.pcss";
</script>

<div class="main-heading">
  <h1 id="main-heading">Pantone Pandamonium</h1>
</div>

<slot></slot>

<style>
  @media (min-width: 1000px) {
    #main-heading {
      margin: 10px auto;
      font-size: 3em;
    }
  }

  @media (min-width: 320px) and (max-width: 999px) {
    #main-heading {
      margin: 2px auto;
      font-size: 1.75em;
      padding: 5px 5px 0 5px;
    }
  }

  .main-heading {
    display: flex;
  }
</style>
