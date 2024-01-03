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
		TextInput
	} from 'carbon-components-svelte';
	import HeaderEditor from './HeaderEditor.svelte';

	export let request: Request;
	export let readonly: boolean = false;

	let headers = request?.get_headers();
	let version = request?.get_version();
	let method = request?.get_method();
	let uri = request?.get_uri();
</script>

<Grid fullWidth noGutter>
	<Column noGutter>
		{#if request !== undefined}
			<Row noGutter>
				<!-- <Column sm={2} md={1} lg={7}> -->
				<TextInput readonly hideLabel value={version} />
				<!-- </Column> -->
				<!-- <Column sm={2} md={1} lg={8}> -->
				<Select hideLabel labelText="Carbon theme" style="width: 50%;">
					<SelectItem value={method} />
				</Select>
				<!-- </Column> -->
			</Row>
			<Row noGutter>
				<TextInput hideLabel value={uri} />
			</Row>
		{:else}
			// <SelectSkeleton hideLabel />
		{/if}
	</Column>
</Grid>
<HeaderEditor {headers} />
