<script lang="ts">
	import { Headers } from '$lib/http/header';
	import { DataTable } from 'carbon-components-svelte';
	export let headers: Headers;
</script>

{#if headers !== undefined}
	<div class="table">
		<DataTable
			headers={[
				{ key: 'name', value: 'Name' },
				{ key: 'value', value: 'Value' }
			]}
			rows={headers.get_array()}
			on:click:cell={() => {
				console.log('clicked');
			}}
			size="short"
			style="width: 100%; overflow: scroll;"
		>
			<!-- <svelte:fragment slot="cell" let:cell let:row>
							{#if cell.key === 'action'}
								<TextInput />
							{/if}
						</svelte:fragment> -->
		</DataTable>
	</div>
{/if}

<style lang="scss">
	.table {
		width: 100%;
	}
</style>
