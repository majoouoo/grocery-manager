<script lang="ts">
	import { base } from '$app/paths';
</script>

<main>
	<a href="{base}/">
		<h1>Grocery Manager</h1>
	</a>

	<section id="links">
		<a class="btn" href="{base}/">
			<span class="material-symbols-rounded"> home </span>
			Home
		</a>

		<a class="btn btn-primary" href="{base}/add">
			<span class="material-symbols-rounded"> add </span>
			Add an item
		</a>

		<!-- <a class="btn" href="{base}/settings">
			<span class="material-symbols-rounded"> settings </span>
			Settings
		</a> -->
	</section>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	#links {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
