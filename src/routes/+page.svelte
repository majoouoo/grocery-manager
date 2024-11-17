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

	$: groups = [...new Set(items.map((item) => item[filters.group]))];

	const changeQuantity = (index: number, quantity: number) => {
		items[index].quantity = quantity;
		localStorage.setItem('items', JSON.stringify(items));
	};

	const deleteItem = (index: number) => {
		items.splice(index, 1);
		items = items
		localStorage.setItem('items', JSON.stringify(items));
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
		{#if items.length === 0}
			<div id="no-items-msg">
				<p>No items found.</p>
			</div>
		{:else}
			{#each groups as group}
				<section class="group">
					<h2>{group}</h2>
					{#each items
						.filter((item) => item[filters.group] === group)
						.sort((a, b) => (Number(a[filters.sort]) || 0) - (Number(b[filters.sort]) || 0)) as item, index (item.id)}
						<ListItem {item} groupFilter={filters.group} on:changeQuantity={ e => changeQuantity(index, e.detail) } on:deleteItem={ e => deleteItem(index) }/>
					{/each}
				</section>
			{/each}
		{/if}
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

	#no-items-msg {
		display: flex;
		justify-content: center;
		grid-column: 1 / -1;
		margin-top: 2rem;
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
