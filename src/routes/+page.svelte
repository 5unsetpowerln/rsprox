<script lang="ts">
	import { Tabs, Tab, TabContent } from 'carbon-components-svelte';
	import Proxy from './proxy/proxy.svelte';
</script>

<Tabs>
	<Tab label="proxy" />
	<Tab label="repeater" />
	<svelte:fragment slot="content">
		<TabContent style="height: 100%;"><Proxy /></TabContent>
		<TabContent style="height: 100%;">Content 2</TabContent>
	</svelte:fragment>
</Tabs>
