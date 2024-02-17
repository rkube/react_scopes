
import { type_t } from "../types/all_types"

const default_colors = (sig_type: type_t): string => {
    switch(sig_type) {
        case "Type1":
            return 'rgb(127, 201, 127)'
        case "Type2":
            return 'rgb(190, 174, 211)'
        case "Type3":
            return 'rgb(253, 192, 134)'
        default:
            return 'rgb(255, 255, 153)'
    }
}

export { default_colors }

//
//  Returns shot and type from an id string
//
//  An id string looks like 'sssssss_ttt'.
// Split by '_', parse the 'ssssss' part as int and the 'ttt' part as string
//
function id_to_shot_type(id: string): [number, string] {
    const ix = id.search("_")
    const shotnr = parseInt(id.slice(0, ix))
    const type = id[ix+1].toUpperCase() + id.slice(ix+2)

    return [shotnr, type]
}

export { id_to_shot_type }



