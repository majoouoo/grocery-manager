<script lang="ts">
  let items = localStorage.getItem('items') || '[]';
  items = JSON.parse(items);

  $: localStorage.setItem('items', JSON.stringify(items));

  let filters = JSON.parse(localStorage.getItem('filters') || JSON.stringify({
		group: 'category',
		sort: 'exp-date'
	}));
</script>

<main>

</main>

<style>
  main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    padding: 1rem;
  }
</style>
