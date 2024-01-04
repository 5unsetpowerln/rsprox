<script lang="ts">
	import { Request } from '$lib/request';
	import {
		Column,
		Grid,
		Row,
		Select,
		SelectItem,
		SelectSkeleton,
		Tag,
		TextArea,
		TextInput
	} from 'carbon-components-svelte';
	import HeaderEditor from './HeaderEditor.svelte';
	import BodyEditor from './BodyEditor.svelte';

	export let request: Request;
	export let readonly: boolean = false;

	let headers = request.get_headers();
	let version = request.get_version();
	let method = request.get_method();
	let uri = request.get_uri();
	let body = request.get_body();
</script>

{#if request !== undefined}
	<div class="top">
		<TextInput readonly hideLabel size="sm" value={version} />
		<Select hideLabel labelText="Carbon theme" size="sm">
			<SelectItem value={method} />
		</Select>
	</div>
	<TextInput hideLabel value={uri} size="sm" />
	<HeaderEditor {headers} />
	<BodyEditor {body} />
{/if}

<style lang="scss">
	.top {
		display: grid;
		grid-template-columns: 200px calc(100% - 200px);
	}
</style>
