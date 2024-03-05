<script>
	import { requests_in_repeater } from '$lib/repeater';

	let requests = requests_in_repeater.get_requests();
</script>

{#key $requests}
	{$requests.length}
{/key}
