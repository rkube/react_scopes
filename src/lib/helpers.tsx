
import { type_t } from "../types/all_types"

const default_colors = (sig_type: type_t): string => {
    // console.log("pick_color sig_Type = ", sig_type)
    switch(sig_type) {
        case "Type1":
            // console.log("Picking color - Type 1")
            return 'rgb(127, 201, 127)'
            break
        case "Type2":
            // console.log("Picking color - Type 2")
            return 'rgb(190, 174, 211)'
            break
        case "Type3":
            // console.log("Picking color - Type 3")
            return 'rgb(253, 192, 134)'
            break
        default:
            return 'rgb(255, 255, 153)'
    }
}

export { default_colors }
