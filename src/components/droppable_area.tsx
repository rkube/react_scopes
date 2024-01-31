// droppable_area.tsx
import { Fragment } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";

import { SignalCard } from "./signal_card";

import { signal_t } from "../types/all_types";

interface droppable_props {
  title: string;                // Title of the droppable area
  signal_list: signal_t[];      // List of signals in this area
}

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
        {signal_list.map((item, ix) => (
            <Fragment key={ix}>
          <SignalCard signal={item} ix={ix} parent={title} cb={(ix:number) => console.log("Callback in droppable, ix=",ix)} />
          </Fragment>
        ))}
      </Flex>
    </Flex>
  );
}


export { DroppableArea }
