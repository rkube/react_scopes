
import { signal_t, to_str } from "../types/all_types";

import { ListItem } from "@chakra-ui/react";

import { Tabs, TabList, Tab, TabPanel, TabPanels} from "@chakra-ui/react";

interface signal_info_card_i {
    signal: signal_t;
    ix: number;
    cb?:  (id: number) => void;
}

function SignalInfoCard(props: signal_info_card_i) {

    return(
        <ListItem key={props.ix}>
            <Tabs>
                <TabList>
                    <Tab> {to_str(props.signal)} </Tab>
                    <Tab> Config </Tab>
                </TabList>

                <TabPanels>
                    <TabPanel> Signal name here </TabPanel>
                    <TabPanel> Config here </TabPanel>

                </TabPanels>
            
            </Tabs>
        </ListItem>
    );
}

export {SignalInfoCard}