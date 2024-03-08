<script lang="ts">
	import { Request } from '$lib/http/request';
	import { Response } from '$lib/http/response';
	import { Button, ComboBox, TextInput } from 'carbon-components-svelte';
	import HeaderEditor from './HeaderEditor.svelte';
	import BodyEditor from './BodyEditor.svelte';
	import { charset_options } from '$lib/http/body';
	import { print_errors } from '$lib/error';

	export let request: Request;
	export let readonly: boolean = false;
	export let received_response: Response | undefined = undefined;
	export let sendable: boolean = false;

	let headers = request.get_headers();
	let version = request.get_version();
	let method = request.get_method();
	let uri = request.get_uri();
	let body = request.get_body();
	let content_extension = headers.content_extension();
	let selected_charset_id = '0';

	const send_request = async () => {
		const send_result = await request.send();
		if (send_result.Err !== undefined) {
			print_errors(send_result.Err);
		}

		received_response = send_result.Ok;
	};
</script>

{#if request !== undefined}
	<div class="root">
		<div class="top">
			<TextInput readonly hideLabel size="sm" value={version} />
			<ComboBox size="sm" selectedId="0" items={[{ id: '0', text: method }]} />
			<ComboBox size="sm" bind:selectedId={selected_charset_id} items={charset_options} />
		</div>
		<div class="uri">
			<TextInput hideLabel value={uri} size="sm" />
			{#if sendable}
				<Button size="small" on:click={send_request}>send</Button>
			{/if}
		</div>
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
	.root {
		/* overflow: scroll; */

		.top {
			display: grid;
			grid-template-columns: 33% 33% 34%;
		}

		.uri {
			display: grid;
			grid-template-columns: calc(100% - 100px) 100px;
		}
	}
</style>
