import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.CppAZY_i.js","_app/immutable/chunks/scheduler.D14_p3Ei.js","_app/immutable/chunks/index.DguvkR2d.js","_app/immutable/chunks/proxy.DCRYQgca.js","_app/immutable/chunks/index.5QbZmbdS.js"];
export const stylesheets = ["_app/immutable/assets/0.BbxELM8v.css"];
export const fonts = [];
