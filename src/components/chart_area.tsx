
import { useState, useRef } from "react"
import { Grid, GridItem, ListItem, UnorderedList } from "@chakra-ui/react"
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import { MyPlot } from "./mychart"
import { cross_hair_t, ptr_mode_t, signal_t } from "../types/all_types"
import { cross_hair_plugin } from "./cross_hair_plugin"

import { DroppableArea } from "./droppable_area"

interface ScopesGrid_i {
    signal_lists: signal_t[][]
    signal_list_setters:  React.Dispatch<React.SetStateAction<signal_t[]>>[]
    ptr_mode: ptr_mode_t
}


// function ScopesGrid({signal_list, ptr_mode}: {signal_list: signal_t[], ptr_mode: ptr_mode_t}) {
function ScopesGrid({signal_lists, signal_list_setters, ptr_mode}: ScopesGrid_i) {

    // Destructure signal_lists
    const signal_list_1 = signal_lists[0]
    const signal_list_2 = signal_lists[1]

    const set_signal_list_1 = signal_list_setters[0]
    const set_signal_list_2 = signal_list_setters[1]


    console.log("signal_list_1 = ", signal_list_1)
    console.log("signal_list_2 = ", signal_list_2)

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

    return (
        <Grid templateColumns={'1fr 1fr'}>
            <GridItem>
                <Box border="1px red dashed">
                <Tabs>
                    <TabList>
                        <Tab> Plot </Tab>
                        <Tab> Signals </Tab>
                        <Tab> Settings </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                                TabPanel
                            <MyPlot signals={signal_list_1} plugin_list={plugin_list} ptr_mode={ptr_mode}/>
                        </TabPanel>
                        <TabPanel> Signals 
                            <DroppableArea title="area1" signal_list={signal_list_1} signal_list_setter={set_signal_list_1}/>
                        </TabPanel>
                        <TabPanel> Settings here </TabPanel>
                    </TabPanels>

                </Tabs>
                </Box>
            </GridItem>

            <GridItem>
                <Box border="1px red dashed">
                <Tabs>
                    <TabList>
                        <Tab> Plot </Tab>
                        <Tab> Signals </Tab>
                        <Tab> Settings </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                                TabPanel
                            <MyPlot signals={signal_list_2} plugin_list={plugin_list} ptr_mode={ptr_mode}/>

                        </TabPanel>
                        <TabPanel> Signals 
                            <DroppableArea title="area2" signal_list={signal_list_2} signal_list_setter={set_signal_list_1}/>
                        </TabPanel>
                        <TabPanel> Settings here </TabPanel>
                    </TabPanels>

                </Tabs>
                </Box>

            </GridItem>
            </Grid>
    )
}

export { ScopesGrid }