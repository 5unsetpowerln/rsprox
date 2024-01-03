import { SvelteComponent } from "svelte";
export declare const gatheringKey: {};
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type GatheringRoundProps = typeof __propDef.props;
export type GatheringRoundEvents = typeof __propDef.events;
export type GatheringRoundSlots = typeof __propDef.slots;
export default class GatheringRound extends SvelteComponent<GatheringRoundProps, GatheringRoundEvents, GatheringRoundSlots> {
}
export {};
