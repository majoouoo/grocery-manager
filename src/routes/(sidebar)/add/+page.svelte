<script lang="ts">
	let items: object[] = JSON.parse(localStorage.getItem('items') || '[]');

	let message: string | null = null;

	const resetFields = () => {
		name = '';
		category = 'Unset';
		otherCategory = '';
		location = 'Unset';
		otherLocation = '';
		quantity = null;
		quantityUnit = 'units';
		expDate = null;
		boughtDate = new Date().toISOString().split('T')[0];
	};

	let name: string = '';

	let category: string = 'Unset';
	let otherCategory: string = '';

	let location: string = 'Unset';
	let otherLocation: string = '';

	let quantity: number | null = null;
	let quantityUnit: string = 'units';

	let expDate: string | null = null;
	let boughtDate: string | null = new Date().toISOString().split('T')[0];

	const addItem = () => {
		if (!name) {
			message = 'Please enter a name.';
			return;
		}

		items.push({
			name,
			category: category === 'custom' ? otherCategory : category,
			location: location === 'custom' ? otherLocation : location,
			quantity,
			quantityUnit,
			expDate: expDate ? Date.parse(expDate) : null,
			boughtDate: boughtDate ? Date.parse(boughtDate) : null,
		});

		message = 'Item added successfully.';
		localStorage.setItem('items', JSON.stringify(items));

		resetFields();
	};
</script>

<main>
	<section id="content">
		<h2>Add an item</h2>

		<div class="property">
			<label for="name">Name:</label>
			<input type="text" id="name" bind:value={name} />
		</div>

		<div class="property">
			<label for="category">Category:</label>
			<select name="category" id="category" bind:value={category}>
				<option value="Unset">(Unset)</option>
				<option value="Dairy">Dairy</option>
				<option value="Pastries">Pastries</option>
				<option value="Meat">Meat</option>
				<option value="Canned">Canned Food</option>
				<option value="Beverages">Beverages</option>
				<option value="custom">Custom</option>
			</select>
			{#if category === 'custom'}
				<input
					type="text"
					id="other-category"
					bind:value={otherCategory}
					placeholder="Custom Category"
				/>
			{/if}
		</div>

		<div class="property">
			<label for="location">Location:</label>
			<select name="location" id="location" bind:value={location}>
				<option value="Unset">(Unset)</option>
				<option value="Fridge">Fridge</option>
				<option value="Pantry">Pantry</option>
				<option value="Kitchen">Kitchen</option>
				<option value="Basement">Basement</option>
				<option value="Freezer">Freezer</option>
				<option value="custom">Custom</option>
			</select>
			{#if location === 'custom'}
				<input
					type="text"
					id="other-location"
					bind:value={otherLocation}
					placeholder="Custom Location"
				/>
			{/if}
		</div>

		<div class="property">
			<label for="quantity">Quantity</label>
			<div style="display: grid; grid-template-columns: 1fr auto; gap: 0.5rem;">
				<input type="number" id="quantity" bind:value={quantity} />
				<select name="unit" id="unit" bind:value={quantityUnit}>
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
			<input type="date" id="exp-date" bind:value={expDate} />
		</div>

		<div class="property">
			<label for="bought-date">Date Bought:</label>
			<input type="date" id="bought-date" bind:value={boughtDate} />
		</div>

		<button class="btn btn-primary" on:click={addItem}>
			<span class="material-symbols-rounded"> add </span>
			Add item
		</button>

		{#if message}
			<p id="message">{message}</p>
		{/if}
	</section>
</main>

<style>
	main {
		padding: 1rem;
		display: flex;
		justify-content: center;
	}

	#content {
		width: 100%;
		max-width: 600px;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.property {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
