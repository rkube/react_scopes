
import { useContext } from "react"
import { Button } from "@chakra-ui/react"
import { SignalsContext, SignalsDispatchContext } from "../store/signals_context"
import { signal_display_t } from "../types/all_types"
import { id_to_shot_type } from "../lib/helpers"


/*
 * Recovers a signal_display_t[] from an object in localStorage.
 * 
 * 
 */

const recover_display_lists = (obj_name: string): signal_display_t[] => {

    const load_state_str = localStorage.getItem(obj_name)
    if (load_state_str === null) {
        console.log("Could not load item 'test_save' from localStorage")
        return []
    }
    const parsed_obj = JSON.parse(load_state_str) 
    return parsed_obj as signal_display_t[]

}


function SaveState() {

    const signals_context = useContext(SignalsContext)
    const signals_dispatch = useContext(SignalsDispatchContext)

    const save_state = () => {
        console.log("Saving state")
        localStorage.setItem("test_save", JSON.stringify(signals_context.display_list))
    }

    const load_state = () => {
        const load_state = recover_display_lists("test_save")
        console.log("Loaded state = ", load_state)

        // Find all data sources that are currently loaded
        const loaded_data_src = signals_context.data_list

        // Remove all data sources that are currently loaded, but are not required for loaded state
        for (let ix_d = 0; ix_d < signals_context.data_list.length; ix_d++) {
            const current_t = signals_context.data_list[ix_d].id
            if(load_state.find(item => item.id === current_t) === undefined) {
                signals_dispatch({type: "rm_data_src", id: current_t})
                console.log(`Removing data source: ${current_t}`)
            }
        }

        // Add all data sources that are required for the loaded state, but are not loaded
        const unique_ids = signals_context.data_list.map(item => item.id)
        // console.log("unique_ids = ", unique_ids)

        for (var ix_d = 0; ix_d < load_state.length; ix_d++) {
            console.log(`ix_d = ${ix_d}`)
            // If the id of the current item in load_state is not loaded, add it to the list
            if (unique_ids.findIndex(id => id === load_state[ix_d].id) === -1) {
                console.log(`Loading data source ${load_state[ix_d].id}`)

                const timebase = [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0]
                const samples = timebase.map((item) => item + Math.random() * 0.5)

                const shot_type = id_to_shot_type(load_state[ix_d].id)

                signals_dispatch({type: "add_data_src", 
                signal: {
                    id: load_state[ix_d].id,
                    shot: shot_type[0],
                    type: shot_type[1],
                    timebase: timebase,
                    samples: samples
                }})
            }
        }



        // update num_rows
        const max_ix_plot = (load_state.map(item => item.at_plot)).reduce((a, b) => Math.max(a, b), -Infinity);
        signals_dispatch({type: "set_rows", num_rows: Math.ceil((max_ix_plot + 1) / 2)})

        // Remove all display directives from current state
        signals_context.display_list.map(item => {
            console.log(`Removing ${item.id} at ${item.at_plot}`)
            signals_dispatch({type: "rm_display", plot_ix: item.at_plot, id: item.id})
        })

        // Add all display directives from load_state
        load_state.map(item => {
            console.log(`Adding view ${item.id} at ${item.at_plot}`)
            signals_dispatch({type: "add_display", plot_ix: item.at_plot, id: item.id, style: item.style})
        })
    }

    return (
        <>
        <Button width='100px' onClick={() => save_state()}> Save </Button>
        <Button width='100px' onClick={() => load_state()}> Load </Button>
        </>
    )
}

export { SaveState }