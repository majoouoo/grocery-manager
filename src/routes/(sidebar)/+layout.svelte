<script lang="ts">
	import SidebarNav from '$lib/SidebarNav.svelte';
</script>

<main>
	<section id="sidebar">
		<SidebarNav />
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
		margin: 0.5rem;
		background-color: var(--bg);
		border-radius: 1rem;
		overflow: auto;
	}
</style>
