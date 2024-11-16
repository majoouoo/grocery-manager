<script lang="ts">
	import '../global.css';
	import { page } from '$app/stores';

	let filters = JSON.parse(localStorage.getItem('filters') || JSON.stringify({
		group: 'location',
		sort: 'date'
	}));

	$: localStorage.setItem('filters', JSON.stringify(filters));
</script>

<main>
	<section id="sidebar">
		<h1>Grocery Manager</h1>

		<section id="links">
			<a class="btn btn-primary" href="/add">
				<span class="material-symbols-rounded"> add </span>
				Add an item
			</a>
	
			<a class="btn" href="/">
				<span class="material-symbols-rounded"> home </span>
				Home
			</a>
	
			<a class="btn" href="/settings">
				<span class="material-symbols-rounded"> settings </span>
				Settings
			</a>
		</section>

		{#if $page.url.pathname === "/"}
			<section id="filters">
				<h1>Filters</h1>

				<div class="filter">
					<label for="group">Group by:</label>
					<select name="group" id="group" bind:value={ filters.group }>
						<option value="location">Location</option>
						<option value="month">Month due</option>
					</select>
				</div>

				<div class="filter">
					<label for="sort">Sort by:</label>
					<select name="sort" id="sort" bind:value={ filters.sort }>
						<option value="date">Date due</option>
						<option value="name">Name</option>
						<option value="quantity">Quantity</option>
					</select>
				</div>
			</section>
		{/if}
	</section>

	<slot></slot>
</main>

<style>
	main {
		display: grid;
		grid-template-columns: 15% 1fr;
		height: 100vh;
	}

	#sidebar {
		background-color: var(--primary);
		padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
	}

	#links {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
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
</style>
