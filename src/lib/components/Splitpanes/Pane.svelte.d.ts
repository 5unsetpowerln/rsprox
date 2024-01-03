import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        size?: number | null | undefined;
        minSize?: number | undefined;
        maxSize?: number | undefined;
        snapSize?: number | undefined;
        class?: string | undefined;
    };
    slots: {
        default: {};
    };
    events: {};
};
export type PaneProps = typeof __propDef.props;
export type PaneEvents = typeof __propDef.events;
export type PaneSlots = typeof __propDef.slots;
export default class Pane extends SvelteComponent<PaneProps, PaneEvents, PaneSlots> {
}
export {};
