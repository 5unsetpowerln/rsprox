import { SvelteComponent } from "svelte";
export declare const KEY: {};
import type { IPane, IPaneSizingEvent } from './index.js';
declare const __propDef: {
    props: {
        id?: string | undefined;
        horizontal?: boolean | undefined;
        pushOtherPanes?: boolean | undefined;
        dblClickSplitter?: boolean | undefined;
        rtl?: boolean | "auto" | undefined;
        firstSplitter?: boolean | undefined;
        style?: string | null | undefined;
        theme?: string | undefined;
        class?: string | undefined;
    };
    slots: {
        default: {};
    };
    events: {
        /**
         * When clicking (or touching) a pane.
         *
         * Returns the clicked pane object with its dimensions.
         */
        'pane-click': CustomEvent<IPane>;
        /**
         * Fires when you click a splitter.
         *
         * Returns the next pane object (with its dimensions) directly after the clicked splitter.
         *
         * This event is only emitted if dragging did not occur between mousedown and mouseup.
         */
        'splitter-click': CustomEvent<IPane>;
        /**
         * Fires when the pane is maximized (ie. typically by double clicking the splitter).
         *
         * Returns the maximized pane object with its.
         */
        'pane-maximize': CustomEvent<IPane>;
        /**
         * Fires when splitpanes is ready.
         */
        ready: CustomEvent<void>;
        /**
         * Fires while resizing (on mousemove/touchmove).
         *
         * Returns the clicked pane object with its dimensions.
         */
        resize: CustomEvent<IPaneSizingEvent[]>;
        /**
         * Fires once when the resizing stops after user drag (on mouseup/touchend) or when adding or removing a pane.
         *
         * Returns the clicked pane object with its dimensions.
         */
        resized: CustomEvent<IPaneSizingEvent[]>;
        /**
         * Fires when a pane is added.
         */
        'pane-add': CustomEvent<{
            /**
             * The index of the added pane.
             */
            index: number;
            /**
             * The new array of panes after resize.
             */
            panes: IPaneSizingEvent[];
        }>;
        /**
         * Fires when a pane is removed.
         */
        'pane-remove': CustomEvent<{
            /**
             * The removed pane.
             */
            removed: IPane;
            /**
             * An array of all the remaining pane objects with their dimensions (after resize).
             */
            panes: IPaneSizingEvent[];
        }>;
    };
};
export type SplitpanesProps = typeof __propDef.props;
export type SplitpanesEvents = typeof __propDef.events;
export type SplitpanesSlots = typeof __propDef.slots;
export default class Splitpanes extends SvelteComponent<SplitpanesProps, SplitpanesEvents, SplitpanesSlots> {
}
export {};
