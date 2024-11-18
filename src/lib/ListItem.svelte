<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let item: Item;
	export let groupFilter: string;

	const dispatch = createEventDispatcher();

	const changeQuantity = (quantity: number) => {
		dispatch("changeQuantity", { item: item, quantity: quantity });
	};

	const deleteItem = () => {
		dispatch("deleteItem", item);
	};
</script>

<main>
	<section id="info">
		<p id="name">{item.name}</p>
		{#if groupFilter !== 'category'}
			<p class="property">
				<span class="material-symbols-rounded"> restaurant </span>
				<span>{item.category}</span>
			</p>
		{/if}
		{#if groupFilter !== 'location'}
			<p class="property">
				<span class="material-symbols-rounded"> location_on </span>
				<span>{item.location}</span>
			</p>
		{/if}
		<p class="property">
			<span class="material-symbols-rounded"> calendar_month </span>
			<span>{item.expDate ? new Date(item.expDate).toISOString().split('T')[0] : '(none)'}</span>
		</p>
	</section>

	<section id="actions">
		<div id="quantity-btns">
			<button style="border-top-left-radius: 0.5rem;" on:click={ () => changeQuantity(item.quantity !== null ? item.quantity - 1 : 0) }>
				<span class="material-symbols-rounded"> remove </span>
			</button>
			<div id="quantity-input-wrapper">
				<input type="number" name="quantity" id="quantity" bind:value={item.quantity} on:input={ (e) => changeQuantity(Number((e.target as HTMLInputElement).value)) }>
				<p id="quantity-unit">{item.quantityUnit}</p>
			</div>
			<button style="border-top-right-radius: 0.5rem;" on:click={ () => changeQuantity(item.quantity !== null ? item.quantity + 1 : 0) }>
				<span class="material-symbols-rounded"> add </span>
			</button>
		</div>
		<div id="action-btns">
			<button style="border-bottom-left-radius: 0.5rem;">
				<span class="material-symbols-rounded"> edit_square </span>
			</button>
			<button style="border-bottom-right-radius: 0.5rem; color: var(--danger);" on:click={ deleteItem }>
				<span class="material-symbols-rounded"> delete </span>
			</button>
		</div>
	</section>
</main>

<style>
	main {
		padding: 0.8rem;
		background-color: var(--primary);
		border-radius: 1rem;
		display: grid;
		grid-template-columns: 1fr auto;
	}

	#info {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	#name {
		font-size: 1.1rem;
		font-weight: 500;
	}

	.property {
		display: flex;
		align-items: center;
		gap: 0.2rem;
		font-weight: 400;
		color: var(--secondary);
	}

	#actions {
		display: grid;
		gap: 1px;
		grid-template-rows: auto auto;
		background-color: var(--border);
		border-radius: 0.5rem;
		border: 1px solid var(--border);
	}

	#actions button, #actions input, #actions p {
		border: none;
		outline: none;
		background-color: var(--primary);
	}

	#actions button {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--secondary);
		padding: 0.3rem;
		transition: background-color 0.15s;
	}

	#actions button:hover {
		background-color: var(--border);
	}

	#actions button .material-symbols-rounded {
		font-size: 1.2rem;
	}

	#quantity-btns {
		display: grid;
		grid-template-columns: auto auto auto;
		gap: 1px;
	}

	#quantity-input-wrapper {
		display: grid;
		grid-template-rows: auto auto;
		gap: 1px;
	}

	#quantity {
		max-width: 5rem;
		padding: 0.3rem;
		border-radius: 0;
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: textfield;
		text-align: center;
	}

	#quantity-unit {
		font-size: 0.9rem;
		color: var(--secondary);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	#action-btns {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1px;
	}
</style>
