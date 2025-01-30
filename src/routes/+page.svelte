<script lang="ts">
	import ListItem from '$lib/ListItem.svelte';
	import SidebarNav from '$lib/SidebarNav.svelte';
	import DeleteModal from '$lib/DeleteModal.svelte';
	import EditModal from '$lib/EditModal.svelte';

	let items: Item[] = JSON.parse(localStorage.getItem('items') || '[]');

	let settings: Settings = JSON.parse(
		localStorage.getItem('settings') ||
			JSON.stringify({
				appearance: 'light'
			})
	);

	let filters: Filters = JSON.parse(
		localStorage.getItem('filters') ||
			JSON.stringify({
				group: 'category',
				sort: 'expDate'
			})
	);

	$: {
		localStorage.setItem('filters', JSON.stringify(filters));
		localStorage.setItem('settings', JSON.stringify(settings));

		if (settings.appearance === 'dark') {
			document.documentElement.style.setProperty('--bg', '#181818');
			document.documentElement.style.setProperty('--primary', '#111111');
			document.documentElement.style.setProperty('--text', '#e0e0e0');
		}

		if (settings.appearance === 'light') {
			document.documentElement.style.setProperty('--bg', '#eeeff3');
			document.documentElement.style.setProperty('--primary', '#e3e3e9');
			document.documentElement.style.setProperty('--text', '#1a1a1a');
		}
	}

	let groups = [...new Set(items.map((item) => item[filters.group]))];

	$: groups = [...new Set(items.map((item) => item[filters.group]))];

	const changeQuantity = ({ item, quantity }: { item: Item; quantity: number }) => {
		const index = items.findIndex((i) => i === item);
		items[index].quantity = quantity;
		localStorage.setItem('items', JSON.stringify(items));
	};

	let isDeleteModalOpen: boolean = false;
	let itemToDelete: Item;
	const openDeleteModal = (item: Item) => {
		itemToDelete = item;
		isDeleteModalOpen = true;
	};

	const deleteItem = (item: Item) => {
		const index = items.findIndex((i) => i === item);
		items.splice(index, 1);
		items = items;
		localStorage.setItem('items', JSON.stringify(items));
		isDeleteModalOpen = false;
	};

	let isEditModalOpen: boolean = false;
	let itemToEdit: Item;
	const openEditModal = (item: Item) => {
		itemToEdit = item;
		isEditModalOpen = true;
	};

	const editItem = ({ item, originalItem }: { item: Item; originalItem: Item }) => {
		const index = items.findIndex((i) => i === originalItem);
		items[index] = item;
		items = items;
		localStorage.setItem('items', JSON.stringify(items));
		isEditModalOpen = false;
	};

	let isSidebarVisible: boolean = false;
	let windowWidth: number = window.innerWidth;
	if (windowWidth > 1400) {
		isSidebarVisible = true;
	}

	window.addEventListener('resize', () => {
		windowWidth = window.innerWidth;
		if (windowWidth > 1400) {
			isSidebarVisible = true;
		}
	});
</script>

<svelte:head>
	<title>Home | Grocery Manager</title>
</svelte:head>

<main>
	<section id="sidebar">
		<button class="btn" id="showMenuBtn" on:click={() => (isSidebarVisible = !isSidebarVisible)}>
			<span class="material-symbols-rounded">menu</span>
		</button>

		{#if isSidebarVisible}
			<SidebarNav />

			<section class="filters">
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

			<section class="filters">
				<h1>Settings</h1>

				<div class="filter">
					<label for="appearance">Appearance:</label>
					<select name="appearance" id="appearance" bind:value={settings.appearance}>
						<option value="light">Light</option>
						<option value="dark">Dark</option>
					</select>
				</div>
			</section>

			<a href="credits" id="credits">Credits</a>
		{/if}
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
						.sort((a, b) => (Number(a[filters.sort]) || 0) - (Number(b[filters.sort]) || 0)) as item (item)}
						<ListItem
							{item}
							groupFilter={filters.group}
							on:changeQuantity={(e) => changeQuantity(e.detail)}
							on:deleteItem={(e) => openDeleteModal(e.detail)}
							on:openEditModal={(e) => openEditModal(e.detail)}
							on:editItem={(e) => editItem(e.detail)}
						/>
					{/each}
				</section>
			{/each}
		{/if}
	</section>

	{#if isDeleteModalOpen}
		<DeleteModal
			item={itemToDelete}
			on:deleteItem={(e) => deleteItem(e.detail)}
			on:cancel={() => (isDeleteModalOpen = false)}
		/>
	{/if}

	{#if isEditModalOpen}
		<EditModal
			item={itemToEdit}
			on:editItem={(e) => editItem(e.detail)}
			on:cancel={() => (isEditModalOpen = false)}
		/>
	{/if}
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

	.filters {
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
		margin: 0.5rem 0.5rem 0.5rem 0;
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

	@media (max-width: 1400px) {
		#list {
			grid-template-columns: 1fr 1fr;
		}

		main {
			grid-template-columns: auto 1fr;
		}

		#showMenuBtn {
			display: flex;
		}

		#sidebar {
			padding: 0.5rem;
		}
	}

	@media (max-width: 800px) {
		#list {
			grid-template-columns: 1fr;
		}
	}
</style>
