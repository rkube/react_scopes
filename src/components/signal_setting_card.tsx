
import { useState, useContext } from "react";

import { FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'
import { Box, Button } from "@chakra-ui/react";
import { AccordionPanel, AccordionButton, AccordionIcon } from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";

import { signal_style_t} from "../types/all_types";
import { SignalsDispatchContext } from "../store/signals_context";


interface signal_setting_card_i {
    plot_ix: number         // Index of the plot
    signal_id: string     // Type of the signal to update style for
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
function SignalSettingCard( {plot_ix, signal_id}: signal_setting_card_i) {
    const signals_dispatch = useContext(SignalsDispatchContext)

    // The accordion element shows a form to update style elements of signals.
    // Updates to the style of a signal are performed using this
    // object
    const [new_style, set_new_style] = useState<signal_style_t> ({
        scaling: (x) => x,
        color: 'green',
        borderDash: [],
        thickness: 3
    })

    // Updates the signal list for this plot to match the style items
    // selected in the accordion below
    const handle_submit = () => {
        console.log("Updating style with ", new_style)
        // Update style with new dispatch
        signals_dispatch({
            type: "update_style",
            plot_ix: plot_ix,
            id: signal_id,
            style: new_style
        })
    }

    // Handles the red delete button
    // Remove the signal from this plots list.
    const handle_delete = () => {
        console.log("handle_delete ")
        signals_dispatch({
            type: "rm_display",
            plot_ix: plot_ix,
            id: signal_id
        })
    }

    return(
        <Box>
            <h2>
                <AccordionButton >
                    <Box flex="1" textAlign="left"> {plot_ix} - {signal_id} </Box>
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