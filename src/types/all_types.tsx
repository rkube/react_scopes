/*************************************************************************** 
 * 
 * Types for signal representation
 * 
 ****************************************************************************/
// A signal must be of a specific type. Enumerate these types here:
enum type_e {Type1, Type2, Type3}


// String representation of the Types in the enum dict
const type_string_repr: enum_dict<type_e, string> = {
    [type_e.Type1]: "Type_1",
    [type_e.Type2]: "Type_2",
    [type_e.Type3]: "Type_3",
}

// Defines a signal along with some metadata
type signal_t = {
    index: number,
    shot: number,
    type: type_e,
    samples: number[],
    timebase: number[],
}

// String representation of a signal_t
const to_str = (it: signal_t) => {
    return(it.shot.toString() + " " + type_string_repr[it.type])
}

export {type_e, type signal_t, type_string_repr, to_str}

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


// Definition for dictionary with enum key
type enum_dict<T extends string | symbol | number, U> = {
    [K in T]: U;
};

