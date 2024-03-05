<script lang="ts">
	import { ContentSwitcher, Switch, Tab, TabContent, Tabs } from 'carbon-components-svelte';
	import Component from './Component.svelte';

	export let components: Array<typeof Component> = [];
	let selected_index: number = 0;

	function get_component_name(component: typeof Component) {
		return component.name.split('<')[1].split('>')[0];
	}
</script>

<Tabs>
	{#each components as component}
		<Tab label={get_component_name(component)} />
	{/each}
	<svelte:fragment slot="content">
		{#each components as component}
			<TabContent style="padding: 0px; height: 100%;"
				><svelte:component this={component} /></TabContent
			>
		{/each}
	</svelte:fragment>
</Tabs>
