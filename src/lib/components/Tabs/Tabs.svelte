<script lang="ts">
	import { Tab, TabContent, Tabs } from 'carbon-components-svelte';
	import type { Components } from '$lib/components';

	export let components: Components = [];
	// export let deletable: boolean = false;
</script>

<Tabs>
	{#each components as component}
		<Tab label={component.name} class="tab" />
		<!-- {#if deletable} -->
		<!-- <span class="delete_button"></span> -->
		<!-- {/if} -->
	{/each}
	<svelte:fragment slot="content">
		{#each components as component}
			<TabContent style="padding: 0px; height: 100%;"
				><svelte:component this={component.component} {...component.props} /></TabContent
			>
		{/each}
	</svelte:fragment>
</Tabs>

<style lang="scss">
</style>
