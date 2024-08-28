<script lang="ts">
	import type { Body, Charset } from '$lib/http/body';
	import CodeEditor from '../CodeEditor/CodeEditor.svelte';
	import type { ContentExtension } from '$lib/http/header';
	import { writable, type Writable } from 'svelte/store';

	const get_content = () => {
		if (charset === body.get_charset()) {
			return body.get_str();
		} else if (charset === 'UTF_8' || charset === undefined) {
			return new TextDecoder('utf-8').decode(Uint8Array.of(...body.get_raw()));
		} else if (charset === 'SHIFT_JIS') {
			return new TextDecoder('shift-jis').decode(Uint8Array.of(...body.get_raw()));
		}

		return new TextDecoder('utf-8').decode(Uint8Array.of(...body.get_raw()));
	};

	export let body: Body;
	export let content_extension: ContentExtension | undefined = undefined;
	export let readonly: boolean = false;
	export let charset: Charset | undefined;

	let content: Writable<string> = writable(get_content());

	content.subscribe((data) => {
		body.set_str(data);
		body.set_raw(Array.from(new TextEncoder().encode(data)));
	});
</script>

<CodeEditor bind:code={$content} lang={content_extension} {readonly} />
