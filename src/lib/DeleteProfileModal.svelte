<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let profile: Profile;

	const dispatch = createEventDispatcher();

	let items: Item[] = JSON.parse(localStorage.getItem('items') || '[]');

	let settings: Settings = JSON.parse(
		localStorage.getItem('settings') ||
			JSON.stringify({
				appearance: 'light',
        profiles: [{name: "Default", isEdited: false, id: 0}],
        activeProfile: 0
			})
	);

	const deleteProfile = () => {
		items = items.filter(i => i.profile !== profile.id);
		localStorage.setItem('items', JSON.stringify(items));

		settings.profiles = settings.profiles.filter(p => p.id !== profile.id);
    localStorage.setItem('settings', JSON.stringify(settings));

		dispatch('cancel');
	};
</script>

<main>
	<div id="backdrop">
		<div id="modal">
			<h2>Are you sure you want to delete a profile?</h2>
			<p><strong>{profile.name}</strong> will be lost forever.</p>
			<div id="btns">
				<button class="btn" on:click={() => dispatch('cancel')}> Cancel </button>
				<button class="btn btn-danger" on:click={deleteProfile}>
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
