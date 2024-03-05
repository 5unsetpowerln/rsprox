<script lang="ts">
	import { Request } from '$lib/request';
	import {
		ComboBox,
		ContextMenu,
		ContextMenuDivider,
		ContextMenuGroup,
		ContextMenuOption,
		Select,
		SelectItem,
		TextInput
	} from 'carbon-components-svelte';
	import HeaderEditor from './HeaderEditor.svelte';
	import BodyEditor from './BodyEditor.svelte';
	import { charset_options } from '$lib/body';

	export let request: Request;
	export let readonly: boolean = false;

	let headers = request.get_headers();
	let version = request.get_version();
	let method = request.get_method();
	let uri = request.get_uri();
	let body = request.get_body();
	let content_extension = headers.content_extension();
	let selected_charset_id = '0';
</script>

{#if request !== undefined}
	<!-- <ContextMenu>
		<ContextMenuOption indented labelText="Copy" shortcutText="⌘C" />
		<ContextMenuOption indented labelText="Cut" shortcutText="⌘X" />
		<ContextMenuDivider />
		<ContextMenuOption indented labelText="Export as">
			<ContextMenuGroup labelText="Export options">
				<ContextMenuOption id="pdf" labelText="PDF" />
				<ContextMenuOption id="txt" labelText="TXT" />
				<ContextMenuOption id="mp3" labelText="MP3" />
			</ContextMenuGroup>
		</ContextMenuOption>
		<ContextMenuDivider />
		<ContextMenuOption selectable labelText="Remove metadata" />
		<ContextMenuDivider />
		<ContextMenuGroup labelText="Style options">
			<ContextMenuOption id="0" labelText="Font smoothing" selected />
			<ContextMenuOption id="1" labelText="Reduce noise" />
			<ContextMenuOption id="2" labelText="Auto-sharpen" />
		</ContextMenuGroup>
		<ContextMenuDivider />
		<ContextMenuOption indented kind="danger" labelText="Delete" />
	</ContextMenu> -->

	<div class="root">
		<div class="top">
			<TextInput readonly hideLabel size="sm" value={version} />
			<ComboBox size="sm" selectedId="0" items={[{ id: '0', text: method }]} />
			<ComboBox size="sm" bind:selectedId={selected_charset_id} items={charset_options} />
		</div>
		<TextInput hideLabel value={uri} size="sm" />
		<HeaderEditor {headers} />
		<BodyEditor
			{body}
			{content_extension}
			{readonly}
			charset={charset_options.find((entry) => entry.id === selected_charset_id)?.text}
		/>
	</div>
{/if}

<style lang="scss">
	.top {
		display: grid;
		grid-template-columns: 33% 33% 34%;
	}

	.root {
		overflow: scroll;
	}
</style>
