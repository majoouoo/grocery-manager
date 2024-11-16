<script lang="ts">
  let items = localStorage.getItem('items') || '[]';
  items = JSON.parse(items);

  $: localStorage.setItem('items', JSON.stringify(items));
</script>

<main>

</main>

<style>

</style>
