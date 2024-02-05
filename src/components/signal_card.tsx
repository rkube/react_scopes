
import { signal_t, to_str } from "../types/all_types"
import { CSS } from "@dnd-kit/utilities"

import { useDraggable } from "@dnd-kit/core"

import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react"
import { Box, Button, Center, Flex, Text, HStack, VStack } from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"


// Renders a dragable card for a signal.
interface signal_card_i {
    signal: signal_t        // The signal for which to render the card
    ix: number              // Index in list of loaded signals
    parent: string          // Name of the parent container
    cb: (id: string) => void
}

/*
 * Implements a draggable card for a signal
 */
const SignalCard = ({signal, ix, parent, cb}: signal_card_i) => {
    // Boilerplate to get draggable working
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: to_str(signal),
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
        <div>
        <Center>
          <Flex>
          <VStack>

        <Box color='black' width='200px' maxW='sm' borderWidth='1px' borderRadius='lg' as='span'

          transform={style.transform}
          {...listeners}
          {...attributes}
          ref={setNodeRef}>
              <Text> {to_str(signal)} </Text>

        </Box>
        <Button onClick={() => cb(signal.id)} colorScheme='teal' size='sm'>  <DeleteIcon/> </Button>

        </VStack>

        </Flex>
        </Center>

        </div>
      )
}

export {SignalCard}

