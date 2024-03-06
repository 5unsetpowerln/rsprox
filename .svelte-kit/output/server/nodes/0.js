import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.DDt41wMg.js","_app/immutable/chunks/scheduler.lPvrqAxx.js","_app/immutable/chunks/index.C7CjFFa1.js","_app/immutable/chunks/proxy.Cx5vc7tz.js","_app/immutable/chunks/index.B3q30SsR.js"];
export const stylesheets = ["_app/immutable/assets/0.BbxELM8v.css"];
export const fonts = [];
