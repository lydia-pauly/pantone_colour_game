<script>
  import { onMount } from "svelte";
  import { apiData } from "$lib/store.js";

  const notionAPIKey = import.meta.env.VITE_PUBLIC_NOTION_KEY;
  const notionPageRef = import.meta.env.VITE_PUBLIC_NOTION_PAGE_ID;
  console.log(notionAPIKey);
  console.log(notionPageRef);
  console.log(apiData);



  onMount(async () => {
    fetch("")
  });
</script>

<h1>This is my blog page</h1>
