<script lang="ts">
	let items: object[] = JSON.parse(localStorage.getItem('items') || '[]');

	let message: string | null = null;

	let settings: Settings = JSON.parse(
		localStorage.getItem('settings') ||
			JSON.stringify({
				appearance: 'light',
        profiles: [{name: "Default", isEdited: false, id: 0}],
        activeProfile: 0
			})
	);

	const resetFields = () => {
		name = '';
		category = 'Unset';
		customCategory = '';
		location = 'Unset';
		customLocation = '';
		quantity = null;
		quantityUnit = 'units';
		expDate = null;
		boughtDate = new Date().toISOString().split('T')[0];
		consumeWithin = null;
	};

	let name: string = '';

	let category: string = 'Unset';
	let customCategory: string = '';

	let location: string = 'Unset';
	let customLocation: string = '';

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
			category: category === 'custom' ? customCategory : category,
			categoryIsCustom: category === 'custom',
			location: location === 'custom' ? customLocation : location,
			locationIsCustom: location === 'custom',
			quantity,
			quantityUnit,
			expDate: expDate ? Date.parse(expDate) : null,
			boughtDate: boughtDate ? Date.parse(boughtDate) : null,
			consumeWithin,
			isOpen: false,
			profile: settings.activeProfile
		});

		message = 'Item added successfully.';
		localStorage.setItem('items', JSON.stringify(items));

		resetFields();
	};
</script>

<svelte:head>
	<title>Add | Grocery Manager</title>
</svelte:head>

<main>
	<section id="content">
		<h2>Add an item</h2>
		<p>All fields except for the name are optional.</p>

		<div class="property">
			<label for="name">Name:</label>
			<input type="text" id="name" bind:value={name} on:keypress={e => {if (e.key === 'Enter') addItem()}}/>
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
					bind:value={customCategory}
					placeholder="Custom Category"
					on:keypress={e => {if (e.key === 'Enter') addItem()}}
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
					bind:value={customLocation}
					placeholder="Custom Location"
					on:keypress={e => {if (e.key === 'Enter') addItem()}}
				/>
			{/if}
		</div>

		<div class="property">
			<label for="quantity">Quantity:</label>
			<div style="display: grid; grid-template-columns: 1fr auto; gap: 0.5rem;">
				<input type="number" id="quantity" bind:value={quantity} on:keypress={e => {if (e.key === 'Enter') addItem()}}/>
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
			<input type="date" id="exp-date" bind:value={expDate} on:keypress={e => {if (e.key === 'Enter') addItem()}}/>
		</div>

		<div class="property">
			<label for="bought-date">Date Bought:</label>
			<input type="date" id="bought-date" bind:value={boughtDate} on:keypress={e => {if (e.key === 'Enter') addItem()}}/>
		</div>

		<div class="property">
			<label for="consume-within">Consume within (days):</label>
			<input type="number" id="consume-within" bind:value={consumeWithin} on:keypress={e => {if (e.key === 'Enter') addItem()}}/>
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
