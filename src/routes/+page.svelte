<script lang="ts">
	import Proxy from './proxy/proxy.svelte';
	import Repeater from './repeater/repeater.svelte';
	import Tabs from '$lib/components/Tabs/Tabs.svelte';

	let components = [
		{ component: Proxy, props: {}, name: 'Proxy' },
		{ component: Repeater, props: {}, name: 'Repeater' }
	];
</script>

<Tabs {components} />
