import { c as create_ssr_component } from "../../chunks/ssr.js";
import { p as proxy_start } from "../../chunks/proxy.js";
const css = {
  code: ".root.svelte-1xux84v{height:100vh;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none}.svelte-1xux84v,.svelte-1xux84v::before,.svelte-1xux84v::after{margin:0;padding:0;box-sizing:border-box}",
  map: '{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">import \\"$lib/theme.scss\\";\\nimport { proxy_start } from \\"$lib/proxy\\";\\nimport \\"carbon-components-svelte/css/g100.css\\";\\nlet theme = \\"g100\\";\\n$: document.documentElement.setAttribute(\\"theme\\", theme);\\nproxy_start();\\n<\/script>\\n\\n<svelte:head>\\n\\t<link rel=\\"preconnect\\" href=\\"https://rsms.me/\\" />\\n\\t<link rel=\\"stylesheet\\" href=\\"https://rsms.me/inter/inter.css\\" />\\n</svelte:head>\\n\\n<div class=\\"root\\">\\n\\t<slot></slot>\\n</div>\\n\\n<style global lang=\\"scss\\">.root {\\n  height: 100vh;\\n  -webkit-touch-callout: none;\\n  -webkit-user-select: none;\\n  -khtml-user-select: none;\\n  -moz-user-select: none;\\n  -ms-user-select: none;\\n  -o-user-select: none;\\n  user-select: none;\\n}\\n\\n*,\\n*::before,\\n*::after {\\n  margin: 0;\\n  padding: 0;\\n  box-sizing: border-box;\\n}</style>\\n"],"names":[],"mappings":"AAiB0B,oBAAM,CAC9B,MAAM,CAAE,KAAK,CACb,qBAAqB,CAAE,IAAI,CAC3B,mBAAmB,CAAE,IAAI,CACzB,kBAAkB,CAAE,IAAI,CACxB,gBAAgB,CAAE,IAAI,CACtB,eAAe,CAAE,IAAI,CACrB,cAAc,CAAE,IAAI,CACpB,WAAW,CAAE,IACf,CAEA,eAAC,CACD,eAAC,QAAQ,CACT,eAAC,OAAQ,CACP,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,UACd"}'
};
let theme = "g100";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  proxy_start();
  $$result.css.add(css);
  {
    document.documentElement.setAttribute("theme", theme);
  }
  return `${$$result.head += `<!-- HEAD_svelte-19f5vf1_START --><link rel="preconnect" href="https://rsms.me/" class="svelte-1xux84v"><link rel="stylesheet" href="https://rsms.me/inter/inter.css" class="svelte-1xux84v"><!-- HEAD_svelte-19f5vf1_END -->`, ""} <div class="root svelte-1xux84v">${slots.default ? slots.default({}) : ``} </div>`;
});
export {
  Layout as default
};
