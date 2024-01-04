<script lang="ts">
	import { Tabs, Tab, TabContent } from 'carbon-components-svelte';
	import Proxy from './proxy/proxy.svelte';
</script>

<Tabs>
	<Tab label="proxy" />
	<Tab label="repeater" />
	<svelte:fragment slot="content">
		<TabContent style="height: 100%; padding: 0px;"><Proxy /></TabContent>
		<TabContent style="height: 100%; padding: 0px;">Content 2</TabContent>
	</svelte:fragment>
</Tabs>
