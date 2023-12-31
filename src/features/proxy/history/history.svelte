<script lang="ts">
  import { TileGroup, RadioTile } from "carbon-components-svelte";
  import {history} from "../../../lib/proxy";
  // import { type Request } from "../../../lib/exchange";
  // import { get } from "svelte/store";
  // import { request_history } from "./history";
  // import ExchangeEditor from "../../components/exchangeEditor/exchangeEditor.svelte";
  // import { current_request, current_response } from "./history";

  // let requests: Request[] = get(request_history);
  // request_history.subscribe(() => {
    // requests = get(request_history);
  // });

  // function update(rq: Request) {
    // current_request.set(rq);
  // }

</script>

<TileGroup legend="requests">
  {#each history as request}
    <RadioTile>
        {request.method} {request.url}
    </RadioTile>
  {/each}
</TileGroup>
