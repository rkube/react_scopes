
import { useState } from "react";

import { FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'
import { Box, Button } from "@chakra-ui/react";
import { AccordionPanel, AccordionButton, AccordionIcon } from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";

import { signal_style_t, signal_display_t, to_str, reducer_action_t } from "../types/all_types";
import { default_colors } from "../lib/helpers";

interface signal_setting_card_i {
    signal_display_list: signal_display_t[];   // The signal list we are processing
    signal_list_ix: number;            // Index of the signal list in the state object
    signal_ix: number;                 // Index of the signal in signal_list which we display
    dispatch_signal_lists: React.Dispatch<reducer_action_t>;
}


/*
 * This component handles updates to the style of a signal.
 * It shows forms for each component that can be modified, caches
 * style changes in a local style component. To commit the cached update,
 * it renders a button. On clicked, this button modifies the signal_list for
 * this plot.
 * 
 * Additionally, it renders a button to remove the signal from the list for the current plot.
 */
function SignalSettingCard( {signal_display_list, signal_list_ix, signal_ix, dispatch_signal_lists}: signal_setting_card_i) {
    const signal = signal_display_list[signal_ix]

    // The accordion element shows a form to update style elements of signals.
    // Updates to the style of a signal are performed using this
    // object
    const [new_style, set_new_style] = useState<signal_style_t> ({
        scaling: (x) => x,
        color: default_colors(signal.type),
        borderDash: [],
        thickness: 3
    })

    // Updates the signal list for this plot to match the style items
    // selected in the accordion below
    const handle_submit = () => {
        console.log("Updating style with ", new_style)
        // Update style with new dispatch
        dispatch_signal_lists({
            type: "update_style",
            ix: signal_list_ix,
            signal_ix: signal_ix,
            style: new_style

        })
    }

    // Handles the red delete button
    // Remove the signal from this plots list.
    const handle_delete = () => {
        console.log("handle_delete: ix=", signal_ix, ", id = ", signal.id)
        dispatch_signal_lists({
            type: "rm_signal",
            ix: signal_list_ix,
            id: signal.id
        })
    }

    return(
        <Box>
            <h2>
                <AccordionButton >
                    <Box flex="1" textAlign="left"> ix={signal_ix} - {signal.id} </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel>
                <Stack spacing={3}>
                    <form>
                        <FormControl mt={6}>
                            <FormLabel size="s">Color</FormLabel>
                            <Input 
                                placeholder="color" 
                                size="xs"
                                type="color"
                                onChange={(event) => {
                                    set_new_style({
                                        scaling: new_style.scaling,
                                        color: event.target.value,
                                        borderDash: new_style.borderDash,
                                        thickness: new_style.thickness
                                    })
                                }}>
                                    
                            </Input>
                                    
                        </FormControl>
                        <FormControl mt={6}>
                            <FormLabel size="xs">Linestyle</FormLabel>
                            <Input 
                                placeholder="Dash lengths: [20, 5]"
                                size="xs"
                                onChange={(event) => {
                                    set_new_style({
                                        scaling: new_style.scaling,
                                        color: new_style.color,
                                        borderDash: event.currentTarget.value.slice(1, -1).split(',').map(Number),
                                        thickness: new_style.thickness
                                    })
                                }}>
                            </Input>
                        </FormControl>
                        <FormControl mt={6}>
                            <FormLabel>Thickness</FormLabel>

                            <NumberInput step={1} defaultValue={1} min={0} max={10}
                                size="xs"
                                onChange={(event) => {
                                    set_new_style({
                                        scaling: new_style.scaling,
                                        color: new_style.color,
                                        borderDash: new_style.borderDash,
                                        thickness: parseInt(event)
                                    })
                                }}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                            </NumberInput>
                        </FormControl>    
                        <FormControl mt={6}>
                            <FormLabel>Transform</FormLabel>
                            <Input 
                                placeholder="(val) => (val - 1.0) / 2.0"
                                size="xs"
                                onChange={(event) => {
                                    set_new_style({
                                        scaling: eval(event.currentTarget.value),
                                        color: new_style.color,
                                        borderDash: new_style.borderDash,
                                        thickness: new_style.thickness
                                    })
                                }}>
                                </Input>
                        </FormControl>                    
                    <Button width="100%" onClick={handle_submit}> Update</Button>

                    <Button width='100%' onClick={handle_delete} bg='red'> <DeleteIcon /> </Button> 
                    </form>
                </Stack> 
            </AccordionPanel>
        </Box>
    );
}

export {SignalSettingCard}