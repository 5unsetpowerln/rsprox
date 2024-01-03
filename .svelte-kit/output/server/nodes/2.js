

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.C5nhUtx-.js","_app/immutable/chunks/scheduler.C58-4Xa1.js","_app/immutable/chunks/index.Bqe-SajQ.js","_app/immutable/chunks/index.OYcueU4I.js","_app/immutable/chunks/proxy.Cxi58COq.js"];
export const stylesheets = ["_app/immutable/assets/2.6-666zv1.css"];
export const fonts = [];
