<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let item: Item;

	const originalItem: Item = item;

	const dispatch = createEventDispatcher();

	let customCategory: string = '';
	let customLocation: string = '';
	if (item.categoryIsCustom) {
		customCategory = item.category;
		item.category = 'custom';
	}
	if (item.locationIsCustom) {
		customLocation = item.location;
		item.location = 'custom';
	}

	$: {
		item.categoryIsCustom = item.category === 'custom';
		item.locationIsCustom = item.location === 'custom';
	}

	const applyChanges = () => {
		if (item.categoryIsCustom) {
			item.category = customCategory;
		}
		if (item.locationIsCustom) {
			item.location = customLocation;
		}
		dispatch('editItem', { item, originalItem });
	};
</script>

<main>
	<div id="backdrop">
		<div id="modal">
			<h2>Edit item</h2>

			<div class="property">
				<label for="name">Name:</label>
				<input type="text" id="name" bind:value={item.name} />
			</div>

			<div class="property">
				<label for="category">Category:</label>
				<select name="category" id="category" bind:value={item.category}>
					<option value="Unset">(Unset)</option>
					<option value="Dairy">Dairy</option>
					<option value="Pastries">Pastries</option>
					<option value="Meat">Meat</option>
					<option value="Canned">Canned Food</option>
					<option value="Beverages">Beverages</option>
					<option value="custom">Custom</option>
				</select>
				{#if item.categoryIsCustom}
					<input
						type="text"
						id="other-category"
						bind:value={customCategory}
						placeholder="Custom Category"
					/>
				{/if}
			</div>

			<div class="property">
				<label for="location">Location:</label>
				<select name="location" id="location" bind:value={item.location}>
					<option value="Unset">(Unset)</option>
					<option value="Fridge">Fridge</option>
					<option value="Pantry">Pantry</option>
					<option value="Kitchen">Kitchen</option>
					<option value="Basement">Basement</option>
					<option value="Freezer">Freezer</option>
					<option value="custom">Custom</option>
				</select>
				{#if item.locationIsCustom}
					<input
						type="text"
						id="other-location"
						bind:value={customLocation}
						placeholder="Custom Location"
					/>
				{/if}
			</div>

			<div class="property">
				<label for="quantity">Quantity:</label>
				<div style="display: grid; grid-template-columns: 1fr auto; gap: 0.5rem;">
					<input type="number" id="quantity" bind:value={item.quantity} />
					<select name="unit" id="unit" bind:value={item.quantityUnit}>
						<option value="units">Units</option>
						<option value="pck">Packs</option>
						<option value="cans">Cans</option>
						<option value="btl">Bottles</option>
						<option value="kg">Kilograms (kg)</option>
						<option value="l">Litres (l)</option>
						<option value="lb">Pounds (lb)</option>
						<option value="gal">Gallons (gal)</option>
					</select>
				</div>
			</div>

			<div class="property">
				<label for="exp-date">Expiration:</label>
				<input type="date" id="exp-date" bind:value={item.expDate} />
			</div>

			<div class="property">
				<label for="bought-date">Date Bought:</label>
				<input type="date" id="bought-date" bind:value={item.boughtDate} />
			</div>

			<div id="btns">
				<button class="btn" on:click={() => dispatch('cancel')}> Cancel </button>
				<button class="btn btn-primary" on:click={applyChanges}>
					<span class="material-symbols-rounded"> done </span>
					Apply
				</button>
			</div>
		</div>
	</div>
</main>

<style>
	main {
		width: 100vw;
		height: 100vh;
		z-index: 100;
		position: fixed;
	}

	#backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		backdrop-filter: blur(3px);
	}

	#modal {
		background-color: var(--bg);
		padding: 1rem;
		border-radius: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.property {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	#btns {
		display: flex;
		gap: 0.5rem;
		justify-content: flex-end;
	}
</style>
