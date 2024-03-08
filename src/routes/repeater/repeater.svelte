<script lang="ts">
	import Tabs from '$lib/components/Tabs/Tabs.svelte';
	import { requests_in_repeater } from '$lib/repeater';

	let requests = requests_in_repeater.get_requests();
</script>

{#key $requests}
	<Tabs components={requests_in_repeater.get_components()} />
{/key}
