<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let item: Item;

	const dispatch = createEventDispatcher();
</script>

<main>
	<div id="backdrop">
		<div id="modal">
			<h2>Are you sure you want to delete an item?</h2>
			<p><strong>{item.name}</strong> will be lost forever.</p>
			<div id="btns">
				<button class="btn" on:click={() => dispatch('cancel')}> Cancel </button>
				<button class="btn btn-danger" on:click={() => dispatch('deleteItem', item)}>
					<span class="material-symbols-rounded"> delete </span>Delete</button
				>
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

	#btns {
		display: flex;
		gap: 0.5rem;
		justify-content: flex-end;
	}
</style>
