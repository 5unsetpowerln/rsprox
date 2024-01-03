<script lang="ts">
	import HttpEditor from '$lib/components/HttpEditor/HttpEditor.svelte';
	import { history, type RequestResponsePair } from '$lib/proxy';
	import { TileGroup, RadioTile } from 'carbon-components-svelte';
	import { Splitpanes, Pane } from '$lib/components/Splitpanes';
	import { writable, type Writable } from 'svelte/store';

	let inner_history: Map<number, RequestResponsePair> = $history;
	history.subscribe(() => {
		inner_history = $history;
	});

	// id is processed as string because TileGroup supports only string to bind the value
	let selected_id_str: string = '0';

	let selected_pair: Writable<RequestResponsePair> = writable();

	async function update_selected_pair(id_str: string) {
		const id = Number(id_str);
		const selected_pair_inner = inner_history.get(id);
		if (selected_pair_inner !== undefined) {
			selected_pair.set(selected_pair_inner);
		}
	}
</script>

<div class="history">
	<Splitpanes horizontal style="height: 100%;">
		<Pane size={50}>
			<div class="http_list">
				<TileGroup
					legend="requests"
					bind:selected={selected_id_str}
					on:select={() => {
						update_selected_pair(selected_id_str);
					}}
				>
					{#each inner_history as request_response_pair}
						<RadioTile
							light={request_response_pair[0] % 2 === 0 && false}
							value={request_response_pair[0].toString()}
						>
							{request_response_pair[0]}
							{request_response_pair[1].request?.get_method()}
							{request_response_pair[1].request?.get_uri()}
						</RadioTile>
					{/each}
				</TileGroup>
			</div>
		</Pane>
		<Pane size={50}>
			{#key $selected_pair}
				<HttpEditor readonly value={$selected_pair} />
			{/key}
		</Pane>
	</Splitpanes>
</div>

<style lang="scss">
	.history {
		height: 100%;

		.http_list {
			overflow: scroll;
			height: 100%;
		}
	}
</style>
