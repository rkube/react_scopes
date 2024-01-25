
import { useState, useRef } from "react"
import { Grid, GridItem } from "@chakra-ui/react"

import { Plugin as PluginC} from "chart.js"

import MyPlot from "./mychart"
import { cross_hair_t, ptr_mode_t, signal_t } from "../types/all_types"
import { cross_hair_plugin, crosshair_plugin_i } from "./cross_hair_plugin"

//

function ScopesGrid({signal_list, ptr_mode}: {signal_list: signal_t[], ptr_mode: ptr_mode_t}) {

    // const [plugin_list, set_plugin_list] = useState< (PluginC | crosshair_plugin_i)[] >([])
    // Value for the crosshair plugin, which needs to by synced across the scopes
    const [crosshair_val, set_crosshair_val] = useState<cross_hair_t>({x: 216, y: 2})
    const xtalk_ref = useRef(crosshair_val)
    xtalk_ref.current = crosshair_val


    const [foo, set_foo] = useState<string>("nothing")


    const chart_cb = (new_crosshair_val: cross_hair_t) => {
        set_crosshair_val(new_crosshair_val)
    }


    let plugin_list = []
    if (ptr_mode == "mode_crosshair") {
        plugin_list.push(new cross_hair_plugin(xtalk_ref, chart_cb))
    } else {
        console.log("Not crosshair")
    }



    // const plugin_list = [new cross_hair_plugin(xtalk_ref, chart_cb)]


    return (
        <>
        <div>
            Drawing cross-hair at {crosshair_val.x} - {crosshair_val.y}
            foo = {foo}
        </div>

        <Grid
            templateRows={'200px 1fr'}
            templateColumns={'1fr 1fr'}
            h='800px'
            gap='10'
            fontWeight='bold'
        >
            <GridItem pl='2' bg='blue.50'>
                <MyPlot signals={signal_list} plugin_list={plugin_list} />
            </GridItem>

            <GridItem pl='2' bg='yellow.50'>
                <MyPlot signals={signal_list} plugin_list={plugin_list} />
            </GridItem>


        </Grid>
        </>
    )
}

export { ScopesGrid }