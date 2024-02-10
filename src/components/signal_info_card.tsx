
import { useState } from "react";

import { FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
// import { Tabs, TabList, Tab, TabPanel, TabPanels} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import { Box } from "@chakra-ui/react";

import { AccordionPanel, AccordionItem, AccordionButton, AccordionIcon } from "@chakra-ui/react";

import { signal_display_t, signal_t, to_str } from "../types/all_types";

interface signal_info_card_i {
    signal: signal_t;
    // key: number;
    // signal_cfg: signal_display_t;
    // cb?:  (id: number) => void;
}



function SignalInfoCard(props: signal_info_card_i) {

    const [form_state, set_form_state] = useState<signal_display_t> ({
        scaling: (val) => 2 * val,
        color: "green",
        line_style: "solid",
        thickness: 2
    })

    // const handle_submit = (event) => {
    //     console.log("event = ", event)
    // }

    return(
        // <AccordionItem  border="dashed purple 1px" height="350px" overflow="scroll">
            <Box>
                <h2>
                    <AccordionButton >
                        <Box as="span" flex="1" textAlign="left">
                        {to_str(props.signal)}
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel>

                <Stack spacing={3}>
                             <form>
                                 <FormControl mt={6}>
                                     <FormLabel>Transform</FormLabel>
                                     <Input 
                                         placeholder="(val) => val"
                                         onChange={(event) =>
                                         console.log("e.current.value=", event.currentTarget.value)}
                                         ></Input>
                                 </FormControl>
                                 <FormControl mt={6}>
                                     <FormLabel>Color</FormLabel>
                                     <Input 
                                         placeholder="color" 
                                         size="sm"
                                         onChange={(event) =>
                                             console.log("color e.current.value=", event.currentTarget.value)}></Input>
                                 </FormControl>
                                 <FormControl mt={6}>
                                     <FormLabel>Color</FormLabel>
                                     <Input 
                                         placeholder="linestyle"
                                         size="sm"
                                         onChange={(event) =>
                                             console.log("linestype e.current.value=", event.currentTarget.value)}
                                         ></Input>
                                 </FormControl>
                                 <FormControl mt={6}>
                                     <FormLabel>Thickness</FormLabel>
                                     <Input
                                         placeholder="thickness"
                                         size="sm"
                                         onChange={(event) =>
                                             console.log("thickness e.current.value = ", event.currentTarget.value)}></Input>
                                </FormControl>                        
                        <Button width="100%"> Update</Button>
                        </form>
                        </Stack> 
                </AccordionPanel>
                </Box>



   
            // <Button alignSelf="end" width="100%"> Push me </Button>
        // </AccordionItem>
    );
}

export {SignalInfoCard}