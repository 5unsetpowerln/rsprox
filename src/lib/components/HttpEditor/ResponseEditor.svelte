<script lang="ts">
	import type { Response } from '$lib/http/response';
	import { ComboBox, TextInput } from 'carbon-components-svelte';
	import HeaderEditor from './HeaderEditor.svelte';
	import BodyEditor from './BodyEditor.svelte';
	import { charset_options } from '$lib/http/body';

	export let response: Response;
	export let readonly: boolean = false;

	let headers = response.get_headers();
	let status = response.get_status();
	let version = response.get_version();
	let body = response.get_body();
	let content_extension = headers.content_extension();
	let selected_charset_id = '0';

	let header_height;
</script>

{#if response !== undefined}
	<!-- <div class="header" bind:clientHeight={header_height}> -->
	<div class="top">
		<TextInput readonly hideLabel size="sm" value={version} />

		<ComboBox size="sm" selectedId="0" items={[{ id: '0', text: status.toString() }]} />
		<ComboBox size="sm" bind:selectedId={selected_charset_id} items={charset_options} />
	</div>
	<HeaderEditor {headers} />
	<!-- </div> -->
	{#key selected_charset_id}
		<!-- <div style={`height: calc(100% - ${header_height}px); overflow: scroll;`}> -->
		<BodyEditor
			{body}
			{content_extension}
			{readonly}
			charset={charset_options.find((entry) => entry.id === selected_charset_id)?.text}
		/>
		<!-- </div> -->
	{/key}
{/if}

<style lang="scss">
	/* .header { */
	.top {
		display: grid;
		grid-template-columns: 33% 33% 34%;
	}
	/* } */
</style>
