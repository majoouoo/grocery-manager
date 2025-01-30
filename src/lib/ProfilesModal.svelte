<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import DeleteProfileModal from '$lib/DeleteProfileModal.svelte';

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

  $: localStorage.setItem('settings', JSON.stringify(settings));

  const closeModal = () => {
    settings.profiles.forEach(profile => {
      profile.isEdited = false;
      localStorage.setItem('settings', JSON.stringify(settings));
    });
    dispatch("cancel");
  };

  let newProfileName: string = '';
  const createProfile = () => {
    let id = 0;
    while (settings.profiles.some(profile => profile.id === id)) id++;

    settings.profiles.push({name: newProfileName, isEdited: false, id: id});
    settings = settings;
    localStorage.setItem('settings', JSON.stringify(settings));
    newProfileName = '';
  }

  let isDeleteProfileModalOpen = false;
  let profileToDelete: Profile | null = null;

  const deleteProfile = (profile: Profile) => {
    profileToDelete = profile;
    isDeleteProfileModalOpen = true;
  }

  const closeDeleteProfileModal = () => {
    isDeleteProfileModalOpen = false;
    profileToDelete = null;
    settings = JSON.parse(
      localStorage.getItem('settings') ||
        JSON.stringify({
          appearance: 'light',
          profiles: [{name: "Default", isEdited: false, id: 0}],
          activeProfile: 0
        })
    );
  }

  const switchProfile = (profile: Profile) => {
    settings.activeProfile = profile.id;
    localStorage.setItem('settings', JSON.stringify(settings));
    dispatch("switch");
  }
</script>

<main>
	<div id="backdrop">
		<div id="modal">
			<h2>Profiles</h2>

      {#each settings.profiles as profile}
        <div class="profile">
          {#if profile.isEdited}
            <input type="text" class="profile-name" bind:value={profile.name} />
            <button class="btn" on:click={() => profile.isEdited = false}>
              <span class="material-symbols-rounded"> done </span>
            </button>
          {:else}
            <button class="btn profile-name" on:click={() => switchProfile(profile)} disabled={settings.activeProfile === profile.id}>
              {profile.name}
            </button>
            <button class="btn" on:click={() => profile.isEdited = true}>
              <span class="material-symbols-rounded"> edit_square </span>
            </button>
          {/if}
          {#if settings.profiles.length > 1 && !profile.isEdited && settings.activeProfile !== profile.id}
            <button class="btn btn-danger" on:click={() => deleteProfile(profile)}>
              <span class="material-symbols-rounded"> delete </span>
            </button>
          {/if}
        </div>
      {/each}

      <div id="btns">
				<button class="btn" on:click={closeModal}> Cancel </button>
        <input type="text" placeholder="New Profile" bind:value={newProfileName} />
				<button class="btn btn-primary" on:click={createProfile}>
					<span class="material-symbols-rounded"> add </span>
				</button>
			</div>
		</div>
	</div>

  {#if isDeleteProfileModalOpen && profileToDelete}
    <DeleteProfileModal profile={profileToDelete} on:cancel={closeDeleteProfileModal} />
  {/if}
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

  .profile {
    display: flex;
    gap: 0.5rem;
  }

  .profile-name {
    flex-grow: 1;
  }

  .profile-name:disabled {
		background-color: var(--secondary);
		color: var(--primary);
	}

	.profile-name:disabled:hover {
		background-color: var(--secondary);
	}

  #btns {
		display: flex;
		gap: 0.5rem;
		justify-content: flex-end;
	}
</style>
