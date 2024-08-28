<!-- <svelte:options customElement="code-editor" /> -->

<script lang="ts">
	import CodeMirror, { basicSetup } from './CodeMirror.svelte';
	import { javascript } from '@codemirror/lang-javascript';
	import { html } from '@codemirror/lang-html';
	import { json } from '@codemirror/lang-json';
	import { css } from '@codemirror/lang-css';
	import { onMount } from 'svelte';
	import { theme } from './theme';
	import { EditorState } from '@codemirror/state';

	export let code: string = '';
	export let lang: string | undefined = undefined;
	export let readonly: boolean = false;

	let extensions = [basicSetup, theme, EditorState.readOnly.of(readonly)];

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
			case 'css':
				extensions.push(css());
				break;
		}
	});

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const update_code = (new_code_: any) => {
		const new_code = new_code_[0];
		if (typeof new_code === 'string') {
			code = new_code;
		}
	};
</script>

<CodeMirror
	doc={code}
	{extensions}
	verbose
	on:update={(event) => {
		update_code(event.detail[0]._doc.text);
	}}
></CodeMirror>
