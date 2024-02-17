/*
 * Types etc for all drag-and-drop stuff
 *
 */

import { ReactNode, useContext } from "react";
import { DndContext, rectIntersection } from '@dnd-kit/core'
import { SignalsDispatchContext } from "./signals_context";
import { signal_style_t } from "../types/all_types";
import { default_colors } from "../lib/helpers";

// function handleDragEnd(event: any) {

    // const signals_dispatch = useContext(SignalsDispatchContext)
    // console.log("handleDragEnd here. event = ", event)

    // if (event.over && event.over.id) {
    //     console.log("=====================draggable: event.over.id = ", event.over.id)

    //     setIsDropped(true);
    //     // drag-and-drop areas are labelled as area_{%02d}. 
    //     const update_ix = parseInt(event.over.id.slice(-2))

    //     console.log(`handleDragEnd: Updating at ix=${update_ix}`)
    //     dispatch_signal_lists({
    //     types: 'add_data_src',
    //     ix: update_ix,
    //     signal: event.active.data.current.signal
    //     })
    // }
// }

// Creates the DnD Context within the SignalContext

function DnDSignalContext({ children }: {children: ReactNode}) {
    const signals_dispatch = useContext(SignalsDispatchContext)

    function handleDragEnd(event: any) {
        console.log("handleDragEnd here. event = ", event)
        if (event.over && event.over.id) {
            console.log("Dropping at ", event.over.id)
            // const plot_ix = parseInt(event.over.id.slice(-2))

            // Use default style for signals we just drop
            const new_style: signal_style_t = {
                scaling: (x) => x,
                color: default_colors("Type1"),
                borderDash: [],
                thickness: 3
            }

            signals_dispatch({
                type: 'add_display',
                plot_ix: parseInt(event.over.id.slice(-2)),
                id: event.active.id,
                style: new_style
            })
        }
    }

    return (
        <DndContext collisionDetection={rectIntersection} onDragEnd={handleDragEnd} >
            {children}
        </DndContext>
    )


}

export { DnDSignalContext }