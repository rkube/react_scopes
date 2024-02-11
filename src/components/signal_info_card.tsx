
import { useState } from "react";

import { FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'
import { Button } from "@chakra-ui/react";

import { Box } from "@chakra-ui/react";

import { AccordionPanel, AccordionButton, AccordionIcon } from "@chakra-ui/react";

import { signal_display_t, signal_t, to_str } from "../types/all_types";
import { default_colors } from "../lib/helpers";

interface signal_info_card_i {
    signal_list: signal_t[];
    ix: number;
    setter: React.Dispatch<React.SetStateAction<signal_t[]>>;
    // key: number;
    // signal_cfg: signal_display_t;
    // cb?:  (id: number) => void;
}



function SignalSettingCard(props: signal_info_card_i) {



    const {signal_list, ix, setter} = props
    const signal = signal_list[ix]

    const [new_style, set_new_style] = useState<signal_display_t> ({
        scaling: signal.style ? signal.style.scaling : (x) => x,
        color: signal.style ? signal.style.color : default_colors(signal.type),
        borderDash: signal.style ? signal.style.borderDash : [],
        thickness: signal.style ? signal.style.thickness : 3
    })


    const handle_submit = () => {
        // console.log("event = ", event)
        console.log("new_style = ", new_style)
        // console.log("Color input: ", event)
        const new_signal_list = [...signal_list]
        const new_signal = new_signal_list[ix]

        new_signal.style = new_style
        
        // if (new_signal.style) {
        //     new_signal.style.color = event.target.value
        // } else {
        //     new_signal.style = {scaling: (val: number) => val,
        //                         color: event.target.value,
        //                         borderDash: [],
        //                         thickness: 1}
        // }
        setter(new_signal_list)


    }

    return(
        <Box>
            <h2>
                <AccordionButton >
                    <Box as="span" flex="1" textAlign="left">
                    {to_str(signal)}
                    </Box>
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
                    </form>
                </Stack> 
            </AccordionPanel>
        </Box>
    );
}

export {SignalSettingCard}