<script lang="ts">
	import type { Body } from '$lib/body';
	import { TextArea } from 'carbon-components-svelte';

	export let body: Body;
</script>

<TextArea placeholder="" value={body.get_str()} />
