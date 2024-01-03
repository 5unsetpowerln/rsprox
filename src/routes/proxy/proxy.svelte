<script lang="ts">
	import { Tabs, Tab, TabContent } from 'carbon-components-svelte';
	import History from './history/history.svelte';
	import Intercept from './intercept/intercept.svelte';
</script>

<Tabs>
	<Tab label="history" />
	<Tab label="intercept" />
	<svelte:fragment slot="content">
		<TabContent style="height: 100%;"><History /></TabContent>
		<TabContent style="height: 100%;"><Intercept /></TabContent>
	</svelte:fragment>
</Tabs>
