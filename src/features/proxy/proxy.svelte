<script lang="ts">

    import { Tabs, Tab, TabContent } from "carbon-components-svelte";
    import "./proxy.css";
    // import Tabs from "../components/tabs/Tabs.svelte";
    import History from "./history/history.svelte";
    // import Pilot from "./pilot/pilot.svelte";
    import Intercept from "./intercept/intercept.svelte";


</script>

<Tabs>
  <Tab label="history" />
  <Tab label="intercept" />
  <svelte:fragment slot="content">
    <TabContent><History/></TabContent>
    <TabContent><Intercept/></TabContent>
  </svelte:fragment>
</Tabs>
