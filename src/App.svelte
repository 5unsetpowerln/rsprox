<script lang="ts">
    import "carbon-components-svelte/css/g100.css";
    import { Tabs, Tab, TabContent } from "carbon-components-svelte";
    // import Sidebar from "./lib/components/sidebar/sidebar.svelte";
    import Proxy from "./features/proxy/proxy.svelte";
    import "./scss/app.css";

    // let items: { name: string; icon: string }[] = [
    //     { name: "proxy", icon: "eos-icons:proxy" },
    // ];

    // let current = "proxy";

    // function update(next: string) {
    //     current = next;
    // }

    let theme = "g100"; // "white" | "g10" | "g80" | "g90" | "g100"
    $: document.documentElement.setAttribute("theme", theme);
</script>

<svelte:head>
    <link rel="preconnect" href="https://rsms.me/" />
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
</svelte:head>

<!-- <div class="app">
    <Sidebar {items} {current} {update} />
    {#if current === "proxy"}
        <Proxy />
    {/if}
</div> -->

<Tabs>
  <Tab label="proxy" />
  <Tab label="repeater" />
  <svelte:fragment slot="content">
    <TabContent><Proxy/></TabContent>
    <TabContent>Content 2</TabContent>
  </svelte:fragment>
</Tabs>
