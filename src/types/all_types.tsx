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
    // index: number,  // index will be replaced by id
    id: string,     // used to uniquely identify a signal in lists etc.
    shot: number,   
    type: type_t,
    samples: number[],
    timebase: number[],
    style: signal_display_t | undefined
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

type signal_display_t = {
    scaling: (val: number) => number;
    color: string;
    borderDash: number[];
    thickness: number;
}

export { type signal_display_t }

/*************************************************************************** 
 * 
 * Actions for the signal_lists reducer
 * 
 ****************************************************************************/

type reducer_action_t = {
    type: 'add_signal' | 'rm_signal' | 'update_style',  // The action to take
    ix: number,                                         // Index for the lists
    id?: string,                                        // Identify indices within list
    signal?: signal_t,                                  // Optional signal to add for 'add_signal'
    signal_ix?: number                                  // Index to a signal within a signal_list.
    style?: signal_display_t                            // Style update for 'update_style'
}

export {type reducer_action_t}


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
