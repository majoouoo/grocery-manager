<script lang="ts">
</script>

<main>
	<section id="sidebar">
		<a href="/">
			<h1>Grocery Manager</h1>
		</a>

		<section id="links">
			<a class="btn btn-primary" href="/add">
				<span class="material-symbols-rounded"> add </span>
				Add an item
			</a>

			<a class="btn" href="/">
				<span class="material-symbols-rounded"> home </span>
				Home
			</a>

			<a class="btn" href="/settings">
				<span class="material-symbols-rounded"> settings </span>
				Settings
			</a>
		</section>
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

	#links {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
