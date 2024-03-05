<script lang="ts">
	import { Tab, TabContent, Switch, ContentSwitcher } from 'carbon-components-svelte';
	import Proxy from './proxy/proxy.svelte';
	import Repeater from './repeater/repeater.svelte';
	import Tabs from '$lib/components/Tabs/Tabs.svelte';
</script>

<Tabs components={[Proxy, Repeater]} />
