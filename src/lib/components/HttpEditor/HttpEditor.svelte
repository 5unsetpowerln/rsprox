<script lang="ts">
	import { Splitpanes, Pane } from '$lib/components/Splitpanes';
	import type { RequestResponsePair } from '$lib/proxy';
	import { Grid, Tile } from 'carbon-components-svelte';
	import RequestEditor from './RequestEditor.svelte';
	import ResponseEditor from './ResponseEditor.svelte';

	export let readonly: boolean = false;
	export let pair: RequestResponsePair;

	let request = pair?.request;
	let response = pair?.response;
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
			{#if response !== undefined}
				<div class="response">
					<ResponseEditor {readonly} {response} />
				</div>
			{/if}
		</Pane>
	</Splitpanes>
</div>

<style lang="scss">
	.HttpEditor {
		height: 90%;
		overflow: scroll;

		.response {
			overflow: scroll;
			// width: 100%;
			// margin: 50px;
		}
	}
</style>
