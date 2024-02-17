//
// Defines the state globally
// - All data sources
// - Data displayed in each plot
//
// In addition, context :D

import { createContext, useReducer, ReactNode, Dispatch } from "react";
import { reducer_action_t, state_t } from "../types/all_types";

const signals_initial: state_t = {
    data_list: [],
    display_list: [],
    num_rows: 1
}

export const SignalsContext = createContext<state_t>(signals_initial)
export const SignalsDispatchContext = createContext<(Dispatch<reducer_action_t>) >({} as Dispatch<reducer_action_t>  )

interface signal_provider_i {
    children: ReactNode
}

export function SignalsProvider({ children }: signal_provider_i) {
    const [signals_state, signals_dispatch] = useReducer(
        signals_reducer, signals_initial
    )

    return (
        <SignalsContext.Provider value={signals_state}>
           <SignalsDispatchContext.Provider value={signals_dispatch}>
            {children}
           </SignalsDispatchContext.Provider>
        </SignalsContext.Provider>
    );
}


function signals_reducer(state: state_t, action: reducer_action_t): state_t {
    switch(action.type) {
        case 'add_data_src':
        // Check if action has the right components.
        if (action.signal !== undefined) {
            // Check if the signal has already been loaded.
            let new_state = {} as state_t
            // Copy old signals
            new_state.data_list = JSON.parse(JSON.stringify(state.data_list))
            new_state.display_list = [...state.display_list]
            new_state.num_rows = state.num_rows

            // Push new object to data_list if it doesn't exist
            if (new_state.data_list.filter((item) => item.id === action.signal!.id).length === 0) {
                new_state.data_list.push(action.signal)
            }
            return new_state
        }
        break;

        case 'rm_data_src':
          if (action.id !== undefined) {
            let new_state = {} as state_t
            
            new_state.data_list = state.data_list.filter((item) => item.id !== action.id)
            new_state.display_list = state.display_list.filter(item => item.id !== action.id)
            new_state.num_rows = state.num_rows

            return new_state            
          }
          break;

        case 'add_display':
            if ((action.plot_ix !== undefined) && (action.id !== undefined)) {
                // See if the requested signal is already displayed in the plot.
                if (state.display_list.find(item => ( (item.at_plot === action.plot_ix) && (item.id === action.id)))) {
                    // console.log(`Already displaying signal ${action.id} on plot ${action.plot_ix}`)
                    return state
                }

                // console.log(`Adding ${action.id} to plot ${action.plot_ix}`)
                let new_state = {} as state_t
                // Copy over old state into new state
                new_state.data_list = JSON.parse(JSON.stringify(state.data_list))
                new_state.display_list = [...state.display_list]
                new_state.num_rows = state.num_rows

                new_state.display_list.push({
                    id: action.id,
                    at_plot: action.plot_ix,
                    style: action.style!
                })

                return new_state
            }
            break;

        case 'rm_display':
            if ((action.plot_ix !== undefined) && (action.id !== undefined)) {
                console.log(`Removing signal ${action.id} on plot ${action.plot_ix}`)
                console.log("rm_display: state = ", state)
                let new_state = {} as state_t
                new_state.data_list = JSON.parse(JSON.stringify(state.data_list))
                // Not sure why || is needed here, but ok :)
                new_state.display_list = state.display_list.filter(item => ((item.at_plot !== action.plot_ix) || (item.id !== action.id)))
                new_state.num_rows = state.num_rows

                console.log("rm_display: new_state = ", new_state)
                return new_state

            }

            break;

        case 'update_style':
            console.log("Updating style")
            if( (action.plot_ix !== undefined) && (action.id !== undefined) && (action.style !== undefined)) {
                console.log(`Updating style for ${action.id} on plot ${action.plot_ix}`)

                console.log(state.display_list.find(item => (item.at_plot === 12) && (item.id === action.id)))

                // See if requested item to update exists
                if(state.display_list.find(item => (item.at_plot === action.plot_ix) && (item.id === action.id)) === undefined) {
                    console.log("Item not found")
                    return state
                }
                let new_state = {} as state_t
                // Copy over old state into new state
                new_state.data_list = JSON.parse(JSON.stringify(state.data_list))
                new_state.display_list = [...state.display_list]
                new_state.num_rows = state.num_rows

                const update_ix = state.display_list.findIndex(item => (item.at_plot === action.plot_ix) && (item.id === action.id))
                // console.log("update_ix = ", update_ix)

                new_state.display_list[update_ix].style = action.style
                return new_state
            }
            
            break;

        case 'set_rows':
            if( action.num_rows !== undefined ) {
                console.log("Setting rows: ", state.num_rows, " -> ", action.num_rows )
                if( (action.num_rows === state.num_rows)) {
                    console.log(" they stay the same")
                    return state
                }
                
                let new_state = {} as state_t
                new_state.data_list = JSON.parse(JSON.stringify(state.data_list))
                new_state.display_list = state.display_list.filter(item => (item.at_plot < 2 * action.num_rows!))
                new_state.num_rows = action.num_rows!

                return new_state
            }
            break;

        default:
        throw Error("Unknown action")
    }
    return state
}

