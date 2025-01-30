<script lang="ts">
	import '../global.css';

	const settings: Settings = JSON.parse(
		localStorage.getItem('settings') ||
			JSON.stringify({
				appearance: 'light',
        profiles: [{name: "Default", isEdited: false, id: 0}],
        activeProfile: 0
			})
	);

	if (settings.appearance === 'dark') {
		document.documentElement.style.setProperty('--bg', '#181818');
		document.documentElement.style.setProperty('--primary', '#111111');
		document.documentElement.style.setProperty('--text', '#e0e0e0');
		document.documentElement.style.setProperty('--secondary', '#9e9e9e');
	}
</script>

<slot></slot>
