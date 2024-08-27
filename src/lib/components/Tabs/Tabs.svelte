<script lang="ts">
	import { Tab, TabContent, Tabs } from 'carbon-components-svelte';
	import type { Components } from '$lib/components';
	import { tab_height_store } from './tab';
	import { onMount } from 'svelte';

	export let components: Components = [];

	let tab_element: HTMLAnchorElement | undefined;

	onMount(() => {
		if (tab_element?.offsetHeight !== undefined && tab_element?.offsetHeight !== 0) {
			tab_height_store.set(tab_element?.clientHeight);
		}
	});
</script>

{#key $tab_height_store}
	<Tabs type="container">
		{#each components as component}
			<!-- {#if index === 0} -->
			<Tab label={component.name} bind:ref={tab_element} />
			<!-- {:else} -->
			<!-- <Tab label={component.name} /> -->
			<!-- {/if} -->
			<!-- {#if deletable} -->
			<!-- <span class="delete_button"></span> -->
			<!-- {/if} -->
		{/each}
		<svelte:fragment slot="content">
			{#each components as component}
				<TabContent style={`padding: 0px; height: calc(100% - ${$tab_height_store}px);`}
					><svelte:component this={component.component} {...component.props} /></TabContent
				>
			{/each}
		</svelte:fragment>
	</Tabs>
{/key}

<style lang="scss">
</style>
