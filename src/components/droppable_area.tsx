// droppable_area.tsx
// import { Fragment } from "react";
import { Flex, List, ListItem, Text } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";

// import { SignalCard } from "./signal_card";

import { signal_t, to_str } from "../types/all_types";

interface droppable_props {
  title: string;                // Title of the droppable area
  signal_list: signal_t[];      // List of signals in this area
}

/*
 * Renders a droppabble area for new signal cards.
 * Displays the items in signal_list. Make sure those are not
 * draggable.
 */

function DroppableArea({ title, signal_list }: droppable_props) {
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
        <List>
        {signal_list.map((item, ix) => (
            <ListItem key={ix}>
                {to_str(item)} - {ix}
            </ListItem>
        // Don't render to the SignalCard because it's draggable. When
        // dragging a signal card in MyList, it also drags these components :/
        // So use a list for now until I come up with a smarter solution.
        // <Fragment key={ix}>
        //    <SignalCard signal={item} ix={ix} parent={title} cb={(ix:number) => console.log("Callback in droppable, ix=",ix)} />
        // </Fragment>
        ))}
        </List>
      </Flex>
    </Flex>
  );
}


export { DroppableArea }
