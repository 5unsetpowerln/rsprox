<script lang="ts">
	import type { Response } from '$lib/response';
	import {
		Column,
		Grid,
		Row,
		Select,
		SelectItem,
		SelectSkeleton,
		TextInput
	} from 'carbon-components-svelte';
	import HeaderEditor from './HeaderEditor.svelte';
	import BodyEditor from './BodyEditor.svelte';

	export let response: Response;
	export let readonly: boolean = false;

	let headers = response.get_headers();
	let status = response.get_status();
	let version = response.get_version();
	let body = response.get_body();
</script>

{#if response !== undefined}
	<div class="top">
		<TextInput readonly hideLabel size="sm" value={version} />
		<Select hideLabel labelText="Carbon theme" size="sm" style="">
			<SelectItem value={status} />
		</Select>
	</div>
	<!-- <SelectSkeleton hideLabel /> -->
{/if}
<!-- </Grid> -->
<HeaderEditor {headers} />
<BodyEditor {body} />

<style lang="scss">
	.top {
		display: grid;
		grid-template-columns: 200px calc(100% - 200px);
	}
</style>
