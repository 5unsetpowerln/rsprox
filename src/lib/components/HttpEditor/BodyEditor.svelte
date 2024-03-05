<script lang="ts">
	import type { Body, Charset } from '$lib/body';
	import CodeEditor from '../CodeEditor/CodeEditor.svelte';
	import type { ContentExtension } from '$lib/header';
	import { onMount } from 'svelte';

	export let body: Body;
	export let content_extension: ContentExtension | undefined = undefined;
	export let readonly: boolean = false;
	export let charset: Charset | undefined;

	let content: string;
	onMount(() => {
		if (charset === body.get_charset()) {
			content = body.get_str();
		} else if (charset === 'UTF_8' || charset === undefined) {
			content = new TextDecoder('utf-8').decode(Uint8Array.of(...body.get_raw()));
		} else if (charset === 'SHIFT_JIS') {
			content = new TextDecoder('shift-jis').decode(Uint8Array.of(...body.get_raw()));
		}
	});
</script>

{#key content}
	<CodeEditor code={content} lang={content_extension} {readonly} />
{/key}
