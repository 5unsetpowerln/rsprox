export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.C5Ct-_4r.js","app":"_app/immutable/entry/app.Bci9ktxB.js","imports":["_app/immutable/entry/start.C5Ct-_4r.js","_app/immutable/chunks/entry.DzzzeE6V.js","_app/immutable/chunks/scheduler.D14_p3Ei.js","_app/immutable/chunks/index.5QbZmbdS.js","_app/immutable/entry/app.Bci9ktxB.js","_app/immutable/chunks/scheduler.D14_p3Ei.js","_app/immutable/chunks/index.DguvkR2d.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
