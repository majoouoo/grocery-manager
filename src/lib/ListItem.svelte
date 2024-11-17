<script lang="ts">
	export let item: Item;
</script>

<main>
	<p id="name">{item.name}</p>
	<p class="property"></p>
</main>

<style>
	main {
		padding: 0.8rem;
		background-color: var(--primary);
		border-radius: 5px;
	}
</style>
