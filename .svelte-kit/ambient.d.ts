
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const SHELL: string;
	export const npm_command: string;
	export const WINDOWID: string;
	export const npm_config_userconfig: string;
	export const WL: string;
	export const COLORTERM: string;
	export const PYENV_SHELL: string;
	export const npm_config_cache: string;
	export const XDG_SESSION_PATH: string;
	export const GLFW_IM_MODULE: string;
	export const TERM_PROGRAM_VERSION: string;
	export const WLR_NO_HARDWARE_CURSORS: string;
	export const GTK_IM_MODULE: string;
	export const NODE: string;
	export const DOT_BASE: string;
	export const COLOR: string;
	export const npm_config_local_prefix: string;
	export const XMODIFIERS: string;
	export const DESKTOP_SESSION: string;
	export const npm_config_globalconfig: string;
	export const EDITOR: string;
	export const MACOSX_DEPLOYMENT_TARGET: string;
	export const GTK_MODULES: string;
	export const XDG_SEAT: string;
	export const PWD: string;
	export const XDG_SESSION_DESKTOP: string;
	export const LOGNAME: string;
	export const XDG_SESSION_TYPE: string;
	export const TAURI_PLATFORM: string;
	export const npm_config_init_module: string;
	export const _: string;
	export const XAUTHORITY: string;
	export const _VOLTA_TOOL_RECURSION: string;
	export const XDG_GREETER_DATA_DIR: string;
	export const API_KEY: string;
	export const MOTD_SHOWN: string;
	export const HOME: string;
	export const LANG: string;
	export const _JAVA_AWT_WM_NONREPARENTING: string;
	export const LS_COLORS: string;
	export const npm_package_version: string;
	export const TAURI_PLATFORM_VERSION: string;
	export const STARSHIP_SHELL: string;
	export const XDG_SEAT_PATH: string;
	export const TAURI_TARGET_TRIPLE: string;
	export const TAURI_ARCH: string;
	export const VOLTA_HOME: string;
	export const INIT_CWD: string;
	export const STARSHIP_SESSION_KEY: string;
	export const npm_lifecycle_script: string;
	export const npm_config_npm_version: string;
	export const XDG_SESSION_CLASS: string;
	export const TERM: string;
	export const npm_package_name: string;
	export const npm_config_prefix: string;
	export const ZED_FORCE_CLI_MODE: string;
	export const USER: string;
	export const CUDA_PATH: string;
	export const DISPLAY: string;
	export const npm_lifecycle_event: string;
	export const SHLVL: string;
	export const QT_IM_MODULE: string;
	export const XDG_VTNR: string;
	export const XDG_SESSION_ID: string;
	export const TOOL_DIR: string;
	export const npm_config_user_agent: string;
	export const npm_execpath: string;
	export const LD_LIBRARY_PATH: string;
	export const XDG_RUNTIME_DIR: string;
	export const PYENV_ROOT: string;
	export const NVCC_CCBIN: string;
	export const DEBUGINFOD_URLS: string;
	export const TAURI_FAMILY: string;
	export const npm_package_json: string;
	export const LC_ALL: string;
	export const TAURI_DEBUG: string;
	export const GTK3_MODULES: string;
	export const npm_config_noproxy: string;
	export const PATH: string;
	export const npm_config_node_gyp: string;
	export const GDMSESSION: string;
	export const TAURI_PLATFORM_TYPE: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const PIPX_DEFAULT_PYTHON: string;
	export const npm_config_global_prefix: string;
	export const MAIL: string;
	export const ALACRITTY_WINDOW_ID: string;
	export const ZED_TERM: string;
	export const npm_node_execpath: string;
	export const npm_config_engine_strict: string;
	export const TERM_PROGRAM: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		SHELL: string;
		npm_command: string;
		WINDOWID: string;
		npm_config_userconfig: string;
		WL: string;
		COLORTERM: string;
		PYENV_SHELL: string;
		npm_config_cache: string;
		XDG_SESSION_PATH: string;
		GLFW_IM_MODULE: string;
		TERM_PROGRAM_VERSION: string;
		WLR_NO_HARDWARE_CURSORS: string;
		GTK_IM_MODULE: string;
		NODE: string;
		DOT_BASE: string;
		COLOR: string;
		npm_config_local_prefix: string;
		XMODIFIERS: string;
		DESKTOP_SESSION: string;
		npm_config_globalconfig: string;
		EDITOR: string;
		MACOSX_DEPLOYMENT_TARGET: string;
		GTK_MODULES: string;
		XDG_SEAT: string;
		PWD: string;
		XDG_SESSION_DESKTOP: string;
		LOGNAME: string;
		XDG_SESSION_TYPE: string;
		TAURI_PLATFORM: string;
		npm_config_init_module: string;
		_: string;
		XAUTHORITY: string;
		_VOLTA_TOOL_RECURSION: string;
		XDG_GREETER_DATA_DIR: string;
		API_KEY: string;
		MOTD_SHOWN: string;
		HOME: string;
		LANG: string;
		_JAVA_AWT_WM_NONREPARENTING: string;
		LS_COLORS: string;
		npm_package_version: string;
		TAURI_PLATFORM_VERSION: string;
		STARSHIP_SHELL: string;
		XDG_SEAT_PATH: string;
		TAURI_TARGET_TRIPLE: string;
		TAURI_ARCH: string;
		VOLTA_HOME: string;
		INIT_CWD: string;
		STARSHIP_SESSION_KEY: string;
		npm_lifecycle_script: string;
		npm_config_npm_version: string;
		XDG_SESSION_CLASS: string;
		TERM: string;
		npm_package_name: string;
		npm_config_prefix: string;
		ZED_FORCE_CLI_MODE: string;
		USER: string;
		CUDA_PATH: string;
		DISPLAY: string;
		npm_lifecycle_event: string;
		SHLVL: string;
		QT_IM_MODULE: string;
		XDG_VTNR: string;
		XDG_SESSION_ID: string;
		TOOL_DIR: string;
		npm_config_user_agent: string;
		npm_execpath: string;
		LD_LIBRARY_PATH: string;
		XDG_RUNTIME_DIR: string;
		PYENV_ROOT: string;
		NVCC_CCBIN: string;
		DEBUGINFOD_URLS: string;
		TAURI_FAMILY: string;
		npm_package_json: string;
		LC_ALL: string;
		TAURI_DEBUG: string;
		GTK3_MODULES: string;
		npm_config_noproxy: string;
		PATH: string;
		npm_config_node_gyp: string;
		GDMSESSION: string;
		TAURI_PLATFORM_TYPE: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		PIPX_DEFAULT_PYTHON: string;
		npm_config_global_prefix: string;
		MAIL: string;
		ALACRITTY_WINDOW_ID: string;
		ZED_TERM: string;
		npm_node_execpath: string;
		npm_config_engine_strict: string;
		TERM_PROGRAM: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
