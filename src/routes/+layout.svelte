<script lang="ts">
	import '../global.css';
	import { page } from '$app/stores';

	let filters = JSON.parse(localStorage.getItem('filters') || JSON.stringify({
		group: 'category',
		sort: 'exp-date'
	}));

	$: localStorage.setItem('filters', JSON.stringify(filters));
</script>

<main>
	<section id="sidebar">
		<a href="/">
			<h1>Grocery Manager</h1>
		</a>

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
						<option value="category">Category</option>
						<option value="location">Location</option>
						<option value="exp-month">Expiration Month</option>
					</select>
				</div>

				<div class="filter">
					<label for="sort">Sort by:</label>
					<select name="sort" id="sort" bind:value={ filters.sort }>
						<option value="exp-date">Expiration</option>
						<option value="quantity">Quantity</option>
						<option value="opened-date">Date Opened</option>
						<option value="bought-date">Date Bought</option>
						<option value="name">Name</option>
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
		min-width: 300px;
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
