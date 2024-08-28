<script lang="ts">
	import { Request } from '$lib/http/request';
	import { Response } from '$lib/http/response';
	import { Button, ComboBox, TextInput } from 'carbon-components-svelte';
	import HeaderEditor from './HeaderEditor.svelte';
	import BodyEditor from './BodyEditor.svelte';
	import { charset_options } from '$lib/http/body';
	import { print_errors } from '$lib/error';
	import { METHODS, type Method, type Methods } from '$lib/http/method';

	const get_method_from_methods = (method: Method, methods: Methods) => {
		const result = methods.find((method_) => method_.text === method);
		if (result !== undefined) {
			return result;
		} else {
			console.error('failed to get id from corresponding method name', methods, method);
			return {
				id: '0',
				text: method
			};
		}
	};

	const send_request = async () => {
		request.set_headers(headers);
		request.set_uri(uri);
		request.set_version(version);
		request.set_method(method);

		const send_result = await request.send();
		if (send_result.Err !== undefined) {
			print_errors(send_result.Err);
		}

		received_response = send_result.Ok;
	};

	export let request: Request;
	export let readonly: boolean = false;
	export let received_response: Response | undefined = undefined;
	export let sendable: boolean = false;

	// request fields
	let uri = request.get_uri();
	let headers = request.get_headers();
	let method = request.get_method();
	let version = request.get_version();
	let body = request.get_body();

	let selected_charset_id = '0';
</script>

{#if request !== undefined}
	<div class="root">
		<div class="header">
			<div class="top">
				<!-- VERSION -->
				<TextInput readonly hideLabel size="sm" value={version} />
				<!-- METHOD -->
				<ComboBox
					size="sm"
					disabled={readonly}
					bind:value={method}
					selectedId={get_method_from_methods(method, METHODS).id}
					items={readonly ? [get_method_from_methods(method, METHODS)] : METHODS}
				/>
				<!-- CHARSET -->
				<ComboBox size="sm" bind:selectedId={selected_charset_id} items={charset_options} />
			</div>
			<div class="uri">
				<TextInput hideLabel bind:value={uri} size="sm" />
				{#if sendable}
					<Button size="small" on:click={send_request}>Send</Button>
				{:else}
					<Button size="small" disabled on:click={send_request}>Send</Button>
				{/if}
			</div>
			<HeaderEditor bind:headers {readonly} />
		</div>
		<BodyEditor
			{body}
			content_extension={headers.content_extension()}
			{readonly}
			charset={charset_options.find((entry) => entry.id === selected_charset_id)?.text}
		/>
	</div>
{/if}

<style lang="scss">
	.root {
		/* overflow: scroll; */
		.header {
			.top {
				display: grid;
				grid-template-columns: 33% 33% 34%;
			}

			.uri {
				display: grid;
				grid-template-columns: calc(100% - 100px) 100px;
			}
		}
	}
</style>
