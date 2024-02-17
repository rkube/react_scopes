
import { useContext } from "react"

import { to_id, to_str } from "../types/all_types"
import { CSS } from "@dnd-kit/utilities"

import { useDraggable } from "@dnd-kit/core"

import { Box, Button, Text, VStack } from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import { SignalsContext, SignalsDispatchContext } from "../store/signals_context"


// Renders a dragable card for a signal.
interface signal_card_i {
  ix: number      // Index in list of loaded signals
  parent: string  // Name of the parent container
}


/*
 * Implements a draggable card for a signal
 */
const SignalCard = ({ix, parent}: signal_card_i) => {

  const signals_context = useContext(SignalsContext)
  const dispatch_signals = useContext(SignalsDispatchContext)
  const signal = signals_context.data_list[ix]

    // Boilerplate to get draggable working
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: to_id(signal.shot, signal.type),
        data: {
          signal,
          parent,
          ix
        },
      });
      
      const style = {
        transform: CSS.Translate.toString(transform),
      };

      return ( 
        <Box key={ix} border="dashed red 3px" width="100%" alignContent="center">
            <VStack>

        <Box border="dashed blue 1px" color='black' width='100%' maxW='sm' borderWidth='1px' borderRadius='lg'
            transform={style.transform}
            {...listeners}
            {...attributes}
            ref={setNodeRef}>
            <Text> {to_str(signal)} </Text>

        </Box>
        <Button width="100%" onClick={() => {
          dispatch_signals({
            type: "rm_data_src",
            id: to_id(signals_context.data_list[ix].shot, signals_context.data_list[ix].type)
          })
        }} colorScheme='teal' size='sm'>  <DeleteIcon/> </Button>

        </VStack>

        </Box>
      )
}

export {SignalCard}

