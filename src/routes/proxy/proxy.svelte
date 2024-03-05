<script lang="ts">
	import Tabs from '$lib/components/Tabs/Tabs.svelte';
	import History from './history/history.svelte';
	import Intercept from './intercept/intercept.svelte';

	let components = [
		{
			component: History,
			name: 'History',
			props: {}
		},
		{
			component: Intercept,
			name: 'Intercept',
			props: {}
		}
	];
</script>

<Tabs {components} />
