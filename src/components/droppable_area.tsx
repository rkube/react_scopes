// droppable_area.tsx
import { useContext } from 'react'
import { Flex, Text } from "@chakra-ui/react";
import { Accordion, AccordionItem } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { SignalSettingCard } from "./signal_setting_card";
import { SignalsContext } from '../store/signals_context';

/*
 * Renders signal cards within a dropable area.
 */

interface droppable_area_i {
  plot_ix: number;    // Index within all plots
}


function DroppableArea({plot_ix}: droppable_area_i) {

  const title = "area_" + `${plot_ix}`.padStart(2, "0");
  const { setNodeRef } = useDroppable({
    id: title,
  });

  const signal_context = useContext(SignalsContext)
  const signal_display_list = signal_context.display_list.filter((item) => item.at_plot === plot_ix)

  return (
    <Flex flex="3" padding="5" flexDirection="column" minH="10rem">
      <Text fontWeight="bold">{title}</Text>
      <Flex
        ref={setNodeRef}
        backgroundColor="gray.200"
        borderRadius="8"
        flex="1"
        padding="2"
        flexDirection="column"
      >
        Test
        <Accordion allowMultiple> 
        {signal_display_list.map((item, ix) => (
          <AccordionItem key={ix}>
            <SignalSettingCard plot_ix={item.at_plot} signal_id={item.id} />
            </AccordionItem>
        ))}
        </Accordion> 
      </Flex>
    </Flex>
  );
}


export { DroppableArea }
