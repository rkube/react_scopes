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
    display_list: []
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
            // Copy over old signals

            new_state.data_list = JSON.parse(JSON.stringify(state.data_list))
            new_state.display_list = [...state.display_list]

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

            return new_state            
          }
          break;

        case 'add_display':
            if ((action.plot_ix !== undefined) && (action.id !== undefined)) {
                // See if the requested signal is already displayed in the plot.
                if (state.display_list.find(item => ( (item.at_plot === action.plot_ix) && (item.id === action.id)))) {
                    console.log(`Already displaying signal ${action.id} on plot ${action.plot_ix}`)
                    return state
                }

                console.log(`Adding ${action.id} to plot ${action.plot_ix}`)
                let new_state = {} as state_t
                // Copy over old state into new state
                new_state.data_list = JSON.parse(JSON.stringify(state.data_list))
                new_state.display_list = [...state.display_list]

                new_state.display_list.push({
                    id: action.id,
                    at_plot: action.plot_ix,
                    style: action.style!
                })

                console.log("new_state = ", new_state)
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

                const update_ix = state.display_list.findIndex(item => (item.at_plot === action.plot_ix) && (item.id === action.id))
                // console.log("update_ix = ", update_ix)

                new_state.display_list[update_ix].style = action.style
                return new_state
            }
            
            break;

        // case 'set_rows':
        //   break;

        default:
        throw Error("Unknown action")
    }
    return state
}


  //   if (action.type === 'add_data_signal') {

  //   } else if (action.type === 'rm_data_signal') {
      
  //   } else if (action.type)

  //   if (action.type === 'add_signal') {
  //     // Push the signal in the action into state[action.ix]
  //     // console.log(`Reducer: adding signal at action.ix=${action.ix}`)
  //     // console.log(`number of signal_lists: ${state.length}`)
  //     if ((action.ix <= state.length) && action.signal) {
  //       console.log("------------ reducer: adding signal at ", action.ix)
  //       // console.log("             original state: ", state)
  //       // console.log("             old signal list = ", state[action.ix])

  //       // Remember to not mutate state!!!
  //       var new_state = [] as signal_display_t[][]
  //       // console.log("          new_state = ", new_state)
        
  //       // Push copies of all signal lists into state
  //       for(var ix = 0; ix < action.ix; ix++) {
  //         // console.log("  xoxoxox first loop: ix=", ix)
  //         // console.log("      pushing: ", JSON.parse(JSON.stringify(state[ix])))
  //         new_state.push(JSON.parse(JSON.stringify(state[ix])))
  //       }
  //       // console.log("        after first loop: state=", new_state)

  //       // // Push a copy of state[ix], with the new signal added to it.
  //       var new_signal_list = JSON.parse(JSON.stringify(state[action.ix]))
  //       new_signal_list.push(action.signal)
  //       // console.log("         new_signal_list = ", new_signal_list)
  //       new_state.push(new_signal_list)

  //       // console.log("        after middle: state=", new_state)

  //       // Push copies of all remaining signal lists into new state
  //       for(var ix = action.ix + 1; ix < state.length; ix++) {
  //         // console.log("   xoxoxox second loop: ix=", ix)
  //         new_state.push(JSON.parse(JSON.stringify(state[ix])))
  //       }

  //       console.log("         new state: ", new_state)
  //       // console.log("         new signal list = ", new_state[action.ix])
  //       return new_state
  //     } else {
  //       throw Error("Reducer: trying to access signal_lists out of bounds or signal undefined")
  //     }
  //   } else if (action.type === 'rm_signal') {
  //     // console.log("Reducer: rm_signal. action=", action)
  //     // console.log("         state = ", state)
  //     // console.log(`         state.length = ${state.length}`)
  //     // console.log(`         id = ${action.id}`)

  //     if ((action.ix <= state.length) && (action.id)){
  //       // Remember: don't mutate state. Build a new one and modify as appropriate
  //       var new_state = [] as signal_display_t[][]
  //       for(var ix = 0; ix < action.ix; ix++) {
  //         // console.log("        loop1: ix=", ix)
  //         new_state.push(JSON.parse(JSON.stringify(state[ix])))
  //       }
  //       // Make a copy of the appropriate signal and filter this copy
  //       var new_signal_list = JSON.parse(JSON.stringify(state[action.ix]))
  //       new_signal_list = new_signal_list.filter((item: signal_t) => item.id !== action.id)
  //       // console.log(`      at action.ix=${action.ix}: new_signal_list = `, new_signal_list)
  //       new_state.push(new_signal_list)

  //       for(var ix = action.ix + 1; ix < state.length ; ix++) {
  //         // console.log("          loop2: ix=", ix)
  //         new_state.push(JSON.parse(JSON.stringify(state[ix])))
  //       }

  //       // console.log("          new_state = ", new_state)
  //       return new_state
  //     } else {
  //       throw Error("Reducer: Trying to access signal_lists out of bounds or missing id.")
  //     }
  //   } else if (action.type === "update_style") {
  //     // console.log("Reducer: updating style, action=", action)
  //     // console.log("  .... action.ix < state.length: ", action.ix < state.length ? "yes" : "no")
  //     // console.log("  .... action.signal_ix: ", "signal_ix" in action)
  //     // console.log("  .... action.style : ", "style" in action)
  //     // console.log(`            action.ix`)
  //     if ((action.ix < state.length) && ("signal_ix" in action) && ("style" in action)) {
  //       console.log(" ..... cloning state...")
  //       var new_state = [] as signal_display_t[][]
  //       for(var ix = 0; ix < state.length; ix++) {
  //         new_state.push(JSON.parse(JSON.stringify(state[ix])))
  //       }
  //       new_state[action.ix][action.signal_ix].style = action.style

  //       console.log("         new_state = ", new_state)

  //       return new_state
  //     } else {
  //       throw Error("Reducer: Trying to update style but either signal_list_ix, signal_ix, or style missing")
  //     }
  //   } else if (action.type === "set_rows") {
  //     // Set number of plots to display.
  //     // Use 2 plots per row. If we add plots, add two empty lists.
  //     // If we reduce rows, remove the last two lists.

  //     if (("num_rows" in action)===false) {
  //       throw Error("Reducer: Field num_rows missing in set_rows action.")
  //     }

  //     if ((action.num_rows) && (2 * action.num_rows > state.length)) {
  //       console.log("Reducer:  adding signals")
  //       var new_state = [] as signal_display_t[][]
  //       for(var ix = 0; ix < state.length; ix++) {
  //         new_state.push(JSON.parse(JSON.stringify(state[ix])))
  //       }
  //       new_state.push([])
  //       new_state.push([])
  //       return new_state

  //     } else if( (action.num_rows) && (2 * action.num_rows < state.length)) {
  //       var new_state = [] as signal_display_t[][]
  //       for(var ix = 0; ix < 2 * action.num_rows; ix++) {
  //         new_state.push(JSON.parse(JSON.stringify(state[ix])))
  //       }
  //       return new_state
  //     }

  //     var new_state = [] as signal_display_t[][]
  //     for(var ix = 0; ix < state.length; ix++) {
  //       new_state.push(JSON.parse(JSON.stringify(state[ix])))
  //     }
  //     return new_state
  //   }
  //   throw Error("Unknown action")
  // }

