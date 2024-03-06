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
		client: {"start":"_app/immutable/entry/start.iOnHBr-f.js","app":"_app/immutable/entry/app.5c0FVayS.js","imports":["_app/immutable/entry/start.iOnHBr-f.js","_app/immutable/chunks/entry.L5fI5diG.js","_app/immutable/chunks/scheduler.lPvrqAxx.js","_app/immutable/chunks/index.B3q30SsR.js","_app/immutable/entry/app.5c0FVayS.js","_app/immutable/chunks/scheduler.lPvrqAxx.js","_app/immutable/chunks/index.C7CjFFa1.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
