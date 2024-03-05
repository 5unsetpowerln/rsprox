<!-- <svelte:options customElement="code-editor" /> -->

<script lang="ts">
	import CodeMirror, { basicSetup } from './CodeMirror.svelte';
	import { javascript } from '@codemirror/lang-javascript';
	import { html } from '@codemirror/lang-html';
	import { json } from '@codemirror/lang-json';
	import { onMount } from 'svelte';
	import { barf } from 'thememirror';
	import { EditorState } from '@codemirror/state';

	export let code: string = '';
	export let lang: string | undefined = undefined;
	export let readonly: boolean = false;

	let extensions = [basicSetup, barf, EditorState.readOnly.of(readonly)];

	onMount(() => {
		switch (lang) {
			case 'html':
				extensions.push(html());
				break;
			case 'javascript':
				extensions.push(javascript());
				break;
			case 'json':
				extensions.push(json());
				break;
		}
	});
</script>

<CodeMirror doc={code} {extensions}></CodeMirror>
