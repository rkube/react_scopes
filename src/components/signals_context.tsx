//
// Defines the state globally
// - All data sources
// - Data displayed in each plot
//
// In addition, context :D

import { createContext, useReducer } from "react";

import { reducer_action_t, state_t } from "../types/all_types";

export const SignalsContext = createContext(null)
export const SignalsDispatchContext = createContext(null)

export function SignalsProvider({ children }) {
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
    switch(action.types) {
        case 'add_data_src':
        
        // Check if action has the right components.
        if (action.signal !== undefined) {
            console.log("add_data_src")

            // Check if the signal has already been loaded.
            let new_state = {} as state_t
            // Copy over old signals
            console.log("old data list: ",  state.data_list)

            new_state.data_list = JSON.parse(JSON.stringify(state.data_list))
            new_state.display_lists = JSON.parse(JSON.stringify(state.display_lists))

            // Push new object to data_list if it doesn't exist
            if (new_state.data_list.filter((item) => item.id === action.signal.id).length === 0) {
                new_state.data_list.push(action.signal)
            }
            console.log("new state = ", new_state)
            return new_state
        }
    
        break;

        // case 'rm_data_src':
        //   if (action.id !== undefined) {
        //     let new_state = {} as state_t

        //     new_state.data_list = state.data_list.filter((item) => item.id !== 'action.id')
            
        //   }

        //   break;

        // case 'add_display':
        //   break;

        // case 'rm_display':
        //   break;

        // case 'update_style':
        //   break;

        // case 'set_rows':
        //   break;

        default:
        throw Error("Unknown action")
    }
    return state
}

const signals_initial = {
    data_list: [],
    display_lists: [[], []]
}

