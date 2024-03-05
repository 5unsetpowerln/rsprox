import Component from './Component.svelte';

export type Components = Array<{ component: typeof Component; props: object; name: string }>;
