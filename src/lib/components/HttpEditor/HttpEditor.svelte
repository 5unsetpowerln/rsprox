<script lang="ts">
	import { Splitpanes, Pane } from '$lib/components/Splitpanes';
	import type { RequestResponsePair } from '$lib/proxy';
	import RequestEditor from './RequestEditor.svelte';

	export let readonly: boolean = false;
	export let value: RequestResponsePair;

	let request = value?.request;
</script>

<div class="HttpEditor">
	<Splitpanes style="height: 100%;">
		<Pane size={50}>
			{#key request}
				{#if request !== undefined}
					<RequestEditor {readonly} {request} />
				{/if}
			{/key}
		</Pane>
		<Pane size={50}>
			<!-- {#if value.response !== undefined} -->
			<!-- <ResponseEditor {readonly} {response} /> -->
			<!-- {/if} -->
		</Pane>
	</Splitpanes>
</div>

<style lang="scss">
	.HttpEditor {
		height: 90%;
		overflow: scroll;
	}
</style>
