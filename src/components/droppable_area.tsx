// droppable_area.tsx
import { Flex, Text } from "@chakra-ui/react";
import { Accordion, AccordionItem } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { SignalSettingCard } from "./signal_info_card";
import { signal_t, reducer_action_t } from "../types/all_types";

interface droppable_area_i {
  title: string;                // Title of the droppable area
  signal_list: signal_t[];      // List of signals in this area
  signal_ix: number             // Index of the signal_list 
  dispatch_signal_lists: React.Dispatch<reducer_action_t>;
}

/*
 * Renders a droppabble area for new signal cards.
 * Displays the items in signal_list. Make sure those are not
 * draggable.
 */

function DroppableArea({title, signal_list, signal_ix, dispatch_signal_lists }: droppable_area_i) {
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
        {signal_list.map((_, ix) => (
          <AccordionItem key={ix}>
            <SignalSettingCard signal_list={signal_list} signal_list_ix={signal_ix} signal_ix={ix} dispatch_signal_lists={dispatch_signal_lists} />
            </AccordionItem>
        ))}
        </Accordion>
      </Flex>
    </Flex>
  );
}


export { DroppableArea }
