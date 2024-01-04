<script lang="ts">
	import { type Header } from '$lib/header';
	import { DataTable } from 'carbon-components-svelte';
	export let headers: Header[];
</script>

{#if headers !== undefined}
	<!-- <div class="table"> -->
	<DataTable
		headers={[
			{ key: 'name', value: 'Name' },
			{ key: 'value', value: 'Value' }
		]}
		rows={headers}
		on:click:cell={() => {
			console.log('clicked');
		}}
		size="short"
	>
		<!-- <svelte:fragment slot="cell" let:cell let:row>
							{#if cell.key === 'action'}
								<TextInput />
							{/if}
						</svelte:fragment> -->
	</DataTable>
	<!-- </div> -->
{/if}
