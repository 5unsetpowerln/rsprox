<script lang="ts">
	import '$lib/theme.scss';
	import { proxy_start } from '$lib/proxy';
	import 'carbon-components-svelte/css/g100.css';

	let theme = 'g80'; // "white" | "g10" | "g80" | "g90" | "g100"
	// let theme = 'white'; // "white" | "g10" | "g80" | "g90" | "g100"
	$: document.documentElement.setAttribute('theme', theme);

	proxy_start();
</script>

<svelte:head>
	<link rel="preconnect" href="https://rsms.me/" />
	<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
</svelte:head>

<div class="root">
	<slot></slot>
</div>

<style global lang="scss">
	.root {
		height: 100vh;

		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		-o-user-select: none;
		user-select: none;
	}

	*,
	*::before,
	*::after {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
</style>
