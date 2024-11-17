<script lang="ts">
	import ListItem from '$lib/ListItem.svelte';
	import SidebarNav from '$lib/SidebarNav.svelte';

	let items: Item[] = JSON.parse(localStorage.getItem('items') || '[]');

	let filters: Filters = JSON.parse(
		localStorage.getItem('filters') ||
			JSON.stringify({
				group: 'category',
				sort: 'expDate'
			})
	);

  $: localStorage.setItem('filters', JSON.stringify(filters));

	let groups = [...new Set(items.map((item) => item[filters.group]))];

  $: groups = [...new Set(items.map((item) => item[filters.group]))]

	const capitalize = (str: string) => {
		return String(str).charAt(0).toUpperCase() + String(str).slice(1);
	};
</script>

<main>
	<section id="sidebar">
    <SidebarNav />

		<section id="filters">
			<h1>Filters</h1>

			<div class="filter">
				<label for="group">Group by:</label>
				<select name="group" id="group" bind:value={filters.group}>
					<option value="category">Category</option>
					<option value="location">Location</option>
				</select>
			</div>

			<div class="filter">
				<label for="sort">Sort by:</label>
				<select name="sort" id="sort" bind:value={filters.sort}>
					<option value="expDate">Expiration</option>
					<option value="quantity">Quantity</option>
					<option value="boughtDate">Date Bought</option>
				</select>
			</div>
		</section>
	</section>

	<section id="list">
		{#each groups as group}
			<section class="group">
				<h2>{typeof group == 'string' ? capitalize(group) : group}</h2>
				{#each items
					.filter((item) => item[filters.group] === group)
					.sort((a, b) => (Number(a[filters.sort]) || 0) - (Number(b[filters.sort]) || 0)) as item}
					<ListItem {item} />
				{/each}
			</section>
		{/each}
	</section>
</main>

<style>
	main {
		display: grid;
		grid-template-columns: 300px 1fr;
		height: 100vh;
		background-color: var(--primary);
	}

	#sidebar {
		background-color: var(--primary);
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	#filters {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.filter {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	#list {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		margin: 0.5rem;
		padding: 0.5rem;
		gap: 0.5rem;
		background-color: var(--bg);
		border-radius: 1rem;
		overflow: auto;
	}

	.group {
		border: 1px solid var(--border);
		padding: 1rem;
		border-radius: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
