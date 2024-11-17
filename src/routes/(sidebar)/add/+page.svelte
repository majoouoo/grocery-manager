<script lang="ts">
	let items: object[] = JSON.parse(localStorage.getItem('items') || '[]');

	let message: string | null = null;

	const resetFields = () => {
		name = '';
		category = 'unset';
		otherCategory = '';
		location = 'unset';
		otherLocation = '';
		quantity = null;
		quantityUnit = 'units';
		expDate = null;
		boughtDate = new Date().toISOString().split('T')[0];
		consumeWithin = null;
	};

	let name: string = '';

	let category: string = 'unset';
	let otherCategory: string = '';

	let location: string = 'unset';
	let otherLocation: string = '';

	let quantity: number | null = null;
	let quantityUnit: string = 'units';

	let expDate: string | null = null;
	let boughtDate: string | null = new Date().toISOString().split('T')[0];
	let consumeWithin: number | null = null;

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
			consumeWithin
		});

		message = 'Item added successfully.';
		localStorage.setItem('items', JSON.stringify(items));

		resetFields();
	};
</script>

<main>
	<section id="content">
		<h1>Add an item</h1>

		<div class="property">
			<label for="name">Name:</label>
			<input type="text" id="name" bind:value={name} />
		</div>

		<div class="property">
			<label for="category">Category:</label>
			<select name="category" id="category" bind:value={category}>
				<option value="unset">(Unset)</option>
				<option value="dairy">Dairy</option>
				<option value="pastries">Pastries</option>
				<option value="meat">Meat</option>
				<option value="canned">Canned Food</option>
				<option value="beverages">Beverages</option>
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
				<option value="unset">(Unset)</option>
				<option value="fridge">Fridge</option>
				<option value="panty">Pantry</option>
				<option value="kitchen">Kitchen</option>
				<option value="basement">Basement</option>
				<option value="freezer">Freezer</option>
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
					<option value="packs">Packs</option>
					<option value="cans">Cans</option>
					<option value="bottles">Bottles</option>
					<option value="kilograms">Kilograms (kg)</option>
					<option value="litres">Litres (l)</option>
					<option value="pounds">Pounds (lb)</option>
					<option value="gallons">Gallons (gal)</option>
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

		<div class="property">
			<label for="consume-within">Consume within ___ days:</label>
			<input type="number" id="consume-within" bind:value={consumeWithin} />
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
