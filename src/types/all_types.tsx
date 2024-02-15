/*************************************************************************** 
 * 
 * Types for signal representation
 * 
 ****************************************************************************/
// Signals are of these specific types. List the possible values here
// See https://danielbarta.com/literal-iteration-typescript/
export const signal_types = ["Type1", "Type2", "Type3"] as const
type type_t = typeof signal_types[number]


// Defines a signal along with some metadata
type signal_t = {
    id: string,     // used to uniquely identify a signal in lists etc.
    shot: number,   
    type: type_t,
    samples: number[],
    timebase: number[],
    // style: signal_style_t 
}

// Build id from a signal
const to_id = (shot: number, type: string): string => {
    return(`${shot}_${type}`)
}

// String representation of a signal_t
const to_str = (sig: signal_t) => {
    return(`${sig.shot.toString()} - ${sig.type}`)
}

export {type type_t, type signal_t, to_str, to_id}

/*************************************************************************** 
 * 
 * Things that configure signal display
 * 
 ****************************************************************************/

type signal_style_t = {
    scaling: (val: number) => number;
    color: string;
    borderDash: number[];
    thickness: number;
}

type signal_display_t = {
    id: string,                     // Refers to a signal in signal_data_list
    style: signal_style_t           // The style to render the signal with
}


export { type signal_style_t, type signal_display_t }

/*************************************************************************** 
 * 
 * Types used for global state of displayed signals and the reducer
 * 
 * actions:
 * add_data_signal: Adds a data source
 * rm_data_signal: Removes a data source
 * add_display_signal: Adds a signal to render in a given plot
 * rm_display_signal: Removes a signal to render in a given plot
 * update_style: Updates the style applied to render for a signal at plot level
 * set_rows: Updates the number of plots to show
 ****************************************************************************/


type reducer_action_t = {
    types: 'add_data_src' | 'rm_data_src' | 'add_display' | 'rm_display' | 'update_style' | 'set_rows',  // The action to take
    ix?: number,                    // Index for the lists
    id?: string,                    // Identify indices within list
    signal?: signal_t,              // Optional signal to add for 'add_signal'
    signal_ix?: number              // Index to a signal within a signal_list.
    style?: signal_style_t          // Style update for 'update_style'
    num_rows?: number               // Set number of rows
}


type state_t = {
    data_list: signal_t[]
    display_lists: signal_display_t[][]
}



export { type reducer_action_t, type state_t }


/*************************************************************************** 
 * 
 * Types used by the app itself
 * 
 ****************************************************************************/


// This is nice: https://danielbarta.com/literal-iteration-typescript/
// It allows us to access the valid values of ptr_mode_t like
// ptr_mode_types.map((key, value) => {console.log(`key=${key} value=${value}`)})
// key=mode_hover value=0
// key=mode_crosshair value=1
// See as const keyword:
// https://www.totaltypescript.com/concepts/as-const
export const ptr_mode_types = ["mode_hover", "mode_crosshair"] as const
type ptr_mode_t = typeof ptr_mode_types[number]

export { type ptr_mode_t }


/*************************************************************************** 
 * 
 * Types used to synchronize charts
 * 
 ****************************************************************************/

type cross_hair_t = {
    x: number | undefined,
    y: number | undefined
}

type chart_sync_t = {
    // Coordinates for which the cross-hair request originated
    cross_hair_coords: cross_hair_t
}

export { type cross_hair_t, type chart_sync_t }
