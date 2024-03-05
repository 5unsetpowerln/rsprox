<script lang="ts">
	import HttpEditor from '$lib/components/HttpEditor/HttpEditor.svelte';
	import { get_small_history, get_small_history_header, history } from '$lib/proxy';
	import { type RequestResponsePair } from '$lib/request';
	import { DataTable } from 'carbon-components-svelte';
	import { Splitpanes, Pane } from '$lib/components/Splitpanes';
	import { writable, type Writable } from 'svelte/store';

	let selected_pair: Writable<RequestResponsePair> = writable();

	async function update_selected_pair(id: number) {
		const index = $history.findIndex((entry) => entry.id === id);
		if (index > 0) {
			selected_pair.set($history[index]);
		}
	}

	let sortKey: string | undefined = undefined;
	let sortDirection: 'none' | 'ascending' | 'descending' | undefined = undefined;
</script>

<div class="history">
	<Splitpanes horizontal style="height: 100%;">
		<Pane size={50}>
			<div class="http_list">
				{#key $history}
					{#await get_small_history($history) then small_history}
						<DataTable
							bind:sortKey
							bind:sortDirection
							sortable
							headers={get_small_history_header(small_history[0])}
							rows={small_history}
							on:click:row={(event) => {
								update_selected_pair(event.detail.id);
							}}
							size="short"
						></DataTable>
					{/await}
				{/key}
			</div>
		</Pane>
		<Pane size={50}>
			{#key $selected_pair}
				<HttpEditor readonly pair={$selected_pair} />
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
