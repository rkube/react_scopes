
import { useState } from "react";

import { FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'
import { Box, Button, Spacer } from "@chakra-ui/react";
import { AccordionPanel, AccordionButton, AccordionIcon } from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";

import { signal_display_t, signal_t, to_str } from "../types/all_types";
import { default_colors } from "../lib/helpers";

interface signal_info_card_i {
    signal_list: signal_t[];
    ix: number;
    setter: React.Dispatch<React.SetStateAction<signal_t[]>>;
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
function SignalSettingCard(props: signal_info_card_i) {
    const {signal_list, ix, setter} = props
    const signal = signal_list[ix]

    // The form in the accordion below updates this style element.
    // Updates to the style of a signal are performed using this
    // object
    const [new_style, set_new_style] = useState<signal_display_t> ({
        scaling: signal.style ? signal.style.scaling : (x) => x,
        color: signal.style ? signal.style.color : default_colors(signal.type),
        borderDash: signal.style ? signal.style.borderDash : [],
        thickness: signal.style ? signal.style.thickness : 3
    })

    // Updates the signal list for this plot to match the style items
    // selected in the accordion below
    const handle_submit = () => {
        const new_signal_list = [...signal_list]
        const new_signal = new_signal_list[ix]
        new_signal.style = new_style
        setter(new_signal_list)
    }

    // Handles the red delete button
    // Remove the signal from this plots list.
    const handle_delete = () => {
        setter(signal_list.filter((item) => item.id !== signal_list[ix].id))
    }

    return(
        <Box>
            <h2>
                <AccordionButton >
                    <Box flex="1" textAlign="left"> {to_str(signal)} </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel>
                <Stack spacing={3}>
                    <form>
                        <FormControl mt={6}>
                            <FormLabel>Color</FormLabel>
                            <Input 
                                placeholder="color" 
                                size="sm"
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
                            <FormLabel>Linestyle</FormLabel>
                            <Input 
                                placeholder="Dash lengths: [20 5]"
                                size="sm"
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