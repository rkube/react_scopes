// droppable_area.tsx
import { Flex, List, Text } from "@chakra-ui/react";

import { Accordion, AccordionItem } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";

import { SignalSettingCard } from "./signal_info_card";

import { signal_t } from "../types/all_types";

interface droppable_props {
  title: string;                // Title of the droppable area
  signal_list: signal_t[];      // List of signals in this area
  signal_list_setter: React.Dispatch<React.SetStateAction<signal_t[]>>;
}

/*
 * Renders a droppabble area for new signal cards.
 * Displays the items in signal_list. Make sure those are not
 * draggable.
 */

function DroppableArea({ title, signal_list, signal_list_setter }: droppable_props) {
  const { setNodeRef } = useDroppable({
    id: title,
  });

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
        <Accordion allowMultiple>
        {signal_list.map((item, ix) => (
          <AccordionItem key={ix}>
            <SignalSettingCard signal_list={signal_list} ix={ix} setter={signal_list_setter} />
            </AccordionItem>
        ))}
        </Accordion>
      </Flex>
    </Flex>
  );
}


export { DroppableArea }
