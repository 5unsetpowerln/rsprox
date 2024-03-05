<script lang="ts">
	import Tabs from '$lib/components/Tabs/Tabs.svelte';
	import History from './history/history.svelte';
	import Intercept from './intercept/intercept.svelte';
</script>

<Tabs components={[History, Intercept]} />
