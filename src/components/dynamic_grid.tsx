
import { useState, useRef } from "react"
import { Box, Grid, GridItem, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { MyPlot } from "./mychart"

import { cross_hair_plugin } from "./cross_hair_plugin"
import { DroppableArea } from "./droppable_area"
import { PlotSettingsTab } from "./plot_settings_tag" 

import { cross_hair_t, ptr_mode_t, signal_t, reducer_action_t } from "../types/all_types"

interface dynamic_grid_i {
    signal_lists: signal_t[][],
    dispatch_signal_lists: React.Dispatch<reducer_action_t>
    ptr_mode: ptr_mode_t
    num_rows: number
    row_height: number
}


/*
 * Renders a grid with 2 columns and a dynamic number of rows.
 */
function DynamicGrid({signal_lists, dispatch_signal_lists, ptr_mode, num_rows, row_height}: dynamic_grid_i) {

    // Value for the crosshair plugin, which needs to by synced across the scopes
    const [crosshair_val, set_crosshair_val] = useState<cross_hair_t>({x: 216, y: 2})
    const xtalk_ref = useRef(crosshair_val)
    // This took me a while to figure out. The crosshair plugin accesses the sync_data
    // structure in afterDraw. The function associated with it only registers on
    // initialization and ignores any updates on sync_data passed as props.
    // Using a reference to this prop ensures that the plugin always has the current
    // data.
    // Thanks StackOverflow: https://stackoverflow.com/questions/72704153/why-function-is-not-updating-with-usecallback-in-react-and-chart-js
    xtalk_ref.current = crosshair_val

    const chart_cb = (new_crosshair_val: cross_hair_t) => {
        set_crosshair_val(new_crosshair_val)
        console.log("set_crosshair_val: ", new_crosshair_val)
    }

    // Today I learned: Don't put this in a stateful variable. Just assemble the list
    // based on the props this component receives and pass that list to the MyPlot component
    const plugin_list = [new cross_hair_plugin(xtalk_ref, chart_cb)]

    //
    var grid_items = []
    for(let ix_row = 0; ix_row < num_rows; ix_row++) {
        // Render 2 plots per row.
        // the id for drag-and-drop is calculated as
        // id = ix_row * 2 + 0, ix_row * 2 + 1
        const ix_row_1 = ix_row * 2
        const ix_row_2 = ix_row * 2 + 1

        const id_row_1 = "area_" + `${ix_row_1}`.padStart(2, "0")
        const id_row_2 = "area_" + `${ix_row_2}`.padStart(2, "0")

        console.log("id_row_1 = ", id_row_1)
        grid_items.push(
        <GridItem key={10*ix_row+0}>
            <Box border="1px purple dashed" height={`${row_height}px`} overflow="scroll">
                <Tabs>
                    <TabList>
                        <Tab> Plot </Tab>
                        <Tab> Signals </Tab>
                        <Tab> Settings </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <MyPlot signals={signal_lists[ix_row_1]} plugin_list={plugin_list} ptr_mode={ptr_mode}/>
                        </TabPanel>
                        <TabPanel>  
                            <DroppableArea title={id_row_1} signal_list={signal_lists[ix_row_1]} signal_ix={ix_row_1} dispatch_signal_lists={dispatch_signal_lists}/>
                        </TabPanel>
                        <TabPanel> 
                            <PlotSettingsTab />
                        </TabPanel>
                    </TabPanels>
                </Tabs>


            </Box>
        </GridItem>
        )
        grid_items.push(
        <GridItem key={10*ix_row+1}>
            <Box border="1px purple dashed" height={`${row_height}px`} overflow="scroll">

                <Tabs>
                    <TabList>
                        <Tab> Plot </Tab>
                        <Tab> Signals </Tab>
                        <Tab> Settings </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <MyPlot signals={signal_lists[ix_row_2]} plugin_list={plugin_list} ptr_mode={ptr_mode}/>
                        </TabPanel>
                        <TabPanel>  
                            <DroppableArea title={id_row_2} signal_list={signal_lists[ix_row_2]} signal_ix={ix_row_2} dispatch_signal_lists={dispatch_signal_lists}/>
                        </TabPanel>
                        <TabPanel> 
                            <PlotSettingsTab />
                        </TabPanel>
                    </TabPanels>
                </Tabs>

            </Box>
        </GridItem>
        )
    }

    const css_row_str = `repeat(${num_rows}, ${row_height}px)`

    return (
        <Grid templateColumns={'0.5fr 0.5fr'} templateRows={css_row_str}>
            {grid_items}
        </Grid>


    )

}

export { DynamicGrid }