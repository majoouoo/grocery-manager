<script lang="ts">
	import SidebarNav from '$lib/SidebarNav.svelte';
	import { base } from '$app/paths';

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

<main>
	<section id="sidebar">
		<button class="btn" id="showMenuBtn" on:click={() => (isSidebarVisible = !isSidebarVisible)}>
			<span class="material-symbols-rounded">menu</span>
		</button>

		{#if isSidebarVisible}
			<SidebarNav />
		{/if}

		<a href="{base}/credits" id="credits">Credits</a>
	</section>

	<section id="content">
		<slot></slot>
	</section>
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

	#content {
		margin: 0.5rem 0.5rem 0.5rem 0;
		background-color: var(--bg);
		border-radius: 1rem;
		overflow: auto;
	}

	@media (max-width: 1400px) {
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
</style>
