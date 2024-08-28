<script lang="ts">
	import { Headers, type Header } from '$lib/http/header';
	import {
		Button,
		Column,
		DataTable,
		Grid,
		Link,
		Row,
		TextInput,
		TooltipIcon
	} from 'carbon-components-svelte';
	import type {
		DataTableCell,
		DataTableRow
	} from 'carbon-components-svelte/src/DataTable/DataTable.svelte';
	import { writable } from 'svelte/store';
	import Delete from 'carbon-icons-svelte/lib/Delete.svelte';

	export let readonly: boolean = false;
	export let headers: Headers;

	let headers_store = writable(headers.get_headers_to_interact_with_backend());
	let headers_store_cause_rerender = writable(headers.get_headers_to_interact_with_backend());
	headers_store.subscribe(() => {
		headers.set_headers_to_interact_with_backend($headers_store);
	});
	const update_headers = (
		input: string | number | null,
		row: DataTableRow,
		cell: DataTableCell
	) => {
		if (input === null) {
			return;
		}
		if (typeof input === 'number') {
			return;
		}
		if (cell.key !== 'name' && cell.key !== 'value') {
			return;
		}

		const data = input;
		const index: number = row.id;
		const key: 'name' | 'value' = cell.key;

		if (key === 'name') {
			headers_store.update((prev_buffer) => {
				prev_buffer[index].name = data;
				return prev_buffer;
			});
		}

		if (key === 'value') {
			headers_store.update((prev_buffer) => {
				prev_buffer[index].value = data;
				prev_buffer[index].value_raw = Array.from(new TextEncoder().encode(data));
				return prev_buffer;
			});
		}
	};

	const add_header = () => {
		headers_store.update((prev_headers) => {
			const new_header: Header = {
				id: prev_headers.length,
				name: '',
				value: '',
				value_raw: []
			};
			prev_headers.push(new_header);
			return prev_headers;
		});

		headers_store_cause_rerender.set($headers_store);
	};

	const delete_header = (index: number) => {
		headers_store.update((prev_headers) => {
			prev_headers.splice(index, 1);
			return prev_headers;
		});

		headers_store_cause_rerender.set($headers_store);
	};
</script>

{#key $headers_store_cause_rerender}
	{#if headers !== undefined}
		<div class="table">
			<DataTable
				headers={[
					{ key: 'name', value: 'Name' },
					{ key: 'value', value: 'Value' }
				]}
				rows={headers.get_headers_to_interact_with_backend()}
				size="short"
				style="width: 100%; overflow: scroll;"
			>
				<svelte:fragment slot="cell" let:cell let:row>
					{#if !readonly}
						{#if cell.key === 'value'}
							<div class="value_input" style="display: grid; grid-template-columns: 90% 10%;">
								<TextInput
									hideLabel
									value={cell.value}
									on:input={(event) => {
										update_headers(event.detail, row, cell);
									}}
									style="height: 100%; padding: 0px; background-color: #00000000;"
								/>
								<div style="position: relative;">
									<TooltipIcon
										style={`position: absolute; left: 50%; top: 50%; transform: translate(0%, -50%); z-index: 10;`}
										tooltipText="Delete this header"
										icon={Delete}
										align="end"
										on:click={() => delete_header(row.id)}
									/>
								</div>
							</div>
						{:else}
							<TextInput
								hideLabel
								value={cell.value}
								on:input={(event) => {
									update_headers(event.detail, row, cell);
								}}
								style="height: 100%; padding: 0px; background-color: #00000000;"
							/>
						{/if}
					{:else}
						{cell.value}
					{/if}
				</svelte:fragment>
			</DataTable>
			<Link href="#" on:click={add_header}>Add</Link>
		</div>
	{/if}
{/key}

<style global lang="scss">
	.button:hover {
		color: red;
	}
</style>
