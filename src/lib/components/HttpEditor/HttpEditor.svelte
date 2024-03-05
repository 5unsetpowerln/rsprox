<script lang="ts">
	import { Splitpanes, Pane } from '$lib/components/Splitpanes';
	import type { RequestResponsePair } from '$lib/request';
	import { ContextMenu, ContextMenuOption } from 'carbon-components-svelte';
	import RequestEditor from './RequestEditor.svelte';
	import ResponseEditor from './ResponseEditor.svelte';
	import type { Response } from '$lib/response';
	import type { Request } from '$lib/request';
	import { requests_in_repeater } from '$lib/repeater';

	export let readonly: boolean = false;
	export let pair: RequestResponsePair;

	let request: Request | undefined = pair?.request;
	let response: Response | undefined = pair?.response;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let request_div: any;

	function send_request_to_repeater() {
		if (request !== undefined) {
			requests_in_repeater.add(request);
		}
	}
</script>

<ContextMenu target={request_div}>
	<ContextMenuOption indented labelText="Send to repeater" on:click={send_request_to_repeater} />
</ContextMenu>

<div class="HttpEditor">
	<Splitpanes style="height: 100%;">
		<Pane size={50}>
			{#key request}
				{#if request !== undefined}
					<div bind:this={request_div} class="request">
						<RequestEditor {readonly} {request} />
					</div>
				{/if}
			{/key}
		</Pane>
		<Pane size={50}>
			<!-- {#key response} -->
			{#if response !== undefined}
				<div class="response">
					<ResponseEditor {readonly} {response} />
				</div>
			{/if}
			<!-- {/key response} -->
		</Pane>
	</Splitpanes>
</div>

<style lang="scss">
	.HttpEditor {
		height: 100%;
		overflow: scroll;

		.request {
			height: 100%;
			overflow: scroll;
		}

		.response {
			overflow: scroll;
			height: 100%;
		}
	}
</style>
